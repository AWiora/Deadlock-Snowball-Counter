import type { CounterItemRule, HeroCounterOverride } from '../types/deadlock';

/**
 * Curated mechanical counter catalog mapped to exact Deadlock item class_names.
 * Every item here is verified against the live Deadlock Curiosity Shop (800 / 1600 / 3200 / 6400).
 */
export const COUNTER_ITEM_RULES: CounterItemRule[] = [
  // ===================== TIER 1 (800 SOULS) — LANE COUNTERS =====================
  {
    className: 'upgrade_withering_whip', // Rusted Barrel
    stance: 'offense',
    role: 'Anti-Gun',
    stageFit: { lane: 1.0, mid: 0.42, late: 0.08 },
    damageCounters: { bullet: 24, equal: 12 },
    threatCounters: { rapid_fire: 18, on_hit_procs: 14, bullet_ult: 10 },
    why: 'Cuts enemy Fire Rate & Bullet Resist for just 800 souls — ruins early gun trades and builds into Disarming Hex.',
    whenToUse: 'Cast on them right as a lane trade starts so they cannot stack gun procs.',
  },
  {
    className: 'upgrade_melee_rebuttal', // Rebuttal
    stance: 'defense',
    role: 'Anti-Melee',
    stageFit: { lane: 1.0, mid: 0.72, late: 0.25 },
    modifierCounters: { melee: 34 },
    threatCounters: { melee_brawler: 24, close_range_dive: 6 },
    why: 'Turns every successful parry into a full punish: heals you, reflects the melee damage, and boosts your damage.',
    whenToUse: 'Hold parry when they wind up heavy melee in lane or right after a charge/dash.',
  },
  {
    className: 'upgrade_grit', // Grit
    stance: 'defense',
    role: 'Survival',
    stageFit: { lane: 0.92, mid: 0.28, late: 0.05 },
    damageCounters: { bullet: 10, spirit: 10, equal: 14 },
    threatCounters: { telegraphed_burst: 14, close_range_dive: 10 },
    why: 'Cheap 800-soul on-demand barrier that absorbs heavy lane all-in burst before you can afford T2 shields.',
    whenToUse: 'Pop right before their combo or dive hits to win the lane trade.',
  },
  {
    className: 'upgrade_health_stimpak', // Healing Rite
    stance: 'defense',
    role: 'Survival',
    stageFit: { lane: 0.96, mid: 0.22, late: 0.05 },
    damageCounters: { spirit: 12, equal: 12, bullet: 10 },
    threatCounters: { long_range_poke: 16, ability_spam: 12, sustained_spirit: 8 },
    why: 'Best 800-soul lane stabilizer against oppressive poke so you stay in lane and keep farming souls.',
    whenToUse: 'Step behind cover for a few seconds and cast so enemy chip damage does not cancel the regen.',
  },
  {
    className: 'upgrade_medic_bullets', // Restorative Shot
    stance: 'defense',
    role: 'Survival',
    stageFit: { lane: 0.95, mid: 0.25, late: 0.05 },
    damageCounters: { bullet: 10, spirit: 10, equal: 12 },
    threatCounters: { long_range_poke: 12, ability_spam: 10 },
    playerSynergy: { preferDamageStyle: 'gun' },
    why: 'Reliable in-combat lane sustain that heals off hero pokes without needing to back off the wave.',
    whenToUse: 'Proc on the enemy hero whenever off cooldown for maximum healing value.',
  },
  {
    className: 'upgrade_endurance', // Extra Regen
    stance: 'defense',
    role: 'Survival',
    stageFit: { lane: 0.92, mid: 0.18, late: 0.04 },
    damageCounters: { spirit: 10, bullet: 10, equal: 12 },
    threatCounters: { long_range_poke: 14, ability_spam: 10, sustained_spirit: 10 },
    why: 'Passive, uninterruptible lane sustain against constant chip damage when you cannot hide for Healing Rite.',
    whenToUse: 'Passive — lets you stay healthy through nonstop lane harassment.',
  },
  {
    className: 'upgrade_improved_stamina', // Extra Stamina
    stance: 'defense',
    role: 'Survival',
    stageFit: { lane: 0.96, mid: 0.35, late: 0.1 },
    modifierCounters: { cc: 18, melee: 18 },
    threatCounters: { close_range_dive: 20, hard_cc: 18, telegraphed_burst: 16, melee_brawler: 16 },
    why: 'Extra dash charge for 800 souls — lets you dodge telegraphed hooks, cages, heavy melees, and early dive combos.',
    whenToUse: 'Passive — keep a spare dash ready to sidestep their engage or escape out of zone abilities.',
  },
  {
    className: 'upgrade_mystic_regeneration', // Mystic Regeneration
    stance: 'defense',
    role: 'Survival',
    stageFit: { lane: 0.95, mid: 0.25, late: 0.05 },
    damageCounters: { spirit: 12, bullet: 10, equal: 12 },
    threatCounters: { long_range_poke: 14, ability_spam: 12, sustained_spirit: 10 },
    playerSynergy: { preferDamageStyle: 'spirit', preferSpiritProccer: true, penalizeNonSpiritProccer: true },
    why: 'Reliable in-combat lane sustain for spirit heroes — heals you whenever your abilities tag enemy heroes.',
    whenToUse: 'Passive — poke enemies with abilities during trades to keep the bonus regen rolling.',
  },
  {
    className: 'upgrade_headshot_booster', // Headshot Booster
    stance: 'offense',
    role: 'Burst',
    stageFit: { lane: 0.94, mid: 0.25, late: 0.04 },
    threatCounters: { fragile_glass_cannon: 28, long_range_poke: 12, airborne: 10 },
    playerSynergy: { preferDamageStyle: 'gun' },
    why: 'Cheap 800-soul headshot burst that chunks fragile low-HP laners and forces them off the wave.',
    whenToUse: 'Passive — look for quick headshot pokes whenever the cooldown is up to punish low-HP targets.',
  },
  {
    className: 'upgrade_magic_burst', // Mystic Burst
    stance: 'offense',
    role: 'Burst',
    stageFit: { lane: 0.94, mid: 0.25, late: 0.04 },
    threatCounters: { fragile_glass_cannon: 28, close_range_dive: 10 },
    playerSynergy: { preferDamageStyle: 'spirit', preferSpiritProccer: true, penalizeNonSpiritProccer: true },
    why: 'Adds instant bonus spirit burst for 800 souls to punish fragile laners — upgrades later into Tankbuster.',
    whenToUse: 'Passive — weave your main damage ability onto low-HP enemies whenever Mystic Burst is charged.',
  },
  {
    className: 'upgrade_close_range', // Close Quarters
    stance: 'offense',
    role: 'Burst',
    stageFit: { lane: 0.92, mid: 0.25, late: 0.04 },
    modifierCounters: { melee: 16 },
    threatCounters: { close_range_dive: 24, melee_brawler: 20 },
    playerSynergy: { preferDamageStyle: 'gun', preferRange: 'close', penalizeLongRange: true },
    why: 'Punishes aggressive melee brawlers and close-range divers with heavy bonus gun damage whenever they step into your face.',
    whenToUse: 'Passive — hold your ground and punish them with close-range shots as soon as they dive in.',
  },

  // ===================== TIER 2 (1600 SOULS) — LANE TO MID COUNTERS =====================
  {
    className: 'upgrade_weapon_shielding', // Weapon Shielding
    stance: 'defense',
    role: 'Anti-Gun',
    stageFit: { lane: 1.0, mid: 0.68, late: 0.15 },
    damageCounters: { bullet: 26, equal: 14 },
    threatCounters: { rapid_fire: 14, long_range_poke: 10, bullet_ult: 8 },
    why: 'Automatically triggers a strong barrier whenever you take sustained bullet damage in lane or skirmishes.',
    whenToUse: 'Passive — take short trades while the barrier is ready, then reset its cooldown.',
  },
  {
    className: 'upgrade_spirit_bubble', // Spirit Shielding
    stance: 'defense',
    role: 'Anti-Spirit',
    stageFit: { lane: 1.0, mid: 0.72, late: 0.18 },
    damageCounters: { spirit: 28, equal: 15 },
    threatCounters: { telegraphed_burst: 14, ability_spam: 14, sustained_spirit: 12 },
    why: 'Procs a hefty protective barrier the moment heavy spirit burst lands — #1 early anti-spirit lane stabilizer.',
    whenToUse: 'Passive — absorbs their poke/combo burst so you cannot be forced out of lane.',
  },
  {
    className: 'upgrade_regenerating_bullet_shield', // Battle Vest
    stance: 'defense',
    role: 'Anti-Gun',
    stageFit: { lane: 0.92, mid: 0.62, late: 0.14 },
    damageCounters: { bullet: 20, equal: 10 },
    threatCounters: { rapid_fire: 10 },
    playerSynergy: { preferDamageStyle: 'gun' },
    why: 'Combines early Bullet Resist with bonus weapon damage & fire rate so gun heroes can trade back hard.',
    whenToUse: 'Passive — keep yourself above 65% HP to hold the offensive bonus while shrugging off bullets.',
  },
  {
    className: 'upgrade_magic_shield', // Enchanter's Emblem
    stance: 'defense',
    role: 'Anti-Spirit',
    stageFit: { lane: 0.92, mid: 0.62, late: 0.14 },
    damageCounters: { spirit: 20, equal: 10 },
    threatCounters: { ability_spam: 10, sustained_spirit: 8 },
    playerSynergy: { preferDamageStyle: 'spirit', preferSpiritProccer: true },
    why: 'Gives early Spirit Resist plus Spirit Power & Cooldown Reduction — defensive stats without slowing your scaling.',
    whenToUse: 'Passive — ideal defensive tempo buy for spirit heroes trading into heavy ability damage.',
  },
  {
    className: 'upgrade_return_fire', // Return Fire
    stance: 'defense',
    role: 'Anti-Gun',
    stageFit: { lane: 0.94, mid: 0.92, late: 0.42 },
    damageCounters: { bullet: 24, equal: 14 },
    threatCounters: { rapid_fire: 22, bullet_ult: 22, close_range_dive: 12, on_hit_procs: 10 },
    playerSynergy: {
      preferRange: 'close',
      penalizeLongRange: true,
      avoidHeroClasses: ['hero_ghost'], // Anti-synergy with Lady Geist's Soul Exchange HP-swap
    },
    why: 'Reflects incoming bullet (65%) and spirit (25%) damage back at rapid-fire carries, forcing them to stop shooting or shred themselves (does not reflect melee).',
    whenToUse: 'Pop immediately when they commit to spraying you or channel a bullet ultimate.',
  },
  {
    className: 'upgrade_vex_barrier', // Reactive Barrier
    stance: 'defense',
    role: 'Survival',
    stageFit: { lane: 1.0, mid: 0.78, late: 0.24 },
    modifierCounters: { cc: 30 },
    threatCounters: { hard_cc: 24, close_range_dive: 8 },
    why: 'Automatically pops a massive barrier the instant you get stunned, hooked, rooted, slept, or silenced.',
    whenToUse: 'Passive — stops early CC combos (hooks, charges, cages, sleeps) from one-shotting you.',
  },
  {
    className: 'upgrade_debuff_reducer', // Debuff Reducer
    stance: 'defense',
    role: 'Cleanse',
    stageFit: { lane: 0.95, mid: 0.72, late: 0.2 },
    modifierCounters: { cc: 24 },
    threatCounters: { cleanseable_debuff: 20, hard_cc: 16, sustained_spirit: 8 },
    why: 'Passively slashes the duration of stuns, hexes, bleeds, burns, and slows by 25% — upgrades into Unstoppable or Spellbreaker.',
    whenToUse: 'Passive — buy early when DoTs or crowd control keep locking you down.',
  },
  {
    className: 'upgrade_healbane', // Healbane
    stance: 'offense',
    role: 'Anti-Heal',
    stageFit: { lane: 1.0, mid: 0.86, late: 0.38 },
    modifierCounters: { healing: 32 },
    threatCounters: { heavy_healing: 24 },
    playerSynergy: { preferSpiritProccer: true, penalizeNonSpiritProccer: true },
    why: 'Cheapest passive anti-heal in the game (1600 souls) — every tick of your spirit damage cuts their healing & rewards kills with a big heal.',
    whenToUse: 'Passive — tag them with any ability before they pop their heal or lifesteal.',
  },
  {
    className: 'upgrade_restorative_locket', // Restorative Locket
    stance: 'defense',
    role: 'Survival',
    stageFit: { lane: 0.98, mid: 0.65, late: 0.16 },
    damageCounters: { spirit: 16, equal: 12 },
    threatCounters: { ability_spam: 24, sustained_spirit: 10 },
    why: 'Builds free healing & stamina charges every time ability-spamming enemies cast near you in lane.',
    whenToUse: 'Activate when stacked up to bait out their burst and swing the fight with instant HP + stamina.',
  },
  {
    className: 'upgrade_containment', // Slowing Hex
    stance: 'offense',
    role: 'Control',
    stageFit: { lane: 0.96, mid: 0.9, late: 0.42 },
    modifierCounters: { mobility: 34 },
    threatCounters: { high_mobility: 28, fragile_glass_cannon: 18, airborne: 16, close_range_dive: 14 },
    why: 'Silences movement abilities & items while cutting dash distance (-26%) for 1600 souls — traps mobile divers and upgrades into Vortex Web.',
    whenToUse: 'Cast right before they try to grapple, blink, or cast an escape ability (note: does not lock out stamina dashes).',
    contextTips: {
      mobility: 'Silences movement items (Warp Stone, Leap) & escape abilities while cutting dash distance for 1600 souls.',
    },
  },
  {
    className: 'upgrade_suppressor', // Suppressor
    stance: 'offense',
    role: 'Anti-Gun',
    stageFit: { lane: 0.95, mid: 0.78, late: 0.25 },
    damageCounters: { bullet: 22, equal: 12 },
    threatCounters: { rapid_fire: 22, on_hit_procs: 16 },
    playerSynergy: { preferSpiritProccer: true, penalizeNonSpiritProccer: true },
    why: 'Passively cripples enemy Fire Rate whenever your abilities deal spirit damage — ruins gun carries without using an active slot.',
    whenToUse: 'Passive — keep tagging the enemy gun carry with your abilities in fights.',
  },
  {
    className: 'upgrade_spirit_sap', // Spirit Sap
    stance: 'offense',
    role: 'Anti-Spirit',
    stageFit: { lane: 0.96, mid: 0.78, late: 0.28 },
    damageCounters: { spirit: 24, equal: 12 },
    modifierCounters: { tanky: 10 },
    threatCounters: { ability_spam: 14, sustained_spirit: 14, telegraphed_burst: 12 },
    why: 'Directly strips enemy Spirit Power and Spirit Resist — weakens spirit bullies while letting your team blow them up.',
    whenToUse: 'Tag the fed spirit enemy at the start of a skirmish before they unload their combo.',
  },
  {
    className: 'upgrade_magic_slow', // Mystic Slow
    stance: 'offense',
    role: 'Control',
    stageFit: { lane: 0.85, mid: 0.72, late: 0.26 },
    threatCounters: { high_mobility: 18, close_range_dive: 16, melee_brawler: 14 },
    modifierCounters: { melee: 12, mobility: 18 },
    playerSynergy: { preferSpiritProccer: true, penalizeNonSpiritProccer: true },
    why: 'Applies persistent movement slow off your spirit damage so close-range brawlers struggle to stick to you.',
    whenToUse: 'Passive — poke them with abilities as they try to close distance.',
  },
  {
    className: 'upgrade_slowing_bullets', // Slowing Bullets
    stance: 'offense',
    role: 'Control',
    stageFit: { lane: 0.84, mid: 0.65, late: 0.2 },
    threatCounters: { high_mobility: 16, close_range_dive: 14, melee_brawler: 12 },
    modifierCounters: { melee: 10, mobility: 18 },
    playerSynergy: { preferDamageStyle: 'gun', preferFastFirerate: true, penalizeSlowFirerate: true },
    why: 'Lets rapid-fire gun heroes kite melee divers and slow slippery targets without spending an active slot.',
    whenToUse: 'Passive — keep firing while backpedaling to deny their gap-close.',
  },
  {
    className: 'upgrade_headshot_booster2', // Weakening Headshot
    stance: 'offense',
    role: 'Shred',
    stageFit: { lane: 0.88, mid: 0.72, late: 0.25 },
    modifierCounters: { tanky: 22 },
    playerSynergy: { preferDamageStyle: 'gun' },
    why: 'Cheaply strips Bullet Resist off tanky frontliners whenever you land headshots.',
    whenToUse: 'Passive — focus headshots to open up tanky enemies for your team.',
  },
  {
    className: 'upgrade_magic_vulnerability', // Mystic Vulnerability
    stance: 'offense',
    role: 'Shred',
    stageFit: { lane: 0.86, mid: 0.72, late: 0.24 },
    modifierCounters: { tanky: 22 },
    playerSynergy: { preferDamageStyle: 'spirit', preferSpiritProccer: true, penalizeNonSpiritProccer: true },
    why: 'Reduces enemy Spirit Resist on ability hits — cheap way for spirit heroes to punch through tanky builds.',
    whenToUse: 'Passive — lead with a quick poke ability before your main damage spell.',
  },
  {
    className: 'upgrade_cardio_calibrator', // Enduring Speed
    stance: 'defense',
    role: 'Survival',
    stageFit: { lane: 0.84, mid: 0.72, late: 0.28 },
    modifierCounters: { cc: 12, melee: 12 },
    threatCounters: { sustained_spirit: 10, close_range_dive: 14, melee_brawler: 12 },
    why: 'Grants strong Slow Resistance and speed so heavy slowers and melee chasers cannot run you down.',
    whenToUse: 'Passive — keeps your kiting mobility intact through heavy movement slows.',
  },
  {
    className: 'upgrade_guardian_ward', // Guardian Ward
    stance: 'defense',
    role: 'Survival',
    stageFit: { lane: 0.9, mid: 0.65, late: 0.16 },
    damageCounters: { bullet: 12, spirit: 12, equal: 16 },
    threatCounters: { telegraphed_burst: 14, close_range_dive: 12 },
    playerSynergy: { preferSupportive: true },
    why: 'On-demand barrier + move speed burst (half cooldown when cast on an ally) that saves lane trades.',
    whenToUse: 'Pop right before enemy burst hits you or your lane partner.',
  },

  // ===================== TIER 3 (3200 SOULS) — MID-GAME CORE COUNTERS =====================
  {
    className: 'upgrade_metal_skin', // Metal Skin
    stance: 'defense',
    role: 'Anti-Gun',
    stageFit: { lane: 0.18, mid: 1.0, late: 0.9 },
    damageCounters: { bullet: 34, equal: 14 },
    threatCounters: { bullet_ult: 34, rapid_fire: 26, on_hit_procs: 18, close_range_dive: 10 },
    why: 'Complete immunity to ALL bullet damage — the premier active hard-counter to gun hyper-carries and bullet ults.',
    whenToUse: 'Pop the moment they commit their gun steroid/ult and either burst them back or reposition.',
  },
  {
    className: 'upgrade_greater_withering_whip', // Disarming Hex
    stance: 'offense',
    role: 'Shutdown',
    stageFit: { lane: 0.15, mid: 1.0, late: 0.84 },
    damageCounters: { bullet: 32, equal: 16 },
    threatCounters: { rapid_fire: 28, on_hit_procs: 22, bullet_ult: 18, close_range_dive: 12 },
    why: 'Completely disarms the enemy carry AND shreds their Bullet Resist — shuts down gun threats while your team melts them (does not stop melee).',
    whenToUse: 'Point-and-click as soon as they engage (bait out their Dispel Magic/Unstoppable if late game).',
  },
  {
    className: 'upgrade_target_stun', // Knockdown
    stance: 'offense',
    role: 'Shutdown',
    stageFit: { lane: 0.16, mid: 1.0, late: 0.88 },
    damageCounters: { bullet: 10, spirit: 10, equal: 10 },
    modifierCounters: { mobility: 22 },
    threatCounters: { airborne: 44, channeled_ult: 44, high_mobility: 14, long_range_poke: 10 },
    why: 'Long-range point-and-click stun that slams flying heroes out of the sky and cleanly cancels channeled ultimates.',
    whenToUse: 'Cast immediately when they take flight or begin channeling their ultimate.',
  },
  {
    className: 'upgrade_reduce_debuff_duration', // Dispel Magic
    stance: 'defense',
    role: 'Cleanse',
    stageFit: { lane: 0.15, mid: 1.0, late: 0.9 },
    modifierCounters: { cc: 14 },
    threatCounters: { cleanseable_debuff: 34, hard_cc: 8 },
    playerSynergy: { redundantWithTool: 'cleanse' },
    why: 'Instantly purges non-ultimate debuffs (bombs, bleeds, burns, marks, roots, silences), healing you and giving a speed burst.',
    whenToUse: 'Press right after they stick a non-ultimate bomb, mark, burn, root, or delayed stun onto you (cannot be pressed while stunned/slept/hexed).',
    contextTips: {
      cc: 'Instantly purges non-ultimate roots, silences, slows, and delayed stuns on demand with a heal + speed burst.',
    },
  },
  {
    className: 'upgrade_counterspell', // Counterspell
    stance: 'defense',
    role: 'Anti-Spirit',
    stageFit: { lane: 0.14, mid: 1.0, late: 0.88 },
    damageCounters: { spirit: 24, equal: 16 },
    modifierCounters: { cc: 18, melee: 12 },
    threatCounters: { telegraphed_burst: 34, hard_cc: 22, ability_spam: 12 },
    why: 'Turns your Parry into a full spell-negation shield (no active slot needed!) — blocks telegraphed ults & burst and heals you.',
    whenToUse: 'Tap Parry right before their telegraphed ult, bomb detonation, hook, or dive slam connects.',
    contextTips: {
      cc: 'Spell-parry negates incoming hooks, cages, lassos, and stun combos without spending an active slot.',
      melee: 'Turns your Parry into a double threat: punishes melee swings AND blocks ability follow-ups.',
    },
  },
  {
    className: 'upgrade_targeted_silence', // Silence Wave
    stance: 'offense',
    role: 'Shutdown',
    stageFit: { lane: 0.15, mid: 1.0, late: 0.78 },
    damageCounters: { spirit: 24, equal: 14 },
    modifierCounters: { mobility: 26 },
    threatCounters: { high_mobility: 24, fragile_glass_cannon: 22, ability_spam: 24, telegraphed_burst: 20, close_range_dive: 16, heavy_healing: 12 },
    why: 'Wide AoE silence projectile that stops fragile divers and slippery casters from escaping, healing, or casting combos.',
    whenToUse: 'Fire at them as they dive in — note that Silence prevents casts but does not cancel already-channeled ults.',
    contextTips: {
      mobility: 'Silences escape abilities mid-fight so slippery targets cannot blink or dash out.',
    },
  },
  {
    className: 'upgrade_rupture', // Decay
    stance: 'offense',
    role: 'Anti-Heal',
    stageFit: { lane: 0.16, mid: 1.0, late: 0.86 },
    modifierCounters: { healing: 32, tanky: 28 },
    threatCounters: { heavy_healing: 26 },
    why: 'Point-and-click % current-HP bleed + heavy healing reduction — melts high-HP drain tanks regardless of your hero kit.',
    whenToUse: 'Cast early in the fight while they are high HP to get maximum % health shred and cut their healing.',
    contextTips: {
      tanky: 'Shreds stacked Max-HP pools via % current-health bleed while stopping their sustain.',
      healing: 'Cuts their heavy healing & lifesteal on demand while ticking down their HP bar.',
    },
  },
  {
    className: 'upgrade_toxic_bullets', // Toxic Bullets
    stance: 'offense',
    role: 'Anti-Heal',
    stageFit: { lane: 0.15, mid: 1.0, late: 0.86 },
    modifierCounters: { healing: 32, tanky: 26 },
    threatCounters: { heavy_healing: 24 },
    playerSynergy: { preferDamageStyle: 'gun', preferFastFirerate: true, penalizeSlowFirerate: true },
    why: 'Passive % Max-HP bleed + anti-heal applied right from your bullets — top mid/late counter to tanky healers for gun heroes.',
    whenToUse: 'Passive — sustain gunfire on the tank/healer to keep the bleed & healing cut refreshing.',
    contextTips: {
      tanky: 'Passively shreds stacked Max HP with % health bleed right from your gunfire.',
      healing: 'Keeps permanent anti-heal applied via bullets so lifesteal & regen builds collapse.',
    },
  },
  {
    className: 'upgrade_magic_shock', // Tankbuster
    stance: 'offense',
    role: 'Shred',
    stageFit: { lane: 0.15, mid: 1.0, late: 0.84 },
    modifierCounters: { tanky: 34 },
    threatCounters: { buff_shield_stacker: 10 },
    playerSynergy: { preferDamageStyle: 'spirit', preferSpiritProccer: true, penalizeNonSpiritProccer: true },
    why: 'Chunks high-HP frontliners with bonus spirit damage that completely ignores Spirit Resistance.',
    whenToUse: 'Passive — land your heavy-hitting abilities (>165 dmg) whenever the Tankbuster charge is ready.',
  },
  {
    className: 'upgrade_improved_bullet_armor', // Bullet Resilience
    stance: 'defense',
    role: 'Anti-Gun',
    stageFit: { lane: 0.15, mid: 0.96, late: 0.72 },
    damageCounters: { bullet: 30, equal: 14 },
    threatCounters: { rapid_fire: 14, long_range_poke: 12, bullet_ult: 12 },
    why: 'Reliable passive Bullet Resist that ramps even higher below 50% HP — zero active slot needed.',
    whenToUse: 'Passive — consistent damage mitigation when you want dependable survival against heavy gun pressure.',
  },
  {
    className: 'upgrade_tech_purge', // Spirit Resilience
    stance: 'defense',
    role: 'Anti-Spirit',
    stageFit: { lane: 0.15, mid: 0.98, late: 0.74 },
    damageCounters: { spirit: 32, equal: 16 },
    threatCounters: { sustained_spirit: 22, ability_spam: 18, telegraphed_burst: 14 },
    why: 'Strong passive Spirit Resist that spikes below 50% HP — the backbone defensive item against sustained spirit damage.',
    whenToUse: 'Passive — keeps you alive through heavy spirit DoTs and teamfight AoE without using an active slot.',
  },
  {
    className: 'upgrade_warp_stone', // Warp Stone
    stance: 'defense',
    role: 'Survival',
    stageFit: { lane: 0.14, mid: 0.96, late: 0.82 },
    damageCounters: { bullet: 18, equal: 12 },
    modifierCounters: { melee: 18, cc: 10 },
    threatCounters: { close_range_dive: 24, melee_brawler: 20, channeled_ult: 14, hard_cc: 12 },
    playerSynergy: { preferRange: 'long', redundantWithTool: 'mobility_escape' },
    why: 'Instant blink escape + bonus Bullet Resist — breaks close-range dives, escapes cages/ults, and repositions safely.',
    whenToUse: 'Blink out of their engage radius, ult zone, or melee range as soon as they jump on you.',
    contextTips: {
      melee: 'Instantly blinks out of heavy-melee range so close-range brawlers whiff their engage.',
      cc: 'Escapes telegraphed cages, zones, and follow-up CC chains before they lock you down.',
    },
  },
  {
    className: 'upgrade_bullet_armor_reduction_aura', // Hunter's Aura
    stance: 'offense',
    role: 'Anti-Gun',
    stageFit: { lane: 0.14, mid: 0.92, late: 0.72 },
    damageCounters: { bullet: 20, equal: 12 },
    modifierCounters: { tanky: 22 },
    threatCounters: { rapid_fire: 16, close_range_dive: 18, melee_brawler: 12 },
    playerSynergy: { preferDamageStyle: 'gun', preferRange: 'close', penalizeLongRange: true },
    why: 'Passive aura shredding nearby enemy Bullet Resist & Fire Rate (doubled in 1v1s) — massive for close-range duelists.',
    whenToUse: 'Passive — stay inside close range during duels to double both the armor shred and fire-rate slow.',
  },
  {
    className: 'upgrade_reinforcing_casings', // Escalating Resilience
    stance: 'defense',
    role: 'Anti-Gun',
    stageFit: { lane: 0.14, mid: 0.94, late: 0.76 },
    damageCounters: { bullet: 26, equal: 12 },
    threatCounters: { rapid_fire: 16, close_range_dive: 12 },
    playerSynergy: { preferDamageStyle: 'gun', preferFastFirerate: true, penalizeSlowFirerate: true },
    why: 'Stacks huge passive Bullet Resist as you land shots — ideal for rapid-fire gun heroes trading directly into enemy gun carries.',
    whenToUse: 'Passive — keep landing shots in skirmishes to ramp your Bullet Resist to cap.',
  },

  // ===================== TIER 4 (6400 SOULS) — LATE-GAME HARD COUNTERS =====================
  {
    className: 'upgrade_deflecting_armor', // Plated Armor
    stance: 'defense',
    role: 'Anti-Gun',
    stageFit: { lane: 0.02, mid: 0.32, late: 1.0 },
    damageCounters: { bullet: 36, equal: 16 },
    threatCounters: { on_hit_procs: 36, rapid_fire: 34, bullet_ult: 28 },
    why: 'Best passive anti-gun item in Deadlock: deflects incoming bullets AND blocks on-hit stacks (Fixation, Afterburn, Djinn\'s Mark).',
    whenToUse: 'Passive — completely neutralizes late-game rapid-fire & on-hit carries without taking an active slot.',
  },
  {
    className: 'upgrade_juggernaut', // Juggernaut
    stance: 'defense',
    role: 'Anti-Gun',
    stageFit: { lane: 0.02, mid: 0.28, late: 1.0 },
    damageCounters: { bullet: 32, equal: 14 },
    modifierCounters: { melee: 18, cc: 10 },
    threatCounters: { rapid_fire: 32, bullet_ult: 20, melee_brawler: 18, close_range_dive: 14 },
    why: 'Passive frontline armor (upgrades from Enduring Speed) that cuts attacker Fire Rate by 40% while granting +25% Melee Resist and +50% Slow Resist.',
    whenToUse: 'Passive — stand your ground in teamfights so gun carries focusing you lose massive DPS while melee and slows bounce off.',
  },
  {
    className: 'upgrade_spellbreaker', // Spellbreaker
    stance: 'defense',
    role: 'Anti-Spirit',
    stageFit: { lane: 0.02, mid: 0.3, late: 1.0 },
    damageCounters: { spirit: 36, equal: 18 },
    modifierCounters: { cc: 16 },
    threatCounters: {
      telegraphed_burst: 36,
      ability_spam: 18,
      long_range_poke: 16,
      hard_cc: 12,
      cleanseable_debuff: 10,
    },
    why: 'Slashes the next big spirit nuke (>175 dmg) by 65% AND grants +25% Debuff Resist (upgrades from Debuff Reducer) — #1 passive anti-burst item.',
    whenToUse: 'Passive — absorbs their biggest spell hit while passively shortening incoming CC and DoTs.',
  },
  {
    className: 'upgrade_absorbing_armor', // Witchmail
    stance: 'defense',
    role: 'Anti-Spirit',
    stageFit: { lane: 0.02, mid: 0.26, late: 0.96 },
    damageCounters: { spirit: 30, equal: 14 },
    threatCounters: { sustained_spirit: 28, ability_spam: 26 },
    playerSynergy: { preferDamageStyle: 'spirit', preferSpiritProccer: true },
    why: 'Turns enemy heavy spirit damage against them by refreshing your ability cooldowns while giving strong Spirit Resist.',
    whenToUse: 'Passive — lets ability-reliant heroes out-tempo sustained spirit spam in late teamfights.',
  },
  {
    className: 'upgrade_glitch', // Cursed Relic
    stance: 'offense',
    role: 'Shutdown',
    stageFit: { lane: 0.02, mid: 0.26, late: 1.0 },
    damageCounters: { bullet: 18, spirit: 18, equal: 22 },
    modifierCounters: { healing: 16, cc: 12, mobility: 24 },
    threatCounters: {
      channeled_ult: 30,
      high_mobility: 28,
      buff_shield_stacker: 28,
      bullet_ult: 24,
      heavy_healing: 18,
      close_range_dive: 20,
    },
    why: 'Ultimate shutdown active: interrupts, silences, disarms, blocks items, AND strips non-ultimate buffs off a hyper-fed carry.',
    whenToUse: 'Point-and-click the snowballed carry the instant they dive or channel — they cannot press Unstoppable or escape.',
  },
  {
    className: 'upgrade_unstoppable', // Unstoppable
    stance: 'defense',
    role: 'Cleanse',
    stageFit: { lane: 0.02, mid: 0.26, late: 1.0 },
    modifierCounters: { cc: 36 },
    threatCounters: { hard_cc: 34, cleanseable_debuff: 20 },
    why: 'Full immunity to Stun, Silence, Sleep, Root, and Disarm — lets you walk through heavy CC chains freely.',
    whenToUse: 'Pop proactively right BEFORE diving or channeling (cannot be pressed while already stunned/slept).',
  },
  {
    className: 'upgrade_auto_cleanse', // Indomitable
    stance: 'defense',
    role: 'Cleanse',
    stageFit: { lane: 0.02, mid: 0.26, late: 1.0 },
    modifierCounters: { cc: 34 },
    threatCounters: { hard_cc: 32, cleanseable_debuff: 18 },
    why: 'Passive auto-cleanse + combat barrier on the next Stun, Chain, Root, Sleep, Silence, or Fear — huge when active slots are full.',
    whenToUse: 'Passive — automatically breaks surprise pick-CC (Lasso, Hook, Sleep, Combo) without needing reaction time.',
  },
  {
    className: 'upgrade_self_bubble', // Ethereal Shift
    stance: 'defense',
    role: 'Survival',
    stageFit: { lane: 0.02, mid: 0.26, late: 0.98 },
    damageCounters: { spirit: 22, bullet: 18, equal: 22 },
    modifierCounters: { cc: 16 },
    threatCounters: { telegraphed_burst: 32, bullet_ult: 24, channeled_ult: 20, close_range_dive: 18 },
    playerSynergy: { preferDamageStyle: 'spirit', redundantWithTool: 'invuln' },
    why: 'Instant invulnerability void-state that completely blanks telegraphed ultimates, delayed detonations, and dive combos.',
    whenToUse: 'Pop right before lethal burst/ult hits while your cooldowns come back up.',
  },
  {
    className: 'upgrade_inhibitor', // Inhibitor
    stance: 'offense',
    role: 'Shutdown',
    stageFit: { lane: 0.02, mid: 0.26, late: 1.0 },
    damageCounters: { bullet: 22, spirit: 20, equal: 28 },
    modifierCounters: { healing: 24, tanky: 12 },
    threatCounters: { close_range_dive: 18, heavy_healing: 18, rapid_fire: 14 },
    playerSynergy: { preferDamageStyle: 'gun', preferFastFirerate: true, penalizeSlowFirerate: true },
    why: 'Bullets cut a fed carry\'s total outgoing damage (-30%, both bullet & spirit) AND healing (-40%) — shuts down snowballed raid-bosses passively.',
    whenToUse: 'Passive — prioritize tagging the fed enemy carry early in every fight to gut their DPS and sustain.',
  },
  {
    className: 'upgrade_spirit_burn', // Spirit Burn
    stance: 'offense',
    role: 'Anti-Heal',
    stageFit: { lane: 0.02, mid: 0.26, late: 1.0 },
    modifierCounters: { healing: 34, tanky: 20 },
    threatCounters: { heavy_healing: 28 },
    playerSynergy: { preferDamageStyle: 'spirit', preferSpiritProccer: true, penalizeNonSpiritProccer: true },
    why: 'Triggers an explosive burn that heavily cuts enemy healing while chunking high-sustain frontliners.',
    whenToUse: 'Passive — dump your spirit combo to trigger the burn right before they try to heal back up.',
  },
  {
    className: 'upgrade_banshee_slugs', // Crippling Headshot
    stance: 'offense',
    role: 'Shred',
    stageFit: { lane: 0.02, mid: 0.26, late: 1.0 },
    modifierCounters: { tanky: 34, healing: 24 },
    threatCounters: { heavy_healing: 16 },
    playerSynergy: { preferDamageStyle: 'gun', preferFastFirerate: true },
    why: 'Headshots simultaneously shred Bullet Resist, Spirit Resist, AND Incoming Healing — melts raid-boss tanks.',
    whenToUse: 'Passive — focus headshots on the tanky frontliner so your entire team shreds them.',
  },
  {
    className: 'upgrade_aprounds', // Armor Piercer
    stance: 'offense',
    role: 'Shred',
    stageFit: { lane: 0.02, mid: 0.25, late: 1.0 },
    modifierCounters: { tanky: 34 },
    threatCounters: { buff_shield_stacker: 14 },
    playerSynergy: { preferDamageStyle: 'gun', preferFastFirerate: true, penalizeSlowFirerate: true },
    why: 'Bullets ignore Bullet Resistance and become unavoidable — punches straight through armor-stacking tanks and Plated Armor.',
    whenToUse: 'Passive — buy when a tanky enemy stacks heavy Bullet Resist to stop your gun damage.',
  },
  {
    className: 'upgrade_escalating_exposure', // Escalating Exposure
    stance: 'offense',
    role: 'Shred',
    stageFit: { lane: 0.02, mid: 0.25, late: 1.0 },
    modifierCounters: { tanky: 34 },
    playerSynergy: { preferDamageStyle: 'spirit', preferSpiritProccer: true, penalizeNonSpiritProccer: true },
    why: 'Rapidly stacks Spirit Damage Amplification on sustained fights — melts high-HP, high-resist frontliners.',
    whenToUse: 'Passive — shines on ticking/frequent spirit damage heroes burning down tanky targets.',
  },
  {
    className: 'upgrade_siphon_bullets', // Siphon Bullets
    stance: 'offense',
    role: 'Shred',
    stageFit: { lane: 0.02, mid: 0.25, late: 0.96 },
    modifierCounters: { tanky: 28 },
    threatCounters: { close_range_dive: 14 },
    playerSynergy: { preferDamageStyle: 'gun', preferFastFirerate: true, penalizeSlowFirerate: true },
    why: 'Steals Max HP directly from tanky enemies during prolonged brawls, shrinking their health pool while inflating yours.',
    whenToUse: 'Passive — keep tapping the frontliner continuously to stack stolen Max HP.',
  },
  {
    className: 'upgrade_capacitor', // Capacitor
    stance: 'offense',
    role: 'Shutdown',
    stageFit: { lane: 0.02, mid: 0.25, late: 0.98 },
    modifierCounters: { mobility: 34 },
    threatCounters: { high_mobility: 30, airborne: 22, close_range_dive: 18 },
    playerSynergy: { preferDamageStyle: 'gun' },
    why: 'High-impact gun active that applies a heavy decaying slow, prevents Stamina usage, and silences movement abilities & items.',
    whenToUse: 'Fire onto hyper-mobile carries or divers so they cannot dash, slide, or escape.',
    contextTips: {
      mobility: 'Locks out stamina, dashes, Warp Stone, and movement abilities so mobile carries cannot escape.',
    },
  },
  {
    className: 'upgrade_phantom_strike', // Phantom Strike
    stance: 'offense',
    role: 'Shutdown',
    stageFit: { lane: 0.02, mid: 0.25, late: 0.98 },
    damageCounters: { bullet: 20, equal: 12 },
    modifierCounters: { mobility: 24 },
    threatCounters: { airborne: 34, long_range_poke: 26, rapid_fire: 18 },
    playerSynergy: { preferRange: 'close', penalizeLongRange: true },
    why: 'Teleports directly onto airborne or backline carries, rips them to the ground, slows, and disarms them.',
    whenToUse: 'Snap onto flying snipers (Vindicta/Grey Talon) or backline gun carries to delete them immediately.',
  },
  {
    className: 'upgrade_focus_lens', // Focus Lens
    stance: 'offense',
    role: 'Burst',
    stageFit: { lane: 0.02, mid: 0.24, late: 1.0 },
    damageCounters: { spirit: 24, equal: 16, bullet: 10 },
    modifierCounters: { mobility: 26 },
    threatCounters: { fragile_glass_cannon: 32, high_mobility: 26, ability_spam: 24, heavy_healing: 18, telegraphed_burst: 18 },
    why: 'Upgrades from Spirit Sap: point-and-click Silence + Spirit Power/Resist shred + 35% delayed burst echo — deletes fragile assassins before they escape.',
    whenToUse: 'Cast right before unloading your burst onto a fragile or spirit-reliant target.',
  },
  {
    className: 'upgrade_proc_silence', // Silencer
    stance: 'offense',
    role: 'Shutdown',
    stageFit: { lane: 0.02, mid: 0.24, late: 0.96 },
    damageCounters: { spirit: 24, equal: 14 },
    threatCounters: { ability_spam: 24, high_mobility: 22, telegraphed_burst: 16 },
    playerSynergy: { preferDamageStyle: 'gun', preferFastFirerate: true, penalizeSlowFirerate: true },
    why: 'Bullets passively cut enemy outgoing Spirit Damage by -25% AND build up a Silence — shuts down casters without using an active slot.',
    whenToUse: 'Passive — focus fire on the key caster at the start of a fight to cut their spirit DPS and proc Silence.',
  },
  {
    className: 'upgrade_aoe_root', // Vortex Web
    stance: 'offense',
    role: 'Control',
    stageFit: { lane: 0.02, mid: 0.24, late: 0.96 },
    modifierCounters: { mobility: 34 },
    threatCounters: { high_mobility: 28, airborne: 22, close_range_dive: 18 },
    why: 'Pulls enemies together and applies Slowing Hex (alt-cast directly on a target!) — locks down evasive movers.',
    whenToUse: 'Alt-cast directly onto slippery carries or toss into their escape lane.',
    contextTips: {
      mobility: 'Pulls slippery targets back and applies Slowing Hex (alt-cast directly on them) to shut down all escapes.',
    },
  },
  {
    className: 'upgrade_divine_barrier', // Divine Barrier
    stance: 'defense',
    role: 'Cleanse',
    stageFit: { lane: 0.02, mid: 0.24, late: 0.96 },
    modifierCounters: { cc: 20 },
    threatCounters: { cleanseable_debuff: 28, telegraphed_burst: 22 },
    playerSynergy: { preferSupportive: true },
    why: 'Cleanses non-stun debuffs and wraps you or an ally in a huge barrier + move speed (half cooldown on allies).',
    whenToUse: 'Use to wipe Sticky Bombs, Affliction, or lethal DoTs off yourself or your carry.',
  },
  {
    className: 'upgrade_colossus', // Colossus
    stance: 'defense',
    role: 'Survival',
    stageFit: { lane: 0.02, mid: 0.24, late: 0.96 },
    damageCounters: { bullet: 22, spirit: 22, equal: 30 },
    modifierCounters: { melee: 18 },
    threatCounters: { close_range_dive: 22, melee_brawler: 18, rapid_fire: 14 },
    playerSynergy: { preferRange: 'close', penalizeLongRange: true },
    why: 'Massive hybrid Bullet + Spirit Resist active that slows nearby enemies and cuts their dash speed.',
    whenToUse: 'Pop when brawling in the thick of mixed Bullet + Spirit damage.',
  },
  {
    className: 'upgrade_discord', // Scourge
    stance: 'defense',
    role: 'Anti-Spirit',
    stageFit: { lane: 0.02, mid: 0.24, late: 0.96 },
    damageCounters: { spirit: 22, equal: 16 },
    modifierCounters: { tanky: 26, cc: 16 },
    threatCounters: { sustained_spirit: 18, close_range_dive: 18 },
    playerSynergy: { preferRange: 'close', preferSupportive: true },
    why: 'Grants Spirit Resist, Debuff Resist, and a % Max-HP damage aura — shreds tanky frontliners while resisting spirit & CC.',
    whenToUse: 'Cast on yourself or your frontline diver right as you engage tanky spirit brawlers.',
  },

  // ===================== TARGETED GLASS-CANNON BURST COUNTERS =====================
  {
    className: 'upgrade_cold_front', // Cold Front
    stance: 'offense',
    role: 'Burst',
    stageFit: { lane: 0.98, mid: 0.88, late: 0.18 },
    modifierCounters: { mobility: 18 },
    threatCounters: { fragile_glass_cannon: 32, high_mobility: 18, close_range_dive: 16 },
    playerSynergy: { preferDamageStyle: 'spirit', preferRange: 'close' },
    why: 'Instant AoE spirit burst + slow for 1600 souls — chunks low-HP glass cannons hard and upgrades into Arctic Blast.',
    whenToUse: 'Pop immediately when a fragile enemy gets in range to chunk them and slow their escape.',
  },
  {
    className: 'upgrade_arctic_blast', // Arctic Blast
    stance: 'offense',
    role: 'Burst',
    stageFit: { lane: 0.02, mid: 0.22, late: 0.98 },
    modifierCounters: { mobility: 28 },
    threatCounters: { fragile_glass_cannon: 36, high_mobility: 28, close_range_dive: 20 },
    playerSynergy: { preferDamageStyle: 'spirit', preferRange: 'close' },
    why: 'Freezes, bursts, and locks stamina regen in an AoE — deletes slippery low-HP assassins before they can react.',
    whenToUse: 'Pop right as they dive or blink near you to freeze and one-combo them.',
  },
  {
    className: 'upgrade_pristine_emblem', // Opening Rounds
    stance: 'offense',
    role: 'Burst',
    stageFit: { lane: 0.96, mid: 0.68, late: 0.12 },
    threatCounters: { fragile_glass_cannon: 30, long_range_poke: 12 },
    playerSynergy: { preferDamageStyle: 'gun' },
    why: 'Massive bonus weapon damage on healthy targets — lets gun heroes chunk low-HP glass cannons out of lane instantly.',
    whenToUse: 'Passive — take aggressive first-shot trades whenever they step up at high HP.',
  },
  {
    className: 'upgrade_headhunter', // Headhunter
    stance: 'offense',
    role: 'Burst',
    stageFit: { lane: 0.14, mid: 0.96, late: 0.56 },
    threatCounters: { fragile_glass_cannon: 34, airborne: 16, long_range_poke: 14 },
    playerSynergy: { preferDamageStyle: 'gun' },
    why: 'Huge headshot burst damage + sustain — punishes fragile low-HP carries so hard they cannot stay in fights.',
    whenToUse: 'Passive — open skirmishes with a headshot to immediately force low-HP threats out.',
  },

  // ===================== ADDITIONAL HIGH-VALUE MECHANICAL COUNTERS =====================
  {
    className: 'upgrade_fleetfoot_boots', // Fleetfoot
    stance: 'defense',
    role: 'Survival',
    stageFit: { lane: 0.88, mid: 0.78, late: 0.28 },
    modifierCounters: { melee: 14, cc: 12 },
    threatCounters: { close_range_dive: 18, melee_brawler: 18, sustained_spirit: 12 },
    playerSynergy: { preferDamageStyle: 'gun' },
    why: 'Active Move Speed + Slow Resistance with zero shooting speed penalty — lets you kite melee brawlers and heavy slowers cleanly.',
    whenToUse: 'Pop when chased by melee brawlers or hit by heavy slows to maintain distance while firing.',
    contextTips: {
      melee: 'Instant speed burst + slow resistance lets you kite heavy-melee engages without losing DPS.',
    },
  },
  {
    className: 'upgrade_bullet_resist_shredder', // Bullet Resist Shredder
    stance: 'offense',
    role: 'Shred',
    stageFit: { lane: 0.84, mid: 0.78, late: 0.3 },
    modifierCounters: { tanky: 26 },
    playerSynergy: { preferDamageStyle: 'gun', preferSpiritProccer: true, penalizeNonSpiritProccer: true },
    why: 'Abilities strip enemy Bullet Resist for 1600 souls — huge value for hybrid/gun heroes melting tanky frontliners.',
    whenToUse: 'Passive — tag the tank with any ability before unloading your clip.',
  },
  {
    className: 'upgrade_tech_defense_shredders', // Spirit Shredder
    stance: 'offense',
    role: 'Shred',
    stageFit: { lane: 0.84, mid: 0.78, late: 0.3 },
    modifierCounters: { tanky: 26 },
    playerSynergy: { preferDamageStyle: 'spirit', preferFastFirerate: true },
    why: 'Bullets strip enemy Spirit Resist AND grant Spirit Lifesteal against them — breaks open tanky targets.',
    whenToUse: 'Passive — weave a few shots onto the frontliner before dropping your spirit combo.',
  },
  {
    className: 'upgrade_rescue_beam', // Rescue Beam
    stance: 'defense',
    role: 'Survival',
    stageFit: { lane: 0.14, mid: 0.98, late: 0.88 },
    modifierCounters: { cc: 24 },
    threatCounters: { hard_cc: 28, channeled_ult: 26, close_range_dive: 14 },
    playerSynergy: { preferSupportive: true },
    why: 'Heals % Max HP and yanks a trapped ally straight out of Hooks, Combos, Lassos, Swaps, and Singularities.',
    whenToUse: 'Cast on a caught teammate and press Pull immediately to break enemy pick-CC combos.',
    contextTips: {
      cc: 'Pulls teammates straight out of lockdown ults, hooks, and stun chains while healing both of you.',
    },
  },
  {
    className: 'upgrade_cheat_death', // Cheat Death
    stance: 'defense',
    role: 'Survival',
    stageFit: { lane: 0.02, mid: 0.22, late: 1.0 },
    damageCounters: { spirit: 20, bullet: 20, equal: 24 },
    threatCounters: { telegraphed_burst: 34, close_range_dive: 18, bullet_ult: 18 },
    why: 'Passive death-defiance safety net — denies late-game one-shot executes and burst combos without using an active slot.',
    whenToUse: 'Passive — gives you a guaranteed survival window when lethal burst or execute ults land.',
  },
  {
    className: 'upgrade_fervor', // Frenzy
    stance: 'defense',
    role: 'Survival',
    stageFit: { lane: 0.02, mid: 0.22, late: 0.94 },
    damageCounters: { spirit: 18, equal: 20 },
    modifierCounters: { cc: 22 },
    threatCounters: { cleanseable_debuff: 12, close_range_dive: 18, hard_cc: 16 },
    playerSynergy: { preferDamageStyle: 'gun', preferFastFirerate: true, penalizeSlowFirerate: true },
    why: 'Reduces existing debuffs (40% Debuff Resist) and surges Fire Rate & Move Speed below 50% HP — lets gun carries turn dive & CC bursts passively.',
    whenToUse: 'Passive — automatically cuts active debuff durations and spikes your fightback power when bursted low.',
  },
];

