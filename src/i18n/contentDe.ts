/**
 * German localized tactical copy for hero threat headlines, counter item tips,
 * and hero-specific hard-counter callouts.
 * Uses established English Deadlock / MOBA terms (Channel, Ult, Stun, Root, Silence,
 * Disarm, Cleanse, Lifesteal, Sustain, Stack, Parry, Cooldown, Headshot, etc.)
 * wherever they are far more natural in German gaming usage than literal translations.
 */

export const HERO_HEADLINES_DE: Record<string, string> = {
  hero_atlas: 'Tanky Melee-Brawler mit starker HP-Regen, Shoulder Charge Wall-Stuns und Siphon Life Sustain.',
  hero_fencer: 'Mobiler Duelist mit Riposte-Parry, Dashes und Anti-Heal-Lockdown-Ult (Itani Lo Sahn).',
  hero_bebop: 'Hook-in-Uppercut-Combo, skalierende Sticky-Bomb-Stacks und Channel-Ult Hyper Beam.',
  hero_punkgoat: 'Aggressiver Melee-Bruiser mit Slam, Charge und Chain Gang Tether-Ult.',
  hero_nano: 'Schwer greifbare Assassine mit Gloom Bombs, Leaping Slash Melee-Sustain und untargetable Shadow-Ult.',
  hero_unicorn: 'Spirit-Burst-Casterin mit Prism Shield Silence, Radiant Daggers und starken Dash-Slows.',
  hero_deadpack: 'Airborne Jetpack-Skirmisher, der Bullet Resist shredded und Targets aus der Luft grabbt.',
  hero_drifter: 'Predator-Duelist, der isolierte Targets per Stalker\'s Mark ausbluten lässt und Teams in Eternal Night blindet.',
  hero_dynamo: 'Teamfight-Disruptor mit AoE-Heal, Quantum Entanglement Dodge und spielentscheidender Channel-Ult Singularity.',
  hero_necro: 'Zermürbender Necromancer, der Gun-Damage & Spirit Resist stiehlt und mit Grasping Hands zoned.',
  hero_orion: 'Airborne Glass-Cannon-Sniper mit Charged Shots aus Rain of Arrows, Traps und Guided Owl Execute.',
  hero_haze: 'Hyper-skalierende Gun-Assassine mit Fixation On-Hit-Stacks, Sleep Dagger und Bullet Dance Channel-Ult.',
  hero_astro: 'High-Tempo-Trickshotterin mit Bounce-Pad-Keg-Burst, Crackshot-Headshots und Spirit Lasso Lockdown.',
  hero_inferno: 'DoT-Carry, der über Rapid Fire Afterburn-Procs stackt und massiv über Spirit-Lifesteal sustaint.',
  hero_tengu: 'Mobile Utility-Carry mit Tether-Heal, Stone Form Stun/Cleanse und Air Drop Engages.',
  hero_kelvin: 'Frost-Bruiser mit extremem Arctic Beam Fire-Rate-/Move-Slow, Frost Grenade Heals und Frozen Shelter Dome.',
  hero_ghost: 'Drain-Tank und Lane-Bully mit Bomb-Spam, Life Drain Sustain und Soul Exchange HP-Swap-Ult.',
  hero_lash: 'Vertikaler Dive-Assassine mit massivem Ground Strike Burst, Flog-Sustain und Death Slam AoE-Throw.',
  hero_forge: 'Zone-Control-Carry mit hochdrehender Minigun, Turrets, Medicinal Specter Heal-Zone und Heavy Barrage.',
  hero_vampirebat: 'Squishy Spirit-Assassine mit Love Bites On-Hit-Procs, untargetable Sanguine Retreat und Nox Nostra Silence.',
  hero_mirage: 'Globaler Duelist mit stackbaren Djinn\'s Marks, Fire Scarabs Drain und Tornado-Knockup.',
  hero_krill: 'Extrem tanky Frontliner mit Burrow-Resist, Scorn-Sustain, Sand Blast Disarm und Combo Lockdown-Ult.',
  hero_nurse: 'Sustain-Supporterin mit Leech Therapy DoTs, Healing Needles und Spirit-Damage-Zones.',
  hero_bookworm: 'Barrier-Enchanterin, die Teammates mit Plot Armor Shields bufft und mit Captivating Read rootet.',
  hero_chrono: 'Pick-Skirmisherin mit Kinetic Carbine Time-Stop und Paradoxical Swap mitten in ihr Team.',
  hero_synth: 'Mobiler, squishy AoE-Burst-Diver mit starkem Affliction-DoT, Satchel-Invulnerability und Flying Cloak Escape.',
  hero_ratking: 'Tanky Bruiser mit Max-HP-Barriers (Royal Pestments), Rat Swarm DoT und Multi-Hit-Grenades.',
  hero_familiar: 'Nerviger Support mit Tag Along Burst-Heal, Pillow-Knockback und wanddurchdringender Naptime Sleep-Ult.',
  hero_gigawatt: 'AoE-Spirit-Carry mit verzögertem Static Charge Stun, Power Surge On-Hits und riesiger Storm Cloud Channel-Ult.',
  hero_shiv: 'Aggressiver Dive-Brawler mit verzögertem Damage (Bloodletting), Bleed-Knives und Killing Blow Execute.',
  hero_werewolf: 'Aggressiver Melee-Skirmisher mit Slam Fire Rapid-Fire, Entangling Bola Tether und Lycan Curse Werwolf-Form.',
  hero_magician: 'High-Burst-Trickster mit Vexing Bolts, Rabbit Hex Polymorph und kopierten Ultimates.',
  hero_chessmaster: 'Taktischer Controller mit Bishop-Slows, Rook Battery Roots und Kingside Knight Barriers.',
  hero_doorman: 'Disruptiver Trickster mit Call Bell Detonations, Luggage Cart Pull und Baroness Hotel Banish-Ult.',
  hero_priest: 'Relentless Hunter mit Snap Traps, Brandgranaten und massivem Ira Domini Crossbow-Burst.',
  hero_frank: 'Unaufhaltsamer Drain-Juggernaut mit Aura of Suffering DoT, Jumpstart-Regen und Shocking Reanimation Revive.',
  hero_hornet: 'Airborne Glass-Cannon-Sniperin mit Flight-DPS, Stake-Tether und Assassinate Execute-Snipe.',
  hero_viscous: 'Schwer greifbarer Disruptor mit The Cube Invulnerability/Heal, Puddle Punch Knockback und Goo Ball Stun.',
  hero_viper: 'Hyper-mobile, squishy Slide-Assassine mit extremem Close-Range-Fire-Rate-DPS, Lethal Venom und Petrifying Bola.',
  hero_warden: 'Frontline-Juggernaut mit Willpower-Barrier, Binding Word Root und Last Stand Drain-Ult.',
  hero_wraith: '1v1-Duelistin mit Full Auto Fire Rate, Card Trick Burst, Project Mind Teleport und Telekinesis Point-and-Click-Stun.',
  hero_yamato: 'Dive-Assassine mit Charged Power Slash Burst, Flying Slash Grapple und unsterblicher Shadow Transformation.',
  hero_artist: 'Spirit-Control-Casterin, die mit Living Ink Flow State resettet, über Still Life stunnt und Gegner mit Abstract Landscape einsperrt & silenced.',
  hero_baba: 'Disruptive Spirit-Controllerin mit Threadsap Spirit-Steal, Baba\'s Brew Silence/Burn/Barrier-Töpfen und Feed The Birds Tauben-Hex-Ult.',
};

