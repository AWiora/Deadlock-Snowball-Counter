import snapshotData from './snapshot.json';
import type { DeadlockHero, DeadlockItem, DeadlockSnapshot, ItemSlot } from '../types/deadlock';

const API_BASE = 'https://api.deadlock-api.com/v1/assets';
const CACHE_KEY = 'deadlock_counter_helper_assets_v3';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

interface CachedPayload {
  fetchedAt: number;
  heroes: DeadlockHero[];
  items: DeadlockItem[];
}

export function getBundledSnapshot(): DeadlockSnapshot {
  return snapshotData as DeadlockSnapshot;
}

function cleanHtml(html?: string | null): string {
  if (!html) return '';
  return html
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<img[^>]*>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function readCache(): CachedPayload | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedPayload;
    if (!parsed.heroes?.length || !parsed.items?.length) return null;
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(payload: CachedPayload): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage quota errors
  }
}

export async function fetchLiveDeadlockData(): Promise<{
  heroes: DeadlockHero[];
  items: DeadlockItem[];
  fromCache: boolean;
}> {
  const cached = readCache();
  if (cached) {
    return { heroes: cached.heroes, items: cached.items, fromCache: true };
  }

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 10000);

  try {
    const [heroesEnRes, heroesDeRes, itemsEnRes, itemsDeRes] = await Promise.all([
      fetch(`${API_BASE}/heroes?only_active=true&language=english`, { signal: controller.signal }),
      fetch(`${API_BASE}/heroes?only_active=true&language=german`, { signal: controller.signal }),
      fetch(`${API_BASE}/items/by-type/upgrade?language=english`, { signal: controller.signal }),
      fetch(`${API_BASE}/items/by-type/upgrade?language=german`, { signal: controller.signal }),
    ]);

    if (!heroesEnRes.ok || !itemsEnRes.ok) {
      throw new Error(`Deadlock API status ${heroesEnRes.status}/${itemsEnRes.status}`);
    }

    const [rawHeroesEn, rawItemsEn] = (await Promise.all([
      heroesEnRes.json(),
      itemsEnRes.json(),
    ])) as [Array<Record<string, any>>, Array<Record<string, any>>];

    const rawHeroesDe = heroesDeRes.ok
      ? ((await heroesDeRes.json()) as Array<Record<string, any>>)
      : [];
    const rawItemsDe = itemsDeRes.ok
      ? ((await itemsDeRes.json()) as Array<Record<string, any>>)
      : [];

    const deHeroByClass = new Map(rawHeroesDe.map((h) => [h.class_name, h.name as string]));
    const deItemByClass = new Map(rawItemsDe.map((i) => [i.class_name, i.name as string]));
    const snapHeroByClass = new Map(
      getBundledSnapshot().heroes.map((h) => [h.className, h]),
    );

    const heroes: DeadlockHero[] = rawHeroesEn
      .filter((h) => !h.disabled && h.player_selectable !== false && !h.in_development)
      .map((h) => {
        const snapHero = snapHeroByClass.get(h.class_name);
        return {
          id: h.id,
          className: h.class_name,
          name: h.name,
          nameDe: deHeroByClass.get(h.class_name) || h.name,
          role: cleanHtml(h.description?.role),
          iconCard: h.images?.icon_hero_card_webp || h.images?.icon_hero_card || '',
          iconSmall: h.images?.icon_image_small_webp || h.images?.icon_image_small || '',
          minimapIcon: h.images?.minimap_image_webp || h.images?.minimap_image || '',
          metaDamage: snapHero?.metaDamage,
          metaWeaponPct: snapHero?.metaWeaponPct,
          counterLifts: snapHero?.counterLifts,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    const items: DeadlockItem[] = rawItemsEn
      .filter(
        (it) =>
          it.shopable &&
          !it.disabled &&
          it.item_tier <= 4 &&
          it.cost > 0 &&
          it.cost <= 7000 &&
          ['weapon', 'vitality', 'spirit'].includes(it.item_slot_type),
      )
      .map((it) => ({
        id: it.id,
        className: it.class_name,
        name: it.name,
        nameDe: deItemByClass.get(it.class_name) || it.name,
        slot: it.item_slot_type as ItemSlot,
        tier: it.item_tier,
        cost: it.cost,
        isActive: Boolean(it.is_active_item),
        icon: it.shop_image_webp || it.shop_image || it.image_webp || it.image || '',
        summary: cleanHtml(
          it.description?.active || it.description?.passive || it.description?.desc,
        ).slice(0, 220),
      }))
      .sort((a, b) => a.slot.localeCompare(b.slot) || a.cost - b.cost || a.name.localeCompare(b.name));

    if (heroes.length < 20 || items.length < 80) {
      throw new Error('Incomplete API response');
    }

    writeCache({ fetchedAt: Date.now(), heroes, items });
    return { heroes, items, fromCache: false };
  } finally {
    window.clearTimeout(timer);
  }
}
