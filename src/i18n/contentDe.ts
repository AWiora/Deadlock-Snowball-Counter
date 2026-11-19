/**
 * German localized tactical copy for hero threat headlines, counter item tips,
 * and hero-specific hard-counter callouts.
 */

export const HERO_HEADLINES_DE: Record<string, string> = {
  hero_atlas: 'Starker Nahkampf-Brawler mit enormer Regeneration, Schulterramme-Stuns und Lebensentzug.',
  hero_fencer: 'Agiler Duellant mit Parier-Konter (Riposte), Ausfallschritten und heilungsblockender Ult.',
  hero_bebop: 'Greifhaken-zu-Aufwärtshaken-Kombo, skalierende Haftbomben und kanalisierter Hyperstrahl.',
  hero_punkgoat: 'Unerbittlicher Nahkampf-Bruiser mit Bodenschlag, Ansturm und Kettengang-Fessel.',
  hero_nano: 'Schwer greifbare Assassine mit Schattenbomben, Nahkampf-Heilung und unanvisierbarer Schatten-Ult.',
  hero_unicorn: 'Spirit-Burst-Magierin mit Prismenschild-Stille, Lichtstrahlen und starken Verlangsamungen.',
  hero_deadpack: 'Jetpack-Schütze, der aus der Luft angreift, Kugelresistenz senkt und Ziele packt.',
  hero_drifter: 'Jagd-Duellant, der isolierte Ziele verbluten lässt und Teams in Dunkelheit hüllt.',
  hero_dynamo: 'Teamkampf-Disruptor mit Flächenheilung und spielentscheidender kanalisierter Singularität.',
  hero_necro: 'Zermürbender Nekromant, der Waffenschaden & Spirit-Resistenz stiehlt und Flächen kontrolliert.',
  hero_orion: 'Luft-Scharfschütze mit aufgeladenen Pfeilen aus der Luft, Fallen und gelenkter Eule.',
  hero_haze: 'Hyper-skalierende Waffen-Assassine mit Fixation-Stapeln, Schlafdolch und Kugeltanz-Ult.',
  hero_astro: 'Schnelle Trickshot-Kämpferin mit Sprungpad-Fässern, Kopfschuss-Boni und Spirit-Lasso.',
  hero_inferno: 'DoT-Carry, der durch schnelles Feuer Nachbrennen stapelt und massiv über Spirit-Lebensraub heilt.',
  hero_tengu: 'Mobile Utility-Kämpferin mit Heilverbindung, Steinform-Stun und Luftabwurf-Engages.',
  hero_kelvin: 'Eis-Bruiser mit extremem Verlangsamungsstrahl, Heilgranaten und undurchdringlicher Eiskuppel.',
  hero_ghost: 'Drain-Tank und Lane-Bully mit Bomben-Spam, Lebensentzug und Lebenspunkte-Tausch-Ult.',
  hero_lash: 'Vertikaler Dive-Assassine mit massivem Bodenschlag-Burst, Peitschen-Heilung und Todeswurf.',
  hero_forge: 'Zonenkontrolle mit hochdrehender Minigun, Geschütztürmen, Heilzone und Raketenhagel.',
  hero_vampirebat: 'Wendige Spirit-Assassine mit On-Hit-Bissen, Unanvisierbarkeit und Fledermaus-Stille.',
  hero_mirage: 'Globaler Duellant mit stapelbaren Dschinn-Malen, Skarabäus-Entzug und Tornado-Knockup.',
  hero_krill: 'Extrem zäher Frontliner mit Eingraben-Rüstung, Heilung, Entwaffnung und langer Kombo-Betäubung.',
  hero_nurse: 'Sustain-Supporterin mit Blutegel-DoTs, Heilspritzen und Spirit-Schadenszonen.',
  hero_bookworm: 'Schild-Supporterin, die Verbündete mit Barrieren stärkt und aus der Distanz kontrolliert.',
  hero_chrono: 'Pick-Spezialistin mit Zeitstopp-Karabiner und Positionstausch in ihr eigenes Team.',
  hero_synth: 'Wendiger AoE-Burst-Diver mit starkem Affliction-DoT, Koffer-Immunität und Umhang-Teleport.',
  hero_ratking: 'Zäher Bruiser mit Max-HP-Barrieren, Rattenschwarm-DoT und Mehrfach-Granaten.',
  hero_familiar: 'Nerviger Support mit plötzlicher Burst-Heilung, Rückstoß und wanddurchdringender Schlaf-Ult.',
  hero_gigawatt: 'AoE-Blitz-Carry mit verzögertem Statik-Stun, Kettenblitzen und riesiger Gewitterwolke.',
  hero_shiv: 'Aggressiver Dive-Brawler mit verzögertem Schaden (Aderlass), Blutungs-Messern und Exekution.',
  hero_werewolf: 'Wilder Nahkampf-Skirmisher mit Schnellfeuer, Bewegungs-Fessel und Werwolf-Verwandlung.',
  hero_magician: 'Burst-Trickser mit gebogenen Zauberbolzen, Hasen-Verwandlung und gestohlenen Ultimates.',
  hero_chessmaster: 'Taktischer Controller mit Verlangsamungs-Läufern, Turm-Wurzeln und Springer-Barrieren.',
  hero_doorman: 'Disruptiver Trickser mit verzögerten Glocken-Explosionen, Gepäckwagen-Zug und Hotel-Verbannung.',
  hero_priest: 'Gnadenloser Jäger mit Bärenfallen, Brandgranaten und extrem starken Armbrust-Pfählen.',
  hero_frank: 'Unaufhaltsamer Drain-Juggernaut mit Schadensaura, starker Regeneration und Wiederbelebung.',
  hero_hornet: 'Fliegende Scharfschützin mit verstärktem Luftfeuer, Pfahl-Fessel und Exekutions-Sniper.',
  hero_viscous: 'Schwer fangbarer Disruptor mit Heilwürfel, Rückstoß-Faust und unaufhaltsamem Schleimball.',
  hero_viper: 'Extrem mobile Rutsch-Assassine mit irrsinniger Feuerrate im Nahkampf und verzögertem Gift.',
  hero_warden: 'Frontline-Juggernaut mit Schutzschild, Käfig-Wurzel und heilender Letzter-Stand-Ult.',
  hero_wraith: '1v1-Duellantin mit Vollautomatik-Feuerrate, Karten-Burst, Teleport und Telekinese-Stun.',
  hero_yamato: 'Duell-Assassine mit aufgeladenem Schwertschlag, Greifhaken-Dive und unverwundbarer Schattenform.',
};