export const ITEM_COPY_DE: Record<string, { why: string; whenToUse: string }> = {
  upgrade_withering_whip: {
    why: 'Senkt gegnerische Fire Rate & Bullet Resist für nur 800 Souls — gewinnt frühe Gun-Trades und upgradet zu Disarming Hex.',
    whenToUse: 'Direkt zu Beginn eines Lane-Trades aktivieren, bevor der Gegner On-Hit-Stacks aufbaut.',
  },
  upgrade_melee_rebuttal: {
    why: 'Macht jeden Parry zum massiven Counter: heilt dich, reflektiert den Melee-Damage und bufft deinen eigenen Damage.',
    whenToUse: 'Parry drücken, sobald der Gegner zum Heavy Melee ausholt.',
  },
  upgrade_grit: {
    why: 'Günstige 800-Souls-Barrier auf Knopfdruck gegen frühen All-In-Burst auf der Lane.',
    whenToUse: 'Kurz vor dem gegnerischen Combo-Impact aktivieren, um den Trade zu gewinnen.',
  },
  upgrade_health_stimpak: {
    why: 'Bester 800-Souls-Lane-Sustain gegen starken Poke, damit du auf der Lane bleibst und weiter Souls farmst.',
    whenToUse: 'Kurz hinter Cover gehen und aktivieren, damit gegnerischer Damage den Heal nicht abbricht.',
  },
  upgrade_medic_bullets: {
    why: 'Zuverlässiger In-Combat-Heal auf der Lane durch Shots auf Heroes, ohne die Wave verlassen zu müssen.',
    whenToUse: 'Immer auf den gegnerischen Hero schießen, sobald der Proc ready ist.',
  },
  upgrade_endurance: {
    why: 'Passive, nicht unterbrechbare HP-Regen gegen permanenten Lane-Poke.',
    whenToUse: 'Passiv — hält dich bei ständigem Chip-Damage stabil auf der Lane.',
  },
  upgrade_improved_stamina: {
    why: 'Extra Stamina-Bar + schnellere Stamina-Regen für 800 Souls — dodged frühe Hooks, Roots, Melee-Swings und Dive-Combos.',
    whenToUse: 'Passiv — immer mindestens einen Dash in Reserve halten, um aus CC oder Burst rauszudashen.',
  },
  upgrade_mystic_regeneration: {
    why: 'Konstanter In-Combat-Sustain für Spirit-Heroes — triggert Bonus-HP-Regen bei jedem Spirit-Hit auf Heroes.',
    whenToUse: 'Passiv — Gegner regelmäßig mit Abilities poken, um die Bonus-Regen aktiv zu halten.',
  },
  upgrade_headshot_booster: {
    why: 'Günstiger 800-Souls-Headshot-Burst, der squishy Glass Cannons früh aus der Lane drückt.',
    whenToUse: 'Passiv — sobald der Cooldown ready ist, gezielt kurze Headshot-Trades suchen.',
  },
  upgrade_magic_burst: {
    why: 'Sofortiger Bonus-Spirit-Burst für 800 Souls gegen squishy Targets — upgradet später direkt zu Tankbuster.',
    whenToUse: 'Passiv — deine Main-Ability auf Low-HP-Gegner treffen, sobald der Proc ready ist.',
  },
  upgrade_close_range: {
    why: 'Bestraft aggressive Close-Range-Diver mit starkem Bonus-Gun-Damage unter 15m.',
    whenToUse: 'Passiv — beim gegnerischen Dive auf Close Range direkt mit vollem Gun-DPS gegenhalten.',
  },
  upgrade_weapon_shielding: {
    why: 'Triggert automatisch eine starke Barrier bei anhaltendem Bullet-Damage auf der Lane und im Mid-Game.',
    whenToUse: 'Passiv — kurze Gun-Trades nehmen, solange der Barrier-Cooldown ready ist.',
  },
  upgrade_spirit_bubble: {
    why: 'Triggert automatisch eine starke Barrier bei hohem Spirit-Burst — #1 früher Anti-Spirit-Schutz.',
    whenToUse: 'Passiv — fängt gegnerische Spirit-Combos ab, damit du nicht gepoket oder geburstet wirst.',
  },
  upgrade_regenerating_bullet_shield: {
    why: 'Kombiniert frühe Bullet Resist mit extra Gun-Damage & Fire Rate solange du über 65 % HP bist.',
    whenToUse: 'Passiv — über 65 % HP bleiben, um jeden Gun-Trade offensiv und defensiv zu gewinnen.',
  },
  upgrade_magic_shield: {
    why: 'Liefert frühe Spirit Resist plus Spirit Power & Cooldown Reduction, ohne dein Scaling zu bremsen.',
    whenToUse: 'Passiv — idealer früher Defense-Pick für Spirit-Heroes gegen Ability-Spam.',
  },
  upgrade_return_fire: {
    why: 'Reflektiert Bullet- (65 %) & Spirit-Damage (25 %) direkt auf Rapid-Fire-Carrys zurück — sie schmelzen sich selbst (reflektiert kein Melee).',
    whenToUse: 'Sofort aktivieren, wenn der Gegner voll auf dich draufhält oder eine Bullet-Ult zündet.',
  },
  upgrade_vex_barrier: {
    why: 'Triggert automatisch eine große Barrier, sobald du gestunt, gesilenced, gerootet, gesleept oder getethert wirst.',
    whenToUse: 'Passiv — verhindert, dass frühe CC-Combos (Hook, Charge, Root, Sleep) dich one-shotten.',
  },
  upgrade_debuff_reducer: {
    why: 'Verkürzt passiv die Duration aller Stuns, Hexes, Silences, Roots, Bleeds, Burns und Slows um 25 % — upgradet zu Unstoppable oder Spellbreaker.',
    whenToUse: 'Passiv — früh kaufen, wenn DoTs oder CC-Chains dich ständig festhalten.',
  },
  upgrade_healbane: {
    why: 'Günstigster passiver Anti-Heal (1.600 Souls) — jeder Spirit-Damage reduziert gegnerisches Healing und heilt dich bei Kills.',
    whenToUse: 'Passiv — Gegner vor seinem Heal oder Lifesteal mit einer Ability treffen.',
  },
  upgrade_restorative_locket: {
    why: 'Sammelt gratis Heal- & Stamina-Stacks jedes Mal, wenn Gegner in deiner Nähe Abilities spammen.',
    whenToUse: 'Mit hohen Stacks aktivieren, um Burst zu überleben und sofort Stamina für Dashes zurückzubekommen.',
  },
  upgrade_containment: {
    why: 'Silenced Movement-Abilities & Items und verkürzt Dash-Distanz (-26 %) für 1.600 Souls — upgradet zu Vortex Web.',
    whenToUse: 'Casten, kurz bevor der Gegner grapplen, blinken oder eine Escape-Ability nutzen will (sperrt keine Stamina-Dashes).',
  },
  upgrade_suppressor: {
    why: 'Senkt passiv die gegnerische Fire Rate bei jedem Spirit-Hit — stark gegen Gun-Carrys ohne Active Slot.',
    whenToUse: 'Passiv — den gegnerischen Gun-Carry im Fight regelmäßig mit Spirit-Damage treffen.',
  },
  upgrade_spirit_sap: {
    why: 'Reduziert direkt gegnerische Spirit Power und Spirit Resist — schwächt Spirit-Carrys spürbar.',
    whenToUse: 'Zu Fight-Beginn auf den gefeedeten Spirit-Carry casten, bevor seine Burst-Combo kommt.',
  },
  upgrade_magic_slow: {
    why: 'Slowt Gegner dauerhaft über deinen Spirit-Damage, sodass Melee-Brawler dich nicht erreichen.',
    whenToUse: 'Passiv — Melee-Gegner beim Reinlaufen mit Abilities poken und kiten.',
  },
  upgrade_slowing_bullets: {
    why: 'Lässt Rapid-Fire-Heroes Melee-Diver und Brawler sauber über Gun-Shots kiten (kein Active Slot nötig).',
    whenToUse: 'Passiv — beim Kiten weiterfeuern, um den Move-Slow dauerhaft oben zu halten.',
  },
  upgrade_headshot_booster2: {
    why: 'Shredded gegnerische Bullet Resist günstig per Headshot gegen tanky Frontliner.',
    whenToUse: 'Passiv — Headshots auf den Frontliner setzen, um seine Bullet Resist für dein Team zu shredden.',
  },
  upgrade_magic_vulnerability: {
    why: 'Shredded gegnerische Spirit Resist bei jedem Spirit-Hit — starker 1.600-Souls-Counter gegen Tanks.',
    whenToUse: 'Passiv — erst mit einem schnellen Poke-Spell den Resist-Shred anbringen, dann den Main-Burst casten.',
  },
  upgrade_cardio_calibrator: {
    why: 'Starke Slow-Resist und Move Speed, damit Slow-Heroes und Melee-Bruiser dich nicht einholen.',
    whenToUse: 'Passiv — hält deinen Move Speed trotz starker Slows hoch.',
  },
  upgrade_guardian_ward: {
    why: 'Barrier + Move Speed auf Knopfdruck (halber Cooldown auf Teammates) zum Saven in frühen Fights.',
    whenToUse: 'Kurz vor dem gegnerischen Burst auf dich oder deinen Lane-Partner casten.',
  },
  upgrade_metal_skin: {
    why: '100 % Immunity gegen alle Bullets — der stärkste Active-Counter gegen Gun-Carrys & Bullet-Ults (blockt kein Melee).',
    whenToUse: 'Sofort aktivieren, wenn der Gegner seine Bullet-Ult oder seinen Gun-Burst startet.',
  },
  upgrade_greater_withering_whip: {
    why: 'Disarmt den Gegner komplett UND shredded seine Bullet Resist — legt gefeedete Gun-Carrys lahm (blockt kein Melee).',
    whenToUse: 'Direkt beim Engage auf den Gun-Carry casten (im Late-Game ggf. Cleanse / Unstoppable abwarten).',
  },
  upgrade_target_stun: {
    why: 'Point-and-Click Range-Stun, der Airborne-Heroes vom Himmel holt und Channel-Ults zuverlässig abbricht.',
    whenToUse: 'Sofort auf den Gegner casten, sobald er airborne geht oder eine Channel-Ult startet.',
  },
  upgrade_reduce_debuff_duration: {
    why: 'Cleansed sofort alle Non-Ultimate-Debuffs (Sticky Bombs, Bleeds, Burns, Marks, Roots, Silences) plus Heal & Move Speed.',
    whenToUse: 'Direkt aktivieren, sobald ein Non-Ultimate-Debuff (Bomb, Afterburn, Mark, Root, Static Charge) auf dir sitzt (nicht bei Stun/Sleep/Hex nutzbar).',
  },
  upgrade_counterspell: {
    why: 'Macht deinen Parry zum Spell-Shield (braucht keinen Active Slot!) — blockt vorhersehbare Ults, CC & Burst und heilt dich.',
    whenToUse: 'Parry genau im Impact-Moment drücken, bevor die gegnerische Ult, Sticky Bomb oder der Hook trifft.',
  },
  upgrade_targeted_silence: {
    why: 'Breite AoE-Silence-Wave, die Spirit-Diver und mobile Caster an Escapes, Heals oder Combos hindert.',
    whenToUse: 'Auf den Gegner feuern, sobald er reindived (unterbricht aber keine bereits laufenden Channel-Ults).',
  },
  upgrade_rupture: {
    why: 'Prozentualer HP-Bleed-DoT + starker Anti-Heal — schmilzt Drain-Tanks und Heiler auf jedem Hero.',
    whenToUse: 'Früh im Fight bei hohen gegnerischen HP casten für maximalen %-Damage & Anti-Heal.',
  },
  upgrade_toxic_bullets: {
    why: 'Passiver %-Max-HP-Bleed + Anti-Heal über deine Bullets — bester Gun-Counter gegen tanky Sustain-Heroes.',
    whenToUse: 'Passiv — konstant auf den Tank/Heiler schießen, damit Bleed & Anti-Heal nicht auslaufen.',
  },
  upgrade_magic_shock: {
    why: 'Prozentualer Current-HP-Spirit-Burst, der Spirit Resist komplett ignoriert — bricht High-HP-Tanks auf Spirit-Heroes.',
    whenToUse: 'Passiv — schwere Spirit-Hits (>165 Damage) auf Tanks landen, sobald der Tankbuster-Charge ready ist.',
  },
  upgrade_improved_bullet_armor: {
    why: 'Hohe passive Bullet Resist, die unter 50 % HP noch stärker skaliert — verbraucht keinen Active Slot.',
    whenToUse: 'Passiv — konstante Damage-Mitigation gegen dauerhaften Gun-DPS.',
  },
  upgrade_tech_purge: {
    why: 'Hohe passive Spirit Resist mit starkem Bonus unter 50 % HP — Rückgrat gegen anhaltenden Spirit-Damage.',
    whenToUse: 'Passiv — schützt zuverlässig gegen Spirit-DoTs und Teamfight-AoE ohne Active Slot.',
  },
  upgrade_warp_stone: {
    why: 'Sofortiger Blink-Teleport + Bonus Bullet Resist — dodged Melee-Dives und blinkt aus Roots/Ults raus.',
    whenToUse: 'Sofort rausblinken, sobald ein Brawler dich dived oder eine AoE-Ult unter dir aufgeht.',
  },
  upgrade_bullet_armor_reduction_aura: {
    why: 'Passive Aura shredded Bullet Resist & Fire Rate naher Gegner (doppelt so stark im 1v1!) — Top-Pick für Close-Range-Duelisten.',
    whenToUse: 'Passiv — im 1v1-Duell nah am Gegner bleiben, um den doppelten Shred- & Fire-Rate-Malus auszunutzen.',
  },
  upgrade_reinforcing_casings: {
    why: 'Stackt hohe passive Bullet Resist bei eigenen Gun-Hits — stark für Rapid-Fire-Heroes in längeren Gun-Trades.',
    whenToUse: 'Passiv — im Fight konstant Shots treffen, um die Bullet-Resist-Stacks oben zu halten.',
  },
  upgrade_deflecting_armor: {
    why: 'Bestes passives Anti-Gun-Item: deflected Bullets UND verhindert On-Hit-Build-up (Fixation, Afterburn, Djinn\'s Mark).',
    whenToUse: 'Passiv — entschärft Late-Game-Rapid-Fire- & On-Hit-Carrys komplett ohne Active Slot.',
  },
  upgrade_juggernaut: {
    why: 'Upgradet aus Enduring Speed: slowt passiv die Fire Rate jedes Angreifers um 40 % plus +25 % Melee- & +50 % Slow-Resist.',
    whenToUse: 'Passiv — in der Frontline Druck machen, damit jeder fokussierende Gun-Carry massiv Fire Rate verliert.',
  },
  upgrade_spellbreaker: {
    why: 'Reduziert den nächsten großen Spirit-Burst (>175 Damage) um 65 % UND gibt +25 % Debuff-Resist (aus Debuff Reducer).',
    whenToUse: 'Passiv — fängt den härtesten Single-Hit-Nuke ab und verkürzt gleichzeitig CC & DoTs passiv.',
  },
  upgrade_absorbing_armor: {
    why: 'Verkürzt deine eigenen Cooldowns jedes Mal, wenn du hohen Spirit-Damage frisst, plus starke Spirit Resist.',
    whenToUse: 'Passiv — dreht lange Fights gegen Spirit-Spammer über schnellere eigene Ability-Rotationen.',
  },
  upgrade_glitch: {
    why: 'Ultimativer 6.400-Souls-Shutdown: unterbricht Channel-Ults, silenced, disarmt, sperrt Items UND entfernt Buffs.',
    whenToUse: 'Direkt auf den gefeedeten Carry casten, sobald er reindived oder seine Channel-Ult startet.',
  },
  upgrade_unstoppable: {
    why: 'Volle CC-Immunity gegen Stuns, Silences, Sleep, Roots und Disarm — ignoriert jede CC-Chain.',
    whenToUse: 'Proaktiv VOR deinem Dive oder deiner Channel-Ult zünden (nicht nutzbar, wenn du bereits gestunt bist).',
  },
  upgrade_auto_cleanse: {
    why: 'Blockt & cleansed den nächsten Stun, Silence, Sleep oder Root komplett automatisch + gibt eine Barrier (kein Active Slot!).',
    whenToUse: 'Passiv — negiert überraschenden Pick-CC (Lasso, Hook, Sleep, Combo) ganz ohne Reaktionszeit.',
  },
  upgrade_self_bubble: {
    why: 'Sofortige Invulnerability — dodged vorhersehbare Ults, verzögerte Detonations und Dive-Combos.',
    whenToUse: 'Kurz vor dem tödlichen Burst drücken und bei Bedarf frühzeitig canceln, sobald deine Cooldowns ready sind.',
  },
  upgrade_inhibitor: {
    why: 'Deine Bullets senken den gesamten outgoing Damage des Gegners UND reduzieren sein Healing — entschärft Raid-Bosse passiv.',
    whenToUse: 'Passiv — den gefeedeten Carry früh im Fight anschießen, um seinen Damage-Output & Sustain zu brechen.',
  },
  upgrade_spirit_burn: {
    why: 'Hoher Spirit-Burst löst einen AoE-Burn mit -70 % Anti-Heal aus — zerstört Drain-Tanks und Heiler im Late-Game.',
    whenToUse: 'Passiv — Spirit-Combo auf das Main-Target setzen, um den explosiven Anti-Heal-Burn auszulösen.',
  },
  upgrade_banshee_slugs: {
    why: 'Headshots shredden gleichzeitig Bullet Resist, Spirit Resist UND reduzieren Healing — bricht jeden Frontliner auf.',
    whenToUse: 'Passiv — Headshots auf den Frontliner setzen, damit dein ganzes Team ihn wegschmilzt.',
  },
  upgrade_aprounds: {
    why: 'Bullets haben Chance, Bullet Resist komplett zu ignorieren und durchdringen Plated Armor Deflects.',
    whenToUse: 'Passiv — Pflichtkauf auf Gun-Carrys, wenn Gegner massiv Bullet Resist oder Plated Armor stacken.',
  },
  upgrade_escalating_exposure: {
    why: 'Stackt bei jedem Spirit-Hit immer höheren Spirit-Resist-Shred — schmilzt High-HP-Tanks in längeren Fights.',
    whenToUse: 'Passiv — perfekt für DoT- und Ability-Spam-Heroes gegen stark gestackte Spirit Resist.',
  },
  upgrade_siphon_bullets: {
    why: 'Stiehlt tanky Gegnern pro Gun-Hit temporär Max-HP und addiert sie auf deinen eigenen HP-Pool.',
    whenToUse: 'Passiv — den Frontliner konstant anschießen, um Max-HP-Stacks zu stehlen.',
  },
  upgrade_capacitor: {
    why: 'Starkes Gun-Active: sperrt Stamina-Nutzung, slowt extrem und silenced Movement-Abilities & Items gleichzeitig.',
    whenToUse: 'Auf hyper-mobile Carrys oder Diver feuern, damit sie weder dashen, sliden noch escapen können.',
  },
  upgrade_phantom_strike: {
    why: 'Teleportiert dich direkt an Airborne- oder Backline-Targets, reißt sie zu Boden, slowt und disarmt sie.',
    whenToUse: 'Direkt auf fliegende Sniper (Vindicta / Grey Talon) oder Backline-Gun-Carrys casten.',
  },
  upgrade_focus_lens: {
    why: 'Upgradet aus Spirit Sap: Point-and-Click Silence + Spirit-Power-/-Resist-Shred + 35 % verzögerter Echo-Burst.',
    whenToUse: 'Auf mobile Spirit-Carrys casten und direkt deinen vollen Burst reindrücken, solange sie nicht escapen können.',
  },
  upgrade_proc_silence: {
    why: 'Bullets senken passiv gegnerischen Spirit-Damage (-25 %) UND bauen einen Silence auf — schaltet Caster ohne Active Slot aus.',
    whenToUse: 'Passiv — mit hoher Fire Rate auf den wichtigsten Spirit-Caster draufhalten, um seinen DPS zu drücken und Silence zu proccen.',
  },
  upgrade_aoe_root: {
    why: 'Zieht Gegner zusammen und belegt sie mit Slow + Movement-Silence (Alt-Cast direkt aufs Target!).',
    whenToUse: 'Per Alt-Cast direkt auf mobile Carrys casten, um ihren Escape komplett zu sperren.',
  },
  upgrade_divine_barrier: {
    why: 'Cleansed Non-Stun-Debuffs und gibt dir oder einem Teammate eine riesige Barrier + Move Speed.',
    whenToUse: 'Zum Cleansen von Sticky Bombs, Bleeds, Burns oder Slows auf dir oder deinem Carry.',
  },
  upgrade_colossus: {
    why: 'Massive Bullet & Spirit Resist + Bonus-HP auf Knopfdruck und slowt Gegner + deren Dash-Distanz um dich herum.',
    whenToUse: 'Mitten im Brawl zünden, wenn du gleichzeitig hohen Bullet- und Spirit-Focus tanken musst.',
  },
  upgrade_discord: {
    why: 'Gibt Spirit- & Debuff-Resist plus eine aktive %-Max-HP-Damage-Aura auf dir oder einem verbündeten Frontliner.',
    whenToUse: 'Beim Engage auf dich oder deinen Frontline-Diver casten, um Tanks per %-Max-HP-Aura zu schmelzen.',
  },
  upgrade_cold_front: {
    why: 'Sofortiger AoE-Spirit-Burst + starker Slow für 1.600 Souls — bestraft squishy Low-HP-Heroes und upgradet zu Arctic Blast.',
    whenToUse: 'Auf Close Range zünden, um Glass Cannons sofort anzubursten und für Follow-up-Shots zu slowen.',
  },
  upgrade_arctic_blast: {
    why: 'AoE-Freeze-Stun + Spirit-Burst + friert gegnerische Stamina-Regen ein — löscht mobile Glass Cannons sofort aus.',
    whenToUse: 'Zünden, sobald ein mobiler Gegner in Range ist, um ihn einzufrieren und in einer Rotation zu bursten.',
  },
  upgrade_pristine_emblem: {
    why: 'Starker Gun-Damage-Buff gegen Targets über 50 % HP — drückt squishy Heroes wie Mina oder Vindicta früh aus der Lane.',
    whenToUse: 'Passiv — aggressive Opening-Trades suchen, solange der Gegner noch über 50 % HP ist.',
  },
  upgrade_headhunter: {
    why: 'Starker Headshot-Burst + Self-Heal + Move-Speed-Buff — bestraft squishy Low-HP-Carrys im Mid-Game.',
    whenToUse: 'Passiv — Trades mit einem Headshot eröffnen, um Glass Cannons sofort unter Druck zu setzen.',
  },
  upgrade_fleetfoot_boots: {
    why: 'Aktiver Move-Speed-Buff + Slow-Resist und entfernt den Move-Slow beim Schießen — top zum Kiten von Melee-Brawlern.',
    whenToUse: 'Aktivieren, sobald dich ein Melee-Hero chased oder ein Slow trifft, um beim Rückwärtslaufen voll weiterzuschießen.',
  },
  upgrade_bullet_resist_shredder: {
    why: 'Spirit-Damage shredded gegnerische Bullet Resist + gibt dir Bonus Bullet Resist für nur 1.600 Souls.',
    whenToUse: 'Passiv — Gegner kurz mit einer Ability treffen, bevor du mit deiner Waffe draufhältst.',
  },
  upgrade_tech_defense_shredders: {
    why: 'Bullets shredden gegnerische Spirit Resist UND geben dir Spirit-Lifesteal gegen das Ziel.',
    whenToUse: 'Passiv — Tank kurz anschießen, bevor deine Spirit-Burst-Combo einschlägt.',
  },
  upgrade_rescue_beam: {
    why: 'Heilt %-Max-HP auf Distanz und zieht einen gestunnten Teammate direkt aus Hook, Combo, Lasso, Swap oder Singularity.',
    whenToUse: 'Auf den gecatchten Teammate casten und sofort Pull drücken, um den gegnerischen Pick zu saven.',
  },
  upgrade_cheat_death: {
    why: 'Passives Death-Immunity-Fenster bei tödlichem Damage — verhindert Execute-Chains und One-Shots ohne Active Slot.',
    whenToUse: 'Passiv — verschafft dir bei tödlichem Burst ein garantiertes Überlebensfenster zum Gegenheilen oder Escapen.',
  },
  upgrade_fervor: {
    why: 'Verkürzt aktive Debuffs (40 % Debuff-Resist) und gibt unter 50 % HP massiv Fire Rate & Move Speed für das Turnaround-Duell.',
    whenToUse: 'Passiv — triggert automatisch unter 50 % HP und lässt Gun-Carrys Dives direkt umdrehen.',
  },
};

