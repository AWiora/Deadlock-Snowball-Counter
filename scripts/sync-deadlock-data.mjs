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

// API property glyph (file name of `prop.icon`) -> stat icon key the tooltip maps to a wiki icon.
// Keep in sync with src/data/apiClient.ts.
const STAT_ICON_BY_API_GLYPH = {
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

function statIconKey(prop) {
  const glyph = String(prop?.icon ?? '')
    .split('/')
    .pop()
    .replace(/\.(svg|png|webp)$/i, '');
  return STAT_ICON_BY_API_GLYPH[glyph];
}

function formatPropertyValue(prop) {
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

  // Avoid duplicate units such as "20m" + "m" or "-1.5m" + "m/s"
  if (postfix && raw.toLowerCase().endsWith(postfix.toLowerCase())) {
    postfix = '';
  } else if (postfix.toLowerCase().startsWith('m/') && raw.toLowerCase().endsWith('m')) {
    raw = raw.slice(0, -1);
  }

  const spacer = postfix && postfix.length > 2 && !postfix.startsWith('%') ? ' ' : '';
  return `${prefix}${raw}${spacer}${postfix}`.trim();
}

// Ability damage from the game data: css_class gives the type, buffs to the hero
// (provided_property_type, per kill, plain percent bonuses) don't count as damage dealt.
// Keep in sync with src/data/apiClient.ts.
const ABILITY_DAMAGE_TYPE = { tech_damage: 'spirit', bullet_damage: 'weapon', melee_damage: 'melee' };
const MAX_ABILITY_DAMAGE_STATS = 4;

function isDirectDamageProp(key, p) {
  const num = Number.parseFloat(String(p?.value ?? ''));
  if (!ABILITY_DAMAGE_TYPE[p?.css_class] || !num || num < 0) return false;
  if (p.provided_property_type) return false;
  const label = String(p.label || p.postvalue_label || '');
  if (/per\s*kill/i.test(`${key} ${label}`)) return false;
  const postfix = String(p.postfix ?? '').trim();
  if (postfix.startsWith('%') && !/dps/i.test(postfix) && !/as damage|health damage/i.test(label)) {
    return false;
  }
  return true;
}

function isWeaponBuffProp(key, p) {
  const num = Number.parseFloat(String(p?.value ?? ''));
  if (!num || num < 0 || /slow|npc|ally|friendly|per\s*kill/i.test(`${key} ${p.label ?? ''}`)) return false;
  if (p.css_class === 'fire_rate') return true;
  return p.css_class === 'bullet_damage' && Boolean(p.provided_property_type);
}

function extractAbilityDamage(abEn, abDe) {
  const propsEn = abEn?.properties ?? {};
  const propsDe = abDe?.properties ?? {};
  const damage = [];
  let empowersWeapon = false;
  for (const [key, p] of Object.entries(propsEn)) {
    if (isWeaponBuffProp(key, p)) empowersWeapon = true;
    // A melee hit using the hero's own melee damage is listed with value 0: keep it as a typed line
    if (p?.css_class === 'melee_damage' && !Number.parseFloat(String(p.value ?? '0'))) {
      const label = cleanHtml(p.label || p.postvalue_label || '');
      if (label && !damage.some((d) => d.type === 'melee' && !d.value)) {
        const pDe = propsDe[key];
        const labelDe = cleanHtml(pDe?.label || pDe?.postvalue_label || '');
        damage.push({ type: 'melee', value: '', labelEn: label, labelDe: labelDe && !labelDe.startsWith('#') ? labelDe : label });
      }
      continue;
    }
    if (!isDirectDamageProp(key, p)) continue;
    const labelEn = cleanHtml(p.label || p.postvalue_label || '');
    const value = formatPropertyValue(p);
    if (!labelEn || labelEn.startsWith('#') || !value) continue;
    const pDe = propsDe[key];
    const labelDe = cleanHtml(pDe?.label || pDe?.postvalue_label || '') || labelEn;
    const perBullet = /per\s*bullet/i.test(`${key} ${labelEn}`);
    if (perBullet) empowersWeapon = true;
    damage.push({
      type: ABILITY_DAMAGE_TYPE[p.css_class],
      value,
      labelEn,
      labelDe: labelDe.startsWith('#') ? labelEn : labelDe,
      ...(perBullet ? { perBullet: true } : {}),
    });
  }
  return {
    damage: damage.slice(0, MAX_ABILITY_DAMAGE_STATS),
    ...(empowersWeapon ? { empowersWeapon: true } : {}),
  };
}

function extractItemCooldown(it) {
  const cd = it?.properties?.AbilityCooldown;
  if (!cd || cd.value === undefined || cd.value === null) return undefined;
  const num = Number.parseFloat(String(cd.value));
  if (Number.isNaN(num) || num <= 0) return undefined;
  return `${Number.isInteger(num) ? num : String(cd.value)}s`;
}

function extractItemTooltip(it) {
  if (!it) return undefined;
  const props = it.properties ?? {};
  const itemCd = extractItemCooldown(it);
  const sections = [];

  for (const sec of it.tooltip_sections ?? []) {
    const rawType = String(sec.section_type || '').toLowerCase();
    const type =
      rawType === 'active' ? 'active' : rawType === 'passive' ? 'passive' : 'innate';
    const descParts = [];
    const stats = [];
    const seenKeys = new Set();
    let sectionCooldown;

    const addProp = (key, flags) => {
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

  // Ensure an active/passive item without explicit cooldown section still exposes cooldown
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

function extractItemSummary(it) {
  const direct = cleanHtml(
    it.description?.active || it.description?.passive || it.description?.desc || '',
  );
  if (direct) return direct.slice(0, 220);

  const sectionTexts = [];
  for (const sec of it.tooltip_sections ?? []) {
    for (const attr of sec.section_attributes ?? []) {
      if (attr?.loc_string && !attr.loc_string.startsWith('#')) {
        const cleaned = cleanHtml(attr.loc_string);
        if (cleaned) sectionTexts.push(cleaned);
      }
    }
  }
  return sectionTexts.join(' ').slice(0, 220);
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
    .filter((h) => !h.disabled && h.player_selectable !== false)
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
          ...extractAbilityDamage(abEn, abDe),
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
    .map((it) => {
      const itDe = deItemByClass.get(it.class_name);
      const cooldown = extractItemCooldown(it);
      const tooltipEn = extractItemTooltip(it);
      const tooltipDe = extractItemTooltip(itDe) || tooltipEn;
      return {
        id: it.id,
        className: it.class_name,
        name: it.name,
        nameDe: itDe?.name || it.name,
        slot: it.item_slot_type,
        tier: it.item_tier,
        cost: it.cost,
        isActive: Boolean(it.is_active_item),
        icon: it.shop_image_webp || it.shop_image || it.image_webp || it.image || '',
        summary: extractItemSummary(it),
        ...(cooldown ? { cooldown } : {}),
        ...(tooltipEn ? { tooltipEn } : {}),
        ...(tooltipDe ? { tooltipDe } : {}),
      };
    })
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

export { extractItemTooltip, extractAbilityDamage };

// Run the sync only when called as a script, so helpers can be imported on their own
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error('Sync failed:', err);
    process.exit(1);
  });
}