export const ITEM_COPY_DE: Record<string, { why: string; whenToUse: string }> = {
  upgrade_withering_whip: {
    why: 'Senkt gegnerische Feuerrate & Kugelresistenz für nur 800 Seelen — ruiniert frühe Schusswechsel und baut zu Fluch der Entwaffnung aus.',
    whenToUse: 'Direkt zu Beginn eines Lane-Trades einsetzen, bevor der Gegner Stapel aufbauen kann.',
  },
  upgrade_melee_rebuttal: {
    why: 'Macht jede Parade zum massiven Konter: heilt dich, wirft den Nahkampfschaden zurück und erhöht deinen eigenen Schaden.',
    whenToUse: 'Parade bereithalten, sobald der Gegner zu einem schweren Nahkampfschlag ausholt.',
  },
  upgrade_grit: {
    why: 'Günstige 800-Seelen-Barriere auf Knopfdruck gegen frühen All-In-Burst auf der Lane.',
    whenToUse: 'Kurz vor dem gegnerischen Kombo-Einschlag aktivieren, um den Trade zu gewinnen.',
  },
  upgrade_health_stimpak: {
    why: 'Bester 800-Seelen-Lane-Stabilisator gegen starken Poke, damit du auf der Lane bleibst und weiter Seelen farmst.',
    whenToUse: 'Kurz hinter Deckung treten und aktivieren, damit gegnerischer Schaden die Heilung nicht abbricht.',
  },
  upgrade_medic_bullets: {
    why: 'Zuverlässige Lane-Heilung im Kampf durch Helden-Treffer, ohne die Welle verlassen zu müssen.',
    whenToUse: 'Immer wenn bereit direkt auf den gegnerischen Helden auslösen.',
  },
  upgrade_endurance: {
    why: 'Passive, ununterbrechbare Lebensregeneration gegen permanenten Lane-Poke.',
    whenToUse: 'Passiv — hält dich bei ständigem Chip-Schaden stabil auf der Lane.',
  },
  upgrade_improved_stamina: {
    why: 'Zusätzliche Ausdauer-Ladung für 800 Seelen — weicht frühen Haken, Käfigen, Nahkampfschlägen und Dive-Kombos sauber aus.',
    whenToUse: 'Passiv — immer einen Dash in Reserve halten, um aus gegnerischem CC oder Burst herauszuspringen.',
  },
  upgrade_mystic_regeneration: {
    why: 'Zuverlässige Lane-Heilung im Kampf für Spirit-Helden — regeneriert Leben bei jedem Fähigkeitstreffer auf Gegner.',
    whenToUse: 'Passiv — Gegner regelmäßig mit Fähigkeiten treffen, um die Bonus-Regeneration aktiv zu halten.',
  },
  upgrade_headshot_booster: {
    why: 'Günstiger 800-Seelen-Kopfschuss-Burst, der zerbrechliche Glaskanonen früh aus der Lane drückt.',
    whenToUse: 'Passiv — bei bereitem Cooldown gezielt kurze Kopfschuss-Trades gegen Gegner mit wenig HP suchen.',
  },
  upgrade_magic_burst: {
    why: 'Sofortiger Bonus-Spirit-Burst für 800 Seelen gegen zerbrechliche Gegner — baut später direkt zu Tankbuster aus.',
    whenToUse: 'Passiv — Hauptfähigkeit gezielt auf Gegner mit wenig HP setzen, sobald die Ladung bereit ist.',
  },
  upgrade_close_range: {
    why: 'Bestraft aggressive Nahkampf-Diver mit deutlich höherem Waffenschaden, sobald sie auf kurze Distanz kommen.',
    whenToUse: 'Passiv — beim gegnerischen Dive im Nahkampf direkt mit voller Feuerkraft dagegenhalten.',
  },
  upgrade_weapon_shielding: {
    why: 'Löst automatisch eine starke Barriere bei anhaltendem Kugelschaden auf der Lane und im Mid-Game aus.',
    whenToUse: 'Passiv — kurze Trades nehmen, solange die Barriere bereit ist.',
  },
  upgrade_spirit_bubble: {
    why: 'Erzeugt automatisch eine starke Barriere bei hohem Spirit-Burst — #1 früher Anti-Spirit-Schutz.',
    whenToUse: 'Passiv — fängt gegnerische Burst-Kombos ab, damit du nicht aus der Lane gedrängt wirst.',
  },
  upgrade_regenerating_bullet_shield: {
    why: 'Kombiniert frühe Kugelresistenz mit extra Waffenschaden & Feuerrate über 65 % HP.',
    whenToUse: 'Passiv — über 65 % Leben bleiben, um gleichzeitig offensiv und defensiv zu traden.',
  },
  upgrade_magic_shield: {
    why: 'Gibt frühe Spirit-Resistenz plus Spirit-Kraft & Abklingzeitverringerung ohne dein Scaling zu bremsen.',
    whenToUse: 'Passiv — idealer früher Defensiv-Kauf für Spirit-Helden gegen Ability-Druck.',
  },
  upgrade_return_fire: {
    why: 'Wirft jeden eingehenden Schuss direkt auf Schnellfeuer-Carrys zurück — sie zerlegen sich selbst.',
    whenToUse: 'Sofort aktivieren, wenn der Gegner voll auf dich schießt oder eine Kugel-Ult startet.',
  },
  upgrade_vex_barrier: {
    why: 'Löst automatisch eine massive Barriere aus, sobald du betäubt, gekettet, verwurzelt, eingeschläfert oder zum Schweigen gebracht wirst.',
    whenToUse: 'Passiv — verhindert, dass frühe CC-Kombos (Haken, Ansturm, Käfig, Schlaf) dich sofort töten.',
  },
  upgrade_debuff_reducer: {
    why: 'Verkürzt passiv die Dauer aller Stuns, Blutungen, Brände und Verlangsamungen — baut zu Magie der Entzauberung aus.',
    whenToUse: 'Passiv — früh kaufen, wenn DoTs oder CC dich ständig festnageln.',
  },
  upgrade_healbane: {
    why: 'Günstigste passive Anti-Heilung (1.600 Seelen) — jeder Spirit-Treffer senkt gegnerische Heilung und heilt dich bei Kills.',
    whenToUse: 'Passiv — Gegner vor seiner Heilung oder seinem Lebensraub mit einer Fähigkeit treffen.',
  },
  upgrade_restorative_locket: {
    why: 'Sammelt kostenlose Heil- & Ausdauer-Ladungen jedes Mal, wenn Gegner auf der Lane Fähigkeiten spammen.',
    whenToUse: 'Mit vollen Stapeln aktivieren, um Burst abzufangen und den Kampf zu drehen.',
  },
  upgrade_containment: {
    why: 'Sperrt Bewegungsfähigkeiten & Dashes für 1.600 Seelen — fängt mobile Assassinen und Diver zuverlässig ein.',
    whenToUse: 'Einsetzen, kurz bevor der Gegner wegspringen, greifen oder fliehen will.',
  },
  upgrade_suppressor: {
    why: 'Senkt passiv die gegnerische Feuerrate bei jedem Spirit-Schaden — schwächt Waffen-Carrys ohne Aktiv-Slot.',
    whenToUse: 'Passiv — den gegnerischen Waffen-Carry im Kampf regelmäßig mit Fähigkeiten treffen.',
  },
  upgrade_spirit_sap: {
    why: 'Reduziert direkt gegnerische Spirit-Kraft und Spirit-Resistenz — schwächt Spirit-Bullys spürbar.',
    whenToUse: 'Zu Kampfbeginn auf den gefeedeten Spirit-Gegner wirken, bevor seine Kombo kommt.',
  },
  upgrade_magic_slow: {
    why: 'Verlangsamt Gegner dauerhaft durch deinen Spirit-Schaden, sodass Nahkämpfer dich nicht erreichen.',
    whenToUse: 'Passiv — Nahkämpfer beim Heranlaufen mit Fähigkeiten auf Abstand halten.',
  },
  upgrade_slowing_bullets: {
    why: 'Ermöglicht Schnellfeuer-Helden, Nahkampf-Diver ohne Aktiv-Slot sauber zu kiten.',
    whenToUse: 'Passiv — beim Zurückweichen weiterfeuern, um den Engage zu bremsen.',
  },
  upgrade_headshot_booster2: {
    why: 'Senkt gegnerische Kugelresistenz günstig bei Kopfschüssen gegen tankige Frontliner.',
    whenToUse: 'Passiv — auf Kopfschüsse fokussieren, um Tanks für dein Team aufzubrechen.',
  },
  upgrade_magic_vulnerability: {
    why: 'Senkt gegnerische Spirit-Resistenz bei Fähigkeitstreffern — starker früher Konter gegen Tanks.',
    whenToUse: 'Passiv — erst mit einer schnellen Fähigkeit treffen, dann den Haupt-Burst setzen.',
  },
  upgrade_cardio_calibrator: {
    why: 'Starke Verlangsamungs-Resistenz und Tempo, damit Slow-Helden und Nahkämpfer dich nicht einholen.',
    whenToUse: 'Passiv — hält deine Mobilität trotz schwerer Verlangsamungen intakt.',
  },
  upgrade_guardian_ward: {
    why: 'Barriere + Lauftempo auf Knopfdruck (halbe Abklingzeit auf Verbündete) zur Rettung in Lane-Trades.',
    whenToUse: 'Kurz vor dem gegnerischen Burst auf dich oder deinen Lane-Partner wirken.',
  },
  upgrade_metal_skin: {
    why: 'Komplette Immunität gegen jeglichen Kugelschaden — der stärkste aktive Konter gegen Waffen-Carrys & Kugel-Ults.',
    whenToUse: 'Sofort aktivieren, wenn der Gegner seine Waffen-Ult oder seinen Burst startet.',
  },
  upgrade_greater_withering_whip: {
    why: 'Entwaffnet den Gegner komplett UND senkt seine Kugelresistenz — macht gefeedete Schützen wehrlos.',
    whenToUse: 'Direkt beim Engage auf den Carry klicken (im Late-Game ggf. Entzauberung/Unaufhaltsam abwarten).',
  },
  upgrade_target_stun: {
    why: 'Punktgenauer Fernkampf-Stun, der fliegende Helden vom Himmel holt und kanalisierte Ultimates abbricht.',
    whenToUse: 'Sofort wirken, sobald der Gegner abhebt oder seine Ult kanalisiert.',
  },
  upgrade_reduce_debuff_duration: {
    why: 'Entfernt sofort alle Nicht-Ultimate-Debuffs (Bomben, Blutungen, Brände, Male, Wurzeln) plus Heilung & Tempo.',
    whenToUse: 'Direkt drücken, nachdem Bombe, Mal, Brand oder verzögerter Stun auf dir klebt.',
  },
  upgrade_counterspell: {
    why: 'Macht deine Parade zum Zauberschild (kein Aktiv-Slot nötig!) — blockt angesagte Ults & Burst und heilt dich.',
    whenToUse: 'Parade genau im Moment drücken, bevor die gegnerische Ult, Bombe oder der Haken trifft.',
  },
  upgrade_targeted_silence: {
    why: 'Breite AoE-Stille, die Spirit-Diver und mobile Magier an Flucht, Heilung oder Kombos hindert.',
    whenToUse: 'Auf den Gegner feuern, sobald er rein-dived (bricht aber keine bereits laufenden Kanäle ab).',
  },
  upgrade_rupture: {
    why: 'Prozentualer Max/Aktuell-HP-Schaden über Zeit + starke Heilungsreduktion — schmilzt Drain-Tanks auf jedem Helden.',
    whenToUse: 'Früh im Kampf bei vollem gegnerischem Leben wirken für maximalen %-Schaden & Anti-Heal.',
  },
  upgrade_toxic_bullets: {
    why: 'Passiver %-Max-HP-Blutungsschaden + Anti-Heilung über deine Kugeln — Top-Konter gegen tankige Heiler.',
    whenToUse: 'Passiv — dauerhaft auf den Tank/Heiler feuern, damit Blutung & Anti-Heal aktiv bleiben.',
  },
  upgrade_magic_shock: {
    why: 'Fügt tankigen Frontlinern enormen Bonus-Spirit-Schaden zu, der Spirit-Resistenz komplett ignoriert.',
    whenToUse: 'Passiv — starke Fähigkeiten (>165 Schaden) landen, sobald die Ladung bereit ist.',
  },
  upgrade_improved_bullet_armor: {
    why: 'Zuverlässige passive Kugelresistenz, die unter 50 % HP noch stärker wird — braucht keinen Aktiv-Slot.',
    whenToUse: 'Passiv — konstante Schadensreduktion gegen hohen dauerhaften Kugelschaden.',
  },
  upgrade_tech_purge: {
    why: 'Starke passive Spirit-Resistenz mit Extra-Schutz unter 50 % HP — Rückgrat gegen anhaltenden Spirit-Schaden.',
    whenToUse: 'Passiv — schützt zuverlässig vor Spirit-DoTs und Teamkampf-AoE ohne Aktiv-Slot.',
  },
  upgrade_warp_stone: {
    why: 'Sofortiger Blink-Teleport + Bonus-Kugelresistenz — bricht Nahkampf-Dives und entkommt Käfigen/Ults.',
    whenToUse: 'Rausblinken, sobald der Gegner auf dich springt oder seine Ult-Zone startet.',
  },
  upgrade_bullet_armor_reduction_aura: {
    why: 'Passive Aura senkt Kugelresistenz & Feuerrate naher Gegner (doppelt im 1v1) — enorm stark für Nah-Duellanten.',
    whenToUse: 'Passiv — im Duell nah dran bleiben, um den Effekt zu verdoppeln.',
  },
  upgrade_reinforcing_casings: {
    why: 'Stapelt hohe passive Kugelresistenz bei jedem eigenen Treffer — ideal für Schnellfeuer-Helden im Schusswechsel.',
    whenToUse: 'Passiv — im Kampf kontinuierlich Treffer landen, um die Resistenz hochzustapeln.',
  },
  upgrade_deflecting_armor: {
    why: 'Bestes passives Anti-Waffen-Item: lenkt Kugeln ab UND blockt On-Hit-Stapel (Fixation, Nachbrennen, Dschinn-Mal).',
    whenToUse: 'Passiv — neutralisiert Late-Game-Schnellfeuer-Carrys komplett ohne Aktiv-Slot.',
  },
  upgrade_juggernaut: {
    why: 'Verlangsamt passiv die Feuerrate jedes Gegners, der auf dich schießt — brutal gegen Waffen-Carrys.',
    whenToUse: 'Passiv — im Teamkampf Druck machen, damit jeder fokussierende Schütze massiv DPS verliert.',
  },
  upgrade_spellbreaker: {
    why: 'Reduziert den nächsten hohen Spirit-Burst-Treffer drastisch — #1 passiver Schutz gegen Spirit-One-Shots.',
    whenToUse: 'Passiv — fängt den stärksten Einzelzauber ab, sodass Burst-Magier dich nicht sofort löschen.',
  },
  upgrade_absorbing_armor: {
    why: 'Verkürzt bei schweren Spirit-Treffern deine eigenen Abklingzeiten und liefert starke Spirit-Resistenz.',
    whenToUse: 'Passiv — lässt fähigkeitsstarke Helden im Late-Game gegen Spirit-Spam kontern.',
  },
  upgrade_glitch: {
    why: 'Ultimativer Shutdown: unterbricht, bringt zum Schweigen, entwaffnet, sperrt Items UND entfernt Buffs.',
    whenToUse: 'Direkt auf den gefeedeten Carry klicken, sobald er reinspringt oder kanalisiert.',
  },
  upgrade_unstoppable: {
    why: 'Volle Immunität gegen Stun, Stille, Schlaf, Wurzel und Entwaffnung — läuft durch jede CC-Kette durch.',
    whenToUse: 'Proaktiv VOR dem Dive oder Kanalisieren drücken (nicht nutzbar, wenn schon betäubt).',
  },
  upgrade_auto_cleanse: {
    why: 'Entfernt den nächsten Stun, Schlaf, Wurzel oder Stille automatisch + gibt eine Barriere — ideal wenn Aktiv-Slots voll sind.',
    whenToUse: 'Passiv — bricht überraschenden Pick-CC (Lasso, Haken, Schlaf, Kombo) ganz ohne Reaktionszeit.',
  },
  upgrade_self_bubble: {
    why: 'Sofortige Unverwundbarkeit — weicht angesagten Ultimates, verzögerten Explosionen und Dive-Kombos sauber aus.',
    whenToUse: 'Kurz vor dem tödlichen Burst drücken, während deine Abklingzeiten ablaufen.',
  },
  upgrade_inhibitor: {
    why: 'Deine Kugeln senken den gesamten gegnerischen Schaden UND seine Heilung — entschärft gefeedete Raid-Bosse passiv.',
    whenToUse: 'Passiv — den stärksten Gegner früh im Kampf anschießen, um seinen DPS zu halbieren.',
  },
  upgrade_spirit_burn: {
    why: 'Löst eine starke Verbrennung aus, die gegnerische Heilung drastisch reduziert und Tanks zermürbt.',
    whenToUse: 'Passiv — Spirit-Kombo landen, kurz bevor der Gegner sich wieder hochheilen will.',
  },
  upgrade_banshee_slugs: {
    why: 'Kopfschüsse senken gleichzeitig Kugelresistenz, Spirit-Resistenz UND Heilung — bricht jeden Tank auf.',
    whenToUse: 'Passiv — Kopfschüsse auf den Frontliner setzen, damit das ganze Team ihn schmilzt.',
  },
  upgrade_aprounds: {
    why: 'Kugeln ignorieren Kugelresistenz und sind unausweichlich — durchschlägt Rüstungs-Tanks & Panzerrüstung.',
    whenToUse: 'Passiv — kaufen, wenn ein Tank massiv Kugelresistenz gegen dich stapelt.',
  },
  upgrade_escalating_exposure: {
    why: 'Stapelt schnell steigenden Spirit-Schadensbonus in längeren Kämpfen — schmilzt HP-starke Tanks.',
    whenToUse: 'Passiv — perfekt für regelmäßigen Spirit-Schaden gegen extrem tankige Gegner.',
  },
  upgrade_siphon_bullets: {
    why: 'Stiehlt tankigen Gegnern dauerhaft Max-HP im Kampf und erhöht gleichzeitig deine eigenen Lebenspunkte.',
    whenToUse: 'Passiv — den Frontliner kontinuierlich anschießen, um Max-HP-Stapel aufzubauen.',
  },
  upgrade_capacitor: {
    why: 'Starkes Waffen-Aktiv: schwere Verlangsamung, sperrt Ausdauer und blockiert Bewegungsfähigkeiten.',
    whenToUse: 'Auf extrem mobile Carrys oder Diver feuern, damit sie nicht mehr fliehen können.',
  },
  upgrade_phantom_strike: {
    why: 'Teleportiert dich direkt an fliegende oder weit entfernte Ziele, zieht sie zu Boden und entwaffnet sie.',
    whenToUse: 'Direkt auf fliegende Sniper (Vindicta/Grey Talon) oder Backline-Carrys springen.',
  },
  upgrade_focus_lens: {
    why: 'Punktgenaue Stille + verzögerter Echo-Burst — verhindert Flucht/Heilung und verstärkt Team-Fokus.',
    whenToUse: 'Kurz vor dem Team-Burst auf einen wendigen Spirit-Carry wirken.',
  },
  upgrade_proc_silence: {
    why: 'Baut passiv durch Kugeltreffer eine Stille auf — schaltet Magier ohne Aktiv-Slot aus.',
    whenToUse: 'Passiv — den wichtigsten Fähigkeiten-Gegner zu Kampfbeginn fokussieren.',
  },
  upgrade_aoe_root: {
    why: 'Zieht Gegner zusammen und wirkt Verlangsamungsfluch (Alt-Cast direkt aufs Ziel!) — fängt mobile Carrys.',
    whenToUse: 'Per Alt-Cast direkt auf wendige Ziele oder in ihren Fluchtweg werfen.',
  },
  upgrade_divine_barrier: {
    why: 'Entfernt Nicht-Stun-Debuffs und gibt dir oder einem Verbündeten eine riesige Barriere + Tempo.',
    whenToUse: 'Zum Entfernen von Haftbomben, Affliction oder tödlichen DoTs auf dir oder deinem Carry.',
  },
  upgrade_colossus: {
    why: 'Massive Kugel- + Spirit-Resistenz auf Knopfdruck, verlangsamt nahe Gegner und kürzt deren Dash.',
    whenToUse: 'Aktivieren, wenn du mitten im gemischten Kugel- und Spirit-Schaden kämpfst.',
  },
  upgrade_discord: {
    why: 'Gewährt Spirit- & Debuff-Resistenz plus eine %-Max-HP-Schadensaura gegen tankige Frontliner.',
    whenToUse: 'Auf dich oder deinen Frontline-Diver wirken, sobald der Kampf gegen Tanks startet.',
  },
  upgrade_cold_front: {
    why: 'Sofortiger AoE-Spirit-Burst + Verlangsamung für 1.600 Seelen — sprengt Glaskanonen mit wenig HP und baut zu Arktische Explosion aus.',
    whenToUse: 'Direkt zünden, sobald ein fragiler Gegner in Reichweite kommt, um ihn runterzubursten und zu verlangsamen.',
  },
  upgrade_arctic_blast: {
    why: 'Friert ein, macht hohen AoE-Burst und stoppt Ausdauer-Regeneration — löscht mobile Glaskanonen sofort aus.',
    whenToUse: 'Aktivieren, sobald der Gegner rein-dived oder in deine Nähe blinkt, um ihn einzufrieren und wegzubursten.',
  },
  upgrade_pristine_emblem: {
    why: 'Massiver Bonus-Waffenschaden gegen Gegner mit viel Leben — drückt fragile Helden wie Mina/Vindicta sofort aus der Lane.',
    whenToUse: 'Passiv — aggressive Eröffnungs-Trades suchen, solange der Gegner noch über der HP-Schwelle liegt.',
  },
  upgrade_headhunter: {
    why: 'Starker Kopfschuss-Burst + Selbstheilung — bestraft fragile Low-HP-Carrys im Mid-Game extrem hart.',
    whenToUse: 'Passiv — Gefechte mit einem Kopfschuss eröffnen, um Glaskanonen sofort zum Rückzug zu zwingen.',
  },
  upgrade_fleetfoot_boots: {
    why: 'Aktives Lauftempo + Verlangsamungs-Resistenz ohne Schuss-Abbremsung — ideal zum Kiten von Nahkämpfern & Slows.',
    whenToUse: 'Zünden, sobald dich ein Nahkämpfer jagt oder ein starker Slow trifft, um im Rückwärtsgehen weiterzufeuern.',
  },
  upgrade_bullet_resist_shredder: {
    why: 'Fähigkeiten senken gegnerische Kugelresistenz für 1.600 Seelen — starkes Preis-Leistungs-Shred für Hybrid- & Waffen-Helden.',
    whenToUse: 'Passiv — Tank kurz mit einer Fähigkeit markieren, bevor du dein Magazin leerst.',
  },
  upgrade_tech_defense_shredders: {
    why: 'Kugeln senken gegnerische Spirit-Resistenz UND geben dir Spirit-Lebensraub gegen das Ziel.',
    whenToUse: 'Passiv — Frontliner kurz anschießen, bevor deine Haupt-Spirit-Kombo einschlägt.',
  },
  upgrade_rescue_beam: {
    why: 'Heilt %-Max-HP und zieht einen gefangenen Verbündeten direkt aus Haken, Kombo, Lasso, Swap oder Singularität.',
    whenToUse: 'Auf den gefangenen Teammate wirken und sofort Heranziehen drücken, um Pick-Kombos zu brechen.',
  },
  upgrade_cheat_death: {
    why: 'Passives Sicherheitsnetz gegen tödlichen Burst & Exekutions-Ults — braucht keinen Aktiv-Slot.',
    whenToUse: 'Passiv — verschafft dir ein garantiertes Überlebensfenster bei tödlichen Exekutionen oder One-Shot-Kombos.',
  },
  upgrade_fervor: {
    why: 'Verkürzt bestehende Debuffs und gibt massive Kampf-Stats unter 50 % HP — dreht Dive- und CC-Kämpfe für Waffen-Carrys.',
    whenToUse: 'Passiv — löst automatisch aus, sobald du unter 50 % Leben fällst, und lässt dich direkt zurückkämpfen.',
  },
};