export const ITEM_CONTEXT_TIPS_DE: Record<string, Partial<Record<string, string>>> = {
  upgrade_reduce_debuff_duration: {
    cc: 'Cleansed Non-Ultimate Roots, Silences, Slows & verzögerte Stuns sofort auf Knopfdruck + gibt Heal & Move Speed.',
  },
  upgrade_counterspell: {
    cc: 'Spell-Parry blockt Hooks, Roots, Lassos und Stun-Combos komplett ab — ohne einen Active Slot zu belegen.',
    melee: 'Macht deinen Parry doppelt stark: bestraft Melee-Hits UND blockt Follow-up-Abilities.',
  },
  upgrade_rupture: {
    tanky: 'Frisst sich per %-HP-Bleed direkt durch gestackte Max-HP-Bars und schneidet den Sustain ab.',
    healing: 'Drückt starken Anti-Heal auf Knopfdruck rein und tickt Lifesteal-Builds sauber herunter.',
  },
  upgrade_toxic_bullets: {
    tanky: 'Schmilzt gestackte HP-Pools passiv per %-Max-HP-Bleed über deine Bullets.',
    healing: 'Hält über deine Shots dauerhaft Anti-Heal aufrecht, sodass Lifesteal- & Heal-Builds einbrechen.',
  },
  upgrade_warp_stone: {
    melee: 'Blinkt sofort aus der Melee-Range, sodass Heavy-Melee-Swings komplett ins Leere gehen.',
    cc: 'Blinkt aus Roots, AoE-Zones und CC-Chains heraus, bevor der Follow-up connectet.',
  },
  upgrade_fleetfoot_boots: {
    melee: 'Sofortiger Move-Speed-Buff + Slow-Resist zum sauberen Kiten gegen Melee-Chaser.',
  },
  upgrade_rescue_beam: {
    cc: 'Zieht gecatchte Teammates direkt aus Lockdown-Ults, Hooks und Stun-Chains heraus und heilt euch beide.',
  },
  upgrade_containment: {
    mobility: 'Silenced Movement-Items (Warp Stone, Majestic Leap) & Escape-Abilities und kürzt Dash-Distanz für 1.600 Souls.',
  },
  upgrade_targeted_silence: {
    mobility: 'Silenced mobile Gegner mitten im Fight, damit sie keine Escape-Abilities oder Blinks mehr drücken können.',
  },
  upgrade_capacitor: {
    mobility: 'Zieht alle Stamina-Bars ab und silenced Movement-Abilities & Items gleichzeitig — 0 Escape-Chance.',
  },
  upgrade_aoe_root: {
    mobility: 'Zieht mobile Targets zurück und legt per Alt-Cast direkt Movement-Silence + Slow auf sie.',
  },
};

