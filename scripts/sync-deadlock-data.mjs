#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, '../src/data/snapshot.json');
const COUNTER_ITEMS_PATH = resolve(__dirname, '../src/data/counterItems.ts');
const API_BASE = 'https://api.deadlock-api.com/v1/assets';
const ANALYTICS_BASE = 'https://api.deadlock-api.com/v1/analytics';

const ABILITY_DESC_FALLBACK = {
  ability_vampirebat_steallife: {
    en: 'Slash in front of you, dealing spirit damage and healing yourself. Deals bonus damage based on missing health and grants extra healing on kills.',
    de: 'Schlitzt vor dir zu, verursacht Magieschaden und heilt dich. Verursacht Bonusschaden basierend auf fehlenden LP und gewährt zusätzliche Heilung bei Kills.',
  },
};

function cleanHtml(html) {
  if (!html) return '';
  return html
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<img[^>]*>/gi, '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\(\s*\)/g, '')
    .replace(/\s+([.,:;!?])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractAbilityDesc(rawAbility, lang) {
  if (!rawAbility) return '';
  const d = rawAbility.description;
  const candidates = [];
  if (d?.desc && !d.desc.startsWith('#')) {
    candidates.push(d.desc);
  } else {
    if (d?.active && !d.active.startsWith('#')) candidates.push(d.active);
    if (d?.passive && !d.passive.startsWith('#')) candidates.push(d.passive);
  }
  if (candidates.length === 0) {
    const sections = rawAbility.tooltip_details?.info_sections ?? [];
    for (const sec of sections) {
      if (sec?.loc_string && !sec.loc_string.startsWith('#')) {
        candidates.push(sec.loc_string);
      }
    }
  }
  const cleaned = cleanHtml(candidates.join(' '));
  if (cleaned) return cleaned;
  return ABILITY_DESC_FALLBACK[rawAbility.class_name]?.[lang] ?? '';
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'deadlock-build-helper/1.0' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

function getCuratedCounterClassNames() {
  const src = readFileSync(COUNTER_ITEMS_PATH, 'utf8');
  return new Set([...src.matchAll(/className:\s*'([^']+)'/g)].map((m) => m[1]));
}

async function runInBatches(list, batchSize, fn) {
  for (let i = 0; i < list.length; i += batchSize) {
    await Promise.all(list.slice(i, i + batchSize).map(fn));
  }
}

async function main() {
  console.log('Syncing EN + DE Deadlock heroes, abilities & shop items from api.deadlock-api.com...');
  const [rawHeroesEn, rawHeroesDe, rawItemsEn, rawItemsDe, rawAbilitiesEn, rawAbilitiesDe] =
    await Promise.all([
      fetchJson(`${API_BASE}/heroes?only_active=true&language=english`),
      fetchJson(`${API_BASE}/heroes?only_active=true&language=german`),
      fetchJson(`${API_BASE}/items/by-type/upgrade?language=english`),
      fetchJson(`${API_BASE}/items/by-type/upgrade?language=german`),
      fetchJson(`${API_BASE}/items/by-type/ability?language=english`),
      fetchJson(`${API_BASE}/items/by-type/ability?language=german`),
    ]);

  const deHeroByClass = new Map(rawHeroesDe.map((h) => [h.class_name, h]));
  const deItemByClass = new Map(rawItemsDe.map((i) => [i.class_name, i]));
  const enAbilityByClass = new Map(rawAbilitiesEn.map((a) => [a.class_name, a]));
  const deAbilityByClass = new Map(rawAbilitiesDe.map((a) => [a.class_name, a]));

  const heroes = rawHeroesEn
    .filter((h) => !h.disabled && h.player_selectable !== false && !h.in_development)
    .map((h) => {
      const abilities = [];
      for (let slot = 1; slot <= 4; slot++) {
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
        nameDe: deHeroByClass.get(h.class_name)?.name || h.name,
        role: cleanHtml(h.description?.role ?? ''),
        iconCard: h.images?.icon_hero_card_webp || h.images?.icon_hero_card || '',
        iconSmall: h.images?.icon_image_small_webp || h.images?.icon_image_small || '',
        minimapIcon: h.images?.minimap_image_webp || h.images?.minimap_image || '',
        abilities,
      };
    })
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
  const curatedClasses = getCuratedCounterClassNames();
  const minTs = Math.floor(Date.now() / 1000) - 30 * 86400;

  // 1. Calibrate real 30-day Weapon vs Spirit soul spend per hero
  console.log('Calibrating 30-day Weapon vs Spirit meta defaults from /v1/analytics/item-stats...');
  await runInBatches(heroes, 8, async (hero) => {
    try {
      const rows = await fetchJson(
        `${ANALYTICS_BASE}/item-stats?hero_id=${hero.id}&min_unix_timestamp=${minTs}`,
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
  });

  // 2. Calibrate bounded empirical counter lifts [0.88..1.15] per enemy hero for curated counter items
  console.log('Calibrating 30-day empirical counter-item lifts per enemy hero...');
  try {
    const globalRows = await fetchJson(
      `${ANALYTICS_BASE}/item-stats?min_unix_timestamp=${minTs}`,
    );
    const gTotal = globalRows.reduce((s, r) => s + r.matches, 0);
    const gAvgWr = gTotal > 0 ? globalRows.reduce((s, r) => s + r.wins, 0) / gTotal : 0.5;
    const gMap = new Map(globalRows.map((r) => [r.item_id, r]));

    await runInBatches(heroes, 6, async (hero) => {
      try {
        const vsRows = await fetchJson(
          `${ANALYTICS_BASE}/item-stats?enemy_hero_ids=${hero.id}&min_unix_timestamp=${minTs}`,
        );
        const hTotal = vsRows.reduce((s, r) => s + r.matches, 0);
        if (hTotal < 2000) return;
        const hAvgWr = vsRows.reduce((s, r) => s + r.wins, 0) / hTotal;

        const lifts = {};
        for (const r of vsRows) {
          const it = itemsById.get(r.item_id);
          if (!it || !curatedClasses.has(it.className) || r.matches < 200) continue;
          const g = gMap.get(r.item_id);
          if (!g || g.matches < 500) continue;

          const gWr = g.wins / g.matches;
          const expectedWr = gWr + (hAvgWr - gAvgWr);
          const priorK = 800;
          const smoothedWr = (r.wins + priorK * expectedWr) / (r.matches + priorK);
          const wrLift = smoothedWr - expectedWr;

          const pickRatio = (r.matches / hTotal) / (g.matches / gTotal);
          const pickLift = Math.log2(Math.max(0.25, Math.min(4, pickRatio)));

          const rawAdj = wrLift * 3.2 + pickLift * 0.055;
          const mult = Math.round(Math.max(0.88, Math.min(1.15, 1 + rawAdj)) * 1000) / 1000;
          if (Math.abs(mult - 1) >= 0.015) {
            lifts[it.className] = mult;
          }
        }
        if (Object.keys(lifts).length > 0) {
          hero.counterLifts = lifts;
        }
      } catch {
        // Ignore transient per-hero analytics error
      }
    });
  } catch (err) {
    console.warn('Skipping empirical counter lift calibration:', err.message);
  }

  const snapshot = {
    syncedAt: new Date().toISOString().slice(0, 10),
    source: API_BASE,
    heroes,
    items,
  };

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
  const calibratedCount = heroes.filter((h) => h.counterLifts).length;
  console.log(
    `Saved ${heroes.length} heroes (${calibratedCount} with counterLifts) and ${items.length} items (EN + DE) to ${OUT_PATH}`,
  );
}

main().catch((err) => {
  console.error('Sync failed:', err);
  process.exit(1);
});