export const ITEM_CONTEXT_TIPS_DE: Record<string, Partial<Record<string, string>>> = {
  upgrade_reduce_debuff_duration: {
    cc: 'Verkürzt eingehenden CC passiv und entfernt Wurzeln, Slows & verzögerte Stuns sofort auf Knopfdruck.',
  },
  upgrade_counterspell: {
    cc: 'Zauber-Parade negiert Haken, Käfige, Lassos und Stun-Kombos komplett ohne Aktiv-Slot.',
    melee: 'Macht deine Parade doppelt stark: bestraft Nahkampfschläge UND blockt Folge-Fähigkeiten.',
  },
  upgrade_rupture: {
    tanky: 'Schmilzt gestapelte Max-HP-Balken per %-Schaden und bremst gleichzeitig den Sustain.',
    healing: 'Kappt starke Heilung & Lebensraub auf Knopfdruck und tickt das Ziel sauber herunter.',
  },
  upgrade_toxic_bullets: {
    tanky: 'Frisst sich passiv per %-Max-HP-Blutung direkt durch gestapelte Lebenspunkte.',
    healing: 'Hält über deine Kugeln dauerhaft Anti-Heilung aktiv, sodass Lebensraub-Builds einbrechen.',
  },
  upgrade_warp_stone: {
    melee: 'Blinkt sofort aus der Nahkampf-Reichweite, sodass Brawler mit ihren Schlägen ins Leere laufen.',
    cc: 'Entkommt Käfigen, Zonen und Folge-CC-Ketten, bevor du festgenagelt wirst.',
  },
  upgrade_fleetfoot_boots: {
    melee: 'Sofortiger Tempo-Schub + Slow-Resistenz zum sauberen Kiten gegen Nahkampf-Engages.',
  },
  upgrade_rescue_beam: {
    cc: 'Zieht Teammates direkt aus Lockdown-Ults, Haken und Stun-Ketten und heilt euch beide.',
  },
  upgrade_containment: {
    mobility: 'Sperrt Bewegungs-Items (Warp Stone, Leap) & Flucht-Fähigkeiten für 1.600 Seelen, sodass das Ziel nicht entkommt.',
  },
  upgrade_targeted_silence: {
    mobility: 'Bringt wendige Gegner mitten im Kampf zum Schweigen, damit sie nicht mehr wegdash-en oder blinken können.',
  },
  upgrade_capacitor: {
    mobility: 'Sperrt Ausdauer, Dashes, Warp Stone und Bewegungsfähigkeiten gleichzeitig — kein Entkommen mehr.',
  },
  upgrade_aoe_root: {
    mobility: 'Zieht wendige Gegner zurück und belegt sie direkt (per Alt-Cast) mit Bewegungs-Stille.',
  },
};