/**
 * Curated hero-specific hard-counter overrides & matchup-tailored tactical tips.
 * These ensure iconic Deadlock counter relationships always rank at the very top with pinpoint reasoning.
 */
export const HERO_SPECIFIC_COUNTERS: Record<string, HeroCounterOverride[]> = {
  hero_haze: [
    {
      itemClassName: 'upgrade_withering_whip',
      bonus: 28,
      stages: ['lane'],
      tip: 'Cuts Haze\'s early Fire Rate so she cannot stack Fixation — also upgrades cleanly into Disarming Hex.',
    },
    {
      itemClassName: 'upgrade_return_fire',
      bonus: 24,
      stages: ['lane', 'mid'],
      tip: 'Pop the moment Haze opens up or channels Bullet Dance — she melts herself on her own rapid fire.',
    },
    {
      itemClassName: 'upgrade_metal_skin',
      bonus: 38,
      stages: ['mid', 'late'],
      tip: '#1 active hard-counter to Haze: pop immediately during Bullet Dance to ignore 100% of her damage.',
    },
    {
      itemClassName: 'upgrade_greater_withering_whip',
      bonus: 30,
      stages: ['mid', 'late'],
      tip: 'Disarms Haze completely so she cannot shoot or stack Fixation, while shredding her Bullet Resist.',
    },
    {
      itemClassName: 'upgrade_target_stun',
      bonus: 24,
      stages: ['mid', 'late'],
      tip: 'Drops Haze cleanly out of Bullet Dance from safe range (cast before she gets Unstoppable).',
    },
    {
      itemClassName: 'upgrade_deflecting_armor',
      bonus: 42,
      stages: ['late'],
      tip: '#1 passive hard-counter to Haze: deflects her bullets AND blocks Fixation on-hit stack procs.',
    },
    {
      itemClassName: 'upgrade_juggernaut',
      bonus: 28,
      stages: ['late'],
      tip: 'Passively guts Haze\'s fire rate the moment she starts shooting you — huge when active slots are full.',
    },
    {
      itemClassName: 'upgrade_glitch',
      bonus: 26,
      stages: ['late'],
      tip: 'Cancels Bullet Dance and stops Haze from pressing Unstoppable or Smoke Bomb to escape.',
    },
  ],
  hero_atlas: [
    {
      itemClassName: 'upgrade_melee_rebuttal',
      bonus: 36,
      stages: ['lane', 'mid'],
      tip: 'Massive 800-soul counter to Abrams — parry his post-charge heavy melee to heal up and chunk him.',
    },
    {
      itemClassName: 'upgrade_vex_barrier',
      bonus: 24,
      stages: ['lane', 'mid'],
      tip: 'Auto-triggers a barrier whenever Abrams pins you with Shoulder Charge or slams with Seismic Impact.',
    },
    {
      itemClassName: 'upgrade_healbane',
      bonus: 22,
      stages: ['lane', 'mid'],
      tip: 'Cuts both Siphon Life drain and Infernal Resilience regen every time you hit Abrams with spirit damage.',
    },
    {
      itemClassName: 'upgrade_rupture',
      bonus: 30,
      stages: ['mid', 'late'],
      tip: 'Shreds Abrams\'s massive HP bar while cutting Infernal Resilience & Siphon Life healing.',
    },
    {
      itemClassName: 'upgrade_toxic_bullets',
      bonus: 28,
      stages: ['mid', 'late'],
      tip: 'Passive % max-HP bleed + anti-heal makes Abrams\'s frontline sustain collapse in extended fights.',
    },
    {
      itemClassName: 'upgrade_debuff_reducer',
      bonus: 18,
      stages: ['lane', 'mid'],
      tip: 'Reduces Shoulder Charge wall-stun duration enough that you can parry Abrams\'s follow-up heavy melee!',
    },
    {
      itemClassName: 'upgrade_glitch',
      bonus: 24,
      stages: ['late'],
      tip: 'Stops Abrams from chaining Charge/Seismic/Siphon and strips his buffs so your team can finish him.',
    },
  ],
  hero_bebop: [
    {
      itemClassName: 'upgrade_vex_barrier',
      bonus: 34,
      stages: ['lane', 'mid'],
      tip: '#1 lane counter to Bebop: Grapple Hook triggers the barrier automatically, absorbing his Uppercut + Bomb combo.',
    },
    {
      itemClassName: 'upgrade_reduce_debuff_duration',
      bonus: 42,
      stages: ['mid', 'late'],
      tip: '#1 counter to Bomb Bebop: press right after he attaches Sticky Bomb to completely erase it (no damage, no stacks).',
    },
    {
      itemClassName: 'upgrade_counterspell',
      bonus: 34,
      stages: ['mid', 'late'],
      tip: 'Parry right as Sticky Bomb is about to explode (or as Hook arrives) to block the damage and heal yourself.',
    },
    {
      itemClassName: 'upgrade_target_stun',
      bonus: 24,
      stages: ['mid', 'late'],
      tip: 'Cancels Bebop\'s channeled Hyper Beam from long range while he is stationary.',
    },
    {
      itemClassName: 'upgrade_divine_barrier',
      bonus: 26,
      stages: ['late'],
      tip: 'Cleanses Sticky Bombs off yourself OR a hooked teammate while granting a huge barrier.',
    },
  ],
  hero_gigawatt: [
    {
      itemClassName: 'upgrade_target_stun',
      bonus: 62,
      stages: ['mid', 'late'],
      tip: '#1 counter to Seven: drops him straight out of Storm Cloud from long range and interrupts his teamfight.',
    },
    {
      itemClassName: 'upgrade_reduce_debuff_duration',
      bonus: 18,
      stages: ['mid', 'late'],
      tip: 'Instantly cleanses Static Charge before it can detonate and stun your team.',
    },
    {
      itemClassName: 'upgrade_counterspell',
      bonus: 26,
      stages: ['mid', 'late'],
      tip: 'Parry right as Static Charge ticks to zero to block the stun and burst completely.',
    },
    {
      itemClassName: 'upgrade_spirit_bubble',
      bonus: 24,
      stages: ['lane', 'mid'],
      tip: 'Absorbs Seven\'s Lightning Ball and Power Surge poke in lane.',
    },
    {
      itemClassName: 'upgrade_glitch',
      bonus: 32,
      stages: ['late'],
      tip: 'Cancels Storm Cloud immediately even if Seven tries to press items, and strips Power Surge.',
    },
  ],
  hero_hornet: [
    {
      itemClassName: 'upgrade_target_stun',
      bonus: 44,
      stages: ['mid', 'late'],
      tip: '#1 counter to Vindicta: grounds her immediately out of Flight with bonus airborne stun duration.',
    },
    {
      itemClassName: 'upgrade_phantom_strike',
      bonus: 36,
      stages: ['late'],
      tip: 'Teleports straight onto flying Vindicta, yanks her to the ground, and disarms her.',
    },
    {
      itemClassName: 'upgrade_weapon_shielding',
      bonus: 22,
      stages: ['lane', 'mid'],
      tip: 'Absorbs her oppressive early Flight harass and keeps you above Assassinate execute range.',
    },
    {
      itemClassName: 'upgrade_metal_skin',
      bonus: 26,
      stages: ['mid', 'late'],
      tip: 'Pop when Vindicta commits Flight to completely deny her gun DPS while you reposition.',
    },
    {
      itemClassName: 'upgrade_deflecting_armor',
      bonus: 30,
      stages: ['late'],
      tip: 'Deflects Vindicta\'s Flight bullets and cuts her late-game snipe pressure passively.',
    },
  ],
  hero_orion: [
    {
      itemClassName: 'upgrade_target_stun',
      bonus: 44,
      stages: ['mid', 'late'],
      tip: '#1 counter to Grey Talon: rips him out of Rain of Arrows with extended airborne stun duration.',
    },
    {
      itemClassName: 'upgrade_spirit_bubble',
      bonus: 28,
      stages: ['lane', 'mid'],
      tip: 'Absorbs Charged Shot poke in lane so he cannot chip you into Guided Owl execute threshold.',
    },
    {
      itemClassName: 'upgrade_spellbreaker',
      bonus: 36,
      stages: ['late'],
      tip: '#1 passive counter to Spirit Grey Talon: heavily slashes his Charged Shot & Guided Owl burst.',
    },
    {
      itemClassName: 'upgrade_counterspell',
      bonus: 28,
      stages: ['mid', 'late'],
      tip: 'Parry right as Guided Owl or Charged Shot arrives to negate the nuke and heal.',
    },
    {
      itemClassName: 'upgrade_phantom_strike',
      bonus: 30,
      stages: ['late'],
      tip: 'Closes the huge distance gap instantly, pulls Grey Talon out of the air, and disarms him.',
    },
  ],
  hero_inferno: [
    {
      itemClassName: 'upgrade_reduce_debuff_duration',
      bonus: 42,
      stages: ['mid', 'late'],
      tip: '#1 counter to Infernus: instantly wipes Afterburn stacks & Napalm so he stops burning and lifestealing off you.',
    },
    {
      itemClassName: 'upgrade_debuff_reducer',
      bonus: 28,
      stages: ['lane', 'mid'],
      tip: 'Significantly shortens Afterburn burn ticks and Concussive Combustion stun — upgrades into Unstoppable or Spellbreaker.',
    },
    {
      itemClassName: 'upgrade_deflecting_armor',
      bonus: 40,
      stages: ['late'],
      tip: '#1 passive counter to Infernus: blocks bullet on-hit procs so he struggles to ever ignite Afterburn.',
    },
    {
      itemClassName: 'upgrade_healbane',
      bonus: 22,
      stages: ['lane', 'mid'],
      tip: 'Cuts Infernus\'s massive Spirit Lifesteal off Afterburn & Flame Dash.',
    },
    {
      itemClassName: 'upgrade_spirit_bubble',
      bonus: 22,
      stages: ['lane', 'mid'],
      tip: 'Absorbs early Afterburn ticks in lane so you can survive his all-in.',
    },
  ],
  hero_ghost: [
    {
      itemClassName: 'upgrade_healbane',
      bonus: 32,
      stages: ['lane', 'mid'],
      tip: 'Cuts Geist\'s Life Drain and Spirit Lifesteal so she cannot out-sustain her own self-damage.',
    },
    {
      itemClassName: 'upgrade_rupture',
      bonus: 30,
      stages: ['mid', 'late'],
      tip: 'Shreds Geist\'s tanky HP bar and slashes her Life Drain healing.',
    },
    {
      itemClassName: 'upgrade_targeted_silence',
      bonus: 34,
      stages: ['mid', 'late'],
      tip: 'Silence Geist right as she gets low so she CANNOT cast Soul Exchange (HP swap) to turn the fight!',
    },
    {
      itemClassName: 'upgrade_focus_lens',
      bonus: 34,
      stages: ['late'],
      tip: 'Locks Geist out of Soul Exchange right when she hits low HP and echoes burst to finish her.',
    },
    {
      itemClassName: 'upgrade_reduce_debuff_duration',
      bonus: 24,
      stages: ['mid', 'late'],
      tip: 'Wipes stacked Malice damage-amp shards before she lands an Essence Bomb nuke.',
    },
    {
      itemClassName: 'upgrade_restorative_locket',
      bonus: 24,
      stages: ['lane', 'mid'],
      tip: 'Geist spams Malice & Bombs constantly in lane — stacks free heals & stamina nonstop.',
    },
  ],
  hero_lash: [
    {
      itemClassName: 'upgrade_containment',
      bonus: 38,
      stages: ['lane', 'mid'],
      tip: '#1 cheap counter to Lash: disables his Grapple so he cannot fly up for Ground Strike or escape.',
    },
    {
      itemClassName: 'upgrade_target_stun',
      bonus: 34,
      stages: ['mid', 'late'],
      tip: 'Cast the moment Lash leaps up for Death Slam to knock him out of the air before he throws your team.',
    },
    {
      itemClassName: 'upgrade_counterspell',
      bonus: 34,
      stages: ['mid', 'late'],
      tip: 'Parry right as Lash\'s Death Slam grab or Ground Strike lands to completely negate the combo.',
    },
    {
      itemClassName: 'upgrade_self_bubble',
      bonus: 32,
      stages: ['late'],
      tip: 'Press during Death Slam channel or Ground Strike dive to dodge his entire combo cleanly.',
    },
    {
      itemClassName: 'upgrade_spellbreaker',
      bonus: 30,
      stages: ['late'],
      tip: 'Passively guts Lash\'s massive single-hit Ground Strike burst.',
    },
  ],
  hero_synth: [
    {
      itemClassName: 'upgrade_divine_barrier',
      bonus: 38,
      stages: ['late'],
      tip: 'One of the few cleanses that purges Pocket\'s Affliction ultimate off yourself or an ally while adding a massive barrier.',
    },
    {
      itemClassName: 'upgrade_counterspell',
      bonus: 30,
      stages: ['mid', 'late'],
      tip: 'Spell-parry Pocket\'s Affliction cast or Enchanter\'s Satchel burst right on impact to negate the DoT before it lands.',
    },
    {
      itemClassName: 'upgrade_containment',
      bonus: 36,
      stages: ['lane', 'mid'],
      tip: 'Stops Pocket from teleporting to Flying Cloak or escaping after diving in.',
    },
    {
      itemClassName: 'upgrade_targeted_silence',
      bonus: 34,
      stages: ['mid', 'late'],
      tip: 'Prevents Pocket from hiding inside Enchanter\'s Satchel or teleporting out with Flying Cloak.',
    },
    {
      itemClassName: 'upgrade_tech_purge',
      bonus: 30,
      stages: ['mid', 'late'],
      tip: 'Best passive mitigation against Pocket\'s un-cleansable Affliction ultimate DoT.',
    },
    {
      itemClassName: 'upgrade_focus_lens',
      bonus: 32,
      stages: ['late'],
      tip: 'Locks Pocket out of Satchel & Cloak while echoing damage to finish their fragile HP pool.',
    },
  ],
  hero_shiv: [
    {
      itemClassName: 'upgrade_healbane',
      bonus: 30,
      stages: ['lane', 'mid'],
      tip: 'Cuts Shiv\'s sustain and prevents him from out-healing deferred Bloodletting damage.',
    },
    {
      itemClassName: 'upgrade_reduce_debuff_duration',
      bonus: 32,
      stages: ['mid', 'late'],
      tip: 'Instantly wipes stacked Serrated Knife bleeds so Shiv cannot soften you into Killing Blow execute range.',
    },
    {
      itemClassName: 'upgrade_containment',
      bonus: 28,
      stages: ['lane', 'mid'],
      tip: 'Locks out Slice and Dice dashes and Killing Blow gap-closes.',
    },
    {
      itemClassName: 'upgrade_rupture',
      bonus: 30,
      stages: ['mid', 'late'],
      tip: 'Punishes Shiv\'s high effective HP from Bloodletting while heavily cutting his healing.',
    },
    {
      itemClassName: 'upgrade_glitch',
      bonus: 28,
      stages: ['late'],
      tip: 'Prevents Shiv from clearing Bloodletting or executing with Killing Blow while your team burns him down.',
    },
    {
      itemClassName: 'upgrade_cheat_death',
      bonus: 28,
      stages: ['late'],
      tip: 'Denies Shiv\'s Killing Blow execute chain passively so he cannot reset through your team.',
    },
  ],
  hero_krill: [
    {
      itemClassName: 'upgrade_vex_barrier',
      bonus: 34,
      stages: ['lane', 'mid'],
      tip: '#1 early counter to Mo & Krill: automatically pops a barrier the moment Combo grabs you.',
    },
    {
      itemClassName: 'upgrade_rescue_beam',
      bonus: 30,
      stages: ['mid', 'late'],
      tip: 'Yanks a teammate straight out of Mo & Krill\'s Combo while healing them through the focus fire.',
    },
    {
      itemClassName: 'upgrade_unstoppable',
      bonus: 38,
      stages: ['late'],
      tip: 'Pop right before Mo & Krill burrows onto you so Combo and Sand Blast cannot touch you.',
    },
    {
      itemClassName: 'upgrade_auto_cleanse',
      bonus: 34,
      stages: ['late'],
      tip: 'Passively auto-cleanses Combo or Sand Blast and grants a barrier — lifesaver if active slots are full.',
    },
    {
      itemClassName: 'upgrade_rupture',
      bonus: 28,
      stages: ['mid', 'late'],
      tip: 'Shreds Mo & Krill\'s massive HP bar and cuts Scorn healing.',
    },
    {
      itemClassName: 'upgrade_toxic_bullets',
      bonus: 26,
      stages: ['mid', 'late'],
      tip: 'Melts through Mo & Krill\'s huge health pool and cuts Scorn sustain.',
    },
  ],
  hero_warden: [
    {
      itemClassName: 'upgrade_reduce_debuff_duration',
      bonus: 38,
      stages: ['mid', 'late'],
      tip: '#1 counter to Warden: instantly cleanses Binding Word cage AND Alchemical Flask debuffs with bonus move speed.',
    },
    {
      itemClassName: 'upgrade_warp_stone',
      bonus: 32,
      stages: ['mid', 'late'],
      tip: 'Blinks cleanly out of Binding Word range AND gives Bullet Resist against Warden\'s gun follow-up.',
    },
    {
      itemClassName: 'upgrade_vex_barrier',
      bonus: 28,
      stages: ['lane', 'mid'],
      tip: 'Triggers a barrier if Binding Word traps you in lane, absorbing his burst.',
    },
    {
      itemClassName: 'upgrade_target_stun',
      bonus: 24,
      stages: ['mid', 'late'],
      tip: 'Interrupts Warden during his 2s Last Stand windup before he starts healing and pulsing.',
    },
    {
      itemClassName: 'upgrade_rupture',
      bonus: 24,
      stages: ['mid', 'late'],
      tip: 'Cuts Last Stand drain healing and chunks through his frontline HP.',
    },
  ],
  hero_wraith: [
    {
      itemClassName: 'upgrade_metal_skin',
      bonus: 34,
      stages: ['mid', 'late'],
      tip: 'Pop when Wraith activates Full Auto to negate her gun melt completely.',
    },
    {
      itemClassName: 'upgrade_greater_withering_whip',
      bonus: 32,
      stages: ['mid', 'late'],
      tip: 'Disarms Wraith during Full Auto so she cannot fire OR charge Card Trick.',
    },
    {
      itemClassName: 'upgrade_counterspell',
      bonus: 32,
      stages: ['mid', 'late'],
      tip: 'Parry Wraith\'s Telekinesis lift projectile to cancel her pick combo and heal.',
    },
    {
      itemClassName: 'upgrade_vex_barrier',
      bonus: 28,
      stages: ['lane', 'mid'],
      tip: 'Telekinesis procs the barrier immediately, soaking her Full Auto + Card burst while lifted.',
    },
    {
      itemClassName: 'upgrade_deflecting_armor',
      bonus: 34,
      stages: ['late'],
      tip: 'Deflects Full Auto rapid fire and drastically slows down Wraith\'s card generation.',
    },
  ],
  hero_yamato: [
    {
      itemClassName: 'upgrade_counterspell',
      bonus: 36,
      stages: ['mid', 'late'],
      tip: 'Parry Yamato\'s charged Power Slash right as it releases — blocks the nuke and heals you.',
    },
    {
      itemClassName: 'upgrade_containment',
      bonus: 28,
      stages: ['lane', 'mid'],
      tip: 'Locks out Flying Slash grapple so Yamato cannot gap-close or chase.',
    },
    {
      itemClassName: 'upgrade_targeted_silence',
      bonus: 30,
      stages: ['mid', 'late'],
      tip: 'Silence Yamato before she can press Shadow Transformation to burst her down cleanly.',
    },
    {
      itemClassName: 'upgrade_spellbreaker',
      bonus: 32,
      stages: ['late'],
      tip: 'Passively slashes Yamato\'s massive charged Power Slash burst damage.',
    },
    {
      itemClassName: 'upgrade_healbane',
      bonus: 24,
      stages: ['lane', 'mid'],
      tip: 'Cuts Crimson Slash and Shadow Transformation sustain in duels.',
    },
  ],
  hero_dynamo: [
    {
      itemClassName: 'upgrade_target_stun',
      bonus: 36,
      stages: ['mid', 'late'],
      tip: 'Cancels Singularity from outside its pull radius before Dynamo wipes your team.',
    },
    {
      itemClassName: 'upgrade_unstoppable',
      bonus: 38,
      stages: ['late'],
      tip: 'Walk straight out of Singularity or interrupt Dynamo uncontested.',
    },
    {
      itemClassName: 'upgrade_glitch',
      bonus: 34,
      stages: ['late'],
      tip: 'Instantly interrupts Singularity (even if Dynamo has Refresher queued) and stops Quantum Entanglement.',
    },
  ],
  hero_viper: [
    {
      itemClassName: 'upgrade_return_fire',
      bonus: 32,
      stages: ['lane', 'mid'],
      tip: 'Vyper\'s insane close-range fire rate shreds her own tiny HP bar the second you pop Return Fire.',
    },
    {
      itemClassName: 'upgrade_metal_skin',
      bonus: 36,
      stages: ['mid', 'late'],
      tip: 'Completely blanks Vyper\'s close-range bullet burst while you burst her fragile frame.',
    },
    {
      itemClassName: 'upgrade_greater_withering_whip',
      bonus: 32,
      stages: ['mid', 'late'],
      tip: 'Disarms Vyper mid-slide and shreds her Bullet Resist so she dies instantly.',
    },
    {
      itemClassName: 'upgrade_deflecting_armor',
      bonus: 38,
      stages: ['late'],
      tip: 'Deflects Vyper\'s high fire-rate spray passively and prevents her from melting you.',
    },
    {
      itemClassName: 'upgrade_reduce_debuff_duration',
      bonus: 24,
      stages: ['mid', 'late'],
      tip: 'Wipes Lethal Venom before the delayed spirit nuke detonates.',
    },
  ],
  hero_mirage: [
    {
      itemClassName: 'upgrade_reduce_debuff_duration',
      bonus: 38,
      stages: ['mid', 'late'],
      tip: 'Instantly cleanses stacked Djinn\'s Marks right before Mirage can detonate them for massive burst.',
    },
    {
      itemClassName: 'upgrade_deflecting_armor',
      bonus: 38,
      stages: ['late'],
      tip: 'Blocks bullet on-hit procs so Mirage struggles to stack Djinn\'s Mark on you at all.',
    },
    {
      itemClassName: 'upgrade_withering_whip',
      bonus: 24,
      stages: ['lane'],
      tip: 'Slows Mirage\'s Fire Rate in lane so he cannot build high Djinn\'s Mark stacks.',
    },
  ],
  hero_frank: [
    {
      itemClassName: 'upgrade_rupture',
      bonus: 36,
      stages: ['mid', 'late'],
      tip: 'Melts Victor\'s giant HP pool and cuts his Jumpstart & lifesteal healing.',
    },
    {
      itemClassName: 'upgrade_toxic_bullets',
      bonus: 34,
      stages: ['mid', 'late'],
      tip: 'Constant % max-HP bleed + anti-heal shuts down Victor\'s frontline drain-tanking.',
    },
    {
      itemClassName: 'upgrade_healbane',
      bonus: 30,
      stages: ['lane', 'mid'],
      tip: 'Essential early anti-heal against Victor\'s Jumpstart regen and Aura sustain.',
    },
    {
      itemClassName: 'upgrade_tech_purge',
      bonus: 30,
      stages: ['mid', 'late'],
      tip: 'Heavy passive Spirit Resist against nonstop Aura of Suffering ticks.',
    },
    {
      itemClassName: 'upgrade_spirit_burn',
      bonus: 32,
      stages: ['late'],
      tip: 'Explosive anti-heal burn cuts Victor\'s massive sustain even after Shocking Reanimation.',
    },
  ],
  hero_viscous: [
    {
      itemClassName: 'upgrade_healbane',
      bonus: 24,
      stages: ['lane', 'mid'],
      tip: 'Cuts Viscous\'s Cube regeneration and skirmish sustain.',
    },
    {
      itemClassName: 'upgrade_containment',
      bonus: 28,
      stages: ['lane', 'mid'],
      tip: 'Slows Viscous\'s slippery Puddle Punch mobility and sets up kills.',
    },
    {
      itemClassName: 'upgrade_glitch',
      bonus: 34,
      stages: ['late'],
      tip: 'Prevents Viscous from self-Cubing or rolling away in Goo Ball and strips his buffs.',
    },
    {
      itemClassName: 'upgrade_capacitor',
      bonus: 28,
      stages: ['late'],
      tip: 'Locks Viscous\'s movement abilities & stamina so he cannot escape after Cube ends.',
    },
  ],
  hero_nano: [
    {
      itemClassName: 'upgrade_melee_rebuttal',
      bonus: 26,
      stages: ['lane', 'mid'],
      tip: 'Punishes Calico\'s melee trades in lane and swings close-range duels.',
    },
    {
      itemClassName: 'upgrade_containment',
      bonus: 34,
      stages: ['lane', 'mid'],
      tip: 'Locks out Leaping Slash and Ava cat-form escapes so Calico cannot slip away.',
    },
    {
      itemClassName: 'upgrade_targeted_silence',
      bonus: 32,
      stages: ['mid', 'late'],
      tip: 'Prevents Calico from escaping with Return to Shadows or dashing out.',
    },
    {
      itemClassName: 'upgrade_glitch',
      bonus: 30,
      stages: ['late'],
      tip: 'Shuts down Return to Shadows & Ava so your team can burst Calico cleanly.',
    },
  ],
  hero_punkgoat: [
    {
      itemClassName: 'upgrade_melee_rebuttal',
      bonus: 36,
      stages: ['lane', 'mid'],
      tip: 'Billy relies on melee hits to proc Blasted & ammo — Rebuttal punishes every heavy melee hard.',
    },
    {
      itemClassName: 'upgrade_vex_barrier',
      bonus: 28,
      stages: ['lane', 'mid'],
      tip: 'Chain Gang and Rising Ram automatically pop the barrier to soak Billy\'s follow-up burst.',
    },
    {
      itemClassName: 'upgrade_warp_stone',
      bonus: 28,
      stages: ['mid', 'late'],
      tip: 'Breaks distance from Billy\'s melee swings while giving Bullet Resist.',
    },
    {
      itemClassName: 'upgrade_unstoppable',
      bonus: 30,
      stages: ['late'],
      tip: 'Completely ignores Chain Gang tethers and Rising Ram knockups.',
    },
  ],
  hero_vampirebat: [
    {
      itemClassName: 'upgrade_containment',
      bonus: 36,
      stages: ['lane', 'mid'],
      tip: '#1 cheap counter to Mina: locks out her untargetable Sanguine Retreat dashes so you can burst her tiny HP pool.',
    },
    {
      itemClassName: 'upgrade_cold_front',
      bonus: 26,
      stages: ['lane', 'mid'],
      tip: 'Mina has one of the smallest HP pools in Deadlock — instant Cold Front burst + slow chunks her out immediately.',
    },
    {
      itemClassName: 'upgrade_targeted_silence',
      bonus: 36,
      stages: ['mid', 'late'],
      tip: 'Denies Sanguine Retreat & Nox Nostra silences so Mina dies in one burst rotation.',
    },
    {
      itemClassName: 'upgrade_focus_lens',
      bonus: 42,
      stages: ['late'],
      tip: '#1 late-game delete button vs Mina: Silences Sanguine Retreat and echoes burst damage to blow up her tiny HP bar.',
    },
    {
      itemClassName: 'upgrade_deflecting_armor',
      bonus: 32,
      stages: ['late'],
      tip: 'Blocks Love Bites bullet on-hit procs passively so she cannot build burst stacks on you.',
    },
  ],
  hero_forge: [
    {
      itemClassName: 'upgrade_return_fire',
      bonus: 28,
      stages: ['lane', 'mid'],
      tip: 'Reflects McGinnis\'s spun-up minigun spray right back into her (and fires back at her turrets when they shoot you).',
    },
    {
      itemClassName: 'upgrade_healbane',
      bonus: 26,
      stages: ['lane', 'mid'],
      tip: 'Cuts Medicinal Specter\'s massive AoE healing zone.',
    },
    {
      itemClassName: 'upgrade_target_stun',
      bonus: 26,
      stages: ['mid', 'late'],
      tip: 'Cancels Heavy Barrage cleanly while McGinnis is slowed during her ult.',
    },
    {
      itemClassName: 'upgrade_metal_skin',
      bonus: 28,
      stages: ['mid', 'late'],
      tip: 'Ignores her fully spun-up minigun DPS when contesting her lane push.',
    },
  ],
  hero_kelvin: [
    {
      itemClassName: 'upgrade_cardio_calibrator',
      bonus: 32,
      stages: ['lane', 'mid'],
      tip: 'Strong Slow Resistance stops Kelvin\'s Arctic Beam & Frost Grenade from pinning you in place.',
    },
    {
      itemClassName: 'upgrade_target_stun',
      bonus: 28,
      stages: ['mid', 'late'],
      tip: 'Cancels Arctic Beam and drops Kelvin off Ice Path.',
    },
    {
      itemClassName: 'upgrade_healbane',
      bonus: 24,
      stages: ['lane', 'mid'],
      tip: 'Cuts Kelvin\'s Frost Grenade & Frozen Shelter team healing.',
    },
  ],
  hero_astro: [
    {
      itemClassName: 'upgrade_vex_barrier',
      bonus: 32,
      stages: ['lane', 'mid'],
      tip: 'Spirit Lasso triggers Reactive Barrier immediately so you survive being dragged into her team.',
    },
    {
      itemClassName: 'upgrade_counterspell',
      bonus: 28,
      stages: ['mid', 'late'],
      tip: 'Parry Spirit Lasso or Powder Keg detonations to shut down Holliday\'s pick combo.',
    },
    {
      itemClassName: 'upgrade_unstoppable',
      bonus: 30,
      stages: ['late'],
      tip: 'Prevents Holliday from kidnapping you with Spirit Lasso in late teamfights.',
    },
    {
      itemClassName: 'upgrade_rescue_beam',
      bonus: 30,
      stages: ['mid', 'late'],
      tip: 'Pulls a lassoed teammate straight back to safety while healing them through Holliday\'s pick.',
    },
  ],
  hero_chrono: [
    {
      itemClassName: 'upgrade_vex_barrier',
      bonus: 30,
      stages: ['lane', 'mid'],
      tip: 'Kinetic Carbine\'s Time-Stop automatically triggers a barrier before Paradox swaps you.',
    },
    {
      itemClassName: 'upgrade_counterspell',
      bonus: 34,
      stages: ['mid', 'late'],
      tip: 'Parry Kinetic Carbine or Paradoxical Swap to completely shut down her pick combo.',
    },
    {
      itemClassName: 'upgrade_warp_stone',
      bonus: 26,
      stages: ['mid', 'late'],
      tip: 'Instantly blinks back to safety if you get hit by Paradoxical Swap.',
    },
    {
      itemClassName: 'upgrade_rescue_beam',
      bonus: 28,
      stages: ['mid', 'late'],
      tip: 'Yanks a swapped teammate back to your team immediately before Paradox\'s squad collapses.',
    },
  ],
  hero_magician: [
    {
      itemClassName: 'upgrade_vex_barrier',
      bonus: 30,
      stages: ['lane', 'mid'],
      tip: 'Rabbit Hex triggers Reactive Barrier so you survive the follow-up Vexing Bolt burst.',
    },
    {
      itemClassName: 'upgrade_debuff_reducer',
      bonus: 28,
      stages: ['lane', 'mid'],
      tip: 'Passively cuts Rabbit Hex duration by 25% (active cleanses cannot be pressed while hexed) — upgrades into Spellbreaker or Unstoppable.',
    },
    {
      itemClassName: 'upgrade_counterspell',
      bonus: 32,
      stages: ['mid', 'late'],
      tip: 'Spell-parry Rabbit Hex or Vexing Bolt right before impact to negate the polymorph and burst completely.',
    },
    {
      itemClassName: 'upgrade_spellbreaker',
      bonus: 34,
      stages: ['late'],
      tip: 'Blunts Sinclair\'s massive long-distance Vexing Bolt burst AND passively cuts Rabbit Hex duration by 25%.',
    },
  ],
  hero_deadpack: [
    {
      itemClassName: 'upgrade_target_stun',
      bonus: 38,
      stages: ['mid', 'late'],
      tip: 'Slams Deadman Danny straight out of Chimera Mk1 jetpack flight with extended airborne stun.',
    },
    {
      itemClassName: 'upgrade_phantom_strike',
      bonus: 30,
      stages: ['late'],
      tip: 'Rips Deadman Danny out of the sky and disarms his Jettison Fuel spray.',
    },
    {
      itemClassName: 'upgrade_metal_skin',
      bonus: 26,
      stages: ['mid', 'late'],
      tip: 'Negates Jettison Fuel weapon DoT and follow-up gun burst.',
    },
  ],
  hero_doorman: [
    {
      itemClassName: 'upgrade_counterspell',
      bonus: 34,
      stages: ['mid', 'late'],
      tip: 'Parry Call Bell detonation, Luggage Cart, or Hotel Guest to deny Doorman\'s disruption.',
    },
    {
      itemClassName: 'upgrade_vex_barrier',
      bonus: 28,
      stages: ['lane', 'mid'],
      tip: 'Soaks Doorman\'s Luggage Cart pull & Call Bell burst combo in lane.',
    },
    {
      itemClassName: 'upgrade_spellbreaker',
      bonus: 28,
      stages: ['late'],
      tip: 'Blunts Call Bell and Hotel Guest spirit burst passively.',
    },
  ],
  hero_priest: [
    {
      itemClassName: 'upgrade_metal_skin',
      bonus: 34,
      stages: ['mid', 'late'],
      tip: 'Pop when Venator loads Ira Domini stakes to ignore his massive weapon burst.',
    },
    {
      itemClassName: 'upgrade_greater_withering_whip',
      bonus: 28,
      stages: ['mid', 'late'],
      tip: 'Disarms Venator right as he activates Ira Domini crossbow stakes.',
    },
    {
      itemClassName: 'upgrade_vex_barrier',
      bonus: 26,
      stages: ['lane', 'mid'],
      tip: 'Triggers a barrier if you step into Hex-Lined Snap Trap or get wall-stunned by Gutshot.',
    },
  ],
  hero_fencer: [
    {
      itemClassName: 'upgrade_melee_rebuttal',
      bonus: 30,
      stages: ['lane', 'mid'],
      tip: 'Punishes Apollo\'s close-range lunge & melee trades with instant heal and reflected damage.',
    },
    {
      itemClassName: 'upgrade_containment',
      bonus: 32,
      stages: ['lane', 'mid'],
      tip: 'Locks out Apollo\'s dashes and lunges so he cannot weave in and out of Riposte range.',
    },
    {
      itemClassName: 'upgrade_targeted_silence',
      bonus: 32,
      stages: ['mid', 'late'],
      tip: 'Denies Riposte parry-deflect and Itani Lo Sahn so Apollo cannot outplay your burst.',
    },
    {
      itemClassName: 'upgrade_counterspell',
      bonus: 28,
      stages: ['mid', 'late'],
      tip: 'Spell-parry Apollo\'s telegraphed Itani Lo Sahn strike to negate the burst and anti-heal.',
    },
    {
      itemClassName: 'upgrade_glitch',
      bonus: 28,
      stages: ['late'],
      tip: 'Silences, disarms, and locks Apollo out of Riposte and mobility tools simultaneously.',
    },
  ],
  hero_unicorn: [
    {
      itemClassName: 'upgrade_spirit_bubble',
      bonus: 30,
      stages: ['lane', 'mid'],
      tip: 'Absorbs Celeste\'s Radiant Dagger & prism spirit burst cleanly in lane.',
    },
    {
      itemClassName: 'upgrade_reduce_debuff_duration',
      bonus: 24,
      stages: ['mid', 'late'],
      tip: 'Purges Celeste\'s Dazzling Trick prism silence and Light Eater debuff with a heal and speed burst (note: cannot purge Shining Wonder ult).',
    },
    {
      itemClassName: 'upgrade_spellbreaker',
      bonus: 34,
      stages: ['late'],
      tip: '#1 passive counter to Celeste: blunts her heaviest spirit burst combo.',
    },
    {
      itemClassName: 'upgrade_glitch',
      bonus: 30,
      stages: ['late'],
      tip: 'Strips Celeste\'s prism shields and silences her before she can chain abilities.',
    },
  ],
  hero_drifter: [
    {
      itemClassName: 'upgrade_reduce_debuff_duration',
      bonus: 32,
      stages: ['mid', 'late'],
      tip: 'Purges Stalker\'s Mark bleed immediately before Drifter can chain his isolation burst.',
    },
    {
      itemClassName: 'upgrade_melee_rebuttal',
      bonus: 28,
      stages: ['lane', 'mid'],
      tip: 'Punishes Drifter\'s close-range melee brawling with instant heal and counter-damage.',
    },
    {
      itemClassName: 'upgrade_warp_stone',
      bonus: 28,
      stages: ['mid', 'late'],
      tip: 'Blinks out of Drifter\'s close-range ambush & Eternal Night engage while adding Bullet Resist.',
    },
    {
      itemClassName: 'upgrade_greater_withering_whip',
      bonus: 28,
      stages: ['mid', 'late'],
      tip: 'Disarms Drifter mid-ambush and shreds his Bullet Resist when he dives isolated targets.',
    },
    {
      itemClassName: 'upgrade_metal_skin',
      bonus: 28,
      stages: ['mid', 'late'],
      tip: 'Negates Drifter\'s close-range weapon burst during Eternal Night.',
    },
  ],
  hero_necro: [
    {
      itemClassName: 'upgrade_spirit_bubble',
      bonus: 28,
      stages: ['lane', 'mid'],
      tip: 'Soaks Graves\'s attritional spirit poke and Grasping Hands zone damage in lane.',
    },
    {
      itemClassName: 'upgrade_vex_barrier',
      bonus: 26,
      stages: ['lane', 'mid'],
      tip: 'Auto-triggers a protective barrier if Grasping Hands immobilizes you.',
    },
    {
      itemClassName: 'upgrade_tech_purge',
      bonus: 30,
      stages: ['mid', 'late'],
      tip: 'Counters Graves\'s Spirit Resist shred and sustained spirit zone pressure passively.',
    },
    {
      itemClassName: 'upgrade_absorbing_armor',
      bonus: 28,
      stages: ['late'],
      tip: 'Turns Graves\'s continuous spirit ticks into faster cooldowns for your own abilities.',
    },
  ],
  hero_tengu: [
    {
      itemClassName: 'upgrade_healbane',
      bonus: 30,
      stages: ['lane', 'mid'],
      tip: 'Cuts Ivy\'s Watcher\'s Covenant tether healing and Kudzu sustain cheaply in lane.',
    },
    {
      itemClassName: 'upgrade_target_stun',
      bonus: 34,
      stages: ['mid', 'late'],
      tip: 'Drops Ivy out of Air Drop flight before she can deliver a bomb or ally engage.',
    },
    {
      itemClassName: 'upgrade_vex_barrier',
      bonus: 26,
      stages: ['lane', 'mid'],
      tip: 'Stone Form stun instantly triggers Reactive Barrier so you survive her follow-up.',
    },
    {
      itemClassName: 'upgrade_rupture',
      bonus: 26,
      stages: ['mid', 'late'],
      tip: 'Cuts Ivy\'s tether lifesteal & sustain in extended mid/late skirmishes.',
    },
    {
      itemClassName: 'upgrade_glitch',
      bonus: 28,
      stages: ['late'],
      tip: 'Prevents Ivy from using Stone Form invulnerability or flying away with Air Drop.',
    },
  ],
  hero_nurse: [
    {
      itemClassName: 'upgrade_healbane',
      bonus: 34,
      stages: ['lane', 'mid'],
      tip: '#1 cheap counter to Nurse Harrow: slashes her Healing Needles & Leech Therapy sustain.',
    },
    {
      itemClassName: 'upgrade_reduce_debuff_duration',
      bonus: 32,
      stages: ['mid', 'late'],
      tip: 'Instantly purges Leech Therapy DoTs so Nurse Harrow loses both damage and drain healing.',
    },
    {
      itemClassName: 'upgrade_rupture',
      bonus: 30,
      stages: ['mid', 'late'],
      tip: 'Shuts down Nurse Harrow\'s healing output while bleeding down her frontline targets.',
    },
    {
      itemClassName: 'upgrade_spirit_burn',
      bonus: 30,
      stages: ['late'],
      tip: 'Heavy late-game anti-heal burn that collapses Nurse Harrow\'s team sustain.',
    },
  ],
  hero_bookworm: [
    {
      itemClassName: 'upgrade_healbane',
      bonus: 26,
      stages: ['lane', 'mid'],
      tip: 'Cuts Paige\'s sustain and Rallying Charge healing during lane trades.',
    },
    {
      itemClassName: 'upgrade_restorative_locket',
      bonus: 28,
      stages: ['lane', 'mid'],
      tip: 'Stacks free healing & stamina charges off Paige\'s frequent Bookwyrm & shield casts.',
    },
    {
      itemClassName: 'upgrade_targeted_silence',
      bonus: 30,
      stages: ['mid', 'late'],
      tip: 'Stops Paige from layering Plot Armor barriers and Rallying Charge during teamfights.',
    },
    {
      itemClassName: 'upgrade_glitch',
      bonus: 36,
      stages: ['late'],
      tip: '#1 late-game counter to Paige: strips Plot Armor shields AND silences her entire support kit.',
    },
  ],
  hero_ratking: [
    {
      itemClassName: 'upgrade_reduce_debuff_duration',
      bonus: 32,
      stages: ['mid', 'late'],
      tip: 'Purges Rat Swarm DoTs cleanly and gives you a heal + move speed reset.',
    },
    {
      itemClassName: 'upgrade_debuff_reducer',
      bonus: 26,
      stages: ['lane', 'mid'],
      tip: 'Cuts Rat Swarm DoT ticks in lane and upgrades cleanly into Unstoppable or Spellbreaker.',
    },
    {
      itemClassName: 'upgrade_rupture',
      bonus: 28,
      stages: ['mid', 'late'],
      tip: 'Shreds Rat King\'s high effective HP through Royal Pestments barrier stacking.',
    },
    {
      itemClassName: 'upgrade_glitch',
      bonus: 32,
      stages: ['late'],
      tip: 'Strips Royal Pestments barriers and locks out Rat King\'s grenade & swarm spam.',
    },
  ],
  hero_familiar: [
    {
      itemClassName: 'upgrade_healbane',
      bonus: 32,
      stages: ['lane', 'mid'],
      tip: 'Cuts Rem\'s Tag Along burst healing cheaply before fights reset.',
    },
    {
      itemClassName: 'upgrade_vex_barrier',
      bonus: 30,
      stages: ['lane', 'mid'],
      tip: 'Naptime sleep & Pillow CC instantly pop Reactive Barrier so you survive the follow-up.',
    },
    {
      itemClassName: 'upgrade_containment',
      bonus: 28,
      stages: ['lane', 'mid'],
      tip: 'Locks out Rem\'s slippery movement & Tag Along escapes so you can lock him down.',
    },
    {
      itemClassName: 'upgrade_unstoppable',
      bonus: 30,
      stages: ['late'],
      tip: 'Walks straight through wall-piercing Naptime sleep and Pillow knockbacks.',
    },
    {
      itemClassName: 'upgrade_auto_cleanse',
      bonus: 30,
      stages: ['late'],
      tip: 'Auto-cleanses surprise wall-piercing Naptime sleep without needing reaction time.',
    },
  ],
  hero_werewolf: [
    {
      itemClassName: 'upgrade_melee_rebuttal',
      bonus: 30,
      stages: ['lane', 'mid'],
      tip: 'Punishes Silver\'s aggressive close-range melee trades with heal and reflected burst.',
    },
    {
      itemClassName: 'upgrade_withering_whip',
      bonus: 28,
      stages: ['lane'],
      tip: 'Cuts Silver\'s Slam Fire rate early and builds straight into Disarming Hex.',
    },
    {
      itemClassName: 'upgrade_greater_withering_whip',
      bonus: 34,
      stages: ['mid', 'late'],
      tip: 'Disarms Silver during Slam Fire / Lycan Curse and shreds her Bullet Resist.',
    },
    {
      itemClassName: 'upgrade_metal_skin',
      bonus: 34,
      stages: ['mid', 'late'],
      tip: 'Ignores Silver\'s Slam Fire close-range bullet shred completely.',
    },
    {
      itemClassName: 'upgrade_reduce_debuff_duration',
      bonus: 28,
      stages: ['mid', 'late'],
      tip: 'Purges Entangling Bola movement lock so Silver cannot trap and maul you.',
    },
    {
      itemClassName: 'upgrade_deflecting_armor',
      bonus: 32,
      stages: ['late'],
      tip: 'Passively deflects Silver\'s rapid-fire bursts during Lycan Curse dives.',
    },
  ],
  hero_chessmaster: [
    {
      itemClassName: 'upgrade_cardio_calibrator',
      bonus: 28,
      stages: ['lane', 'mid'],
      tip: 'Strong Slow Resistance lets you walk out of Solomon\'s Bishop slows and Rook zones.',
    },
    {
      itemClassName: 'upgrade_vex_barrier',
      bonus: 28,
      stages: ['lane', 'mid'],
      tip: 'Rook Battery immobilize triggers Reactive Barrier automatically.',
    },
    {
      itemClassName: 'upgrade_reduce_debuff_duration',
      bonus: 30,
      stages: ['mid', 'late'],
      tip: 'Purges Rook Battery roots & Bishop slows immediately with a move speed burst.',
    },
    {
      itemClassName: 'upgrade_glitch',
      bonus: 32,
      stages: ['late'],
      tip: 'Strips Kingside Knight barriers and silences Solomon\'s tactical zone control.',
    },
  ],
  hero_artist: [
    {
      itemClassName: 'upgrade_restorative_locket',
      bonus: 26,
      stages: ['lane', 'mid'],
      tip: 'Rapidly stacks free burst heals and stamina from Violet\'s Living Ink and Flow State refresh spam.',
    },
    {
      itemClassName: 'upgrade_debuff_reducer',
      bonus: 26,
      stages: ['lane', 'mid'],
      tip: 'Cuts Still Life stun and Abstract Landscape silence/slow duration by 25% — upgrades into Unstoppable or Spellbreaker.',
    },
    {
      itemClassName: 'upgrade_reduce_debuff_duration',
      bonus: 24,
      stages: ['mid', 'late'],
      tip: 'Purges Still Life tether and Flow State slows while granting move speed to break sightline (note: cannot purge Abstract Landscape ult).',
    },
    {
      itemClassName: 'upgrade_tech_purge',
      bonus: 28,
      stages: ['mid', 'late'],
      tip: 'Heavy passive Spirit Resist against Violet\'s sustained Flow State, Still Life, and Abstract Landscape damage.',
    },
    {
      itemClassName: 'upgrade_targeted_silence',
      bonus: 30,
      stages: ['mid', 'late'],
      tip: 'Silences Violet to break her Living Ink -> Flow State reset loop and deny Abstract Landscape.',
    },
    {
      itemClassName: 'upgrade_unstoppable',
      bonus: 32,
      stages: ['late'],
      tip: 'Ignores Still Life stun and walks straight out of Abstract Landscape without getting silenced or slowed.',
    },
  ],
  hero_baba: [
    {
      itemClassName: 'upgrade_vex_barrier',
      bonus: 26,
      stages: ['lane', 'mid'],
      tip: 'Auto-triggers a protective barrier when Baba\'s Brew silences you or Feed The Birds hexes you.',
    },
    {
      itemClassName: 'upgrade_target_stun',
      bonus: 32,
      stages: ['mid', 'late'],
      tip: 'Interrupts Baba\'s channeled Feed The Birds from safe range before the pigeon hex lands.',
    },
    {
      itemClassName: 'upgrade_reduce_debuff_duration',
      bonus: 26,
      stages: ['mid', 'late'],
      tip: 'Cleanses Baba\'s Brew Silence/Burn immediately with a heal & speed burst to reposition (note: cannot purge Feed The Birds ult).',
    },
    {
      itemClassName: 'upgrade_tech_purge',
      bonus: 28,
      stages: ['mid', 'late'],
      tip: 'Cuts Baba\'s heavy Threadsap, Brew burn, and Feed The Birds spirit damage even through Brew\'s resist shred.',
    },
    {
      itemClassName: 'upgrade_glitch',
      bonus: 34,
      stages: ['late'],
      tip: 'Cancels Feed The Birds immediately, purges Baba\'s Brew barriers, and stops Granny Long Legs escapes.',
    },
    {
      itemClassName: 'upgrade_unstoppable',
      bonus: 30,
      stages: ['late'],
      tip: 'Ignores Feed The Birds slow/pigeon hex and Baba\'s Brew Silence completely in teamfights.',
    },
  ],
};
