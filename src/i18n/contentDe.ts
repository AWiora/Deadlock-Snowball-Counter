/**
 * German localized tactical copy for hero threat headlines, counter item tips,
 * and hero-specific hard-counter callouts.
 * Plain German in short sentences. English only where gamers know the English term
 * far better (Souls, Items, Ult, Cooldown, Parry, Stacks, Root, Silence, Combo).
 * Ability, item and hero names stay in English: the UI swaps them for the
 * in-game language the player picked.
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
    why: 'Senkt Feuerrate und Kugelresistenz des Gegners für nur 800 Souls. Wird später zu Disarming Hex.',
    whenToUse: 'Gleich zu Beginn eines Schlagabtauschs einsetzen, bevor der Gegner Treffer-Stacks aufbaut.',
  },
  upgrade_melee_rebuttal: {
    why: 'Jeder Parry heilt dich, wirft den Nahkampfschaden zurück und erhöht deinen eigenen Schaden.',
    whenToUse: 'Parry drücken, sobald der Gegner zum schweren Nahkampfschlag ausholt.',
  },
  upgrade_grit: {
    why: 'Günstige Barriere auf Knopfdruck gegen einen frühen Komplettangriff auf der Lane.',
    whenToUse: 'Kurz bevor die gegnerische Combo trifft aktivieren.',
  },
  upgrade_health_stimpak: {
    why: 'Bester günstiger Heiltrank gegen viel Beschuss, damit du auf der Lane bleibst und weiter farmst.',
    whenToUse: 'Kurz hinter Deckung gehen und aktivieren, damit Schaden die Heilung nicht abbricht.',
  },
  upgrade_medic_bullets: {
    why: 'Heilt dich im Kampf, wenn du Helden triffst. Du musst dafür die Lane nicht verlassen.',
    whenToUse: 'Auf den gegnerischen Helden schießen, sobald der Effekt bereit ist.',
  },
  upgrade_endurance: {
    why: 'Passive Lebensregeneration, die nicht unterbrochen wird. Gut gegen ständigen Beschuss auf der Lane.',
    whenToUse: 'Passiv — hält dich bei ständigem kleinen Schaden stabil auf der Lane.',
  },
  upgrade_improved_stamina: {
    why: 'Eine zusätzliche Ausdauer-Ladung und schnellere Regeneration. Damit weichst du frühen Hooks, Roots und Nahkampf-Combos aus.',
    whenToUse: 'Passiv — immer einen Dash übrig lassen, um aus Kontrolle oder viel Schaden rauszukommen.',
  },
  upgrade_mystic_regeneration: {
    why: 'Heilt Spirit-Helden im Kampf: Jeder Fähigkeitstreffer auf Helden gibt zusätzliche Regeneration.',
    whenToUse: 'Passiv — den Gegner regelmäßig mit Fähigkeiten treffen, damit die Regeneration aktiv bleibt.',
  },
  upgrade_headshot_booster: {
    why: 'Günstiger Zusatzschaden bei Kopftreffern. Drängt Gegner mit wenig HP früh aus der Lane.',
    whenToUse: 'Passiv — sobald der Cooldown bereit ist, gezielt kurze Schlagabtausche mit Kopftreffern suchen.',
  },
  upgrade_magic_burst: {
    why: 'Zusätzlicher Spirit-Schaden für 800 Souls gegen Gegner mit wenig HP. Wird später zu Tankbuster.',
    whenToUse: 'Passiv — deine Hauptfähigkeit auf angeschlagene Gegner treffen, sobald der Effekt bereit ist.',
  },
  upgrade_close_range: {
    why: 'Mehr Waffenschaden auf unter 15 m. Bestraft Gegner, die dir zu nahe kommen.',
    whenToUse: 'Passiv — wenn der Gegner auf dich springt, direkt mit voller Feuerkraft dagegenhalten.',
  },
  upgrade_weapon_shielding: {
    why: 'Löst automatisch eine starke Barriere aus, wenn du länger Waffenschaden bekommst.',
    whenToUse: 'Passiv — kurze Schusswechsel annehmen, solange der Barriere-Cooldown bereit ist.',
  },
  upgrade_spirit_bubble: {
    why: 'Löst automatisch eine starke Barriere aus, wenn du viel Spirit-Schaden auf einmal bekommst. Bester früher Schutz gegen Spirit.',
    whenToUse: 'Passiv — fängt gegnerische Spirit-Combos ab.',
  },
  upgrade_regenerating_bullet_shield: {
    why: 'Frühe Kugelresistenz plus mehr Waffenschaden und Feuerrate, solange du über 65 % HP bist.',
    whenToUse: 'Passiv — über 65 % HP bleiben, dann gewinnst du jeden Schusswechsel leichter.',
  },
  upgrade_magic_shield: {
    why: 'Frühe Spirit-Resistenz plus Spirit-Kraft und kürzere Cooldowns.',
    whenToUse: 'Passiv — guter früher Schutz für Spirit-Helden gegen Gegner, die ständig Fähigkeiten einsetzen.',
  },
  upgrade_return_fire: {
    why: 'Wirft 65 % des Waffenschadens und 25 % des Spirit-Schadens zurück. Schnell feuernde Gegner schaden sich selbst. Wirkt nicht gegen Nahkampf.',
    whenToUse: 'Sofort aktivieren, wenn der Gegner voll auf dich schießt oder seine Waffen-Ult startet.',
  },
  upgrade_vex_barrier: {
    why: 'Löst automatisch eine große Barriere aus, sobald du betäubt, gesperrt, festgehalten, eingeschläfert oder gefesselt wirst.',
    whenToUse: 'Passiv — verhindert, dass frühe Kontroll-Combos (Betäubung, Fessel, Root, Schlaf) dich sofort töten.',
  },
  upgrade_debuff_reducer: {
    why: 'Verkürzt Betäubung, Silence, Root, Blutung, Brand und Verlangsamung um 25 %. Wird zu Unstoppable oder Spellbreaker.',
    whenToUse: 'Passiv — früh kaufen, wenn Schaden über Zeit oder Kontrolle dich ständig festhält.',
  },
  upgrade_healbane: {
    why: 'Günstigste passive Anti-Heilung für 1.600 Souls. Dein Spirit-Schaden senkt die Heilung des Gegners, und Kills heilen dich.',
    whenToUse: 'Passiv — den Gegner mit einer Fähigkeit treffen, bevor er sich heilt.',
  },
  upgrade_restorative_locket: {
    why: 'Sammelt Heil- und Ausdauer-Stacks, wenn Gegner in deiner Nähe Fähigkeiten einsetzen.',
    whenToUse: 'Mit vielen Stacks aktivieren, um viel Schaden zu überleben und sofort wieder Ausdauer für Dashes zu haben.',
  },
  upgrade_containment: {
    why: 'Sperrt Bewegungsfähigkeiten und Bewegungs-Items und verkürzt Dashes um 26 %. Wird zu Vortex Web.',
    whenToUse: 'Kurz bevor der Gegner sich wegziehen, teleportieren oder flüchten will. Normale Ausdauer-Dashes sperrt es nicht.',
  },
  upgrade_suppressor: {
    why: 'Jeder Spirit-Treffer senkt die Feuerrate des Gegners. Stark gegen Waffen-Carrys, braucht keinen Aktiv-Slot.',
    whenToUse: 'Passiv — den gegnerischen Waffen-Carry im Kampf regelmäßig mit Spirit-Schaden treffen.',
  },
  upgrade_spirit_sap: {
    why: 'Senkt Spirit-Kraft und Spirit-Resistenz des Gegners. Schwächt Spirit-Carrys spürbar.',
    whenToUse: 'Zu Beginn des Kampfs auf den stärksten Spirit-Gegner setzen, bevor er seine Combo zündet.',
  },
  upgrade_magic_slow: {
    why: 'Dein Spirit-Schaden verlangsamt Gegner. So erreichen Nahkämpfer dich nicht.',
    whenToUse: 'Passiv — Nahkämpfer beim Heranlaufen mit Fähigkeiten treffen und Abstand halten.',
  },
  upgrade_slowing_bullets: {
    why: 'Deine Schüsse verlangsamen. Schnell feuernde Helden halten Nahkämpfer damit auf Abstand, ohne Aktiv-Slot.',
    whenToUse: 'Passiv — beim Zurückweichen weiterschießen, damit die Verlangsamung bleibt.',
  },
  upgrade_headshot_booster2: {
    why: 'Kopftreffer senken günstig die Kugelresistenz von Tanks.',
    whenToUse: 'Passiv — Kopftreffer auf den Tank setzen, damit dein Team mehr Schaden macht.',
  },
  upgrade_magic_vulnerability: {
    why: 'Jeder Spirit-Treffer senkt die Spirit-Resistenz des Gegners. Starker 1.600-Souls-Konter gegen Tanks.',
    whenToUse: 'Passiv — erst mit einer schnellen Fähigkeit treffen, dann deine stärkste Fähigkeit hinterher.',
  },
  upgrade_cardio_calibrator: {
    why: 'Viel Schutz gegen Verlangsamung und mehr Bewegungstempo. Verlangsamer und Nahkämpfer holen dich nicht ein.',
    whenToUse: 'Passiv — hält dein Tempo trotz starker Verlangsamung hoch.',
  },
  upgrade_guardian_ward: {
    why: 'Barriere und Bewegungstempo auf Knopfdruck. Auf Teammates halber Cooldown. Rettet in frühen Kämpfen.',
    whenToUse: 'Kurz bevor viel Schaden auf dich oder deinen Lane-Partner kommt einsetzen.',
  },
  upgrade_metal_skin: {
    why: 'Macht dich kurz immun gegen alle Kugeln. Stärkster Aktiv-Konter gegen Waffen-Carrys und Waffen-Ults. Schützt nicht vor Nahkampf.',
    whenToUse: 'Sofort aktivieren, wenn der Gegner seine Waffen-Ult startet oder voll auf dich schießt.',
  },
  upgrade_greater_withering_whip: {
    why: 'Entwaffnet den Gegner komplett und senkt seine Kugelresistenz. Legt starke Waffen-Carrys lahm. Schützt nicht vor Nahkampf.',
    whenToUse: 'Direkt beim Angriff auf den Waffen-Carry einsetzen. Im späten Spiel erst abwarten, ob er Cleanse oder Unstoppable nutzt.',
  },
  upgrade_target_stun: {
    why: 'Betäubung auf Distanz per Klick. Holt fliegende Helden runter und unterbricht kanalisierte Ults zuverlässig.',
    whenToUse: 'Sofort einsetzen, sobald der Gegner abhebt oder eine kanalisierte Ult startet.',
  },
  upgrade_reduce_debuff_duration: {
    why: 'Entfernt sofort alle negativen Effekte außer Ults (Sticky Bombs, Blutung, Brand, Marks, Roots, Silence). Heilt dich und macht dich schneller.',
    whenToUse: 'Sofort aktivieren, wenn ein negativer Effekt auf dir sitzt (Bombe, Afterburn, Mark, Root, Static Charge). Geht nicht, wenn du betäubt, eingeschläfert oder verhext bist.',
  },
  upgrade_counterspell: {
    why: 'Dein Parry blockt auch Fähigkeiten und heilt dich. Gut gegen vorhersehbare Ults, Kontrolle und viel Schaden. Braucht keinen Aktiv-Slot.',
    whenToUse: 'Parry genau in dem Moment drücken, in dem die gegnerische Ult, Sticky Bomb oder der Hook trifft.',
  },
  upgrade_targeted_silence: {
    why: 'Breite Welle, die Fähigkeiten sperrt. Hindert Angreifer und bewegliche Caster an Flucht, Heilung und Combos.',
    whenToUse: 'Auf den Gegner feuern, sobald er auf dich springt. Bricht eine bereits laufende Ult nicht ab.',
  },
  upgrade_rupture: {
    why: 'Blutung, die prozentual HP abzieht, plus starke Anti-Heilung. Schmilzt Tanks und Heiler.',
    whenToUse: 'Früh im Kampf einsetzen, solange der Gegner noch viel HP hat. Dann wirkt es am stärksten.',
  },
  upgrade_toxic_bullets: {
    why: 'Deine Kugeln lösen Blutung nach max. HP und Anti-Heilung aus. Bester Waffen-Konter gegen Tanks, die sich heilen.',
    whenToUse: 'Passiv — durchgehend auf den Tank oder Heiler schießen, damit Blutung und Anti-Heilung nicht auslaufen.',
  },
  upgrade_magic_shock: {
    why: 'Spirit-Schaden nach aktuellen HP, der Spirit-Resistenz ignoriert. Knackt Tanks für Spirit-Helden.',
    whenToUse: 'Passiv — starke Fähigkeitstreffer (über 165 Schaden) auf Tanks landen, sobald der Effekt bereit ist.',
  },
  upgrade_improved_bullet_armor: {
    why: 'Hohe passive Kugelresistenz, die unter 50 % HP noch stärker wird. Belegt keinen Aktiv-Slot.',
    whenToUse: 'Passiv — dauerhafter Schutz gegen Gegner, die viel mit der Waffe schießen.',
  },
  upgrade_tech_purge: {
    why: 'Hohe passive Spirit-Resistenz mit starkem Bonus unter 50 % HP. Dein Schutz gegen dauerhaften Spirit-Schaden.',
    whenToUse: 'Passiv — schützt gegen Spirit-Schaden über Zeit und Flächenschaden im Teamfight.',
  },
  upgrade_warp_stone: {
    why: 'Sofortiger Teleport plus Kugelresistenz. Weicht Nahkampf-Angriffen aus und bringt dich aus Roots und Ults.',
    whenToUse: 'Sofort wegteleportieren, wenn ein Nahkämpfer auf dich springt oder eine Flächen-Ult unter dir startet.',
  },
  upgrade_bullet_armor_reduction_aura: {
    why: 'Aura, die Kugelresistenz und Feuerrate naher Gegner senkt. Im 1-gegen-1 doppelt so stark.',
    whenToUse: 'Passiv — im 1-gegen-1 nah am Gegner bleiben, dann wirkt die Aura doppelt.',
  },
  upgrade_reinforcing_casings: {
    why: 'Deine Treffer stapeln Kugelresistenz auf dir. Stark für schnell feuernde Helden in langen Schusswechseln.',
    whenToUse: 'Passiv — im Kampf durchgehend treffen, damit die Stacks oben bleiben.',
  },
  upgrade_deflecting_armor: {
    why: 'Bestes passives Item gegen Waffen: wehrt Kugeln ab und verhindert, dass Treffer-Effekte sich aufbauen (Fixation, Afterburn, Love Bites).',
    whenToUse: 'Passiv — wehrt einen Teil der Kugeln ab und blockt viele Treffer-Effekte, ohne Aktiv-Slot.',
  },
  upgrade_juggernaut: {
    why: 'Wird aus Enduring Speed. Jeder, der dich angreift, schießt 40 % langsamer. Dazu Schutz gegen Nahkampf und Verlangsamung.',
    whenToUse: 'Passiv — vorne Druck machen. Jeder Waffen-Carry, der auf dich schießt, verliert viel Feuerrate.',
  },
  upgrade_spellbreaker: {
    why: 'Senkt den nächsten großen Spirit-Treffer (über 175 Schaden) um 65 % und verkürzt negative Effekte. Wird aus Debuff Reducer.',
    whenToUse: 'Passiv — fängt den stärksten Einzeltreffer ab und verkürzt Kontrolle und Schaden über Zeit.',
  },
  upgrade_absorbing_armor: {
    why: 'Viel Spirit-Schaden verkürzt deine eigenen Cooldowns. Dazu starke Spirit-Resistenz.',
    whenToUse: 'Passiv — in langen Kämpfen gegen Fähigkeiten-Spammer bist du dadurch schneller wieder bereit.',
  },
  upgrade_glitch: {
    why: 'Stärkstes Ausschalt-Item für 6.400 Souls: unterbricht Ults, sperrt Fähigkeiten und Items, entwaffnet und entfernt Buffs.',
    whenToUse: 'Direkt auf den stärksten Gegner setzen, sobald er reinspringt oder seine Ult startet.',
  },
  upgrade_unstoppable: {
    why: 'Volle Immunität gegen Betäubung, Silence, Schlaf, Root und Entwaffnung.',
    whenToUse: 'Vor deinem Angriff oder deiner Ult zünden. Geht nicht mehr, wenn du schon betäubt bist.',
  },
  upgrade_auto_cleanse: {
    why: 'Entfernt automatisch die nächste Betäubung, Fessel, Root, Schlaf, Silence oder Furcht und gibt dir eine Barriere. Kein Aktiv-Slot nötig.',
    whenToUse: 'Passiv — schützt vor überraschender Kontrolle (Lasso-Betäubung, Schlaf, Combo, Roots), ganz ohne Reaktion.',
  },
  upgrade_self_bubble: {
    why: 'Macht dich kurz unverwundbar. Weicht vorhersehbaren Ults, verzögerten Explosionen und Combos aus.',
    whenToUse: 'Kurz vor dem tödlichen Schaden drücken. Früher abbrechen, sobald deine Cooldowns bereit sind.',
  },
  upgrade_inhibitor: {
    why: 'Deine Kugeln senken den gesamten Schaden und die Heilung des Gegners. Schwächt starke Carrys passiv.',
    whenToUse: 'Passiv — den stärksten Gegner früh im Kampf anschießen.',
  },
  upgrade_spirit_burn: {
    why: 'Viel Spirit-Schaden löst einen Brand in der Fläche mit -70 % Heilung aus. Zerstört Tanks und Heiler im späten Spiel.',
    whenToUse: 'Passiv — deine Spirit-Combo auf das Hauptziel setzen, um den Brand auszulösen.',
  },
  upgrade_banshee_slugs: {
    why: 'Kopftreffer senken Kugel- und Spirit-Resistenz und die Heilung des Gegners. Knackt jeden Tank.',
    whenToUse: 'Passiv — Kopftreffer auf den Tank setzen, damit dein ganzes Team mehr Schaden macht.',
  },
  upgrade_aprounds: {
    why: 'Kugeln ignorieren manchmal die Kugelresistenz und durchdringen Plated Armor.',
    whenToUse: 'Passiv — Pflichtkauf für Waffen-Carrys, wenn Gegner viel Kugelresistenz oder Plated Armor kaufen.',
  },
  upgrade_escalating_exposure: {
    why: 'Jeder Spirit-Treffer senkt die Spirit-Resistenz weiter. Schmilzt Tanks in langen Kämpfen.',
    whenToUse: 'Passiv — ideal für Helden mit Schaden über Zeit oder vielen Fähigkeiten gegen viel Spirit-Resistenz.',
  },
  upgrade_siphon_bullets: {
    why: 'Jeder Treffer stiehlt dem Gegner kurz max. HP und gibt sie dir.',
    whenToUse: 'Passiv — durchgehend auf den Tank schießen, um HP zu stehlen.',
  },
  upgrade_capacitor: {
    why: 'Starkes Waffen-Item: sperrt Ausdauer, verlangsamt stark und sperrt Bewegungsfähigkeiten und -Items.',
    whenToUse: 'Auf sehr bewegliche Gegner feuern, damit sie weder dashen, rutschen noch flüchten können.',
  },
  upgrade_phantom_strike: {
    why: 'Teleportiert dich zu fliegenden oder weit hinten stehenden Gegnern, holt sie runter, verlangsamt und entwaffnet sie.',
    whenToUse: 'Direkt auf fliegende Scharfschützen (Vindicta, Grey Talon) oder hinten stehende Waffen-Carrys einsetzen.',
  },
  upgrade_focus_lens: {
    why: 'Wird aus Spirit Sap: sperrt Fähigkeiten per Klick, senkt Spirit-Kraft und -Resistenz und wiederholt 35 % deines Schadens verzögert.',
    whenToUse: 'Auf bewegliche Spirit-Carrys setzen und sofort deinen vollen Schaden hinterher, solange sie nicht flüchten können.',
  },
  upgrade_proc_silence: {
    why: 'Deine Kugeln senken den Spirit-Schaden des Gegners um 25 % und bauen eine Silence auf. Schaltet Caster ohne Aktiv-Slot aus.',
    whenToUse: 'Passiv — mit hoher Feuerrate auf den wichtigsten Spirit-Caster schießen.',
  },
  upgrade_aoe_root: {
    why: 'Zieht Gegner zusammen, verlangsamt sie und sperrt Bewegungsfähigkeiten. Mit Alt-Cast direkt aufs Ziel.',
    whenToUse: 'Per Alt-Cast direkt auf bewegliche Carrys setzen, damit sie nicht flüchten können.',
  },
  upgrade_divine_barrier: {
    why: 'Entfernt negative Effekte außer Betäubung und gibt dir oder einem Teammate eine große Barriere und mehr Tempo.',
    whenToUse: 'Sticky Bombs, Blutung, Brand oder Verlangsamung von dir oder deinem Carry entfernen.',
  },
  upgrade_colossus: {
    why: 'Viel Kugel- und Spirit-Resistenz plus HP auf Knopfdruck. Verlangsamt Gegner um dich herum und verkürzt ihre Dashes.',
    whenToUse: 'Mitten im Getümmel zünden, wenn du gleichzeitig Waffen- und Spirit-Schaden aushalten musst.',
  },
  upgrade_discord: {
    why: 'Gibt Spirit-Resistenz und Schutz vor negativen Effekten plus eine Schadens-Aura nach max. HP. Auf dir oder einem Tank im Team.',
    whenToUse: 'Beim Angriff auf dich oder euren vordersten Kämpfer setzen, um Tanks zu schmelzen.',
  },
  upgrade_cold_front: {
    why: 'Sofortiger Spirit-Schaden in der Fläche plus starke Verlangsamung für 1.600 Souls. Bestraft Gegner mit wenig HP. Wird zu Arctic Blast.',
    whenToUse: 'Aus der Nähe zünden, um Gegner mit wenig HP sofort zu treffen und für Folgeschüsse zu verlangsamen.',
  },
  upgrade_arctic_blast: {
    why: 'Friert Gegner in der Fläche ein, macht Spirit-Schaden und stoppt ihre Ausdauer-Regeneration. Löscht bewegliche Gegner mit wenig HP aus.',
    whenToUse: 'Zünden, sobald ein beweglicher Gegner in Reichweite ist. Dann einfrieren und in einer Combo ausschalten.',
  },
  upgrade_pristine_emblem: {
    why: 'Viel mehr Waffenschaden gegen Ziele über 50 % HP. Drängt Gegner mit wenig HP wie Mina oder Vindicta früh aus der Lane.',
    whenToUse: 'Passiv — früh angreifen, solange der Gegner noch über 50 % HP hat.',
  },
  upgrade_headhunter: {
    why: 'Viel Kopftreffer-Schaden, heilt dich und macht dich schneller. Bestraft Carrys mit wenig HP.',
    whenToUse: 'Passiv — Kämpfe mit einem Kopftreffer eröffnen.',
  },
  upgrade_fleetfoot_boots: {
    why: 'Mehr Tempo auf Knopfdruck, Schutz vor Verlangsamung und keine Verlangsamung beim Schießen. Ideal, um Nahkämpfer auf Abstand zu halten.',
    whenToUse: 'Aktivieren, sobald dich ein Nahkämpfer verfolgt oder dich etwas verlangsamt. Dann rückwärts laufen und weiterschießen.',
  },
  upgrade_bullet_resist_shredder: {
    why: 'Dein Spirit-Schaden senkt die Kugelresistenz des Gegners und gibt dir selbst Kugelresistenz. Für nur 1.600 Souls.',
    whenToUse: 'Passiv — den Gegner kurz mit einer Fähigkeit treffen, bevor du mit der Waffe schießt.',
  },
  upgrade_tech_defense_shredders: {
    why: 'Deine Kugeln senken die Spirit-Resistenz des Gegners und geben dir Spirit-Lebensraub gegen ihn.',
    whenToUse: 'Passiv — den Tank kurz anschießen, bevor deine Spirit-Combo kommt.',
  },
  upgrade_rescue_beam: {
    why: 'Heilt auf Distanz und zieht einen gefangenen Teammate aus Hook, Combo, Lasso, Swap oder Singularity.',
    whenToUse: 'Auf den gefangenen Teammate setzen und sofort zu dir ziehen.',
  },
  upgrade_cheat_death: {
    why: 'Bei tödlichem Schaden kannst du kurz nicht sterben. Verhindert Finisher und Sofort-Kills ohne Aktiv-Slot.',
    whenToUse: 'Passiv — gibt dir bei tödlichem Schaden ein kurzes Fenster zum Heilen oder Flüchten.',
  },
  upgrade_fervor: {
    why: 'Verkürzt negative Effekte um 40 % und gibt unter 50 % HP viel Feuerrate und Tempo, um den Kampf noch zu drehen.',
    whenToUse: 'Passiv — wirkt automatisch unter 50 % HP. Waffen-Carrys drehen damit Angriffe auf sich um.',
  },
};

export const ITEM_CONTEXT_TIPS_DE: Record<string, Partial<Record<string, string>>> = {
  upgrade_reduce_debuff_duration: {
    cc: 'Entfernt Roots, Silence, Verlangsamung und verzögerte Betäubung sofort auf Knopfdruck. Heilt dich und macht dich schneller.',
  },
  upgrade_counterspell: {
    cc: 'Dein Parry blockt Hooks, Roots, Lassos und Betäubungs-Combos komplett. Braucht keinen Aktiv-Slot.',
    melee: 'Macht deinen Parry doppelt stark: bestraft Nahkampftreffer und blockt die Fähigkeit danach.',
  },
  upgrade_rupture: {
    tanky: 'Die Blutung nach HP-Prozent frisst sich durch viel HP und stoppt die Heilung.',
    healing: 'Starke Anti-Heilung auf Knopfdruck gegen Lebensraub-Builds.',
  },
  upgrade_toxic_bullets: {
    tanky: 'Deine Kugeln schmelzen große HP-Pools passiv über Blutung nach max. HP.',
    healing: 'Deine Schüsse halten die Anti-Heilung dauerhaft aufrecht. Lebensraub- und Heil-Builds brechen ein.',
  },
  upgrade_warp_stone: {
    melee: 'Teleportiert dich sofort aus der Nahkampfreichweite. Schwere Schläge gehen ins Leere.',
    cc: 'Teleportiert dich aus Roots, Flächeneffekten und Kontroll-Combos, bevor der nächste Treffer kommt.',
  },
  upgrade_fleetfoot_boots: {
    melee: 'Sofort mehr Tempo und Schutz vor Verlangsamung. So hältst du Nahkämpfer auf Abstand.',
  },
  upgrade_rescue_beam: {
    cc: 'Zieht gefangene Teammates aus Kontroll-Ults, Hooks und Betäubungen und heilt euch beide.',
  },
  upgrade_containment: {
    mobility: 'Sperrt Bewegungs-Items (Warp Stone, Majestic Leap) und Fluchtfähigkeiten und verkürzt Dashes. Für 1.600 Souls.',
  },
  upgrade_targeted_silence: {
    mobility: 'Sperrt bewegliche Gegner mitten im Kampf, damit sie nicht mehr flüchten oder teleportieren können.',
  },
  upgrade_capacitor: {
    mobility: 'Nimmt dem Gegner alle Ausdauer und sperrt Bewegungsfähigkeiten und -Items. Keine Chance zu flüchten.',
  },
  upgrade_aoe_root: {
    mobility: 'Zieht bewegliche Gegner zurück und sperrt per Alt-Cast ihre Bewegung, plus Verlangsamung.',
  },
};

export const HERO_OVERRIDE_TIPS_DE: Record<string, Record<string, string>> = {
  hero_haze: {
    upgrade_withering_whip: 'Senkt Hazes frühe Feuerrate, damit sie kaum Fixation-Stacks aufbaut. Wird zu Disarming Hex.',
    upgrade_return_fire: 'Zünden, sobald Haze auf dich schießt oder Bullet Dance startet. Sie schadet sich mit ihrer eigenen Feuerrate.',
    upgrade_metal_skin: 'Bester Aktiv-Konter gegen Haze: bei Bullet Dance sofort drücken. Ihre Kugeln machen dann keinen Schaden.',
    upgrade_greater_withering_whip: 'Entwaffnet Haze komplett, stoppt ihre Fixation-Stacks und senkt ihre Kugelresistenz.',
    upgrade_target_stun: 'Unterbricht Hazes Bullet Dance aus sicherer Entfernung, solange sie kein Unstoppable aktiv hat.',
    upgrade_deflecting_armor: 'Bester passiver Konter gegen Haze: wehrt Kugeln ab und verhindert Fixation-Stacks.',
    upgrade_juggernaut: 'Haze schießt langsamer, sobald sie auf dich zielt. Gut, wenn deine Aktiv-Slots voll sind.',
    upgrade_glitch: 'Bricht Bullet Dance sofort ab und sperrt Haze, bevor sie Unstoppable oder Smoke Bomb drücken kann.',
  },
  hero_atlas: {
    upgrade_melee_rebuttal: 'Bester 800-Souls-Konter gegen Abrams: Pariere seinen schweren Nahkampfschlag. Du heilst dich und machst viel Schaden zurück.',
    upgrade_vex_barrier: 'Gibt dir automatisch eine große Barriere, sobald Abrams dich mit Shoulder Charge oder Seismic Impact betäubt.',
    upgrade_healbane: 'Senkt die Heilung aus Siphon Life und Infernal Resilience bei jedem Spirit-Treffer.',
    upgrade_rupture: 'Schmilzt Abrams\' viele HP über Blutung und halbiert seine Regeneration.',
    upgrade_toxic_bullets: 'Blutung und Anti-Heilung über deine Kugeln brechen Abrams\' Selbstheilung.',
    upgrade_debuff_reducer: 'Verkürzt die Betäubung von Shoulder Charge, damit du schneller wieder handeln kannst.',
    upgrade_glitch: 'Unterbricht Abrams, sperrt seine Fähigkeiten und entfernt seine Buffs. Dann kann dein Team ihn ausschalten.',
  },
  hero_bebop: {
    upgrade_reduce_debuff_duration: 'Bester Konter gegen Bomben-Bebop: direkt nach Sticky Bomb drücken. Die Bombe fällt von dir ab, und mit dem Tempo-Schub läufst du aus der Explosion.',
    upgrade_counterspell: 'Kurz vor der Sticky-Bomb-Explosion oder beim Hook parieren. Das blockt den Schaden komplett und heilt dich.',
    upgrade_target_stun: 'Unterbricht Bebops Hyper Beam aus sicherer Entfernung.',
    upgrade_divine_barrier: 'Entfernt Sticky Bombs von dir oder einem gehookten Teammate und gibt eine starke Barriere.',
    upgrade_vex_barrier: 'Bester Lane-Konter gegen Bebop: Sein Hook löst sofort die Barriere aus und fängt Uppercut und Bombe ab.',
  },
  hero_gigawatt: {
    upgrade_target_stun: 'Bester Konter gegen Seven: unterbricht seine Storm Cloud aus sicherer Entfernung.',
    upgrade_reduce_debuff_duration: 'Entfernt Static Charge von dir, bevor die verzögerte Betäubung auslöst.',
    upgrade_counterspell: 'Parieren, wenn Static Charge abläuft. Das blockt Betäubung und Schaden komplett.',
    upgrade_spirit_bubble: 'Fängt Lightning Ball und Power Surge auf der Lane automatisch mit einer Barriere ab.',
    upgrade_glitch: 'Bricht Storm Cloud sofort ab und entfernt seinen Power-Surge-Buff.',
  },
  hero_hornet: {
    upgrade_target_stun: 'Bester Konter gegen Vindicta: holt sie mit Knockdown sofort aus dem Flug.',
    upgrade_phantom_strike: 'Teleportiert dich zur fliegenden Vindicta, holt sie runter und entwaffnet sie.',
    upgrade_weapon_shielding: 'Fängt ihren frühen Beschuss aus der Luft ab, damit du nicht in Reichweite ihres Assassinate fällst.',
    upgrade_metal_skin: 'Aktivieren, sobald Vindicta aus der Luft auf dich schießt. Ihre Kugeln machen dann keinen Schaden.',
    upgrade_deflecting_armor: 'Wehrt Vindictas Schüsse aus der Luft passiv ab und nimmt ihr im späten Spiel viel Schaden.',
  },
  hero_orion: {
    upgrade_target_stun: 'Bester Konter gegen Grey Talon: holt ihn mit Knockdown sofort aus Rain of Arrows.',
    upgrade_spirit_bubble: 'Fängt Charged Shots auf der Lane ab, damit er dich vor Guided Owl nicht kleinpokt.',
    upgrade_spellbreaker: 'Bester passiver Konter gegen Spirit-Grey-Talon: schluckt den großen Einzeltreffer von Charged Shot und Guided Owl.',
    upgrade_counterspell: 'Genau beim Einschlag von Guided Owl oder Charged Shot parieren. Das blockt den Treffer komplett.',
    upgrade_phantom_strike: 'Teleportiert dich zu Grey Talon, holt ihn aus der Luft und entwaffnet ihn.',
  },
  hero_inferno: {
    upgrade_reduce_debuff_duration: 'Bester Konter gegen Infernus: entfernt Afterburn und Napalm sofort. Sein Schaden über Zeit fällt weg.',
    upgrade_debuff_reducer: 'Verkürzt Afterburn und die Betäubung seiner Ult spürbar. Wird zu Unstoppable oder Spellbreaker.',
    upgrade_deflecting_armor: 'Bester passiver Konter gegen Infernus: Treffer-Effekte bauen sich nicht auf, Afterburn löst kaum noch aus.',
    upgrade_spirit_bubble: 'Fängt frühe Afterburn-Treffer auf der Lane mit einer Barriere ab.',
    upgrade_healbane: 'Senkt den Lebensraub, den Infernus über die Upgrades von Napalm und Concussive Combustion bekommt.',
  },
  hero_ghost: {
    upgrade_healbane: 'Senkt die Heilung aus Life Drain, damit Geist die HP, die sie für Essence Bomb und Malice opfert, nicht zurückholt.',
    upgrade_rupture: 'Macht Schaden nach ihren aktuellen HP und senkt die Heilung aus Life Drain stark.',
    upgrade_targeted_silence: 'Geist sperren, wenn sie wenig HP hat. Dann kann sie Soul Exchange nicht drücken.',
    upgrade_focus_lens: 'Sperrt Geist vor Soul Exchange und erledigt sie mit dem verzögerten Schaden.',
    upgrade_reduce_debuff_duration: 'Entfernt gestapelte Malice-Splitter, bevor ihre Essence Bomb einschlägt.',
    upgrade_restorative_locket: 'Geist setzt auf der Lane ständig Malice und Essence Bomb ein. Das gibt dir laufend Heil-Stacks.',
  },
  hero_lash: {
    upgrade_containment: 'Bester günstiger Konter gegen Lash: sperrt seinen Grapple, damit er nicht für Ground Strike hochkommt.',
    upgrade_target_stun: 'Einsetzen, sobald Lash für Death Slam in der Luft hängt. Das bricht die Ult ab.',
    upgrade_counterspell: 'Beim Death-Slam-Wurf oder Ground-Strike-Einschlag parieren. Das blockt die Combo komplett.',
    upgrade_self_bubble: 'Während Death Slam oder Ground Strike drücken. Du bist dann unverwundbar.',
    upgrade_spellbreaker: 'Schluckt passiv den großen Einzeltreffer von Lashs Ground Strike.',
  },
  hero_synth: {
    upgrade_divine_barrier: 'Eins der wenigen Items, das Pockets Affliction-Ult von dir oder einem Teammate entfernt. Dazu eine große Barriere.',
    upgrade_counterspell: 'Pockets Affliction oder Enchanter\'s Satchel genau beim Einschlag parieren. Das blockt den Schaden über Zeit.',
    upgrade_containment: 'Sperrt Pockets Bewegung, damit er nach Barrage nicht zu Flying Cloak teleportiert.',
    upgrade_targeted_silence: 'Pocket sperren, sobald er reinspringt. Dann kann er weder Satchel noch Flying Cloak nutzen.',
    upgrade_tech_purge: 'Bester passiver Schutz gegen Pockets Affliction-Schaden unter 50 % HP.',
    upgrade_focus_lens: 'Sperrt Satchel und Cloak und erledigt Pocket mit dem verzögerten Schaden.',
  },
  hero_shiv: {
    upgrade_healbane: 'Senkt Shivs Heilung, damit er den verzögerten Schaden aus Bloodletting nicht wegheilt.',
    upgrade_reduce_debuff_duration: 'Entfernt gestapelte Blutung von Serrated Knives, damit du nicht unter die Killing-Blow-Schwelle fällst.',
    upgrade_containment: 'Sperrt Shivs Slice and Dice und den Sprung von Killing Blow.',
    upgrade_rupture: 'Bestraft Shivs hohe HP durch Bloodletting mit Blutung und starker Anti-Heilung.',
    upgrade_glitch: 'Sperrt Bloodletting und Killing Blow, damit dein Team Shiv sofort ausschalten kann.',
    upgrade_cheat_death: 'Überlebt den tödlichen Treffer, damit Shiv im Teamfight keine Killing-Blow-Serie bekommt.',
  },
  hero_krill: {
    upgrade_vex_barrier: 'Bester früher Konter gegen Mo & Krill: Seine Combo-Ult löst automatisch deine Barriere aus.',
    upgrade_rescue_beam: 'Zieht einen festgehaltenen Teammate aus Mo & Krills Combo und heilt ihn.',
    upgrade_unstoppable: 'Kurz bevor Mo & Krill aus dem Boden angreift zünden. Combo und Sand Blast wirken dann nicht.',
    upgrade_auto_cleanse: 'Entfernt die Betäubung von Combo automatisch und gibt eine Barriere. Rettet dich, wenn deine Aktiv-Slots voll sind.',
    upgrade_rupture: 'Schmilzt Mo & Krills viele HP über Blutung und senkt die Heilung aus Scorn.',
    upgrade_toxic_bullets: 'Blutung nach max. HP frisst sich durch Mo & Krill und hält die Anti-Heilung gegen Scorn aufrecht.',
  },
  hero_warden: {
    upgrade_reduce_debuff_duration: 'Bester Konter gegen Warden: entfernt Binding Word vor dem Root und Alchemical Flask. Dazu mehr Tempo.',
    upgrade_warp_stone: 'Teleportiert dich aus dem Radius von Binding Word und gibt Kugelresistenz gegen Wardens Waffe.',
    upgrade_vex_barrier: 'Gibt sofort eine Barriere, falls dich der Root von Binding Word doch erwischt.',
    upgrade_target_stun: 'Betäubt Warden in den 2 Sekunden, in denen er Last Stand auflädt.',
    upgrade_rupture: 'Senkt Wardens starken Lebensraub aus Last Stand und schmilzt seine HP.',
  },
  hero_wraith: {
    upgrade_metal_skin: 'Zünden, sobald Wraith Full Auto aktiviert. Ihre Kugeln machen dann keinen Schaden.',
    upgrade_greater_withering_whip: 'Entwaffnet Wraith während Full Auto. Sie kann weder schießen noch neue Karten aufladen.',
    upgrade_counterspell: 'Wraiths Telekinesis oder Karten im Flug parieren. Das blockt ihre Combo ohne Aktiv-Slot.',
    upgrade_vex_barrier: 'Telekinesis löst sofort deine Barriere aus und fängt Full Auto und Card Trick danach ab.',
    upgrade_deflecting_armor: 'Wehrt Kugeln aus Full Auto passiv ab und bremst ihre Karten stark aus.',
  },
  hero_yamato: {
    upgrade_counterspell: 'Yamatos aufgeladenen Power Slash genau beim Loslassen parieren. Das blockt den Treffer und heilt dich.',
    upgrade_containment: 'Sperrt ihren Flying Slash, damit sie nicht an dich herankommt.',
    upgrade_targeted_silence: 'Yamato rechtzeitig sperren, bevor sie Shadow Transformation drücken kann.',
    upgrade_spellbreaker: 'Schluckt passiv Yamatos voll aufgeladenen Power Slash.',
    upgrade_healbane: 'Senkt ihre Heilung aus Crimson Slash stark.',
  },
  hero_dynamo: {
    upgrade_target_stun: 'Unterbricht Dynamos Singularity mit Knockdown von außerhalb des Radius.',
    upgrade_unstoppable: 'Singularity wirkt nicht auf dich. Du kannst Dynamo währenddessen betäuben oder töten.',
    upgrade_glitch: 'Bricht Singularity sofort ab und verhindert Quantum Entanglement oder Refresher.',
  },
  hero_viper: {
    upgrade_return_fire: 'Vyper schießt aus der Nähe so schnell, dass der zurückgeworfene Schaden ihre wenigen HP schmilzt.',
    upgrade_metal_skin: 'Vypers Schüsse beim Rutschen machen keinen Schaden, während du sie ausschaltest.',
    upgrade_greater_withering_whip: 'Entwaffnet Vyper mitten im Rutschen und senkt ihre Kugelresistenz.',
    upgrade_deflecting_armor: 'Wehrt Vypers schnelle Kugeln passiv ab und bricht ihren Schaden aus der Nähe.',
    upgrade_reduce_debuff_duration: 'Entfernt Lethal Venom, bevor der verzögerte Giftschaden auslöst.',
  },
  hero_vampirebat: {
    upgrade_containment: 'Bester günstiger Konter gegen Mina: sperrt ihre Flucht mit Sanguine Retreat. Dann kannst du ihre wenigen HP ausschalten.',
    upgrade_cold_front: 'Mina hat sehr wenig Grund-HP. Schaden in der Fläche plus Verlangsamung drängt sie sofort raus.',
    upgrade_targeted_silence: 'Sperrt Sanguine Retreat und Nox Nostra. Ohne Flucht stirbt Mina in einer Combo.',
    upgrade_focus_lens: 'Bestes Item gegen Mina im späten Spiel: Die Sperre blockt Sanguine Retreat, der verzögerte Schaden erledigt sie.',
    upgrade_deflecting_armor: 'Verhindert passiv, dass Mina mit ihrer Waffe schnell Love-Bites-Stacks auf dir aufbaut.',
  },
  hero_astro: {
    upgrade_vex_barrier: 'Spirit Lasso löst sofort deine Barriere aus. So überlebst du das Wegziehen.',
    upgrade_counterspell: 'Spirit Lasso oder Powder Keg parieren. Das blockt Hollidays Combo komplett.',
    upgrade_unstoppable: 'Holliday kann dich mit Spirit Lasso nicht mehr wegziehen.',
    upgrade_rescue_beam: 'Zieht einen Teammate aus dem Spirit Lasso zurück und heilt ihn.',
  },
  hero_chrono: {
    upgrade_vex_barrier: 'Der Zeitstopp von Kinetic Carbine löst automatisch deine Barriere aus, noch bevor Paradoxical Swap trifft.',
    upgrade_counterspell: 'Kinetic Carbine oder das Geschoss von Paradoxical Swap parieren. Das blockt ihre Combo komplett.',
    upgrade_warp_stone: 'Teleportiert dich nach Paradoxical Swap sofort wieder aus dem Gegnerteam.',
    upgrade_rescue_beam: 'Zieht einen getauschten Teammate sofort zurück zu euch.',
  },
  hero_fencer: {
    upgrade_melee_rebuttal: 'Pariere Apollos Nahkampf-Ausfälle. Du heilst dich und wirfst den Schaden zurück.',
    upgrade_containment: 'Sperrt Apollos Dashes, damit er nicht rein und wieder raus springen kann.',
    upgrade_targeted_silence: 'Sperrt Riposte und seine Ult, damit Apollo deinen Angriff nicht kontern kann.',
    upgrade_counterspell: 'Apollos Ult (Itani Lo Sahn) beim Einschlag parieren. Das blockt Schaden und Anti-Heilung komplett.',
    upgrade_glitch: 'Sperrt, entwaffnet und blockt Apollos Riposte und Bewegung gleichzeitig.',
  },
  hero_unicorn: {
    upgrade_spirit_bubble: 'Fängt Celestes Radiant Daggers und Prism-Schaden auf der Lane automatisch ab.',
    upgrade_reduce_debuff_duration: 'Entfernt die Silence von Dazzling Trick und Light Eater sofort. Heilt dich und macht dich schneller. Hilft nicht gegen ihre Ult.',
    upgrade_spellbreaker: 'Bester passiver Konter gegen Celeste: senkt ihren stärksten Spirit-Treffer stark.',
    upgrade_glitch: 'Entfernt Celestes Prism Shields und sperrt alle ihre Fähigkeiten.',
  },
  hero_drifter: {
    upgrade_reduce_debuff_duration: 'Entfernt die Blutung von Stalker\'s Mark, bevor Drifter dich allein erwischt.',
    upgrade_melee_rebuttal: 'Pariere Drifters Nahkampfangriffe. Du heilst dich und machst Schaden zurück.',
    upgrade_warp_stone: 'Teleportiert dich sofort aus Drifters Hinterhalt und gibt Kugelresistenz.',
    upgrade_greater_withering_whip: 'Entwaffnet Drifter mitten im Hinterhalt und senkt seine Kugelresistenz.',
    upgrade_metal_skin: 'Blockt Drifters Waffenschaden aus der Nähe während Eternal Night.',
  },
  hero_necro: {
    upgrade_spirit_bubble: 'Fängt Graves\' ständigen Spirit-Beschuss und den Schaden von Grasping Hands auf der Lane ab.',
    upgrade_vex_barrier: 'Gibt automatisch eine Barriere, sobald Grasping Hands dich festhält.',
    upgrade_tech_purge: 'Schützt passiv gegen Graves\' Diebstahl von Spirit-Resistenz und seinen Flächenschaden über Zeit.',
    upgrade_absorbing_armor: 'Graves\' ständige Spirit-Treffer verkürzen deine eigenen Cooldowns.',
  },
  hero_tengu: {
    upgrade_healbane: 'Senkt Ivys Heilung aus Kudzu Connection und Stone Form, schon für 1.600 Souls.',
    upgrade_target_stun: 'Holt Ivy mit Knockdown direkt aus ihrem Air Drop.',
    upgrade_vex_barrier: 'Die Betäubung von Stone Form löst sofort deine Barriere aus. So überlebst du den Angriff danach.',
    upgrade_rupture: 'Bricht Ivys Heilung aus Kudzu Connection und Stone Form in längeren Kämpfen.',
    upgrade_glitch: 'Sperrt Ivy. Dann kann sie weder Stone Form noch Air Drop zur Flucht nutzen.',
  },
  hero_nurse: {
    upgrade_healbane: 'Bester günstiger Konter gegen Nurse Harrow: senkt sofort die Heilung aus Healing Needles.',
    upgrade_reduce_debuff_duration: 'Entfernt Leech Therapy auf Knopfdruck. Schaden über Zeit und das Abbauen deiner Buffs hören sofort auf.',
    upgrade_rupture: 'Senkt Nurse Harrows Heilung und schmilzt die Tanks, die sie heilt.',
    upgrade_spirit_burn: 'Starke Anti-Heilung in der Fläche (-70 %) im späten Spiel. Bricht die Heilung ihres ganzen Teams.',
  },
  hero_bookworm: {
    upgrade_healbane: 'Senkt Paiges Heilung im Schlagabtausch auf der Lane zuverlässig.',
    upgrade_restorative_locket: 'Paige setzt ständig Fähigkeiten und Schilde ein. Das gibt dir laufend Heil- und Ausdauer-Stacks.',
    upgrade_targeted_silence: 'Paige im Teamfight sperren, bevor sie Plot-Armor-Barrieren auf ihr Team verteilt.',
    upgrade_glitch: 'Bestes Item gegen Paige im späten Spiel: entfernt aktive Plot-Armor-Barrieren und sperrt alle ihre Fähigkeiten.',
  },
  hero_ratking: {
    upgrade_reduce_debuff_duration: 'Entfernt Rat Swarm sofort, heilt dich und macht dich schneller.',
    upgrade_debuff_reducer: 'Verkürzt den Schaden von Rat Swarm auf der Lane. Wird zu Unstoppable oder Spellbreaker.',
    upgrade_glitch: 'Entfernt seine Royal-Pestments-Barrieren sofort und sperrt seine Granaten und Rat Swarm.',
  },
  hero_familiar: {
    upgrade_healbane: 'Senkt Rems plötzliche Heilung aus Tag Along früh und günstig.',
    upgrade_vex_barrier: 'Der Schlaf von Naptime löst sofort deine Barriere aus.',
    upgrade_containment: 'Sperrt Rems Dashes und seine Flucht mit Tag Along.',
    upgrade_unstoppable: 'Naptime und Pillow wirken nicht mehr auf dich, auch nicht durch Wände.',
    upgrade_auto_cleanse: 'Blockt überraschenden Schlaf von Naptime automatisch, ganz ohne Reaktion.',
  },
  hero_werewolf: {
    upgrade_melee_rebuttal: 'Pariere Silvers Nahkampfschläge. Du heilst dich und machst Schaden zurück.',
    upgrade_withering_whip: 'Senkt die Feuerrate von Silvers Slam Fire schon für 800 Souls. Wird zu Disarming Hex.',
    upgrade_greater_withering_whip: 'Entwaffnet Silver während Slam Fire oder Lycan Curse und senkt ihre Kugelresistenz.',
    upgrade_metal_skin: 'Blockt Silvers Kugeln aus Slam Fire und in Werwolf-Form. Ihre Nahkampfschläge blockt es nicht.',
    upgrade_reduce_debuff_duration: 'Entfernt ihre Entangling Bola sofort, damit Silver dich nicht festhält.',
    upgrade_deflecting_armor: 'Wehrt Silvers Salven aus Slam Fire passiv ab, ohne Aktiv-Slot.',
  },
  hero_chessmaster: {
    upgrade_cardio_calibrator: 'Mit viel Schutz gegen Verlangsamung läufst du einfach aus Solomons Bishop-Feldern heraus.',
    upgrade_vex_barrier: 'Die Roots von Rook Battery lösen automatisch deine Barriere aus.',
    upgrade_reduce_debuff_duration: 'Entfernt Roots von Rook Battery und Verlangsamung von Bishop sofort. Dazu mehr Tempo.',
    upgrade_glitch: 'Entfernt Kingside-Knight-Barrieren und sperrt Solomons Fähigkeiten.',
  },
  hero_mirage: {
    upgrade_reduce_debuff_duration: 'Entfernt gestapelte Djinn\'s Marks sofort, bevor Mirage sie für viel Schaden auslöst.',
    upgrade_deflecting_armor: 'Wehrt einen Teil von Mirages Kugeln passiv ab (gegen Djinn\'s Mark hilft es nicht).',
    upgrade_withering_whip: 'Senkt Mirages Feuerrate und Kugelresistenz im Schlagabtausch auf der Lane.',
  },
  hero_frank: {
    upgrade_rupture: 'Schmilzt Victors viele HP über Blutung und senkt die Heilung aus Jumpstart stark.',
    upgrade_toxic_bullets: 'Blutung und Anti-Heilung über deine Schüsse brechen Victors Selbstheilung.',
    upgrade_healbane: 'Pflicht-Anti-Heilung für 1.600 Souls gegen die Regeneration aus Victors Jumpstart.',
    upgrade_tech_purge: 'Viel passive Spirit-Resistenz gegen den Dauerschaden von Aura of Suffering.',
    upgrade_spirit_burn: 'Der Brand mit -70 % Heilung verhindert, dass Victor sich vor oder nach seiner Wiederbelebung hochheilt.',
  },
  hero_viscous: {
    upgrade_healbane: 'Senkt die Heilung aus The Cube und Viscous\' Selbstheilung spürbar.',
    upgrade_containment: 'Verlangsamt Viscous, damit er nach The Cube nicht wegkommt (Goo Ball selbst wird nicht gesperrt).',
    upgrade_glitch: 'Unterbricht Goo Ball sofort, verhindert die Rettung mit The Cube und entfernt seine Buffs.',
    upgrade_capacitor: 'Nimmt Viscous alle Ausdauer und verlangsamt ihn stark nach The Cube.',
  },
  hero_nano: {
    upgrade_melee_rebuttal: 'Pariere Calicos Leaping Slash und ihre Nahkampftreffer. Du heilst dich und machst Schaden zurück.',
    upgrade_containment: 'Sperrt Leaping Slash und ihre Flucht mit der Katze Ava.',
    upgrade_targeted_silence: 'Calico im Kampf sperren, bevor sie mit Return to Shadows unangreifbar wird.',
    upgrade_glitch: 'Sperrt Return to Shadows und die Flucht mit Ava gleichzeitig. Dann kann dein Team sie sicher ausschalten.',
  },
  hero_punkgoat: {
    upgrade_melee_rebuttal: 'Billy lädt seine Passive über Nahkampftreffer auf. Jeder Parry heilt dich und wirft seinen Schaden zurück.',
    upgrade_vex_barrier: 'Chain Gang löst automatisch deine Barriere aus und fängt seinen Schaden danach ab.',
    upgrade_warp_stone: 'Teleportiert dich sofort aus Billys Nahkampfreichweite und gibt Kugelresistenz.',
    upgrade_unstoppable: 'Die Ketten von Chain Gang halten und ziehen dich nicht, solange Unstoppable aktiv ist.',
  },
  hero_forge: {
    upgrade_return_fire: 'Wirft den Schaden von McGinnis\' voll aufgedrehter Minigun auf sie zurück. Trifft auch ihre Geschütze, wenn die dich angreifen.',
    upgrade_healbane: 'Senkt die starke Flächenheilung von Medicinal Specter für ihr ganzes Team.',
    upgrade_target_stun: 'Unterbricht Heavy Barrage mit Knockdown aus sicherer Entfernung.',
    upgrade_metal_skin: 'Ihre voll aufgedrehte Minigun macht keinen Schaden, während du auf sie zuspringst.',
  },
  hero_kelvin: {
    upgrade_cardio_calibrator: 'Viel Schutz gegen Verlangsamung. Arctic Beam und Frost Grenade frieren dich nicht mehr fest.',
    upgrade_target_stun: 'Unterbricht Kelvins Arctic Beam und holt ihn von Ice Path herunter.',
    upgrade_healbane: 'Senkt Kelvins starke Flächenheilung aus Frost Grenade und Frozen Shelter im Teamfight.',
  },
  hero_magician: {
    upgrade_debuff_reducer: 'Verkürzt Rabbit Hex passiv um 25 %. Aktive Cleanses gehen im Hex nicht. Wird zu Spellbreaker oder Unstoppable.',
    upgrade_counterspell: 'Rabbit Hex oder Vexing Bolt beim Einschlag parieren. Das blockt Verwandlung und Schaden komplett.',
    upgrade_spellbreaker: 'Schluckt Sinclairs großen Einzeltreffer von Vexing Bolt und verkürzt Rabbit Hex passiv um 25 %.',
    upgrade_vex_barrier: 'Rabbit Hex löst automatisch deine Barriere aus. So überlebst du den Schaden von Vexing Bolt.',
  },
  hero_deadpack: {
    upgrade_target_stun: 'Holt Deadman Danny mit Knockdown sofort aus seinem Jetpack-Flug.',
    upgrade_phantom_strike: 'Teleportiert dich zu Deadman Danny in der Luft, holt ihn runter und entwaffnet ihn.',
    upgrade_metal_skin: 'Seine Kugeln machen keinen Schaden, auch wenn Jettison Fuel deine Kugelresistenz gesenkt hat.',
  },
  hero_doorman: {
    upgrade_counterspell: 'Call-Bell-Explosion, Luggage Cart oder Baroness Hotel parieren. Das blockt Doormans Combo.',
    upgrade_spellbreaker: 'Schluckt passiv den großen Spirit-Treffer von Call Bell und Baroness Hotel.',
    upgrade_reduce_debuff_duration: 'Entfernt Verlangsamung und Zielungenauigkeit von Call Bell sofort.',
    upgrade_vex_barrier: 'Gibt sofort eine Barriere, sobald Luggage Cart dich zieht oder betäubt.',
  },
  hero_priest: {
    upgrade_metal_skin: 'Aktivieren, sobald Venator für Ira Domini seine Armbrust zieht. Seine Kugeln machen dann keinen Schaden.',
    upgrade_greater_withering_whip: 'Entwaffnet Venator genau während Ira Domini und senkt seine Kugelresistenz.',
    upgrade_vex_barrier: 'Gibt automatisch eine Barriere, wenn du in eine Snap Trap trittst oder an die Wand genagelt wirst.',
  },
  hero_artist: {
    upgrade_restorative_locket: 'Violet setzt Living Ink und Flow State ständig ein. Das gibt dir schnell Heil- und Ausdauer-Stacks.',
    upgrade_debuff_reducer: 'Verkürzt die Betäubung von Still Life und Silence und Verlangsamung von Abstract Landscape um 25 %. Wird zu Unstoppable oder Spellbreaker.',
    upgrade_reduce_debuff_duration: 'Entfernt die Fessel von Still Life und die Verlangsamung von Flow State sofort. Dazu mehr Tempo, um aus der Sichtlinie zu kommen. Hilft nicht gegen ihre Ult.',
    upgrade_tech_purge: 'Viel passive Spirit-Resistenz gegen Violets Schaden aus Flow State, Still Life und Abstract Landscape.',
    upgrade_targeted_silence: 'Violet mitten im Kampf sperren. Das bricht ihre Living-Ink-Schleife und verhindert Abstract Landscape.',
    upgrade_unstoppable: 'Still Life betäubt dich nicht mehr, und du läufst ohne Silence oder Verlangsamung aus Abstract Landscape heraus.',
  },
  hero_baba: {
    upgrade_vex_barrier: 'Gibt automatisch eine Barriere, wenn Baba\'s Brew dich sperrt.',
    upgrade_target_stun: 'Unterbricht Babas Feed The Birds aus sicherer Entfernung, bevor der Tauben-Fluch wirkt.',
    upgrade_reduce_debuff_duration: 'Entfernt Silence und Brand von Baba\'s Brew sofort. Heilt dich und macht dich schneller. Hilft nicht gegen ihre Ult.',
    upgrade_tech_purge: 'Senkt Babas Spirit-Schaden aus Threadsap, Brew und Feed The Birds zuverlässig, auch wenn sie deine Resistenz senkt.',
    upgrade_glitch: 'Bricht Feed The Birds sofort ab, entfernt Barrieren von Baba\'s Brew und stoppt die Flucht mit Granny Long Legs.',
    upgrade_unstoppable: 'Verlangsamung und Tauben-Fluch von Feed The Birds und die Silence von Baba\'s Brew wirken im Teamfight nicht mehr.',
  },
};