export const HERO_OVERRIDE_TIPS_DE: Record<string, Record<string, string>> = {
  hero_haze: {
    upgrade_withering_whip: 'Senkt Hazes frühe Feuerrate, damit sie Fixation nicht stapeln kann — baut zu Fluch der Entwaffnung aus.',
    upgrade_return_fire: 'Drücken, sobald Haze losfeuert oder Kugeltanz startet — sie zerlegt sich an ihrer eigenen Feuerrate.',
    upgrade_metal_skin: '#1 aktiver Konter gegen Haze: sofort bei Kugeltanz drücken und 100 % ihres Schadens ignorieren.',
    upgrade_greater_withering_whip: 'Entwaffnet Haze komplett, stoppt Fixation-Stapel und senkt ihre Kugelresistenz.',
    upgrade_target_stun: 'Holt Haze aus sicherer Entfernung sauber aus ihrem Kugeltanz (bevor sie Unaufhaltsam baut).',
    upgrade_deflecting_armor: '#1 passiver Konter gegen Haze: lenkt Kugeln ab UND blockt Fixation On-Hit-Stapel.',
    upgrade_juggernaut: 'Senkt Hazes Feuerrate passiv, sobald sie auf dich schießt — stark wenn Aktiv-Slots voll sind.',
    upgrade_glitch: 'Bricht Kugeltanz sofort ab und verhindert Unaufhaltsam oder Rauchbombe.',
  },
  hero_atlas: {
    upgrade_melee_rebuttal: 'Riesiger 800-Seelen-Konter gegen Abrams — pariere seinen schweren Nahkampf nach der Ramme für Heilung & Konterschaden.',
    upgrade_vex_barrier: 'Löst automatisch eine Barriere aus, wenn Abrams dich mit Schulterramme oder Seismischem Einschlag trifft.',
    upgrade_healbane: 'Reduziert sowohl Lebensentzug als auch seine passive Regeneration bei jedem Spirit-Treffer.',
    upgrade_rupture: 'Schmilzt Abrams\' riesigen HP-Balken und senkt seine Regeneration massiv.',
    upgrade_toxic_bullets: 'Passiver %-Max-HP-Schaden + Anti-Heilung lässt Abrams\' Frontline-Sustain zusammenbrechen.',
    upgrade_debuff_reducer: 'Verkürzt den Wand-Stun der Schulterramme so weit, dass du seinen Folge-Nahkampf parieren kannst!',
    upgrade_glitch: 'Stoppt Abrams\' Fähigkeitskette und entfernt seine Buffs, damit dein Team ihn erledigen kann.',
  },
  hero_bebop: {
    upgrade_vex_barrier: '#1 Lane-Konter gegen Bebop: sein Greifhaken löst sofort die Barriere aus und fängt Aufwärtshaken + Bombe ab.',
    upgrade_reduce_debuff_duration: '#1 Konter gegen Bomben-Bebop: direkt nach Haftbombe drücken, um sie komplett zu löschen (kein Schaden, keine Stapel).',
    upgrade_counterspell: 'Genau vor der Bomben-Explosion (oder beim Haken) parieren, um Schaden zu blocken und dich zu heilen.',
    upgrade_target_stun: 'Bricht Bebops kanalisierten Hyperstrahl aus großer Distanz ab.',
    upgrade_divine_barrier: 'Entfernt Haftbomben von dir ODER einem gehakten Verbündeten plus starke Barriere.',
  },
  hero_gigawatt: {
    upgrade_target_stun: '#1 Konter gegen Seven: holt ihn aus sicherer Entfernung direkt aus der Gewitterwolke.',
    upgrade_reduce_debuff_duration: 'Entfernt Statikladung sofort, bevor sie dein Team betäubt.',
    upgrade_counterspell: 'Pariere genau beim Ablauf der Statikladung, um Stun und Burst komplett zu blocken.',
    upgrade_spirit_bubble: 'Fängt Sevens Blitzkugel- und Power-Surge-Poke auf der Lane ab.',
    upgrade_glitch: 'Bricht die Gewitterwolke sofort ab und entfernt seinen Power-Surge-Buff.',
  },
  hero_hornet: {
    upgrade_target_stun: '#1 Konter gegen Vindicta: reißt sie mit verlängerter Luft-Betäubung sofort aus dem Flug.',
    upgrade_phantom_strike: 'Teleportiert dich direkt an die fliegende Vindicta, zieht sie zu Boden und entwaffnet sie.',
    upgrade_weapon_shielding: 'Fängt ihren frühen Flug-Harass ab und hält dich über der Assassinate-Exekutionsgrenze.',
    upgrade_metal_skin: 'Aktivieren, sobald Vindicta abhebt, um ihren Waffen-DPS komplett zu negieren.',
    upgrade_deflecting_armor: 'Lenkt Vindictas Flug-Kugeln passiv ab und senkt ihren Late-Game-Druck stark.',
  },
  hero_orion: {
    upgrade_target_stun: '#1 Konter gegen Grey Talon: holt ihn mit verlängertem Luft-Stun direkt aus Pfeilregen.',
    upgrade_spirit_bubble: 'Fängt aufgeladene Pfeile auf der Lane ab, damit du nicht in Eulen-Exekutionsreichweite fällst.',
    upgrade_spellbreaker: '#1 passiver Konter gegen Spirit-Grey-Talon: kappt den Burst von Pfeil & Eule massiv.',
    upgrade_counterspell: 'Pariere genau im Einschlagmoment der gelenkten Eule oder des aufgeladenen Pfeils.',
    upgrade_phantom_strike: 'Schließt die Distanz sofort, reißt Grey Talon zu Boden und entwaffnet ihn.',
  },
  hero_inferno: {
    upgrade_reduce_debuff_duration: '#1 Konter gegen Infernus: löscht Nachbrennen & Napalm sofort, sodass er keinen Schaden und Lebensraub mehr bekommt.',
    upgrade_debuff_reducer: 'Verkürzt Nachbrennen-Ticks und seinen Ult-Stun stark — baut zu Magie der Entzauberung aus.',
    upgrade_deflecting_armor: '#1 passiver Konter gegen Infernus: blockt On-Hit-Procs, sodass er Nachbrennen kaum noch zünden kann.',
    upgrade_healbane: 'Reduziert Infernus\' massiven Spirit-Lebensraub durch Nachbrennen & Flammen-Dash.',
    upgrade_spirit_bubble: 'Fängt frühe Nachbrennen-Ticks auf der Lane zuverlässig ab.',
  },
  hero_ghost: {
    upgrade_healbane: 'Senkt Geists Lebensentzug und Spirit-Lebensraub, sodass sie ihren Selbstschaden nicht mehr ausgleicht.',
    upgrade_rupture: 'Schmilzt Geists hohe HP und halbiert ihren Lebensentzug.',
    upgrade_targeted_silence: 'Bring Geist bei niedrigem Leben zum Schweigen, damit sie KEINEN Seelentausch (HP-Tausch) drücken kann!',
    upgrade_focus_lens: 'Sperrt Seelentausch bei niedrigem Leben und finisht sie über den Echo-Burst.',
    upgrade_reduce_debuff_duration: 'Entfernt gestapelte Bosheit-Splitter vor ihrer Essenzbombe.',
    upgrade_restorative_locket: 'Geist spammt auf der Lane permanent Fähigkeiten — gratis Heilung & Ausdauer am laufenden Band.',
  },
  hero_lash: {
    upgrade_containment: '#1 günstiger Konter gegen Lash: sperrt seinen Greifhaken, sodass er nicht für Bodenschlag abheben kann.',
    upgrade_target_stun: 'Wirken, sobald Lash für Todeswurf hochspringt, um ihn vor dem Wurf aus der Luft zu holen.',
    upgrade_counterspell: 'Pariere im Moment von Todeswurf oder Bodenschlag, um seine gesamte Kombo zu blocken.',
    upgrade_self_bubble: 'Während Todeswurf oder Bodenschlag drücken, um seiner kompletten Kombo sauber auszuweichen.',
    upgrade_spellbreaker: 'Reduziert Lashs massiven Einzel-Burst beim Bodenschlag passiv drastisch.',
  },
  hero_synth: {
    upgrade_reduce_debuff_duration: 'Entfernt Pockets Verlangsamungen/Debuffs & heilt (Hinweis: gegen Affliction-Ult zusätzlich Spirit-Widerstand!).',
    upgrade_containment: 'Verhindert, dass Pocket sich nach dem Dive zum Fliegenden Umhang teleportiert.',
    upgrade_targeted_silence: 'Verhindert Koffer-Immunität und Umhang-Flucht, damit Pocket sofort fällt.',
    upgrade_tech_purge: 'Bester passiver Schutz gegen Pockets nicht-entfernbare Affliction-Ultimate.',
    upgrade_focus_lens: 'Sperrt Koffer & Umhang und verstärkt den Burst auf Pockets kleine HP-Leiste.',
  },
  hero_shiv: {
    upgrade_healbane: 'Senkt Shivs Heilung und verhindert, dass er verzögerten Aderlass-Schaden wegheilt.',
    upgrade_reduce_debuff_duration: 'Entfernt gestapelte Messer-Blutungen sofort, damit du nicht in Exekutions-Reichweite fällst.',
    upgrade_containment: 'Sperrt Shivs Dashes und seinen Exekutions-Sprung.',
    upgrade_rupture: 'Bestraft Shivs hohe effektive HP durch Aderlass und senkt seine Heilung stark.',
    upgrade_glitch: 'Verhindert Aderlass-Bereinigung und Exekution, während dein Team ihn fokussiert.',
    upgrade_cheat_death: 'Verhindert Shivs Exekutions-Kette passiv, sodass er sich im Teamkampf nicht zurücksetzen kann.',
  },
  hero_krill: {
    upgrade_vex_barrier: '#1 früher Konter gegen Mo & Krill: seine Kombo-Ult löst automatisch eine Barriere aus.',
    upgrade_rescue_beam: 'Zieht einen gefangenen Verbündeten direkt aus Mo & Krills Kombo heraus und heilt ihn durch den Fokus.',
    upgrade_unstoppable: 'Kurz bevor Mo & Krill auftaucht aktivieren, damit Kombo und Sandstrahl wirkungslos bleiben.',
    upgrade_auto_cleanse: 'Entfernt Kombo oder Sandstrahl automatisch + Barriere — Retter wenn Aktiv-Slots voll sind.',
    upgrade_rupture: 'Schmilzt Mo & Krills riesigen HP-Pool und senkt seine Verachtung-Heilung.',
    upgrade_toxic_bullets: 'Frisst sich durch Mo & Krills Lebenspunkte und kappt seinen Sustain.',
  },
  hero_warden: {
    upgrade_reduce_debuff_duration: '#1 Konter gegen Warden: entfernt Bindendes Wort (Käfig) & Alchemieflasche sofort mit Tempo-Schub.',
    upgrade_warp_stone: 'Blinkt sauber aus dem Käfig-Radius heraus UND gibt Kugelresistenz gegen Wardens Waffe.',
    upgrade_vex_barrier: 'Löst eine Barriere aus, falls dich der Käfig auf der Lane erwischt.',
    upgrade_target_stun: 'Unterbricht Warden während seiner 2s-Aufladung von Letzter Stand.',
    upgrade_rupture: 'Senkt Wardens Ult-Lebensraub und schmilzt seine Frontline-HP.',
  },
  hero_wraith: {
    upgrade_metal_skin: 'Drücken, sobald Wraith Vollautomatik zündet, um ihren Waffenschaden komplett zu blocken.',
    upgrade_greater_withering_whip: 'Entwaffnet Wraith während Vollautomatik — sie kann weder schießen noch Karten laden.',
    upgrade_counterspell: 'Pariere Wraiths Telekinese-Projektil, um ihre Pick-Kombo abzubrechen.',
    upgrade_vex_barrier: 'Telekinese löst sofort die Barriere aus und fängt Vollautomatik + Karten in der Luft ab.',
    upgrade_deflecting_armor: 'Lenkt Vollautomatik-Kugeln ab und bremst ihre Karten-Aufladung massiv.',
  },
  hero_yamato: {
    upgrade_counterspell: 'Pariere Yamatos aufgeladenen Kraftschlag genau beim Loslassen — blockt den Nuke und heilt dich.',
    upgrade_containment: 'Sperrt ihren Greifhaken-Sprung, sodass sie nicht an dich rankommt.',
    upgrade_targeted_silence: 'Bring Yamato zum Schweigen, bevor sie Schattenverwandlung drücken kann.',
    upgrade_spellbreaker: 'Reduziert Yamatos voll aufgeladenen Kraftschlag passiv extrem stark.',
    upgrade_healbane: 'Senkt ihre Heilung aus Karmesinschlag und Schattenverwandlung.',
  },
  hero_dynamo: {
    upgrade_target_stun: 'Bricht Singularität von außerhalb des Sog-Radius sauber ab.',
    upgrade_unstoppable: 'Lauf einfach aus Singularität heraus oder unterbrich Dynamo ungestört.',
    upgrade_glitch: 'Bricht Singularität sofort ab und verhindert Quantenverschränkung oder Refresher.',
  },
  hero_viper: {
    upgrade_return_fire: 'Vypers extreme Nahkampf-Feuerrate schmilzt ihre eigene kleine HP-Leiste sofort weg.',
    upgrade_metal_skin: 'Blockt Vypers gesamten Nahkampf-Burst, während du sie erledigst.',
    upgrade_greater_withering_whip: 'Entwaffnet Vyper mitten im Rutschen und senkt ihre Kugelresistenz.',
    upgrade_deflecting_armor: 'Lenkt Vypers Schnellfeuer passiv ab und stoppt ihren Schmelz-Schaden.',
    upgrade_reduce_debuff_duration: 'Entfernt Tödliches Gift, bevor der verzögerte Spirit-Nuke auslöst.',
  },
  hero_vampirebat: {
    upgrade_containment: '#1 günstiger Konter gegen Mina: sperrt ihren unanvisierbaren Rückzug, damit du ihren winzigen HP-Pool wegbursten kannst.',
    upgrade_cold_front: 'Mina hat einen der kleinsten HP-Pools im Spiel — sofortiger Kältefront-Burst + Slow zwingt sie sofort raus.',
    upgrade_targeted_silence: 'Verhindert ihren Rückzug & Fledermaus-Stille, sodass Mina in einer Burst-Rotation fällt.',
    upgrade_focus_lens: '#1 Late-Game-Delete gegen Mina: Stille verhindert ihre Flucht und der Echo-Burst löscht ihre kleine HP-Leiste aus.',
    upgrade_deflecting_armor: 'Blockt ihre On-Hit-Bisse passiv, sodass sie kaum noch Burst-Stapel aufbauen kann.',
  },
  hero_astro: {
    upgrade_vex_barrier: 'Spirit-Lasso löst sofort die Barriere aus, damit du das Wegziehen ins gegnerische Team überlebst.',
    upgrade_counterspell: 'Pariere Spirit-Lasso oder Fass-Explosionen, um Hollidays Pick-Kombo komplett zu stoppen.',
    upgrade_unstoppable: 'Verhindert, dass Holliday dich im Teamkampf mit Spirit-Lasso entführt.',
    upgrade_rescue_beam: 'Zieht einen gefesselten Verbündeten sofort zurück in Sicherheit und heilt ihn durch den Pick.',
  },
  hero_chrono: {
    upgrade_vex_barrier: 'Der Zeitstopp-Karabiner löst automatisch die Barriere aus, bevor Paradox dich tauscht.',
    upgrade_counterspell: 'Pariere Karabiner oder Positionstausch, um ihre gesamte Pick-Kombo zu vereiteln.',
    upgrade_warp_stone: 'Blinkt nach einem Positionstausch sofort zurück in Sicherheit.',
    upgrade_rescue_beam: 'Zieht einen getauschten Verbündeten sofort zurück, bevor Paradox\' Team zuschlägt.',
  },
  hero_fencer: {
    upgrade_melee_rebuttal: 'Bestraft Apollos Nahkampf-Ausfallschritte mit Sofort-Heilung und zurückgeworfenem Schaden.',
    upgrade_containment: 'Sperrt Apollos Dashes & Ausfallschritte, sodass er nicht aus der Riposte-Reichweite tanzen kann.',
    upgrade_targeted_silence: 'Verhindert Riposte-Parieren und seine Ult, sodass Apollo deinen Burst nicht kontern kann.',
    upgrade_counterspell: 'Pariere Apollos angesagte Ult, um Burst und Heilungsblock komplett abzuwehren.',
    upgrade_glitch: 'Bringt Apollo zum Schweigen, entwaffnet ihn und sperrt Riposte & Mobilität gleichzeitig.',
  },
  hero_unicorn: {
    upgrade_spirit_bubble: 'Fängt Celestes Lichtdolche & Prismen-Spirit-Burst auf der Lane zuverlässig ab.',
    upgrade_reduce_debuff_duration: 'Entfernt Celestes Dash-Verlangsamungen und Prismen-Stille sofort mit Tempo-Schub.',
    upgrade_spellbreaker: '#1 passiver Konter gegen Celeste: kappt ihren stärksten Spirit-Burst drastisch.',
    upgrade_glitch: 'Entfernt Celestes Prismenschilde und bringt sie vor ihrer Fähigkeitskette zum Schweigen.',
  },
  hero_drifter: {
    upgrade_reduce_debuff_duration: 'Entfernt das Jagd-Mal-Bluten sofort, bevor Drifter seinen Isolations-Burst ansetzt.',
    upgrade_melee_rebuttal: 'Bestraft Drifters Nahkampf-Trades mit sofortiger Heilung und Konterschaden.',
    upgrade_warp_stone: 'Blinkt aus Drifters Nahkampf-Hinterhalt heraus und liefert zusätzliche Kugelresistenz.',
    upgrade_greater_withering_whip: 'Entwaffnet Drifter mitten im Hinterhalt und senkt seine Kugelresistenz.',
    upgrade_metal_skin: 'Blockt Drifters Nahkampf-Waffenburst während seiner Dunkelheits-Ult komplett ab.',
  },
  hero_necro: {
    upgrade_spirit_bubble: 'Fängt Graves\' zermürbenden Spirit-Poke und Greifende-Hände-Schaden auf der Lane ab.',
    upgrade_vex_barrier: 'Löst automatisch eine Barriere aus, falls Greifende Hände dich festsetzen.',
    upgrade_tech_purge: 'Kontert Graves\' Spirit-Resistenz-Raub und anhaltenden Zonenschaden passiv.',
    upgrade_absorbing_armor: 'Wandelt Graves\' permanente Spirit-Ticks in schnellere Abklingzeiten für dich um.',
  },
  hero_tengu: {
    upgrade_healbane: 'Reduziert Ivys Verbindungs-Heilung und Kudzu-Sustain günstig schon auf der Lane.',
    upgrade_target_stun: 'Holt Ivy direkt aus dem Luftabwurf, bevor sie Bomben oder Verbündete absetzen kann.',
    upgrade_vex_barrier: 'Steinform-Stun löst sofort die Barriere aus, sodass du den Folge-Burst überlebst.',
    upgrade_rupture: 'Kappt Ivys Lebensraub & Sustain in längeren Mid-/Late-Game-Gefechten.',
    upgrade_glitch: 'Verhindert Steinform-Unverwundbarkeit und Luftabwurf-Flucht gleichzeitig.',
  },
  hero_nurse: {
    upgrade_healbane: '#1 günstiger Konter gegen Nurse Harrow: halbiert Heilspritzen & Blutegel-Sustain.',
    upgrade_reduce_debuff_duration: 'Entfernt Blutegel-DoTs sofort, sodass sie weder Schaden noch Heilung daraus zieht.',
    upgrade_rupture: 'Bricht Nurse Harrows Heil-Output und schmilzt ihre Frontline-Ziele.',
    upgrade_spirit_burn: 'Starke Late-Game-Anti-Heilung, die Nurse Harrows Team-Sustain zusammenbrechen lässt.',
  },
  hero_bookworm: {
    upgrade_healbane: 'Senkt Paiges Sustain und Heilung in Lane-Trades zuverlässig.',
    upgrade_restorative_locket: 'Sammelt gratis Heil- & Ausdauer-Ladungen durch Paiges häufige Schild- und Buch-Zauber.',
    upgrade_targeted_silence: 'Verhindert, dass Paige im Teamkampf Plot-Armor-Barrieren und Heilungen stapelt.',
    upgrade_glitch: '#1 Late-Game-Konter gegen Paige: entfernt Plot-Armor-Schilde UND bringt ihr Support-Kit zum Schweigen.',
  },
  hero_ratking: {
    upgrade_reduce_debuff_duration: 'Entfernt Rattenschwarm-DoTs sauber und gibt dir Heilung + Lauftempo.',
    upgrade_debuff_reducer: 'Verkürzt Rattenschwarm-Ticks auf der Lane und baut zu Magie der Entzauberung aus.',
    upgrade_rupture: 'Schmilzt Rat Kings hohe effektive HP trotz Max-HP-Barrieren zuverlässig herunter.',
    upgrade_glitch: 'Entfernt seine Max-HP-Barrieren und stoppt Granaten- sowie Schwarm-Spam.',
  },
  hero_familiar: {
    upgrade_healbane: 'Reduziert Rems plötzliche Burst-Heilung günstig, bevor Kämpfe kippen.',
    upgrade_vex_barrier: 'Schlaf-Ult & Kissen-CC lösen sofort die Barriere aus, damit du den Follow-up überlebst.',
    upgrade_containment: 'Sperrt Rems wendige Ausweich- und Fluchtbewegungen zuverlässig.',
    upgrade_unstoppable: 'Läuft ungestört durch wanddurchdringende Schlaf-Ults und Kissen-Rückstöße.',
    upgrade_auto_cleanse: 'Entfernt überraschenden Schlaf-CC automatisch ohne Reaktionszeit.',
  },
  hero_werewolf: {
    upgrade_melee_rebuttal: 'Bestraft Silvers aggressive Nahkampf-Trades mit Heilung & Konterschaden.',
    upgrade_withering_whip: 'Senkt Silvers Schnellfeuer schon früh und baut direkt zu Fluch der Entwaffnung aus.',
    upgrade_greater_withering_whip: 'Entwaffnet Silver während Schnellfeuer / Werwolf-Form und senkt ihre Kugelresistenz.',
    upgrade_metal_skin: 'Ignoriert Silvers extremen Nahkampf-Waffenburst komplett.',
    upgrade_reduce_debuff_duration: 'Entfernt die Fessel-Bola sofort, damit Silver dich nicht festnageln kann.',
    upgrade_deflecting_armor: 'Lenkt Silvers Schnellfeuer-Salven während ihrer Verwandlung passiv ab.',
  },
  hero_chessmaster: {
    upgrade_cardio_calibrator: 'Starke Verlangsamungs-Resistenz lässt dich sauber aus Solomons Läufer-Slows laufen.',
    upgrade_vex_barrier: 'Turm-Wurzeln lösen automatisch eine Schutzbarriere aus.',
    upgrade_reduce_debuff_duration: 'Entfernt Turm-Wurzeln & Läufer-Slows sofort mit Lauftempo-Schub.',
    upgrade_glitch: 'Entfernt Springer-Barrieren und unterbindet Solomons taktische Zonenkontrolle.',
  },
  hero_mirage: {
    upgrade_reduce_debuff_duration: 'Entfernt gestapelte Dschinn-Male sofort, bevor Mirage sie für hohen Burst auslösen kann.',
    upgrade_deflecting_armor: 'Blockt On-Hit-Kugel-Procs passiv, sodass Mirage kaum noch Dschinn-Male auf dir stapeln kann.',
    upgrade_withering_whip: 'Senkt Mirages Feuerrate auf der Lane, damit er keine hohen Dschinn-Mal-Stapel aufbaut.',
  },
  hero_frank: {
    upgrade_rupture: 'Schmilzt Victors riesigen HP-Pool und kappt seine Regeneration sowie seinen Lebensraub.',
    upgrade_toxic_bullets: 'Konstanter %-Max-HP-Blutungsschaden + Anti-Heilung bricht Victors Frontline-Sustain.',
    upgrade_healbane: 'Wichtige frühe Anti-Heilung gegen Victors Regeneration und Aura-Sustain.',
    upgrade_tech_purge: 'Starke passive Spirit-Resistenz gegen permanente Aura-des-Leids-Ticks.',
    upgrade_spirit_burn: 'Explosiver Anti-Heilungs-Brand kappt Victors enormen Sustain auch nach seiner Wiederbelebung.',
  },
  hero_viscous: {
    upgrade_healbane: 'Reduziert Viscous\' Würfel-Regeneration und seinen Kampf-Sustain spürbar.',
    upgrade_containment: 'Bremst Viscous\' wendige Mobilität aus und bereitet sichere Kills vor.',
    upgrade_glitch: 'Verhindert Selbst-Würfel oder Flucht im Schleimball und entfernt seine Buffs.',
    upgrade_capacitor: 'Sperrt Viscous\' Bewegungsfähigkeiten & Ausdauer, sodass er nach dem Würfel nicht entkommt.',
  },
  hero_nano: {
    upgrade_melee_rebuttal: 'Bestraft Calicos Nahkampf-Trades auf der Lane und dreht kurze Duelle komplett.',
    upgrade_containment: 'Sperrt ihren Sprungschlag und die Katzen-Flucht, damit Calico nicht wegschlüpft.',
    upgrade_targeted_silence: 'Verhindert, dass Calico mit ihrer Schatten-Ult oder Dashes entkommt.',
    upgrade_glitch: 'Schaltet Schatten-Ult & Katzen-Flucht gleichzeitig aus, damit dein Team sie sauber rausnimmt.',
  },
  hero_punkgoat: {
    upgrade_melee_rebuttal: 'Billy lebt von Nahkampftreffern — jede Parade heilt dich und wirft seinen Schaden hart zurück.',
    upgrade_vex_barrier: 'Kettengang und Ansturm lösen automatisch die Barriere aus und fangen seinen Folge-Burst ab.',
    upgrade_warp_stone: 'Schafft sofort Abstand zu Billys Nahkampfschlägen und liefert zusätzlich Kugelresistenz.',
    upgrade_unstoppable: 'Ignoriert Kettengang-Fesseln und Ansturm-Knockups im Teamkampf komplett.',
  },
  hero_forge: {
    upgrade_return_fire: 'Wirft McGinnis\' schnelles Minigun-Feuer und Geschützturm-Schüsse direkt auf sie zurück.',
    upgrade_healbane: 'Reduziert die starke Flächenheilung ihres Medizinischen Geists.',
    upgrade_target_stun: 'Bricht ihren Raketenhagel sauber ab, während sie in ihrer Ult stark verlangsamt ist.',
    upgrade_metal_skin: 'Ignoriert ihre voll hochgedrehte Minigun-DPS komplett, wenn du ihren Push stoppst.',
  },
  hero_kelvin: {
    upgrade_cardio_calibrator: 'Starke Verlangsamungs-Resistenz verhindert, dass Kelvins Eisstrahl & Granate dich festnageln.',
    upgrade_target_stun: 'Bricht den Eisstrahl ab und holt Kelvin direkt von seinem Eispfad herunter.',
    upgrade_healbane: 'Reduziert Kelvins Frostgranaten- und Eiskuppel-Heilung im Teamkampf.',
  },
  hero_magician: {
    upgrade_vex_barrier: 'Hasen-Verwandlung löst automatisch die Barriere aus, sodass du den Folge-Burst überlebst.',
    upgrade_reduce_debuff_duration: 'Entfernt Debuffs und verkürzt die Hasen-Verwandlung, damit Sinclair dich nicht kombot.',
    upgrade_spellbreaker: 'Kappt Sinclairs extrem starken Langstrecken-Zauberbolzen passiv drastisch.',
  },
  hero_deadpack: {
    upgrade_target_stun: 'Holt Deadman Danny mit verlängertem Luft-Stun direkt aus dem Jetpack-Flug.',
    upgrade_phantom_strike: 'Reißt Deadman Danny aus der Luft und entwaffnet sein Schnellfeuer sofort.',
    upgrade_metal_skin: 'Negiert seinen Waffen-DoT und den anschließenden Kugel-Burst komplett.',
  },
  hero_doorman: {
    upgrade_counterspell: 'Pariere Glocken-Explosion, Gepäckwagen oder Hotel-Ult, um Doormans Kombo komplett zu blocken.',
    upgrade_vex_barrier: 'Fängt Doormans Gepäckwagen-Zug und Glocken-Burst auf der Lane zuverlässig ab.',
    upgrade_spellbreaker: 'Reduziert den hohen Spirit-Burst von Glocke und Hotel-Ult passiv stark.',
  },
  hero_priest: {
    upgrade_metal_skin: 'Aktivieren, sobald Venator seine Armbrust-Pfähle lädt, um den massiven Waffenburst zu ignorieren.',
    upgrade_greater_withering_whip: 'Entwaffnet Venator genau in dem Moment, in dem er seine Armbrust-Pfähle zündet.',
    upgrade_vex_barrier: 'Löst eine Barriere aus, wenn du in eine Falle trittst oder an die Wand betäubt wirst.',
  },
};
