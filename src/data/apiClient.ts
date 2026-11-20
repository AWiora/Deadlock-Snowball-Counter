import snapshotData from './snapshot.json';
import type {
  DeadlockAbility,
  DeadlockHero,
  DeadlockItem,
  DeadlockItemStat,
  DeadlockItemTooltipSection,
  DeadlockSnapshot,
  ItemSlot,
  ItemStatIcon,
} from '../types/deadlock';

const API_BASE = 'https://api.deadlock-api.com/v1/assets';
const CACHE_KEY = 'deadlock_counter_helper_assets_v7';

// API property glyph (file name of `prop.icon`) -> stat icon key the tooltip maps to a wiki icon.
// Keep in sync with scripts/sync-deadlock-data.mjs.
const STAT_ICON_BY_API_GLYPH: Record<string, ItemStatIcon> = {
  damage_magic_color: 'spirit_damage',
  spirit: 'spirit_damage',
  icon_spirit: 'spirit_damage',
  damage_bullet_color: 'weapon_damage',
  damage_crit: 'damage',
  armor_spirit_color: 'spirit_resist',
  armor_bullet_color: 'bullet_resist',
  condition_slow: 'slow',
  duration: 'duration',
  range: 'range',
  property_range: 'cast_range',
  cooldown: 'cooldown',
  heal: 'healing',
  health: 'health',
  move_speed: 'move_speed',
  armor_alt: 'barrier',
  fire_rate: 'fire_rate',
  ammo_clip_size: 'ammo',
  melee: 'melee',
  icon_soul: 'souls',
};

function statIconKey(prop: Record<string, any>): ItemStatIcon | undefined {
  const glyph = String(prop?.icon ?? '')
    .split('/')
    .pop()
    ?.replace(/\.(svg|png|webp)$/i, '');
  return glyph ? STAT_ICON_BY_API_GLYPH[glyph] : undefined;
}
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