export const HERO_OVERRIDE_TIPS_DE: Record<string, Record<string, string>> = {
  hero_haze: {
    upgrade_withering_whip: 'Senkt Hazes frühe Fire Rate, damit sie Fixation-Stacks kaum aufbauen kann — upgradet zu Disarming Hex.',
    upgrade_return_fire: 'Zünden, sobald Haze draufhält oder Bullet Dance channelt — sie schmilzt sich an ihrer eigenen Fire Rate.',
    upgrade_metal_skin: '#1 Active-Counter gegen Haze: sofort bei Bullet Dance drücken und 100 % ihres Bullet-Damage ignorieren.',
    upgrade_greater_withering_whip: 'Disarmt Haze komplett, stoppt ihre Fixation-Stacks und shredded ihre Bullet Resist.',
    upgrade_target_stun: 'Bricht Hazes Bullet Dance Channel-Ult aus sicherer Range ab (solange sie kein Unstoppable aktiv hat).',
    upgrade_deflecting_armor: '#1 passiver Counter gegen Haze: deflected Bullets UND blockt den Aufbau von Fixation-Stacks.',
    upgrade_juggernaut: 'Slowt Hazes Fire Rate passiv, sobald sie auf dich schießt — stark, wenn deine Active Slots voll sind.',
    upgrade_glitch: 'Bricht Bullet Dance sofort ab und silenced/disarmt Haze, bevor sie Unstoppable oder Smoke Bomb drücken kann.',
  },
  hero_atlas: {
    upgrade_melee_rebuttal: 'Bester 800-Souls-Counter gegen Abrams — pariere seinen Heavy Melee für Self-Heal & massiven Counter-Damage.',
    upgrade_vex_barrier: 'Triggert automatisch eine große Barrier, sobald Abrams dich mit Shoulder Charge oder Seismic Impact stunt.',
    upgrade_healbane: 'Reduziert sowohl Siphon Life als auch seine Infernal Resilience Regen bei jedem Spirit-Hit.',
    upgrade_rupture: 'Schmilzt Abrams\' riesigen HP-Pool per %-Bleed und halbiert seine HP-Regen.',
    upgrade_toxic_bullets: 'Passiver %-Max-HP-Bleed + Anti-Heal bricht Abrams\' Frontline-Sustain im Dauerfeuer.',
    upgrade_debuff_reducer: 'Verkürzt den Shoulder Charge Wall-Stun so weit, dass du seinen garantierten Heavy Melee rechtzeitig parryn kannst!',
    upgrade_glitch: 'Unterbricht Abrams, silenced seine Abilities und entfernt seine Buffs, damit dein Team ihn bursten kann.',
  },
  hero_bebop: {
    upgrade_vex_barrier: '#1 Lane-Counter gegen Bebop: sein Hook triggert sofort die Barrier und fängt den Uppercut + Bomb-Damage ab.',
    upgrade_reduce_debuff_duration: '#1 Counter gegen Bomb-Bebop: direkt nach Sticky Bomb drücken, um sie komplett zu cleansen (0 Damage, 0 Stacks).',
    upgrade_counterspell: 'Genau vor der Sticky-Bomb-Explosion (oder beim Hook) parryn, um den Burst komplett zu blocken und dich zu heilen.',
    upgrade_target_stun: 'Bricht Bebops Hyper Beam Channel-Ult aus sicherer Distanz ab.',
    upgrade_divine_barrier: 'Cleansed Sticky Bombs von dir ODER einem gehookten Teammate plus starke Barrier.',
  },
  hero_gigawatt: {
    upgrade_target_stun: '#1 Counter gegen Seven: bricht seine Storm Cloud Channel-Ult aus sicherer Distanz per Stun ab.',
    upgrade_reduce_debuff_duration: 'Cleansed Static Charge sofort von dir, bevor der verzögerte Stun procct.',
    upgrade_counterspell: 'Parry genau beim Ablauf von Static Charge drücken, um Stun und Burst komplett zu blocken.',
    upgrade_spirit_bubble: 'Fängt Sevens Lightning Ball & Power Surge Poke auf der Lane automatisch per Spirit-Barrier ab.',
    upgrade_glitch: 'Bricht Storm Cloud sofort ab und entfernt seinen Power Surge Buff.',
  },
  hero_hornet: {
    upgrade_target_stun: '#1 Counter gegen Vindicta: holt sie mit Knockdown sofort aus ihrem Flight auf den Boden.',
    upgrade_phantom_strike: 'Teleportiert dich direkt an die fliegende Vindicta, reißt sie zu Boden und disarmt sie.',
    upgrade_weapon_shielding: 'Fängt ihren frühen Flight-Poke ab und hält dich über der Assassinate-Execute-Schwelle.',
    upgrade_metal_skin: 'Aktivieren, sobald Vindicta im Flight auf dich draufhält, um ihren Gun-DPS komplett zu negieren.',
    upgrade_deflecting_armor: 'Deflected Vindictas Flight-Shots passiv und nimmt ihr im Late-Game massiv DPS.',
  },
  hero_orion: {
    upgrade_target_stun: '#1 Counter gegen Grey Talon: holt ihn per Knockdown sofort aus seinem Rain of Arrows Flight.',
    upgrade_spirit_bubble: 'Fängt Charged Shots auf der Lane ab, damit du nicht in Guided Owl Execute-Range fällst.',
    upgrade_spellbreaker: '#1 passiver Counter gegen Spirit Grey Talon: schluckt den massiven Single-Hit-Burst von Charged Shot & Guided Owl.',
    upgrade_counterspell: 'Parry genau im Impact-Moment von Guided Owl oder Charged Shot drücken, um den Nuke komplett zu blocken.',
    upgrade_phantom_strike: 'Teleportiert dich direkt auf Grey Talon, reißt ihn aus der Luft und disarmt ihn.',
  },
  hero_inferno: {
    upgrade_reduce_debuff_duration: '#1 Counter gegen Infernus: cleansed Afterburn & Napalm sofort, sodass sein DoT und Spirit-Lifesteal wegfallen.',
    upgrade_debuff_reducer: 'Verkürzt Afterburn-Burn-Duration und seinen Ult-Stun spürbar — upgradet zu Unstoppable oder Spellbreaker.',
    upgrade_deflecting_armor: '#1 passiver Counter gegen Infernus: verhindert On-Hit-Build-up, sodass er Afterburn kaum noch proccen kann.',
    upgrade_healbane: 'Schneidet Infernus\' starken Spirit-Lifesteal aus Afterburn & Flame Dash ab.',
    upgrade_spirit_bubble: 'Fängt frühe Afterburn-Procs auf der Lane zuverlässig per Spirit-Barrier ab.',
  },
  hero_ghost: {
    upgrade_healbane: 'Reduziert Geists Life Drain und Spirit-Lifesteal, sodass sie ihren Self-Damage nicht mehr gegenheilt.',
    upgrade_rupture: 'Schmilzt Geists hohen HP-Pool und drückt starken Anti-Heal auf ihren Life Drain.',
    upgrade_targeted_silence: 'Silence Geist bei Low HP, damit sie KEIN Soul Exchange (HP-Swap) drücken kann!',
    upgrade_focus_lens: 'Silenced Geist vor ihrem Soul Exchange HP-Swap und finisht sie über den verzögerten Burst.',
    upgrade_reduce_debuff_duration: 'Cleansed gestackte Malice-Shards sofort, bevor ihre Essence Bomb einschlägt.',
    upgrade_restorative_locket: 'Geist spammt auf der Lane permanent Malice & Essence Bomb — liefert dir pausenlos gratis Heal-Stacks.',
  },
  hero_lash: {
    upgrade_containment: '#1 günstiger Counter gegen Lash: silenced seinen Grapple & Dive, sodass er nicht für Ground Strike hochkommt.',
    upgrade_target_stun: 'Casten, sobald Lash für Death Slam in der Luft hängt, um seine Channel-/Grab-Ult abzubrechen.',
    upgrade_counterspell: 'Parry genau beim Death Slam Throw oder Ground Strike Impact drücken, um die Combo komplett zu blocken.',
    upgrade_self_bubble: 'Während Death Slam oder Ground Strike drücken, um seine gesamte Burst-Combo invulnerable zu dodgen.',
    upgrade_spellbreaker: 'Schluckt Lashs massiven Single-Hit-Burst beim Ground Strike passiv.',
  },
  hero_synth: {
    upgrade_divine_barrier: 'Einer der wenigen Cleanses, der Pockets Affliction-Ult von dir oder einem Teammate entfernt + riesige Barrier.',
    upgrade_counterspell: 'Parry Pockets Affliction-Cast oder Enchanter\'s Satchel Burst genau beim Impact, um den DoT komplett zu blocken.',
    upgrade_containment: 'Movement-Silence verhindert, dass Pocket nach seinem Barrage/Dive zum Flying Cloak teleportiert.',
    upgrade_targeted_silence: 'Silenced Pocket direkt nach dem Dive, sodass er weder Satchel noch Flying Cloak drücken kann.',
    upgrade_tech_purge: 'Bester passiver Schutz gegen Pockets hohen Affliction-DoT unter 50 % HP.',
    upgrade_focus_lens: 'Silenced Satchel & Cloak und sprengt Pockets kleinen HP-Pool mit dem verzögerten Burst.',
  },
  hero_shiv: {
    upgrade_healbane: 'Reduziert Shivs Lifesteal und verhindert, dass er seinen verzögerten Bloodletting-Damage gegenheilt.',
    upgrade_reduce_debuff_duration: 'Cleansed gestackte Serrated Knives Bleeds sofort, damit du nicht unter die Killing Blow Execute-Schwelle tickst.',
    upgrade_containment: 'Silenced Shivs Slice and Dice Dash sowie seinen Killing Blow Execute-Leap.',
    upgrade_rupture: 'Bestraft Shivs hohe effektive HP durch Bloodletting mit %-Bleed und starkem Anti-Heal.',
    upgrade_glitch: 'Silenced Bloodletting-Cleanse und Killing Blow Execute, damit dein Team Shiv sofort bursten kann.',
    upgrade_cheat_death: 'Verhindert Shivs Killing Blow Execute-Reset passiv, sodass er im Teamfight keine Kette bekommt.',
  },
  hero_krill: {
    upgrade_vex_barrier: '#1 früher Counter gegen Mo & Krill: seine Combo Lockdown-Ult triggert automatisch deine Schutz-Barrier.',
    upgrade_rescue_beam: 'Zieht einen festgehaltenen Teammate direkt aus Mo & Krills Combo-Ult heraus und heilt ihn gegen.',
    upgrade_unstoppable: 'Kurz vor Mo & Krills Burrow-Engage zünden, damit Combo und Sand Blast Disarm komplett abprallen.',
    upgrade_auto_cleanse: 'Blockt Combo oder Sand Blast automatisch + gibt eine Barrier — Lebensretter, wenn deine Active Slots voll sind.',
    upgrade_rupture: 'Schmilzt Mo & Krills riesigen HP-Pool per %-Bleed und kappt seinen Scorn-Heal.',
    upgrade_toxic_bullets: 'Frisst sich per %-Max-HP-Bleed durch Mo & Krill und hält dauerhaft Anti-Heal gegen Scorn oben.',
  },
  hero_warden: {
    upgrade_reduce_debuff_duration: '#1 Counter gegen Warden: cleansed Binding Word (vor dem Root!) & Alchemical Flask sofort + gibt Move Speed.',
    upgrade_warp_stone: 'Blinkt einfach aus dem Binding Word Radius heraus UND gibt Bullet Resist gegen Wardens Gun.',
    upgrade_vex_barrier: 'Triggert sofort eine Barrier, falls dich der Binding Word Root auf der Lane doch erwischt.',
    upgrade_target_stun: 'Stunt Warden während seines 2s-Channel-Windups von Last Stand.',
    upgrade_rupture: 'Reduziert Wardens massiven Last Stand Lifesteal und schmilzt seine Frontline-HP.',
  },
  hero_wraith: {
    upgrade_metal_skin: 'Zünden, sobald Wraith Full Auto aktiviert, um ihren gesamten Gun-DPS für die Duration zu negieren.',
    upgrade_greater_withering_whip: 'Disarmt Wraith während Full Auto — sie kann weder schießen noch neue Cards aufladen.',
    upgrade_counterspell: 'Parry Wraiths Telekinesis oder Cards im Flug, um ihre Pick-Combo ohne Active Slot zu blocken.',
    upgrade_vex_barrier: 'Telekinesis triggert sofort deine Barrier und fängt ihren Full Auto + Card Trick Follow-up ab.',
    upgrade_deflecting_armor: 'Deflected Full Auto Bullets passiv und bremst ihre Card-Generation stark aus.',
  },
  hero_yamato: {
    upgrade_counterspell: 'Parry Yamatos aufgeladenen Power Slash genau beim Release — blockt den Nuke komplett und heilt dich.',
    upgrade_containment: 'Silenced ihren Flying Slash Grapple, sodass sie die Gap zu dir nicht schließen kann.',
    upgrade_targeted_silence: 'Silence Yamato im Fight rechtzeitig, bevor sie Shadow Transformation drücken kann.',
    upgrade_spellbreaker: 'Schluckt Yamatos voll aufgeladenen Power Slash Nuke passiv.',
    upgrade_healbane: 'Reduziert ihren Heal aus Crimson Slash auf einen Bruchteil.',
  },
  hero_dynamo: {
    upgrade_target_stun: 'Bricht Dynamos Singularity Channel-Ult von außerhalb des Black-Hole-Radius per Knockdown ab.',
    upgrade_unstoppable: 'Lässt dich Singularity komplett ignorieren und Dynamo einfach während seines Channels stunnen oder töten.',
    upgrade_glitch: 'Bricht Singularity sofort ab und verhindert Quantum Entanglement oder Refresher.',
  },
  hero_viper: {
    upgrade_return_fire: 'Vypers extreme Close-Range-Fire-Rate reflektiert so viel Damage, dass sie ihren eigenen kleinen HP-Pool schmilzt.',
    upgrade_metal_skin: 'Ignoriert Vypers kompletten Slide-Gun-DPS, während du sie einfach rausnimmst.',
    upgrade_greater_withering_whip: 'Disarmt Vyper mitten im Slide und shredded ihre Bullet Resist.',
    upgrade_deflecting_armor: 'Deflected Vypers Rapid-Fire-Bullets passiv und bricht ihren Close-Range-DPS.',
    upgrade_reduce_debuff_duration: 'Cleansed Lethal Venom sofort, bevor der verzögerte Gift-Burst procct.',
  },
  hero_vampirebat: {
    upgrade_containment: '#1 günstiger Counter gegen Mina: silenced ihren Sanguine Retreat Escape, damit du ihre kleine HP-Bar bursten kannst.',
    upgrade_cold_front: 'Mina hat einen der kleinsten Base-HP-Pools im Spiel — Cold Front AoE-Burst + Slow drückt sie sofort raus.',
    upgrade_targeted_silence: 'Silenced Sanguine Retreat & Nox Nostra, sodass Mina ohne Escape in einer Combo stirbt.',
    upgrade_focus_lens: '#1 Late-Game-Shutdown gegen Mina: Silence blockiert Sanguine Retreat und der Echo-Burst löscht sie.',
    upgrade_deflecting_armor: 'Verhindert passiv, dass Mina mit ihrer Waffe schnell Love Bites On-Hit-Stacks auf dir aufbaut.',
  },
  hero_astro: {
    upgrade_vex_barrier: 'Spirit Lasso & Bounce Pad Stun triggern sofort deine Barrier, damit du den Drag überlebst.',
    upgrade_counterspell: 'Parry Spirit Lasso oder Powder Keg Explosions, um Hollidays Pick-Combo komplett zu negieren.',
    upgrade_unstoppable: 'Verhindert durch CC-Immunity, dass Holliday dich mit Spirit Lasso rausziehen kann.',
    upgrade_rescue_beam: 'Zieht einen Teammate im Spirit Lasso sofort zurück in Sicherheit und heilt ihn gegen.',
  },
  hero_chrono: {
    upgrade_vex_barrier: 'Der Kinetic Carbine Time-Stop triggert automatisch deine Barrier, noch bevor Paradoxical Swap durchkommt.',
    upgrade_counterspell: 'Parry Kinetic Carbine oder das Paradoxical Swap Projektil, um ihre Pick-Combo komplett zu blocken.',
    upgrade_warp_stone: 'Blinkt nach einem Paradoxical Swap sofort wieder aus dem Gegnerteam heraus.',
    upgrade_rescue_beam: 'Zieht einen geswappten Teammate sofort zurück in eure Backline.',
  },
  hero_fencer: {
    upgrade_melee_rebuttal: 'Bestraft Apollos Melee-Lunges per Parry mit Self-Heal und reflektiertem Damage.',
    upgrade_containment: 'Silenced Apollos Dashes & Lunges, sodass er nicht rein- und rauskiten kann.',
    upgrade_targeted_silence: 'Silenced Riposte-Parry und seine Ult, sodass Apollo deinen Burst nicht countern kann.',
    upgrade_counterspell: 'Parry Apollos Ult (Itani Lo Sahn) im Impact-Moment, um Burst und Anti-Heal komplett zu blocken.',
    upgrade_glitch: 'Silenced, disarmt und sperrt Apollos Riposte & Mobility gleichzeitig.',
  },
  hero_unicorn: {
    upgrade_spirit_bubble: 'Fängt Celestes Radiant Daggers & Prism-Spirit-Burst auf der Lane automatisch ab.',
    upgrade_reduce_debuff_duration: 'Cleansed Celestes Dazzling Trick Silence und Light Eater sofort + gibt Heal & Move Speed (nicht für Shining Wonder Ult).',
    upgrade_spellbreaker: '#1 passiver Counter gegen Celeste: kappt ihren stärksten Spirit-Burst-Hit massiv.',
    upgrade_glitch: 'Entfernt Celestes Prism Shields und silenced ihre gesamte Caster-Rotation.',
  },
  hero_drifter: {
    upgrade_reduce_debuff_duration: 'Cleansed den Stalker\'s Mark Bleed sofort, bevor Drifter seinen Isolations-Burst durchdrückt.',
    upgrade_melee_rebuttal: 'Bestraft Drifters Close-Range-Melee-Trades per Parry mit Heal und Counter-Damage.',
    upgrade_warp_stone: 'Blinkt sofort aus Drifters Close-Range-Ambush heraus und gibt Bullet Resist.',
    upgrade_greater_withering_whip: 'Disarmt Drifter mitten in seinem Ambush und shredded seine Bullet Resist.',
    upgrade_metal_skin: 'Blockt Drifters gesamten Close-Range-Gun-Burst während Eternal Night.',
  },
  hero_necro: {
    upgrade_spirit_bubble: 'Fängt Graves\' konstanten Spirit-Poke und Grasping Hands Damage auf der Lane ab.',
    upgrade_vex_barrier: 'Triggert automatisch eine Barrier, sobald Grasping Hands dich rootet.',
    upgrade_tech_purge: 'Kontert Graves\' Spirit-Resist-Steal und seinen dauerhaften Zone-DoT passiv.',
    upgrade_absorbing_armor: 'Wandelt Graves\' permanente Spirit-Ticks in kürzere eigene Cooldowns um.',
  },
  hero_tengu: {
    upgrade_healbane: 'Reduziert Ivys Watcher\'s Covenant Tether-Heal und Kudzu-Lifesteal schon für 1.600 Souls.',
    upgrade_target_stun: 'Holt Ivy per Knockdown direkt aus ihrem Air Drop Flight.',
    upgrade_vex_barrier: 'Stone Form Stun triggert sofort deine Barrier, sodass du den Follow-up überlebst.',
    upgrade_rupture: 'Bricht Ivys Tether-Sustain & Lifesteal in Mid-/Late-Game-Skirmishes.',
    upgrade_glitch: 'Silenced Ivy, sodass sie weder Stone Form Invulnerability noch Air Drop Escape nutzen kann.',
  },
  hero_nurse: {
    upgrade_healbane: '#1 günstiger Counter gegen Nurse Harrow: reduziert Healing Needles & Leech Therapy Sustain sofort.',
    upgrade_reduce_debuff_duration: 'Cleansed Leech Therapy DoTs auf Knopfdruck, sodass sie weder Damage noch Heal daraus bekommt.',
    upgrade_rupture: 'Schneidet Nurse Harrows Heal-Output ab und schmilzt ihre Frontline-Targets.',
    upgrade_spirit_burn: 'Massiver Late-Game-AoE-Anti-Heal (-70 %), der Nurse Harrows Team-Sustain komplett bricht.',
  },
  hero_bookworm: {
    upgrade_healbane: 'Reduziert Paiges Sustain und Healing in Lane-Trades zuverlässig.',
    upgrade_restorative_locket: 'Sammelt gratis Heal- & Stamina-Stacks durch Paiges ständigen Ability- & Shield-Spam.',
    upgrade_targeted_silence: 'Silenced Paige im Teamfight, bevor sie Plot Armor Barriers auf ihr Team verteilen kann.',
    upgrade_glitch: '#1 Late-Game-Counter gegen Paige: entfernt aktive Plot Armor Barriers UND silenced ihr gesamtes Support-Kit.',
  },
  hero_ratking: {
    upgrade_reduce_debuff_duration: 'Cleansed Rat Swarm DoTs sofort und gibt dir einen Heal + Move Speed.',
    upgrade_debuff_reducer: 'Verkürzt Rat Swarm DoT-Ticks auf der Lane und upgradet zu Unstoppable oder Spellbreaker.',
    upgrade_rupture: 'Schmilzt Rat Kings hohe effektive HP und unterdrückt seinen Sustain.',
    upgrade_glitch: 'Entfernt seine Royal Pestments Max-HP-Barriers sofort und silenced seinen Grenade-/Swarm-Spam.',
  },
  hero_familiar: {
    upgrade_healbane: 'Reduziert Rems plötzlichen Tag Along Burst-Heal früh und günstig.',
    upgrade_vex_barrier: 'Naptime Sleep & Pillow-CC triggern sofort deine Barrier, damit du den Follow-up überlebst.',
    upgrade_containment: 'Silenced Rems mobile Dashes und Tag-Along-Escapes zuverlässig.',
    upgrade_unstoppable: 'Ignoriert wanddurchdringende Naptime Sleep-Ults und Pillow-Knockbacks komplett.',
    upgrade_auto_cleanse: 'Blockt überraschende Naptime Sleep-Hits automatisch ohne Reaktionszeit.',
  },
  hero_werewolf: {
    upgrade_melee_rebuttal: 'Bestraft Silvers aggressive Melee-Swings per Parry mit Heal & Counter-Damage.',
    upgrade_withering_whip: 'Senkt Silvers Slam Fire Rate schon für 800 Souls und upgradet zu Disarming Hex.',
    upgrade_greater_withering_whip: 'Disarmt Silver während Slam Fire / Lycan Curse und shredded ihre Bullet Resist.',
    upgrade_metal_skin: 'Blockt Silvers kompletten Slam Fire & Werwolf-M1-Bullet-Burst (beachte: blockt keine Melee-Hits).',
    upgrade_reduce_debuff_duration: 'Cleansed ihre Entangling Bola sofort, damit Silver dich nicht festhalten kann.',
    upgrade_deflecting_armor: 'Deflected Silvers Slam Fire Salven passiv ohne Active Slot.',
  },
  hero_chessmaster: {
    upgrade_cardio_calibrator: 'Hohe Slow-Resist lässt dich einfach aus Solomons Bishop-Slow-Zones herauslaufen.',
    upgrade_vex_barrier: 'Rook Battery Roots triggern automatisch deine Schutz-Barrier.',
    upgrade_reduce_debuff_duration: 'Cleansed Rook Battery Roots & Bishop-Slows sofort + gibt Move Speed.',
    upgrade_glitch: 'Entfernt Kingside Knight Barriers und silenced Solomons Zone-Control-Kit.',
  },
  hero_mirage: {
    upgrade_reduce_debuff_duration: 'Cleansed gestackte Djinn\'s Marks sofort, bevor Mirage den hohen Mark-Pop-Burst auslösen kann!',
    upgrade_deflecting_armor: 'Deflected Shots und verhindert On-Hit-Build-up, sodass Mirage kaum Djinn\'s Marks auf dir stacken kann.',
    upgrade_withering_whip: 'Senkt Mirages Fire Rate auf der Lane, damit er keine hohen Djinn\'s-Mark-Stacks aufbaut.',
  },
  hero_frank: {
    upgrade_rupture: 'Schmilzt Victors riesigen HP-Pool per %-Bleed und reduziert seine Jumpstart-Regen massiv.',
    upgrade_toxic_bullets: 'Konstanter %-Max-HP-Bleed + Anti-Heal über deine Shots bricht Victors Frontline-Sustain.',
    upgrade_healbane: 'Pflicht-Anti-Heal für 1.600 Souls gegen Victors Jumpstart-Regen und Aura-Lifesteal.',
    upgrade_tech_purge: 'Hohe passive Spirit Resist gegen permanente Aura of Suffering DoT-Ticks.',
    upgrade_spirit_burn: 'Explosiver -70 % Anti-Heal-Burn verhindert, dass Victor sich vor oder nach seinem Revive hochheilt.',
  },
  hero_viscous: {
    upgrade_healbane: 'Reduziert Viscous\' The Cube Regen und seinen allgemeinen Sustain spürbar.',
    upgrade_containment: 'Silenced Viscous\' Movement-Abilities, damit er nach The Cube nicht wegbouncen kann.',
    upgrade_glitch: 'Unterbricht Goo Ball sofort, verhindert The Cube Self-Save und entfernt seine Buffs.',
    upgrade_capacitor: 'Zieht Viscous alle Stamina-Bars ab und silenced seine Movement-Abilities nach The Cube.',
  },
  hero_nano: {
    upgrade_melee_rebuttal: 'Bestraft Calicos Leaping Slash & Melee-Hits auf der Lane per Parry mit Heal und Counter-Damage.',
    upgrade_containment: 'Silenced Leaping Slash und ihren Ava-Cat-Escape, damit Calico nicht entkommt.',
    upgrade_targeted_silence: 'Silenced Calico im Fight, bevor sie mit Return to Shadows untargetable wird.',
    upgrade_glitch: 'Sperrt Return to Shadows & Ava-Escape gleichzeitig, damit dein Team sie sicher bursten kann.',
  },
  hero_punkgoat: {
    upgrade_melee_rebuttal: 'Billy triggert seine Passive über Melee-Hits — jeder Parry heilt dich und reflektiert seinen Melee-Damage.',
    upgrade_vex_barrier: 'Chain Gang und Rising Ram triggern automatisch deine Barrier und fangen seinen Follow-up-Burst ab.',
    upgrade_warp_stone: 'Blinkt sofort aus Billys Melee-Range heraus und liefert Bonus Bullet Resist.',
    upgrade_unstoppable: 'Ignoriert Chain Gang Tethers und Rising Ram Knockups im Teamfight komplett.',
  },
  hero_forge: {
    upgrade_return_fire: 'Reflektiert McGinnis\' voll hochgedrehte Minigun direkt auf sie zurück (und feuert auf ihre Turrets zurück, wenn diese dich treffen).',
    upgrade_healbane: 'Reduziert den starken AoE-Heal ihres Medicinal Specter auf das ganze Gegnerteam.',
    upgrade_target_stun: 'Bricht ihre Heavy Barrage Channel-Ult aus sicherer Distanz per Knockdown ab.',
    upgrade_metal_skin: 'Ignoriert ihren voll hochgedrehten Minigun-DPS komplett, während du sie divest.',
  },
  hero_kelvin: {
    upgrade_cardio_calibrator: 'Hohe Slow-Resist verhindert, dass Kelvins Arctic Beam & Frost Grenade dich komplett festfrieren.',
    upgrade_target_stun: 'Bricht Kelvins Arctic Beam ab und holt ihn direkt von seinem Ice Path herunter.',
    upgrade_healbane: 'Reduziert Kelvins starken Frost Grenade & Frozen Shelter AoE-Heal im Teamfight.',
  },
  hero_magician: {
    upgrade_vex_barrier: 'Rabbit Hex Polymorph triggert automatisch deine Barrier, damit du den Vexing Bolt Burst überlebst.',
    upgrade_debuff_reducer: 'Verkürzt Rabbit Hex passiv um 25 % (aktive Cleanses sind im Hex gesperrt) — upgradet zu Spellbreaker oder Unstoppable.',
    upgrade_counterspell: 'Parry Rabbit Hex oder Vexing Bolt direkt beim Impact, um Polymorph und Burst komplett zu blocken.',
    upgrade_spellbreaker: 'Schluckt Sinclairs hohen Single-Hit-Burst von Vexing Bolt UND verkürzt Rabbit Hex passiv um 25 %.',
  },
  hero_deadpack: {
    upgrade_target_stun: 'Holt Deadman Danny per Knockdown sofort aus seinem Airborne-Jetpack-Flug.',
    upgrade_phantom_strike: 'Teleportiert dich direkt an Deadman Danny in der Luft, reißt ihn zu Boden und disarmt ihn.',
    upgrade_metal_skin: 'Negiert seinen Gun-DPS trotz Jettison Fuel Bullet-Resist-Shred komplett.',
  },
  hero_doorman: {
    upgrade_counterspell: 'Parry Call Bell Detonation, Luggage Cart oder Baroness Hotel Ult, um Doormans Combo zu blocken.',
    upgrade_vex_barrier: 'Triggert sofort eine Barrier, sobald Luggage Cart dich zieht oder stunnt.',
    upgrade_spellbreaker: 'Schluckt den hohen Single-Hit-Spirit-Burst von Call Bell und Baroness Hotel passiv.',
  },
  hero_priest: {
    upgrade_metal_skin: 'Aktivieren, sobald Venator seine Ira Domini Crossbow-Stakes zieht, um den massiven Bullet-Burst zu ignorieren.',
    upgrade_greater_withering_whip: 'Disarmt Venator genau während seines Ira Domini Fensters und shredded seine Bullet Resist.',
    upgrade_vex_barrier: 'Triggert automatisch eine Barrier, wenn du in eine Snap Trap trittst oder per Stake an die Wand gestunt wirst.',
  },
  hero_artist: {
    upgrade_restorative_locket: 'Sammelt durch Violets Living Ink & Flow State Reset-Spam rasant gratis Heal- & Stamina-Stacks.',
    upgrade_debuff_reducer: 'Verkürzt Still Life Stun und Abstract Landscape Silence/Slow um 25 % — upgradet zu Unstoppable oder Spellbreaker.',
    upgrade_reduce_debuff_duration: 'Cleansed Still Life Tether und Flow State Slows sofort + gibt Move Speed zum Line-of-Sight-Brechen (nicht für Abstract Landscape Ult).',
    upgrade_tech_purge: 'Hohe passive Spirit Resist gegen Violets anhaltenden Flow State, Still Life und Abstract Landscape Spirit-Damage.',
    upgrade_targeted_silence: 'Silenced Violet mitten im Fight, bricht ihren Living Ink -> Flow State Reset-Loop und verhindert Abstract Landscape.',
    upgrade_unstoppable: 'Ignoriert Still Life Stuns und lässt dich ohne Silence oder Slow direkt aus Abstract Landscape herauslaufen.',
  },
  hero_baba: {
    upgrade_vex_barrier: 'Triggert automatisch eine Schutz-Barrier, wenn Baba\'s Brew dich silenced oder Feed The Birds dich hexed.',
    upgrade_target_stun: 'Unterbricht Babas gechannelte Feed The Birds Ult aus sicherer Distanz, bevor der Tauben-Hex durchkommt.',
    upgrade_reduce_debuff_duration: 'Cleansed Baba\'s Brew Silence/Burn sofort + gibt Heal & Move Speed zum Repositionieren (nicht für Feed The Birds Ult).',
    upgrade_tech_purge: 'Reduziert Babas hohen Spirit-Damage aus Threadsap, Brew-Burn und Feed The Birds zuverlässig trotz Spirit-Resist-Shred.',
    upgrade_glitch: 'Bricht Feed The Birds sofort ab, entfernt Baba\'s Brew Barriers und stoppt Granny Long Legs Escapes.',
    upgrade_unstoppable: 'Ignoriert Feed The Birds Slow/Tauben-Hex sowie Baba\'s Brew Silence im Teamfight komplett.',
  },
};
