#!/usr/bin/env node
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, '../src/data/snapshot.json');
const API_BASE = 'https://api.deadlock-api.com/v1/assets';

function cleanHtml(html) {
  if (!html) return '';
  return html
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<img[^>]*>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'deadlock-build-helper/1.0' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function main() {
  console.log('Syncing EN + DE Deadlock heroes & shop items from api.deadlock-api.com...');
  const [rawHeroesEn, rawHeroesDe, rawItemsEn, rawItemsDe] = await Promise.all([
    fetchJson(`${API_BASE}/heroes?only_active=true&language=english`),
    fetchJson(`${API_BASE}/heroes?only_active=true&language=german`),
    fetchJson(`${API_BASE}/items/by-type/upgrade?language=english`),
    fetchJson(`${API_BASE}/items/by-type/upgrade?language=german`),
  ]);

  const deHeroByClass = new Map(rawHeroesDe.map((h) => [h.class_name, h]));
  const deItemByClass = new Map(rawItemsDe.map((i) => [i.class_name, i]));

  const heroes = rawHeroesEn
    .filter((h) => !h.disabled && h.player_selectable !== false && !h.in_development)
    .map((h) => ({
      id: h.id,
      className: h.class_name,
      name: h.name,
      nameDe: deHeroByClass.get(h.class_name)?.name || h.name,
      role: cleanHtml(h.description?.role ?? ''),
      iconCard: h.images?.icon_hero_card_webp || h.images?.icon_hero_card || '',
      iconSmall: h.images?.icon_image_small_webp || h.images?.icon_image_small || '',
      minimapIcon: h.images?.minimap_image_webp || h.images?.minimap_image || '',
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const items = rawItemsEn
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
      nameDe: deItemByClass.get(it.class_name)?.name || it.name,
      slot: it.item_slot_type,
      tier: it.item_tier,
      cost: it.cost,
      isActive: Boolean(it.is_active_item),
      icon: it.shop_image_webp || it.shop_image || it.image_webp || it.image || '',
      summary: cleanHtml(
        it.description?.active || it.description?.passive || it.description?.desc || '',
      ).slice(0, 220),
    }))
    .sort((a, b) => a.slot.localeCompare(b.slot) || a.cost - b.cost || a.name.localeCompare(b.name));

  const itemsById = new Map(items.map((it) => [it.id, it]));
  const minTs = Math.floor(Date.now() / 1000) - 30 * 86400;

  // Calibrate real 30-day Weapon vs Spirit soul spend per hero from live match analytics
  console.log('Calibrating 30-day Weapon vs Spirit meta defaults from /v1/analytics/item-stats...');
  await Promise.all(
    heroes.map(async (hero) => {
      try {
        const rows = await fetchJson(
          `https://api.deadlock-api.com/v1/analytics/item-stats?hero_id=${hero.id}&min_unix_timestamp=${minTs}`,
        );
        let weaponSouls = 0;
        let spiritSouls = 0;
        for (const row of rows) {
          const it = itemsById.get(row.item_id);
          if (!it || it.tier < 2) continue;
          const kept = Math.max(row.matches - (row.sold || 0) * 0.6, row.matches * 0.2);
          const souls = kept * it.cost;
          if (it.slot === 'weapon') weaponSouls += souls;
          else if (it.slot === 'spirit') spiritSouls += souls;
        }
        const total = weaponSouls + spiritSouls;
        const wPct = total > 0 ? Math.round((weaponSouls / total) * 100) : 50;
        hero.metaWeaponPct = wPct;
        hero.metaDamage = wPct >= 58 ? 'bullet' : wPct <= 42 ? 'spirit' : 'equal';
      } catch {
        // Keep undefined on transient error
      }
    }),
  );

  const snapshot = {
    syncedAt: new Date().toISOString().slice(0, 10),
    source: API_BASE,
    heroes,
    items,
  };

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
  console.log(`Saved ${heroes.length} heroes and ${items.length} items (EN + DE) to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error('Sync failed:', err);
  process.exit(1);
});