const ABILITY_DESC_FALLBACK: Record<string, { en: string; de: string }> = {
  ability_vampirebat_steallife: {
    en: 'Slash in front of you, dealing spirit damage and healing yourself. Deals bonus damage based on missing health and grants extra healing on kills.',
    de: 'Schlitzt vor dir zu, verursacht Magieschaden und heilt dich. Verursacht Bonusschaden basierend auf fehlenden LP und gewährt zusätzliche Heilung bei Kills.',
  },
};

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
    .replace(/\u00AD/g, '')
    .replace(/\u00A0/g, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<img[^>]*>/gi, '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\(\s*\)/g, '')
    .replace(/\s+([.,:;!?])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatPropertyValue(prop: Record<string, any> | undefined): string | null {
  if (!prop || prop.value === undefined || prop.value === null) return null;
  let raw = String(prop.value).replace(/\u00A0/g, ' ').trim();
  if (!raw) return null;
  if (prop.disable_value !== undefined && raw === String(prop.disable_value)) return null;
  const num = Number.parseFloat(raw);
  if (!Number.isNaN(num) && (num === 0 || raw === '-1' || raw === '-1.0')) return null;

  let prefix = String(prop.prefix ?? '').replace(/\u00A0/g, ' ').trim();
  if (prefix === '{s:sign}') {
    prefix = !Number.isNaN(num) && num > 0 && !raw.startsWith('+') && !raw.startsWith('-') ? '+' : '';
  } else if (prefix.includes('{')) {
    prefix = '';
  }

  let postfix = String(prop.postfix ?? '').replace(/\u00AD/g, '').replace(/\u00A0/g, ' ').trim();
  if (postfix.includes('{')) postfix = '';

  if (postfix && raw.toLowerCase().endsWith(postfix.toLowerCase())) {
    postfix = '';
  } else if (postfix.toLowerCase().startsWith('m/') && raw.toLowerCase().endsWith('m')) {
    raw = raw.slice(0, -1);
  }

  const spacer = postfix && postfix.length > 2 && !postfix.startsWith('%') ? ' ' : '';
  return `${prefix}${raw}${spacer}${postfix}`.trim();
}

function extractItemCooldown(it: Record<string, any> | undefined): string | undefined {
  const cd = it?.properties?.AbilityCooldown;
  if (!cd || cd.value === undefined || cd.value === null) return undefined;
  const num = Number.parseFloat(String(cd.value));
  if (Number.isNaN(num) || num <= 0) return undefined;
  return `${Number.isInteger(num) ? num : String(cd.value)}s`;
}

function extractItemSummary(it: Record<string, any>): string {
  const direct = cleanHtml(
    it.description?.active || it.description?.passive || it.description?.desc,
  );
  if (direct) return direct.slice(0, 220);

  const sectionTexts: string[] = [];
  for (const sec of it.tooltip_sections ?? []) {
    for (const attr of sec.section_attributes ?? []) {
      if (attr?.loc_string && !String(attr.loc_string).startsWith('#')) {
        const cleaned = cleanHtml(attr.loc_string);
        if (cleaned) sectionTexts.push(cleaned);
      }
    }
  }
  return sectionTexts.join(' ').slice(0, 220);
}

function extractItemTooltip(it: Record<string, any> | undefined): DeadlockItemTooltipSection[] | undefined {
  if (!it) return undefined;
  const props = it.properties ?? {};
  const itemCd = extractItemCooldown(it);
  const sections: DeadlockItemTooltipSection[] = [];

  for (const sec of it.tooltip_sections ?? []) {
    const rawType = String(sec.section_type || '').toLowerCase();
    const type: DeadlockItemTooltipSection['type'] =
      rawType === 'active' ? 'active' : rawType === 'passive' ? 'passive' : 'innate';
    const descParts: string[] = [];
    const stats: DeadlockItemStat[] = [];
    const seenKeys = new Set<string>();
    let sectionCooldown: string | undefined;

    const addProp = (key: string, flags: { important?: boolean; elevated?: boolean }) => {
      if (!key || seenKeys.has(key)) return;
      seenKeys.add(key);
      const p = props[key];
      if (!p) return;
      if (key === 'AbilityCooldown') {
        const cdVal = formatPropertyValue(p);
        if (cdVal) sectionCooldown = cdVal;
        return;
      }
      const value = formatPropertyValue(p);
      const label = cleanHtml(p.label || p.postvalue_label || '');
      if (!value || !label || label.startsWith('#')) return;
      const icon = statIconKey(p);
      stats.push({
        label,
        value,
        ...(flags.important ? { important: true } : {}),
        ...(flags.elevated ? { elevated: true } : {}),
        ...(icon ? { icon } : {}),
      });
    };

    for (const attr of sec.section_attributes ?? []) {
      if (attr?.loc_string && !String(attr.loc_string).startsWith('#')) {
        const cleaned = cleanHtml(attr.loc_string);
        if (cleaned) descParts.push(cleaned);
      }
      for (const k of attr?.elevated_properties ?? []) addProp(k, { elevated: true });
      for (const k of attr?.important_properties ?? []) addProp(k, { important: true });
      for (const k of attr?.properties ?? []) addProp(k, {});
    }

    const desc = descParts.join(' ').trim() || undefined;
    if (!sectionCooldown && type !== 'innate' && itemCd) {
      sectionCooldown = itemCd;
    }
    if (desc || stats.length > 0) {
      sections.push({
        type,
        ...(desc ? { desc } : {}),
        ...(sectionCooldown ? { cooldown: sectionCooldown } : {}),
        stats,
      });
    }
  }

  if (sections.length === 0) {
    const fallbackDesc = extractItemSummary(it);
    if (fallbackDesc) {
      sections.push({
        type: it.is_active_item ? 'active' : 'passive',
        desc: fallbackDesc,
        ...(itemCd ? { cooldown: itemCd } : {}),
        stats: [],
      });
    }
  }

  return sections.length > 0 ? sections : undefined;
}

function extractAbilityDesc(rawAbility: Record<string, any> | undefined, lang: 'en' | 'de'): string {
  if (!rawAbility) return '';
  const d = rawAbility.description;
  const candidates: string[] = [];
  if (d?.desc && !String(d.desc).startsWith('#')) {
    candidates.push(d.desc);
  } else {
    if (d?.active && !String(d.active).startsWith('#')) candidates.push(d.active);
    if (d?.passive && !String(d.passive).startsWith('#')) candidates.push(d.passive);
  }
  if (candidates.length === 0) {
    const sections = rawAbility.tooltip_details?.info_sections ?? [];
    for (const sec of sections) {
      if (sec?.loc_string && !String(sec.loc_string).startsWith('#')) {
        candidates.push(sec.loc_string);
      }
    }
  }
  const cleaned = cleanHtml(candidates.join(' '));
  if (cleaned) return cleaned;
  return ABILITY_DESC_FALLBACK[rawAbility.class_name]?.[lang] ?? '';
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
    const [heroesEnRes, heroesDeRes, itemsEnRes, itemsDeRes, abilitiesEnRes, abilitiesDeRes] =
      await Promise.all([
        fetch(`${API_BASE}/heroes?only_active=true&language=english`, { signal: controller.signal }),
        fetch(`${API_BASE}/heroes?only_active=true&language=german`, { signal: controller.signal }),
        fetch(`${API_BASE}/items/by-type/upgrade?language=english`, { signal: controller.signal }),
        fetch(`${API_BASE}/items/by-type/upgrade?language=german`, { signal: controller.signal }),
        fetch(`${API_BASE}/items/by-type/ability?language=english`, { signal: controller.signal }),
        fetch(`${API_BASE}/items/by-type/ability?language=german`, { signal: controller.signal }),
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
    const rawAbilitiesEn = abilitiesEnRes.ok
      ? ((await abilitiesEnRes.json()) as Array<Record<string, any>>)
      : [];
    const rawAbilitiesDe = abilitiesDeRes.ok
      ? ((await abilitiesDeRes.json()) as Array<Record<string, any>>)
      : [];

    const deHeroByClass = new Map(rawHeroesDe.map((h) => [h.class_name, h.name as string]));
    const deItemByClass = new Map(rawItemsDe.map((i) => [i.class_name, i]));
    const enAbilityByClass = new Map(rawAbilitiesEn.map((a) => [a.class_name, a]));
    const deAbilityByClass = new Map(rawAbilitiesDe.map((a) => [a.class_name, a]));
    const snap = getBundledSnapshot();
    const snapHeroByClass = new Map(snap.heroes.map((h) => [h.className, h]));
    const snapItemByClass = new Map(snap.items.map((i) => [i.className, i]));

    const heroes: DeadlockHero[] = rawHeroesEn
      .filter((h) => !h.disabled && h.player_selectable !== false)
      .map((h) => {
        const snapHero = snapHeroByClass.get(h.class_name);
        const abilities: DeadlockAbility[] = [];
        for (let slot = 1 as 1 | 2 | 3 | 4; slot <= 4; slot = (slot + 1) as 1 | 2 | 3 | 4) {
          const cls = h.items?.[`signature${slot}`];
          if (!cls) continue;
          const abEn = enAbilityByClass.get(cls);
          const abDe = deAbilityByClass.get(cls);
          if (!abEn) continue;
          abilities.push({
            className: cls,
            slot,
            name: abEn.name,
            nameDe: abDe?.name || abEn.name,
            icon: abEn.image_webp || abEn.image || '',
            descEn: extractAbilityDesc(abEn, 'en'),
            descDe: extractAbilityDesc(abDe, 'de') || extractAbilityDesc(abEn, 'en'),
            isUltimate: slot === 4 || abEn.ability_type === 'ultimate',
          });
        }
        return {
          id: h.id,
          className: h.class_name,
          name: h.name,
          nameDe: deHeroByClass.get(h.class_name) || h.name,
          role: cleanHtml(h.description?.role),
          iconCard: h.images?.icon_hero_card_webp || h.images?.icon_hero_card || '',
          iconSmall: h.images?.icon_image_small_webp || h.images?.icon_image_small || '',
          minimapIcon: h.images?.minimap_image_webp || h.images?.minimap_image || '',
          abilities: abilities.length > 0 ? abilities : snapHero?.abilities,
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
      .map((it) => {
        const itDe = deItemByClass.get(it.class_name);
        const snapItem = snapItemByClass.get(it.class_name);
        const cooldown = extractItemCooldown(it) ?? snapItem?.cooldown;
        const tooltipEn = extractItemTooltip(it) ?? snapItem?.tooltipEn;
        const tooltipDe = extractItemTooltip(itDe) ?? snapItem?.tooltipDe ?? tooltipEn;
        return {
          id: it.id,
          className: it.class_name,
          name: it.name,
          nameDe: (itDe?.name as string | undefined) || it.name,
          slot: it.item_slot_type as ItemSlot,
          tier: it.item_tier,
          cost: it.cost,
          isActive: Boolean(it.is_active_item),
          icon: it.shop_image_webp || it.shop_image || it.image_webp || it.image || '',
          summary: extractItemSummary(it) || snapItem?.summary || '',
          ...(cooldown ? { cooldown } : {}),
          ...(tooltipEn ? { tooltipEn } : {}),
          ...(tooltipDe ? { tooltipDe } : {}),
        };
      })
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
