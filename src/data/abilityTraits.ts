/**
 * What each hero ability really does, so a counter item is only shown against abilities it
 * mechanically affects. Built from the deadlock-api ability properties (StunDuration,
 * SlowPercent, AbilityChannelTime, healing props, movement behaviour …) and the ability texts.
 * Damage types are NOT listed here: they come live from the game data (`ability.damage`).
 *
 * Effects on the caster's enemies:
 *   stun, sleep, silence, immobilize, chain (tether), fear, disarm, petrify, hex,
 *   pull, knock (knockup / knockback), moveLock (blocks movement abilities / stamina),
 *   slow, dot (damage over time), debuff (other lingering effect: amp, resist shred, mark,
 *   fire-rate cut, vision, delayed detonation …)
 * Properties of the ability itself:
 *   delayed (bomb / charge that goes off later; a purge removes it),
 *   poke (repeatable ranged chip damage), heal (heals the caster or allies), buff (buff or
 *   barrier on the caster / allies), mobility (dash, leap, teleport, flight), airborne (caster
 *    fights from the air), teleport (mobility that a slow cannot stop), channel (interruptible cast / channel), passive (nothing to silence),
 *   dodge (projectile, telegraph or zone you can sidestep or walk out of),
 *   gun (delivered by or boosting the caster's bullets)
 */
export type AbilityTrait =
  | 'stun'
  | 'sleep'
  | 'silence'
  | 'immobilize'
  | 'chain'
  | 'fear'
  | 'disarm'
  | 'petrify'
  | 'hex'
  | 'pull'
  | 'knock'
  | 'moveLock'
  | 'slow'
  | 'dot'
  | 'debuff'
  | 'poke'
  | 'heal'
  | 'buff'
  | 'mobility'
  | 'teleport'
  | 'delayed'
  | 'airborne'
  | 'channel'
  | 'passive'
  | 'dodge'
  | 'gun';

/** Slots 1-4; heroes with a transformed form (Silver) add slots 5-7 */
type Slots = [AbilityTrait[], AbilityTrait[], AbilityTrait[], AbilityTrait[], ...AbilityTrait[][]];

