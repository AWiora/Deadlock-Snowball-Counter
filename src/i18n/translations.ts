import type {
  CounterRole,
  DamageProfile,
  DeadlockHero,
  DeadlockItem,
  EnemyModifier,
  GameStage,
  ItemSlot,
  Language,
  ThreatMechanic,
} from '../types/deadlock';

export function getHeroDisplayName(hero: DeadlockHero, lang: Language): string {
  return lang === 'de' && hero.nameDe ? hero.nameDe : hero.name;
}

export function getItemDisplayName(item: DeadlockItem, lang: Language): string {
  return lang === 'de' && item.nameDe ? item.nameDe : item.name;
}

export const UI_TEXT = {
  de: {
    brandTitle: 'DEADLOCK KONTER',
    brandSub: 'Schneller Mid-Game Konter-Builder',
    statusLive: 'Live-Patch',
    statusCached: 'Live (Cache)',
    statusSnapshot: 'Snapshot',
    share: 'Teilen',
    shareCopied: 'Link kopiert!',
    shareDisabledTitle: 'Wähle zuerst einen Gegner-Helden zum Teilen',
    shareTitle: 'Matchup-Link für Discord kopieren',

    yourHeroLabel: 'DEIN HELD',
    yourHeroEmpty: 'Deinen Helden wählen...',
    yourHeroHint: 'Für passende Item-Synergien',
    yourHeroSelectBtn: 'Wählen',
    yourHeroChangeBtn: 'Ändern',
    yourHeroPickingBtn: 'Klicke unten...',
    yourHeroClearAria: 'Eigenen Helden entfernen',

    enemyLabel: 'GEGNERISCHE BEDROHUNGEN (BIS ZU 3)',
    enemyEmpty: 'Klicke unten 1–3 Gegner an...',
    enemySlotEmpty: (slot: number) => `+ Gegner ${slot}`,
    enemySelectBtn: 'Alle 42',
    enemyChangeBtn: 'Wechseln',
    clearEnemiesBtn: 'Gegner leeren',
    clearEnemiesTitle: 'Alle gewählten Gegner für das nächste Match zurücksetzen (behält deinen Helden)',
    rosterHintEnemy: '1-Klick-Roster: Klicke direkt auf bis zu 3 Gegner, die dir im Match Probleme machen',
    rosterHintMyHero: 'Wähle jetzt unten im Roster deinen eigenen Helden aus (oder klicke auf Abbrechen)',
    cancelMyPickBtn: 'Abbrechen',
    youBadge: 'DU',
    focusedEnemyBadge: 'Toggles aktiv',
    backToPrev: (name: string) => `Zurück zu ${name}`,

    stageLabel: 'SPIELPHASE',
    stages: {
      lane: { label: 'Lane / Früh', budget: '800–1,6k' },
      mid: { label: 'Mid-Game', budget: '1,6k–3,2k' },
      late: { label: 'Late-Game', budget: '3,2k–6,4k' },
    } as Record<GameStage, { label: string; budget: string }>,

    activeSlotsFullLabel: 'AKTIVE SLOTS',
    activeSlotsFullBtn: 'Aktive Slots voll',
    activeSlotsFullSub: 'Nur passive Items',
    activeSlotsFullTitle: 'Aktive Items ausblenden, wenn alle 4 Aktiv-Slots belegt sind',

    baseKitLabel: 'Basis-Kit automatisch berücksichtigt:',

    damageLabel: 'GEGNER-SCHADENSFOKUS',
    resetBtn: 'Zurücksetzen',
    resetTitle: 'Schadensfokus zurücksetzen und Extra-Toggles löschen',
    damageOptions: {
      bullet: 'Kugeln',
      equal: 'Gemischt',
      spirit: 'Spirit',
    } as Record<DamageProfile, string>,

    extraTraitsLabel: 'GEGNER BAUT EXTRA (OPTIONAL — ANKLICKEN FALLS ER ES STACKT)',
    modifiers: {
      tanky: { label: 'Tanky / Viel HP', hint: 'Baut viel HP, Rüstung oder Zähigkeit' },
      healing: { label: 'Starke Heilung', hint: 'Baut Lebensraub, Heilung oder Leech' },
      cc: { label: 'Viel CC / Debuffs', hint: 'Baut Niederschlag, Verfluchtes Relikt, Verlangsamungsfluch usw.' },
      melee: { label: 'Nahkampf-Build', hint: 'Baut Nahkampf-Items wie Zerschmetternde Fäuste / Nahkampfangriff' },
    } as Record<EnemyModifier, { label: string; hint: string }>,

    resultsStageTitle: {
      lane: 'Lane / Früh-Konter',
      mid: 'Mid-Game Konter',
      late: 'Late-Game Konter',
    } as Record<GameStage, string>,
    vsWord: 'gegen',
    asWord: 'als',

    passiveBannerLead: 'Nur-Passiv-Modus:',
    passiveBannerBody: (count: number) =>
      `${count} Top-Aktiv-${count === 1 ? 'Konter ausgeblendet' : 'Konter ausgeblendet'}, da deine Aktiv-Slots voll sind.`,
    showActivesBtn: 'Aktive zeigen',

    topBadge: 'TOP',
    activeTag: 'AKTIV',
    passiveTag: 'PASSIV',
    hardCounterBadge: 'Harter Konter',
    hardCounterTitle: 'Spezifischer mechanischer Konter gegen diesen Helden',
    tierLabels: {
      'Best Counter': 'Bester Konter',
      'Core Counter': 'Kern-Konter',
      'Strong Pick': 'Starke Wahl',
    },
    useLabel: 'Einsatz:',
    soulTitle: (tier: number, cost: number) => `Stufe-${tier}-Item (${cost.toLocaleString('de-DE')} Seelen)`,
    copyItemTitle: 'Itemnamen für die In-Game-Shop-Suche kopieren',
    copiedItemLabel: 'Kopiert!',
    countersMultiBadge: (matched: number, total: number, names: string) =>
      total > 1 ? `Kontert ${matched}/${total}: ${names}` : `Gegen ${names}`,
    upgradeFromBadge: (name: string, cost: string) => `↖ Aus: ${name} (${cost})`,
    upgradeToBadge: (name: string, cost: string) => `→ Wird zu: ${name} (${cost})`,

    slots: {
      weapon: 'Waffe',
      vitality: 'Vitalität',
      spirit: 'Spirit',
    } as Record<ItemSlot, string>,

    roles: {
      Shutdown: 'Ausschalten',
      Burst: 'Wegbursten',
      Survival: 'Überleben',
      'Anti-Gun': 'Anti-Waffe',
      'Anti-Spirit': 'Anti-Spirit',
      'Anti-Heal': 'Anti-Heilung',
      'Anti-Melee': 'Anti-Nahkampf',
      Shred: 'Rüstungsbruch',
      Cleanse: 'Entzaubern',
      Control: 'Kontrolle',
    } as Record<CounterRole, string>,

    threats: {
      rapid_fire: 'Hohe Feuerrate',
      on_hit_procs: 'On-Hit-Effekte',
      bullet_ult: 'Kugel-Ult',
      channeled_ult: 'Kanalisierte Ult',
      airborne: 'Fliegend',
      high_mobility: 'Hohe Mobilität',
      fragile_glass_cannon: 'Wenig HP (Glaskanone)',
      cleanseable_debuff: 'Debuffs / DoT',
      telegraphed_burst: 'Starker Burst',
      hard_cc: 'Harter CC',
      ability_spam: 'Fähigkeiten-Spam',
      sustained_spirit: 'Spirit-DoT',
      heavy_healing: 'Eigene Heilung',
      melee_brawler: 'Nahkampf',
      buff_shield_stacker: 'Schilde / Buffs',
      close_range_dive: 'Nahkampf-Dive',
      long_range_poke: 'Hohe Reichweite',
    } as Record<ThreatMechanic, string>,

    offenseSectionTitle: 'Angriff / Ausschalten',
    offenseSectionSub: 'Festhalten, stilllegen, Anti-Heilung & Wegbursten',
    defenseSectionTitle: 'Verteidigung / Überleben',
    defenseSectionSub: 'Schaden abfangen, Debuffs entfernen & Kombos überleben',
    recommendedStanceBadge: 'Empfohlener Fokus',
    stanceReasonOffense: (name: string) =>
      `${name} hat wenig HP oder hohe Flucht-Mobilität — festhalten, stilllegen & wegbursten ist oft stärker als reine Verteidigung.`,
    stanceReasonDefense: (name: string) =>
      `${name} droht dich mit hohem Burst, CC oder Dauerfeuer rauszunehmen — erst überleben, dann zurückschlagen.`,
    stanceReasonBalanced: (name: string) =>
      `Gegen ${name} lohnen sich beide Wege — wähle Angriff zum Ausschalten oder Verteidigung zum Überleben.`,

    synergy: {
      gun: (hero: string) => `Passt stark zu ${hero}s Waffenschaden`,
      spirit: (hero: string) => `Skaliert sauber mit ${hero}s Spirit-Kit`,
      firerate: (hero: string) => `Löst schnell durch ${hero}s Feuerrate aus`,
      spiritProccer: (hero: string) => `Wird zuverlässig durch ${hero}s Fähigkeiten ausgelöst`,
      closeRange: (hero: string) => `Passt zu ${hero}s Nahkampf-Spielstil`,
      longRange: (hero: string) => `Hält ${hero} sicher auf Distanz`,
      supportive: (hero: string) => `Doppelt stark als Team-Utility auf ${hero}`,
    },

    emptyBadge: 'Konter-Lookup unter 5 Sekunden',
    emptyHeading: 'Wer snowballt gerade oder macht Druck auf deiner Lane?',
    emptyDesc:
      'Wähle oben deinen Helden und klicke die gegnerische Bedrohung an — du bekommst sofort die besten Konter-Items passend zu Spielphase, gegnerischem Build und deinem Kit.',
    emptyCta: (count: number) => `Alle ${count} Helden durchsuchen`,
    quickPickLabel: 'HÄUFIGE SNOWBALL-BEDROHUNGEN — 1-KLICK-AUSWAHL',

    modalMyTitle: 'Deinen Helden wählen',
    modalMySub: 'Bleibt für das ganze Match gespeichert, damit Konter-Items optimal zu deinem Kit passen.',
    modalEnemyTitle: 'Gegnerische Bedrohung wählen',
    modalEnemySub: 'Basis-Kit & Schadensfokus werden automatisch geladen — Extra-Toggles nur bei Bedarf anklicken.',
    modalSearchPlaceholder: 'Heldenname eintippen (z. B. Haze, Abrams, Seven) + Enter...',
    modalNoMatch: (q: string) => `Kein Held gefunden für „${q}“`,

    footerPrefix: 'Deadlock Konter-Helper · Item-Icons & Seelenkosten via',
  },
  en: {
    brandTitle: 'DEADLOCK COUNTER',
    brandSub: 'Fast Mid-Game Counter Builder',
    statusLive: 'Live Patch',
    statusCached: 'Live Cached',
    statusSnapshot: 'Snapshot',
    share: 'Share',
    shareCopied: 'Link Copied!',
    shareDisabledTitle: 'Select an enemy hero first to share a matchup',
    shareTitle: 'Copy shareable matchup link for Discord',

    yourHeroLabel: 'YOUR HERO',
    yourHeroEmpty: 'Select Your Hero...',
    yourHeroHint: 'Tailors item synergy to your kit',
    yourHeroSelectBtn: 'Pick',
    yourHeroChangeBtn: 'Change',
    yourHeroPickingBtn: 'Click below...',
    yourHeroClearAria: 'Clear your hero',

    enemyLabel: 'ENEMY THREATS (UP TO 3)',
    enemyEmpty: 'Click 1–3 enemies below...',
    enemySlotEmpty: (slot: number) => `+ Enemy ${slot}`,
    enemySelectBtn: 'Browse 42',
    enemyChangeBtn: 'Switch',
    clearEnemiesBtn: 'Clear Enemies',
    clearEnemiesTitle: 'Clear all selected enemies for your next match (keeps your hero)',
    rosterHintEnemy: '1-Click Roster: Click up to 3 problem enemies directly below',
    rosterHintMyHero: 'Click your own hero in the roster below (or click Cancel)',
    cancelMyPickBtn: 'Cancel',
    youBadge: 'YOU',
    focusedEnemyBadge: 'Toggles active',
    backToPrev: (name: string) => `Back to ${name}`,

    stageLabel: 'GAME STAGE',
    stages: {
      lane: { label: 'Lane / Early', budget: '800–1.6k' },
      mid: { label: 'Mid Game', budget: '1.6k–3.2k' },
      late: { label: 'Late Game', budget: '3.2k–6.4k' },
    } as Record<GameStage, { label: string; budget: string }>,

    activeSlotsFullLabel: 'ACTIVE SLOTS',
    activeSlotsFullBtn: 'Active Slots Full',
    activeSlotsFullSub: 'Passive items only',
    activeSlotsFullTitle: 'Hide Active items when all 4 of your active slots are already full',

    baseKitLabel: 'Base kit already factored in:',

    damageLabel: 'ENEMY DAMAGE FOCUS',
    resetBtn: 'Reset',
    resetTitle: 'Reset damage focus and clear extra build toggles',
    damageOptions: {
      bullet: 'Bullet',
      equal: 'Equal / Mixed',
      spirit: 'Spirit',
    } as Record<DamageProfile, string>,

    extraTraitsLabel: 'ENEMY IS BUILDING EXTRA (OPTIONAL — CLICK IF THEY STACK IT)',
    modifiers: {
      tanky: { label: 'Tanky / High HP', hint: 'Stacking HP, armor, or Fortitude' },
      healing: { label: 'Heavy Healing', hint: 'Building Leech, Lifesteal, or Healing Nova' },
      cc: { label: 'Heavy CC / Debuffs', hint: 'Building Knockdown, Cursed Relic, Slowing Hex, etc.' },
      melee: { label: 'Melee Build', hint: 'Building Crushing Fists, Melee Charge, Lifestrike' },
    } as Record<EnemyModifier, { label: string; hint: string }>,

    resultsStageTitle: {
      lane: 'Lane / Early Counters',
      mid: 'Mid Game Counters',
      late: 'Late Game Counters',
    } as Record<GameStage, string>,
    vsWord: 'vs',
    asWord: 'as',

    passiveBannerLead: 'Passive-only mode:',
    passiveBannerBody: (count: number) =>
      `Hiding ${count} top Active ${count === 1 ? 'counter' : 'counters'} because your active slots are full.`,
    showActivesBtn: 'Show Actives',

    topBadge: 'TOP',
    activeTag: 'ACTIVE',
    passiveTag: 'PASSIVE',
    hardCounterBadge: 'Hard Counter',
    hardCounterTitle: 'Specific mechanical hard-counter for this hero',
    tierLabels: {
      'Best Counter': 'Best Counter',
      'Core Counter': 'Core Counter',
      'Strong Pick': 'Strong Pick',
    },
    useLabel: 'Use:',
    soulTitle: (tier: number, cost: number) => `Tier ${tier} item (${cost.toLocaleString('en-US')} Souls)`,
    copyItemTitle: 'Copy item name for Deadlock in-game shop search',
    copiedItemLabel: 'Copied!',
    countersMultiBadge: (matched: number, total: number, names: string) =>
      total > 1 ? `Counters ${matched}/${total}: ${names}` : `vs ${names}`,
    upgradeFromBadge: (name: string, cost: string) => `↖ From: ${name} (${cost})`,
    upgradeToBadge: (name: string, cost: string) => `→ Upgrades to: ${name} (${cost})`,

    slots: {
      weapon: 'Weapon',
      vitality: 'Vitality',
      spirit: 'Spirit',
    } as Record<ItemSlot, string>,

    roles: {
      Shutdown: 'Shutdown',
      Burst: 'Burst Down',
      Survival: 'Survival',
      'Anti-Gun': 'Anti-Gun',
      'Anti-Spirit': 'Anti-Spirit',
      'Anti-Heal': 'Anti-Heal',
      'Anti-Melee': 'Anti-Melee',
      Shred: 'Shred',
      Cleanse: 'Cleanse',
      Control: 'Control',
    } as Record<CounterRole, string>,

    threats: {
      rapid_fire: 'Rapid Fire',
      on_hit_procs: 'On-Hit Procs',
      bullet_ult: 'Bullet Ult',
      channeled_ult: 'Channeled Ult',
      airborne: 'Airborne',
      high_mobility: 'High Mobility',
      fragile_glass_cannon: 'Low HP (Glass Cannon)',
      cleanseable_debuff: 'Debuffs / DoT',
      telegraphed_burst: 'Heavy Burst',
      hard_cc: 'Hard CC',
      ability_spam: 'Ability Spam',
      sustained_spirit: 'Spirit DoT',
      heavy_healing: 'Innate Sustain',
      melee_brawler: 'Melee',
      buff_shield_stacker: 'Shields / Buffs',
      close_range_dive: 'Close Dive',
      long_range_poke: 'Long Range',
    } as Record<ThreatMechanic, string>,

    offenseSectionTitle: 'Offense / Shut Down',
    offenseSectionSub: 'Lock down, silence, anti-heal & burst them out',
    defenseSectionTitle: 'Defense / Survive',
    defenseSectionSub: 'Mitigate damage, cleanse debuffs & survive combos',
    recommendedStanceBadge: 'Recommended Focus',
    stanceReasonOffense: (name: string) =>
      `${name} has low HP or slippery escapes — locking them down and bursting them out is often stronger than pure defense.`,
    stanceReasonDefense: (name: string) =>
      `${name} threatens to delete or lock you down — surviving their burst/combo first wins the fight.`,
    stanceReasonBalanced: (name: string) =>
      `Both angles work well vs ${name} — pick Offense to shut them down or Defense to outlast their damage.`,

    synergy: {
      gun: (hero: string) => `Great fit for ${hero}'s gun damage`,
      spirit: (hero: string) => `Scales cleanly with ${hero}'s spirit kit`,
      firerate: (hero: string) => `Procs fast with ${hero}'s fire rate`,
      spiritProccer: (hero: string) => `Applies reliably off ${hero}'s abilities`,
      closeRange: (hero: string) => `Matches ${hero}'s close-range brawl style`,
      longRange: (hero: string) => `Keeps ${hero} safe at backline range`,
      supportive: (hero: string) => `Doubles as team utility on ${hero}`,
    },

    emptyBadge: 'Sub-5-Second Counter Lookup',
    emptyHeading: 'Who is snowballing or pressuring your lane?',
    emptyDesc:
      'Pick your hero above and click the enemy threat below to get exact counter items tuned to their mechanics, game stage, build toggles, and your kit.',
    emptyCta: (count: number) => `Search All ${count} Heroes`,
    quickPickLabel: 'COMMON SNOWBALL THREATS — 1-CLICK PICK',

    modalMyTitle: 'Select Your Hero',
    modalMySub: 'Stays sticky across the match so counter picks fit your kit (gun vs spirit, range, procs).',
    modalEnemyTitle: 'Select Enemy Threat',
    modalEnemySub: 'Auto-loads base kit & damage focus — only click extra build toggles if they stack them.',
    modalSearchPlaceholder: 'Type hero name (e.g. Haze, Abrams, Seven) and press Enter...',
    modalNoMatch: (q: string) => `No hero matching "${q}"`,

    footerPrefix: 'Deadlock Counter Helper · Item icons & soul costs via',
  },
} as const;
