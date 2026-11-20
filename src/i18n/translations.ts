import type {
  CounterActionVerb,
  CounterRole,
  DamageProfile,
  DeadlockHero,
  DeadlockItem,
  EnemyModifier,
  ItemSlot,
  KitAmplifierAxis,
  Language,
  PriceTier,
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
    brandTitle: 'DEADLOCK COUNTER',
    brandSub: 'Schneller Mid-Game Counter-Builder',
    statusLive: 'Live-Patch',
    statusCached: 'Live (Cache)',
    statusSnapshot: 'Snapshot',
    share: 'Teilen',
    shareCopied: 'Link kopiert!',
    shareDisabledTitle: 'Wähle zuerst einen Gegner-Helden zum Teilen',
    shareTitle: 'Matchup-Link für Discord kopieren',

    yourHeroLabel: 'Dein Held',
    yourHeroEmpty: 'Deinen Helden wählen...',
    yourHeroHint: 'Für passende Item-Synergien',
    yourHeroSelectBtn: 'Wählen',
    yourHeroChangeBtn: 'Ändern',
    yourHeroPickingBtn: 'Klicke unten...',
    yourHeroClearAria: 'Eigenen Helden entfernen',

    enemyLabel: 'Gegner',
    enemyEmpty: 'Noch keiner gewählt',
    enemySlotEmpty: (slot: number) => `+ Gegner ${slot}`,
    enemySelectBtn: 'Alle 44',
    enemyChangeBtn: 'Wechseln',
    clearEnemiesBtn: 'Leeren',
    clearEnemiesTitle: 'Alle gewählten Gegner für das nächste Match zurücksetzen (behält deinen Helden)',
    rosterHintEnemy: 'Klick bis zu 3 Gegner an oder tippe einfach ihren Namen.',
    rosterHintMyHero: 'Wähle deinen eigenen Helden.',
    cancelMyPickBtn: 'Abbrechen',
    youBadge: 'DU',
    focusedEnemyBadge: 'Angepasst',
    backToPrev: (name: string) => `Zurück zu ${name}`,

    priceTierLabel: 'Souls',
    priceTiers: {
      '800': { label: '800', sub: 'Early' },
      '1600': { label: '1.600', sub: 'Lane' },
      '3200': { label: '3.200', sub: 'Mid' },
      '6400': { label: '6.400', sub: 'Late' },
      all: { label: 'Alle', sub: 'Stufen' },
    } as Record<PriceTier, { label: string; sub: string }>,

    activeSlotsFullLabel: 'Active Slots',
    activeSlotsFullBtn: 'Active Slots voll',
    activeSlotsFullSub: 'Nur passive Items',
    activeSlotsFullTitle: 'Für volle Active Slots: zeigt nur noch passive Items',

    baseKitLabel: 'Schon eingerechnet',

    damageLabel: 'Damage-Fokus',
    metaSplitCaption: (name: string) => `So bauen ${name}-Spieler in aktuellen Matches`,
    metaSplitAria: (gun: number, spirit: number) =>
      `Aktuelle Matches: ${gun} Prozent Weapon-Souls, ${spirit} Prozent Spirit-Souls`,
    resetBtn: 'Reset',
    resetTitle: 'Damage-Fokus und „Stackt zusätzlich“ zurücksetzen',
    damageOptions: {
      bullet: 'Weapon',
      equal: 'Hybrid',
      spirit: 'Spirit',
    } as Record<DamageProfile, string>,

    customizeForLabel: 'Anpassen für:',
    extraTraitsLabel: 'Stackt zusätzlich',
    modifiers: {
      tanky: { label: 'Tanky', hint: 'Stackt viel HP, Bullet/Spirit Resist, Barriers oder Fortitude' },
      healing: { label: 'Heilung', hint: 'Baut Lifesteal, Leech, Healing Nova oder viel Sustain' },
      cc: { label: 'CC', hint: 'Baut Knockdown, Cursed Relic, Stuns, Roots oder Silences' },
      melee: { label: 'Melee', hint: 'Baut Melee-Items wie Crushing Fists, Melee Charge oder Lifestrike' },
      mobility: { label: 'Mobilität', hint: 'Baut Warp Stone, Majestic Leap, Fleetfoot oder Magic Carpet zum Escapen' },
    } as Record<EnemyModifier, { label: string; hint: string }>,

    emptyOffense800Title: 'Kein echter Offense-Counter für 800 Souls',
    emptyOffense800Body:
      'Echte Offense-Counter (Slowing Hex, Healbane, Spirit Sap usw.) starten erst ab 1.600 Souls.',
    switchTo1600Btn: 'Zu 1.600 wechseln',
    emptyColumnGeneric: 'Keine passenden Counter auf dieser Souls-Stufe.',
    switchToAllBtn: 'Alle Souls-Stufen zeigen',
    vsWord: 'vs',
    asWord: 'als',

    passiveBannerBody: (count: number) =>
      `${count} Active ${count === 1 ? 'Item' : 'Items'} ausgeblendet, weil deine Active Slots voll sind.`,
    showActivesBtn: 'Wieder einblenden',

    topBadge: 'TOP',
    activeTag: 'ACTIVE',
    passiveTag: 'PASSIVE',
    hardCounterBadge: 'Hard Counter',
    hardCounterTitle: 'Spezifischer mechanischer Hard-Counter gegen diesen Helden',
    kitSynergyBadge: 'Kit-Synergy',
    kitSynergyTitle: 'Verstärkt eine Ability deines Helden, die diesen Gegner direkt countert',
    kitAmplifierReason: (
      axis: KitAmplifierAxis,
      ability: string,
      hero: string,
      effect: string,
    ): string => {
      switch (axis) {
        case 'cooldown':
          return `Verstärkt ${ability} (${hero}) — kürzerer Cooldown: ${effect}.`;
        case 'range':
          return `Verstärkt ${ability} (${hero}) — mehr Range/Radius: ${effect}.`;
        case 'duration':
          return `Verstärkt ${ability} (${hero}) — längere Duration: ${effect}.`;
        case 'charges':
          return `Verstärkt ${ability} (${hero}) — extra Charges: ${effect}.`;
        case 'echo':
          return `Resettet ${ability} (${hero}) sofort — Double-Cast: ${effect}.`;
        case 'refresher':
          return `Resettet ${ability} (${hero}) & Kit sofort — Double-Cast: ${effect}.`;
        case 'gap_close':
          return `Bringt ${hero} direkt in Range für ${ability}: ${effect}.`;
      }
    },
    kitAmplifierUse: (
      axis: KitAmplifierAxis,
      ability: string,
      isImbue: boolean,
    ): string => {
      if (axis === 'echo') {
        return `Auf ${ability} imbuen und nach dem ersten Cast direkt resetten für einen zweiten Cast.`;
      }
      if (axis === 'refresher') {
        return `Direkt nach ${ability} aktivieren, um sofort erneut zu countern oder ein zweites Target zu locken.`;
      }
      if (axis === 'gap_close') {
        return `Per Active in die Luft springen und direkt in Range für ${ability} landen.`;
      }
      if (isImbue) {
        return `Auf ${ability} imbuen — halte ${ability} gezielt für das gegnerische Key-Window bereit.`;
      }
      return `Passiv — halte ${ability} gezielt bereit, um gegnerische Key-Abilities sofort zu countern.`;
    },
    kitAmplifierSynergyNote: (hero: string, ability: string) =>
      `Bufft ${hero}s ${ability}`,
    kitBoostPrefix: 'Verstärkt',
    kitBoostAxisLabel: {
      cooldown: '-CD',
      range: '+Range',
      duration: '+Dauer',
      charges: '+Charges',
      echo: 'Double-Cast',
      refresher: 'Full Reset',
      gap_close: 'Gap-Close',
    } as Record<KitAmplifierAxis, string>,
    actionVerbs: {
      cancels: 'Bricht ab',
      grounds: 'Holt runter',
      cleanses: 'Cleansed',
      parries: 'Pariert',
      blocks: 'Blockt',
      absorbs: 'Absorbiert',
      reflects: 'Reflektiert',
      silences: 'Silenced',
      disarms: 'Disarmt',
      cuts_heal: 'Anti-Heal',
      shortens: 'Verkürzt',
      shreds: 'Shredded',
      punishes: 'Bestraft',
      controls: 'Lockdown',
      weakens: 'Schwächt',
      escapes: 'Entkommt',
      sustains: 'Heilt gegen',
      mitigates: 'Reduziert',
      strips: 'Entfernt',
      bursts: 'Burstet',
      counters: 'Countert',
    } as Record<CounterActionVerb, string>,
    mechanicFallbacks: {
      melee: 'Heavy Melee',
      bullet_dps: 'Weapon-DPS',
      spirit_dps: 'Spirit-DPS',
      tanky: 'Tanky',
      healing: 'Heilung',
      low_hp: 'Low HP (Glass Cannon)',
    },
    tierLabels: {
      'Best Counter': 'Best Counter',
      'Core Counter': 'Core Counter',
      'Strong Pick': 'Strong Pick',
    },
    useLabel: 'Use:',
    soulTitle: (tier: number, cost: number) => `Tier-${tier}-Item (${cost.toLocaleString('de-DE')} Souls)`,
    copyItemTitle: 'Itemnamen für die In-Game-Shop-Suche kopieren',
    copiedItemLabel: 'Kopiert!',
    countersMultiBadge: (matched: number, total: number) => `Countert ${matched}/${total}`,
    countersSingleBadge: (name: string) => `vs ${name}`,
    dynamicMechanicReason: (triggers: string) => `Countert gezielt ${triggers}.`,
    damageReasonLabel: {
      bullet: 'Weapon-Damage',
      equal: 'Hybrid-Damage',
      spirit: 'Spirit-Damage',
    } as Record<DamageProfile, string>,
    upgradeFromBadge: (name: string, cost: string) => `↖ Aus: ${name} (${cost})`,
    upgradeToBadge: (name: string, cost: string) => `→ Upgrade zu: ${name} (${cost})`,

    slots: {
      weapon: 'Weapon',
      vitality: 'Vitality',
      spirit: 'Spirit',
    } as Record<ItemSlot, string>,

    roles: {
      Shutdown: 'Shutdown',
      Burst: 'Burst',
      Survival: 'Survival',
      'Anti-Gun': 'Anti-Weapon',
      'Anti-Spirit': 'Anti-Spirit',
      'Anti-Heal': 'Anti-Heal',
      'Anti-Melee': 'Anti-Melee',
      Shred: 'Resist-Shred',
      Cleanse: 'Cleanse',
      Control: 'CC',
    } as Record<CounterRole, string>,

    threats: {
      rapid_fire: 'Schnelles Dauerfeuer',
      on_hit_procs: 'Stackt pro Treffer',
      bullet_ult: 'Weapon-Ult',
      channeled_ult: 'Unterbrechbare Ult',
      airborne: 'Kämpft aus der Luft',
      high_mobility: 'Sehr mobil',
      fragile_glass_cannon: 'Wenig HP',
      cleanseable_debuff: 'Schaden über Zeit',
      telegraphed_burst: 'Viel Sofortschaden',
      hard_cc: 'Stuns & Roots',
      ability_spam: 'Spammt Fähigkeiten',
      sustained_spirit: 'Spirit-Dauerschaden',
      heavy_healing: 'Heilt sich viel',
      melee_brawler: 'Nahkampf',
      buff_shield_stacker: 'Schilde',
      close_range_dive: 'Springt dich an',
      long_range_poke: 'Poke aus der Distanz',
    } as Record<ThreatMechanic, string>,

    offenseSectionTitle: 'Ausschalten',
    offenseSectionSub: 'Lockdown, Silence, Anti-Heal & Burst',
    defenseSectionTitle: 'Überleben',
    defenseSectionSub: 'Damage mitigieren, Debuffs cleansen & Combos überleben',
    recommendedStanceBadge: 'Empfohlener Fokus',
    stanceReasonOffense: (name: string) =>
      `${name} ist squishy oder hat starke Escapes — Lockdown, Silence & Wegbursten ist oft stärker als reine Defense.`,
    stanceReasonDefense: (name: string) =>
      `${name} droht dich mit Heavy Burst, CC oder DPS zu deleten — erst die Combo überleben, dann zurückschlagen.`,
    stanceReasonBalanced: (name: string) =>
      `Gegen ${name} funktionieren beide Richtungen — wähle Offense für den Shutdown oder Defense zum Überleben.`,

    synergy: {
      gun: (hero: string) => `Passt stark zu ${hero}s Weapon-Damage`,
      spirit: (hero: string) => `Skaliert sauber mit ${hero}s Spirit-Kit`,
      firerate: (hero: string) => `Procct schnell durch ${hero}s Fire Rate`,
      spiritProccer: (hero: string) => `Procct zuverlässig über ${hero}s Abilities`,
      closeRange: (hero: string) => `Passt zu ${hero}s Close-Range-Brawl-Stil`,
      longRange: (hero: string) => `Hält ${hero} sicher auf Backline-Range`,
      supportive: (hero: string) => `Doppelt stark als Team-Utility auf ${hero}`,
    },

    emptyBadge: 'Counter-Lookup unter 5 Sekunden',
    emptyHeading: 'Wer snowballt gerade oder macht Druck auf deiner Lane?',
    emptySub: 'Klick einen Gegner im Roster an oder tippe einfach seinen Namen.',
    searchPlaceholderEnemy: 'Helden suchen',
    searchPlaceholderMy: 'Deinen Helden suchen',
    searchTypeHint: 'Einfach lostippen',
    searchEnterHint: 'Enter',
    searchNoMatch: (q: string) => `Kein Held passt zu „${q}“`,
    addEnemyBtn: 'Gegner',
    addEnemyTitle: 'Weiteren Gegner hinzufügen',
    rosterDoneBtn: 'Fertig',
    countersVs: 'Konter gegen',
    tuningTitle: (name: string) => `Build von ${name}`,
    tuningOpenBtn: 'Anpassen',
    tuningCloseBtn: 'Einklappen',
    passiveOnlyShort: 'Actives ausblenden',
    tierKeysTitle: 'Tasten 1–5 wechseln die Souls-Stufe',
    removeEnemyAria: (name: string) => `${name} entfernen`,
    rosterToggleBtn: 'Roster',
    keyHintSearch: 'Held suchen',
    keyHintAdd: 'Hinzufügen',
    keyHintSouls: 'Souls-Stufe',
    keyHintClear: 'Suche leeren',
    emptyDesc:
      'Wähle oben deinen Helden und klicke den Gegner an, der dich unter Druck setzt — du bekommst sofort die besten Counter-Items passend zu Souls-Stufe, gegnerischem Build und deinem Kit.',
    emptyCta: (count: number) => `Alle ${count} Helden durchsuchen`,
    quickPickLabel: 'HÄUFIGE SNOWBALL-THREATS — 1-KLICK-PICK',

    modalMyTitle: 'Deinen Helden wählen',
    modalMySub: 'Bleibt für das ganze Match gespeichert, damit Counter-Items optimal zu deinem Kit passen.',
    modalEnemyTitle: 'Gegner-Threat wählen',
    modalEnemySub: 'Base-Kit & Damage-Fokus werden automatisch geladen — „Stackt zusätzlich“ nur bei Bedarf anklicken.',
    modalSearchPlaceholder: 'Heldennamen eintippen (z. B. Haze, Abrams, Seven) + Enter …',
    modalNoMatch: (q: string) => `Kein Held gefunden für „${q}“`,

    footerPrefix: 'Deadlock Counter-Helper · Item-Icons & Soul-Costs via',
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

    yourHeroLabel: 'Your hero',
    yourHeroEmpty: 'Select Your Hero...',
    yourHeroHint: 'Tailors item synergy to your kit',
    yourHeroSelectBtn: 'Pick',
    yourHeroChangeBtn: 'Change',
    yourHeroPickingBtn: 'Click below...',
    yourHeroClearAria: 'Clear your hero',

    enemyLabel: 'Enemies',
    enemyEmpty: 'None picked yet',
    enemySlotEmpty: (slot: number) => `+ Enemy ${slot}`,
    enemySelectBtn: 'Browse 44',
    enemyChangeBtn: 'Switch',
    clearEnemiesBtn: 'Clear',
    clearEnemiesTitle: 'Clear all selected enemies for your next match (keeps your hero)',
    rosterHintEnemy: 'Click up to 3 enemies or just type their name.',
    rosterHintMyHero: 'Pick your own hero.',
    cancelMyPickBtn: 'Cancel',
    youBadge: 'YOU',
    focusedEnemyBadge: 'Customized',
    backToPrev: (name: string) => `Back to ${name}`,

    priceTierLabel: 'Souls',
    priceTiers: {
      '800': { label: '800', sub: 'Early' },
      '1600': { label: '1,600', sub: 'Lane' },
      '3200': { label: '3,200', sub: 'Mid' },
      '6400': { label: '6,400', sub: 'Late' },
      all: { label: 'All', sub: 'Tiers' },
    } as Record<PriceTier, { label: string; sub: string }>,

    activeSlotsFullLabel: 'Active slots',
    activeSlotsFullBtn: 'Active Slots Full',
    activeSlotsFullSub: 'Passive items only',
    activeSlotsFullTitle: 'For full active slots: shows passive items only',

    baseKitLabel: 'Already factored in',

    damageLabel: 'Damage focus',
    metaSplitCaption: (name: string) => `How ${name} players build in recent matches`,
    metaSplitAria: (gun: number, spirit: number) =>
      `Recent matches: ${gun} percent weapon souls, ${spirit} percent spirit souls`,
    resetBtn: 'Reset',
    resetTitle: 'Reset damage focus and extra stacks',
    damageOptions: {
      bullet: 'Weapon',
      equal: 'Hybrid',
      spirit: 'Spirit',
    } as Record<DamageProfile, string>,

    customizeForLabel: 'Customize for:',
    extraTraitsLabel: 'Also stacking',
    modifiers: {
      tanky: { label: 'Tanky', hint: 'Stacking HP, armor, barriers, or Fortitude' },
      healing: { label: 'Healing', hint: 'Building Leech, Lifesteal, or Healing Nova' },
      cc: { label: 'CC', hint: 'Building Knockdown, Cursed Relic, stuns, or debuffs' },
      melee: { label: 'Melee', hint: 'Building Crushing Fists, Melee Charge, Lifestrike' },
      mobility: { label: 'Mobility', hint: 'Building Warp Stone, Majestic Leap, Fleetfoot, or Magic Carpet to escape' },
    } as Record<EnemyModifier, { label: string; hint: string }>,

    emptyOffense800Title: 'No true Offense counters at 800 Souls',
    emptyOffense800Body:
      'True offensive counters (Slowing Hex, Healbane, Spirit Sap, etc.) start at 1,600 Souls.',
    switchTo1600Btn: 'Switch to 1,600',
    emptyColumnGeneric: 'No matching counters at this souls tier.',
    switchToAllBtn: 'Show all souls tiers',
    vsWord: 'vs',
    asWord: 'as',

    passiveBannerBody: (count: number) =>
      `${count} active ${count === 1 ? 'item' : 'items'} hidden because your active slots are full.`,
    showActivesBtn: 'Show them again',

    topBadge: 'TOP',
    activeTag: 'ACTIVE',
    passiveTag: 'PASSIVE',
    hardCounterBadge: 'Hard Counter',
    hardCounterTitle: 'Specific mechanical hard-counter for this hero',
    kitSynergyBadge: 'Kit Synergy',
    kitSynergyTitle: 'Empowers an ability in your own hero kit that directly counters this enemy',
    kitAmplifierReason: (
      axis: KitAmplifierAxis,
      ability: string,
      hero: string,
      effect: string,
    ): string => {
      switch (axis) {
        case 'cooldown':
          return `Empowers ${ability} (${hero}) — lower cooldown: ${effect}.`;
        case 'range':
          return `Empowers ${ability} (${hero}) — extended range/radius: ${effect}.`;
        case 'duration':
          return `Empowers ${ability} (${hero}) — longer duration: ${effect}.`;
        case 'charges':
          return `Empowers ${ability} (${hero}) — extra charges: ${effect}.`;
        case 'echo':
          return `Resets ${ability} (${hero}) instantly — double cast: ${effect}.`;
        case 'refresher':
          return `Resets ${ability} (${hero}) & full kit — double cast: ${effect}.`;
        case 'gap_close':
          return `Launches ${hero} straight into range for ${ability}: ${effect}.`;
      }
    },
    kitAmplifierUse: (
      axis: KitAmplifierAxis,
      ability: string,
      isImbue: boolean,
    ): string => {
      if (axis === 'echo') {
        return `Imbue onto ${ability} and immediately reset for a second cast in key fights.`;
      }
      if (axis === 'refresher') {
        return `Activate right after ${ability} to immediately counter again or lock down a second threat.`;
      }
      if (axis === 'gap_close') {
        return `Launch overhead and drop straight into range to land ${ability}.`;
      }
      if (isImbue) {
        return `Imbue onto ${ability} — hold ${ability} ready for their key threat window.`;
      }
      return `Passive — keep ${ability} ready to shut down their core threat on sight.`;
    },
    kitAmplifierSynergyNote: (hero: string, ability: string) =>
      `Empowers ${hero}'s ${ability}`,
    kitBoostPrefix: 'Boosts',
    kitBoostAxisLabel: {
      cooldown: '-CD',
      range: '+Range',
      duration: '+Duration',
      charges: '+Charges',
      echo: 'Double Cast',
      refresher: 'Full Reset',
      gap_close: 'Gap-Close',
    } as Record<KitAmplifierAxis, string>,
    actionVerbs: {
      cancels: 'Cancels',
      grounds: 'Grounds',
      cleanses: 'Cleanses',
      parries: 'Parries',
      blocks: 'Blocks',
      absorbs: 'Absorbs',
      reflects: 'Reflects',
      silences: 'Silences',
      disarms: 'Disarms',
      cuts_heal: 'Cuts heal',
      shortens: 'Shortens',
      shreds: 'Shreds',
      punishes: 'Punishes',
      controls: 'Locks down',
      weakens: 'Weakens',
      escapes: 'Escapes',
      sustains: 'Sustains vs',
      mitigates: 'Mitigates',
      strips: 'Strips',
      bursts: 'Bursts',
      counters: 'Counters',
    } as Record<CounterActionVerb, string>,
    mechanicFallbacks: {
      melee: 'Heavy Melee',
      bullet_dps: 'Weapon DPS',
      spirit_dps: 'Spirit DPS',
      tanky: 'Tanky',
      healing: 'Healing',
      low_hp: 'Low HP (Glass Cannon)',
    },
    tierLabels: {
      'Best Counter': 'Best Counter',
      'Core Counter': 'Core Counter',
      'Strong Pick': 'Strong Pick',
    },
    useLabel: 'Use:',
    soulTitle: (tier: number, cost: number) => `Tier ${tier} item (${cost.toLocaleString('en-US')} Souls)`,
    copyItemTitle: 'Copy item name for Deadlock in-game shop search',
    copiedItemLabel: 'Copied!',
    countersMultiBadge: (matched: number, total: number) => `Counters ${matched}/${total}`,
    countersSingleBadge: (name: string) => `vs ${name}`,
    dynamicMechanicReason: (triggers: string) => `Directly counters ${triggers}.`,
    damageReasonLabel: {
      bullet: 'Weapon Damage',
      equal: 'Mixed Damage',
      spirit: 'Spirit Damage',
    } as Record<DamageProfile, string>,
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
      'Anti-Gun': 'Anti-Weapon',
      'Anti-Spirit': 'Anti-Spirit',
      'Anti-Heal': 'Anti-Heal',
      'Anti-Melee': 'Anti-Melee',
      Shred: 'Shred',
      Cleanse: 'Cleanse',
      Control: 'Control',
    } as Record<CounterRole, string>,

    threats: {
      rapid_fire: 'Fast fire rate',
      on_hit_procs: 'Stacks on hit',
      bullet_ult: 'Weapon Ult',
      channeled_ult: 'Channeled Ult',
      airborne: 'Fights from the air',
      high_mobility: 'Very mobile',
      fragile_glass_cannon: 'Low HP',
      cleanseable_debuff: 'Damage over time',
      telegraphed_burst: 'Heavy burst',
      hard_cc: 'Stuns & roots',
      ability_spam: 'Spams abilities',
      sustained_spirit: 'Spirit damage over time',
      heavy_healing: 'Heals a lot',
      melee_brawler: 'Melee',
      buff_shield_stacker: 'Shields',
      close_range_dive: 'Dives onto you',
      long_range_poke: 'Long-range poke',
    } as Record<ThreatMechanic, string>,

    offenseSectionTitle: 'Shut down',
    offenseSectionSub: 'Lock down, silence, anti-heal & burst them out',
    defenseSectionTitle: 'Survive',
    defenseSectionSub: 'Mitigate damage, cleanse debuffs & survive combos',
    recommendedStanceBadge: 'Recommended Focus',
    stanceReasonOffense: (name: string) =>
      `${name} has low HP or slippery escapes — locking them down and bursting them out is often stronger than pure defense.`,
    stanceReasonDefense: (name: string) =>
      `${name} threatens to delete or lock you down — surviving their burst/combo first wins the fight.`,
    stanceReasonBalanced: (name: string) =>
      `Both angles work well vs ${name} — pick Offense to shut them down or Defense to outlast their damage.`,

    synergy: {
      gun: (hero: string) => `Great fit for ${hero}'s weapon damage`,
      spirit: (hero: string) => `Scales cleanly with ${hero}'s spirit kit`,
      firerate: (hero: string) => `Procs fast with ${hero}'s fire rate`,
      spiritProccer: (hero: string) => `Applies reliably off ${hero}'s abilities`,
      closeRange: (hero: string) => `Matches ${hero}'s close-range brawl style`,
      longRange: (hero: string) => `Keeps ${hero} safe at backline range`,
      supportive: (hero: string) => `Doubles as team utility on ${hero}`,
    },

    emptyBadge: 'Sub-5-Second Counter Lookup',
    emptyHeading: 'Who is snowballing or pressuring your lane?',
    emptySub: 'Click an enemy in the roster or just type their name.',
    searchPlaceholderEnemy: 'Find a hero',
    searchPlaceholderMy: 'Find your hero',
    searchTypeHint: 'Just start typing',
    searchEnterHint: 'Enter',
    searchNoMatch: (q: string) => `No hero matches “${q}”`,
    addEnemyBtn: 'Enemy',
    addEnemyTitle: 'Add another enemy',
    rosterDoneBtn: 'Done',
    countersVs: 'Counters vs',
    tuningTitle: (name: string) => `${name}'s build`,
    tuningOpenBtn: 'Adjust',
    tuningCloseBtn: 'Collapse',
    passiveOnlyShort: 'Hide actives',
    tierKeysTitle: 'Keys 1–5 switch the souls tier',
    removeEnemyAria: (name: string) => `Remove ${name}`,
    rosterToggleBtn: 'Roster',
    keyHintSearch: 'Find hero',
    keyHintAdd: 'Add',
    keyHintSouls: 'Souls tier',
    keyHintClear: 'Clear search',
    emptyDesc:
      'Pick your hero above and click the enemy who is pressuring you to get counter items tuned to their kit, your souls, their build and your kit.',
    emptyCta: (count: number) => `Search All ${count} Heroes`,
    quickPickLabel: 'COMMON SNOWBALL THREATS — 1-CLICK PICK',

    modalMyTitle: 'Select Your Hero',
    modalMySub: 'Stays sticky across the match so counter picks fit your kit (gun vs spirit, range, procs).',
    modalEnemyTitle: 'Select Enemy Threat',
    modalEnemySub: 'Auto-loads base kit & damage focus — only add extra stacks if they build them.',
    modalSearchPlaceholder: 'Type hero name (e.g. Haze, Abrams, Seven) and press Enter...',
    modalNoMatch: (q: string) => `No hero matching "${q}"`,

    footerPrefix: 'Deadlock Counter Helper · Item icons & soul costs via',
  },
} as const;