export const ABILITY_TRAITS: Record<string, Slots> = {
  hero_inferno: [
    ['slow', 'debuff', 'dodge', 'poke'], // Napalm
    ['mobility', 'dot', 'dodge'], // Flame Dash
    ['dot', 'gun', 'passive'], // Afterburn
    ['stun', 'dodge'], // Concussive Combustion (cannot be interrupted)
  ],
  hero_gigawatt: [
    ['dot', 'dodge', 'poke'], // Lightning Ball
    ['stun', 'delayed'], // Static Charge (charge sits on you, then stuns)
    ['gun', 'buff'], // Power Surge
    ['dot', 'channel', 'dodge'], // Storm Cloud
  ],
  hero_hornet: [
    ['chain', 'slow', 'dodge'], // Stake
    ['mobility', 'airborne', 'gun', 'buff'], // Flight
    ['dot', 'debuff', 'dodge', 'poke'], // Crow Familiar
    ['dodge'], // Assassinate
  ],
  hero_ghost: [
    ['dodge', 'poke'], // Essence Bomb
    ['dot', 'heal', 'channel', 'dodge'], // Life Drain
    ['slow', 'debuff', 'dodge', 'poke'], // Malice
    ['heal'], // Soul Exchange
  ],
  hero_atlas: [
    ['dot', 'heal', 'dodge'], // Siphon Life
    ['mobility', 'stun', 'pull', 'dodge'], // Shoulder Charge
    ['heal', 'buff', 'passive'], // Infernal Resilience
    ['mobility', 'stun', 'dodge'], // Seismic Impact
  ],
  hero_wraith: [
    ['gun', 'poke'], // Card Trick (cards come from weapon damage)
    ['mobility', 'teleport'], // Project Mind
    ['gun', 'buff'], // Full Auto
    ['stun', 'slow', 'moveLock', 'channel'], // Telekinesis
  ],
  hero_forge: [
    ['dot', 'dodge', 'poke'], // Mini Turret
    ['heal'], // Medicinal Specter
    ['slow', 'dodge'], // Spectral Wall
    ['dot', 'channel', 'dodge'], // Heavy Barrage
  ],
  hero_chrono: [
    ['slow', 'debuff', 'dot', 'dodge', 'poke'], // Pulse Grenade
    ['slow', 'dodge'], // Time Wall
    ['stun', 'dodge'], // Kinetic Carbine (Time-Stop)
    ['pull', 'dodge'], // Paradoxical Swap
  ],
  hero_dynamo: [
    ['knock', 'dodge'], // Kinetic Pulse
    ['mobility', 'teleport'], // Quantum Entanglement
    ['heal', 'channel'], // Rejuvenating Aurora
    ['stun', 'pull', 'dot', 'channel', 'dodge'], // Singularity
  ],
  hero_kelvin: [
    ['slow', 'heal', 'dodge', 'poke'], // Frost Grenade
    ['mobility', 'airborne', 'buff'], // Ice Path
    ['slow', 'debuff', 'dot', 'channel', 'dodge'], // Arctic Beam
    ['heal', 'buff', 'slow', 'dodge'], // Frozen Shelter
  ],
  hero_haze: [
    ['sleep', 'dodge', 'poke'], // Sleep Dagger
    ['buff', 'mobility'], // Smoke Bomb
    ['gun', 'debuff', 'passive'], // Fixation
    ['gun', 'buff', 'channel'], // Bullet Dance
  ],
  hero_astro: [
    ['knock', 'dot', 'dodge', 'poke'], // Powder Keg
    ['mobility', 'airborne'], // Bounce Pad
    ['gun', 'slow', 'passive'], // Crackshot
    ['stun', 'pull', 'channel', 'dodge'], // Spirit Lasso
  ],
  hero_bebop: [
    ['knock', 'debuff', 'dodge'], // Exploding Uppercut
    ['delayed', 'dodge'], // Sticky Bomb
    ['pull', 'slow', 'dodge'], // Grapple Arm
    ['slow', 'dot', 'channel', 'dodge'], // Hyper Beam
  ],
  hero_nano: [
    ['dodge', 'poke'], // Gloom Bombs
    ['mobility', 'heal', 'dodge'], // Leaping Slash
    ['mobility', 'buff'], // Ava
    ['mobility', 'buff', 'dodge'], // Return to Shadows
  ],
  hero_orion: [
    ['dodge', 'poke'], // Charged Shot
    ['mobility', 'airborne', 'gun', 'buff'], // Rain of Arrows
    ['slow', 'silence', 'disarm', 'debuff', 'dodge'], // Spirit Snare
    ['stun', 'channel', 'dodge'], // Guided Owl
  ],
  hero_krill: [
    ['heal'], // Scorn
    ['mobility', 'slow', 'knock', 'buff', 'dodge'], // Burrow
    ['disarm', 'dodge'], // Sand Blast
    ['stun', 'dot', 'channel'], // Combo
  ],
  hero_shiv: [
    ['slow', 'dot', 'dodge', 'poke'], // Serrated Knives
    ['mobility', 'debuff', 'dodge'], // Slice and Dice
    ['buff', 'heal'], // Bloodletting (clearing deferred damage counts as healing)
    ['mobility'], // Killing Blow
  ],
  hero_tengu: [
    ['slow', 'dot', 'dodge', 'poke'], // Entangling Thorns
    ['heal', 'buff', 'gun'], // Kudzu Connection
    ['stun', 'heal', 'buff', 'dodge'], // Stone Form (drags airborne enemies down)
    ['mobility', 'airborne', 'dodge'], // Air Drop
  ],
  hero_warden: [
    ['slow', 'debuff', 'dodge', 'poke'], // Alchemical Flask
    ['buff', 'mobility'], // Willpower
    ['immobilize', 'debuff', 'dodge'], // Binding Word
    ['dot', 'heal', 'buff', 'channel', 'dodge'], // Last Stand
  ],
  hero_yamato: [
    ['channel', 'dodge'], // Power Slash
    ['mobility', 'slow', 'dodge'], // Flying Slash
    ['heal', 'debuff', 'dodge'], // Crimson Slash
    ['buff', 'heal'], // Shadow Transformation
  ],
  hero_lash: [
    ['dodge'], // Ground Strike
    ['mobility', 'airborne'], // Grapple
    ['heal', 'dodge', 'poke'], // Flog
    ['stun', 'slow', 'channel', 'dodge'], // Death Slam
  ],
  hero_viscous: [
    ['slow', 'dodge', 'poke'], // Splatter
    ['heal', 'buff'], // The Cube
    ['knock', 'slow', 'dodge'], // Puddle Punch
    ['stun', 'mobility', 'buff', 'dodge'], // Goo Ball
  ],
  hero_synth: [
    ['slow', 'channel', 'dodge', 'poke'], // Barrage
    ['mobility', 'teleport', 'dodge'], // Flying Cloak
    ['buff', 'dodge'], // Enchanter's Satchel
    ['dot', 'debuff'], // Affliction
  ],
  hero_mirage: [
    ['dot', 'heal', 'debuff'], // Fire Scarabs
    ['mobility', 'slow', 'knock', 'buff', 'dodge'], // Dust Devil (invincible while casting)
    ['debuff'], // Djinn's Mark (per-target cooldown; wiki: Plated Armor doesn't stop it)
    ['mobility', 'teleport', 'buff', 'channel'], // Traveler
  ],
  hero_viper: [
    ['slow', 'dodge', 'poke'], // Screwjab Dagger
    ['delayed'], // Lethal Venom
    ['mobility', 'passive'], // Slither
    ['petrify', 'slow', 'dodge'], // Petrifying Bola
  ],
  hero_magician: [
    ['dodge', 'poke'], // Vexing Bolt
    ['poke'], // Spectral Assistant
    ['hex', 'debuff', 'dodge'], // Rabbit Hex
    [], // Audience Participation
  ],
  hero_vampirebat: [
    ['dodge', 'poke'], // Rake
    ['mobility', 'teleport', 'buff'], // Sanguine Retreat
    ['gun', 'passive'], // Love Bites
    ['silence'], // Nox Nostra
  ],
  hero_drifter: [
    ['dodge', 'poke'], // Rend
    ['dot', 'debuff', 'mobility', 'teleport', 'dodge'], // Stalker's Mark
    ['buff', 'passive'], // Bloodscent
    ['debuff'], // Eternal Night (darkness, no damage)
  ],
  hero_priest: [
    ['dot', 'debuff', 'dodge', 'poke'], // Consecrating Grenade
    ['knock', 'stun', 'dodge'], // Gutshot
    ['immobilize', 'dodge'], // Hex-Lined Snap Trap
    ['gun', 'buff'], // Ira Domini
  ],
  hero_frank: [
    ['poke'], // Pain Battery
    ['heal', 'buff', 'mobility'], // Jumpstart
    ['dot', 'channel', 'dodge'], // Aura of Suffering
    ['stun', 'slow', 'channel', 'dodge'], // Shocking Reanimation
  ],
  hero_bookworm: [
    ['dot', 'dodge', 'poke'], // Bookwyrm
    ['buff', 'gun'], // Plot Armor
    ['slow', 'immobilize', 'dodge'], // Captivating Read
    ['heal', 'stun', 'dodge'], // Rallying Charge
  ],
  hero_doorman: [
    ['slow', 'debuff', 'dodge', 'poke'], // Call Bell
    ['mobility', 'teleport'], // Doorway
    ['pull', 'dodge'], // Luggage Cart
    ['dot'], // Hotel Guest
  ],
  hero_punkgoat: [
    ['pull', 'knock', 'dodge'], // Bashdown
    ['mobility', 'knock', 'dodge'], // Rising Ram
    ['debuff', 'passive'], // Blasted
    ['chain', 'slow', 'moveLock', 'dodge'], // Chain Gang (breaks without line of sight)
  ],
  hero_necro: [
    ['dot', 'dodge'], // Jar of Dead
    ['immobilize', 'slow', 'dodge'], // Grasping Hands
    ['gun', 'debuff', 'passive'], // Essence Theft
    ['slow', 'dot', 'dodge'], // Borrowed Decree
  ],
  hero_fencer: [
    ['slow', 'mobility', 'dodge'], // Disengaging Sigil
    ['immobilize', 'disarm', 'buff', 'mobility'], // Riposte
    ['mobility', 'dodge'], // Flawless Advance
    ['stun', 'channel', 'dodge'], // Itani Lo Sahn
  ],
  hero_deadpack: [
    ['debuff', 'dodge', 'poke'], // Strix Salvo
    ['mobility', 'airborne', 'knock', 'dodge'], // Chimera Mk1
    ['dot', 'debuff', 'dodge'], // Jettison Fuel
    ['stun', 'pull'], // Close The Deal
  ],
  hero_familiar: [
    ['knock', 'dodge', 'poke'], // Pillow Toss
    ['heal', 'mobility'], // Tag Along
    ['buff'], // Lil Helpers
    ['sleep', 'slow', 'moveLock', 'channel', 'dodge'], // Naptime
  ],
  hero_werewolf: [
    ['gun', 'buff'], // Slam Fire
    ['mobility', 'knock', 'disarm', 'dodge'], // Boot Kick (wiki: disarms)
    ['slow', 'moveLock', 'dodge'], // Entangling Bola
    ['gun', 'buff', 'heal'], // Lycan Curse (heals missing health on transform)
    // Lycan Curse form (slot 5-7 replace 1-3 while transformed)
    ['heal'], // Go For The Throat (melee cone, 40% lifesteal)
    ['mobility', 'debuff', 'dot', 'dodge'], // Mauling Leap (melee leap, Bullet Resist cut, spirit DoT)
    ['disarm', 'slow', 'debuff'], // Tail Whack
  ],
  hero_unicorn: [
    ['debuff', 'heal', 'dodge'], // Light Eater
    ['buff', 'silence'], // Dazzling Trick
    ['dodge', 'poke'], // Radiant Daggers
    ['slow'], // Shining Wonder
  ],
  hero_ratking: [
    ['slow', 'dodge', 'poke'], // Scrap Grenade
    ['dot', 'debuff'], // Rat Swarm
    ['buff'], // Royal Pestments
    ['buff', 'channel'], // Rule, Ratannia!
  ],
  hero_chessmaster: [
    ['slow', 'dot', 'dodge'], // Setup Bishop
    ['buff', 'mobility'], // Kingside Knight
    ['immobilize', 'dodge'], // Rook Battery
    ['stun', 'slow', 'dot', 'dodge'], // Develop Queen
  ],
  hero_nurse: [
    ['dot', 'debuff', 'dodge'], // Leech Therapy
    ['buff'], // Wretched Vapors
    ['heal', 'gun'], // Healing Needles
    ['dot', 'fear', 'moveLock', 'channel', 'dodge'], // Lurking Terrors
  ],
  hero_artist: [
    ['gun', 'buff'], // Living Ink
    ['slow', 'dodge', 'poke'], // Flow State
    ['dot', 'stun', 'channel', 'dodge'], // Still Life (break line of sight)
    ['silence', 'slow', 'debuff', 'dodge'], // Abstract Landscape
  ],
  hero_baba: [
    ['debuff', 'dodge'], // Threadsap
    ['mobility', 'buff', 'knock', 'slow'], // Granny Long Legs
    ['silence', 'dot', 'debuff', 'buff', 'dodge'], // Baba's Brew
    ['slow', 'hex', 'channel', 'dodge'], // Feed The Birds
  ],
};

export function getAbilityTraits(heroClass: string, slot: number): ReadonlySet<AbilityTrait> | undefined {
  const slots = ABILITY_TRAITS[heroClass];
  if (!slots || slot < 1 || slot > slots.length) return undefined;
  return new Set(slots[slot - 1]);
}
