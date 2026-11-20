/**
 * How much time an ability gives you to react, from deadlock.wiki (channel times, cast and
 * explosion delays) and its animation where the wiki has no number.
 *
 * warn: seconds between the ability visibly starting and the moment it takes your control away
 *   (stun, sleep, petrify, hex) - the window for Unstoppable, Ethereal Shift, Dispel Magic & co.,
 *   which can't be used while stunned or asleep (wiki).
 * channel: seconds the enemy stays in an interruptible channel - the window for Knockdown or
 *   Cursed Relic to cancel it.
 * Abilities missing here fall back to their traits (delayed / channel) in engine/execution.ts.
 */
export interface AbilityTiming {
  warn?: number;
  channel?: number;
}

export const ABILITY_TIMING: Record<string, Partial<Record<number, AbilityTiming>>> = {
  hero_atlas: {
    2: { warn: 0.5 }, // Shoulder Charge (stun only on wall hit, charge is visible)
    4: { warn: 1 }, // Seismic Impact (Abrams leaps high before crashing down)
  },
  hero_fencer: {
    4: { warn: 1.5, channel: 1.5 }, // Itani Lo Sahn (wiki: Apollo channels before the lunge and can hold it)
  },
  hero_baba: {
    4: { warn: 3, channel: 6.5 }, // Feed The Birds (wiki: 6.5s channel, the hex lands when it ends)
  },
  hero_deadpack: {
    4: { warn: 0 }, // Close The Deal (instant grab)
    2: { channel: 5 }, // Chimera Mk1 (wiki: 5s channel)
  },
  hero_dynamo: {
    4: { warn: 0, channel: 2.75 }, // Singularity (wiki: stuns and pulls during its 2.75s channel)
    3: { channel: 5 }, // Rejuvenating Aurora (wiki: 5s channel)
  },
  hero_orion: {
    4: { warn: 1.5, channel: 20 }, // Guided Owl (wiki: 1.5s cast time, then a slow owl you can see)
  },
  hero_haze: {
    1: { warn: 0.3 }, // Sleep Dagger (fast projectile)
    4: { channel: 3.5 }, // Bullet Dance (wiki: 3.5s duration)
  },
  hero_astro: {
    4: { warn: 0.3, channel: 2.25 }, // Spirit Lasso (projectile, stun on hit; wiki: 2.25s drag)
  },
  hero_inferno: {
    4: { warn: 3.25 }, // Concussive Combustion (wiki: 3.25s explosion delay)
  },
  hero_tengu: {
    3: { warn: 0.8 }, // Stone Form (Ivy drops from the air)
  },
  hero_lash: {
    4: { warn: 2.3, channel: 2.3 }, // Death Slam (wiki: 2.3s channel, lift and stun only after it)
  },
  hero_krill: {
    4: { warn: 0, channel: 2.4 }, // Combo (wiki: holds and stuns during the 2.4s channel)
  },
  hero_bookworm: {
    4: { warn: 1.5 }, // Rallying Charge (wiki: 0.7s channel, then the wave travels across the map)
  },
  hero_chrono: {
    3: { warn: 0.5 }, // Kinetic Carbine (charge-up is visible, the shot itself is fast)
  },
  hero_familiar: {
    4: { warn: 1.9, channel: 1.9 }, // Naptime (wiki: sleep only when the 1.9s channel ends)
  },
  hero_gigawatt: {
    2: { warn: 3.5 }, // Static Charge (wiki: 3.5s delay before the stun)
    4: { channel: 7 }, // Storm Cloud (wiki: 7s channel)
  },
  hero_magician: {
    3: { warn: 0.3 }, // Rabbit Hex (short casting delay)
  },
  hero_chessmaster: {
    4: { warn: 1.5 }, // Develop Queen (wiki: the stun squares come after a delay)
  },
  hero_priest: {
    2: { warn: 0.3 }, // Gutshot (stun only near walls)
  },
  hero_frank: {
    4: { warn: 3 }, // Shocking Reanimation (wiki: 3s channel, Victor is invincible during it)
    3: { channel: 8 }, // Aura of Suffering (wiki: 8s channel)
  },
  hero_artist: {
    3: { warn: 1 }, // Still Life
  },
  hero_viscous: {
    4: { warn: 0.5 }, // Goo Ball (rolling ball is visible)
  },
  hero_viper: {
    4: { warn: 0.3 }, // Petrifying Bola (projectile)
  },
  hero_wraith: {
    4: { warn: 0, channel: 1.25 }, // Telekinesis (wiki: target is stunned while lifted (1.25s channel))
  },
  hero_warden: {
    3: { warn: 2.8 }, // Binding Word (wiki: 2.8s escape time before the immobilize)
    4: { channel: 6 }, // Last Stand (wiki: 6s duration)
  },
  hero_punkgoat: {
    4: { warn: 2.8 }, // Chain Gang (wiki: 2.8s delay before the yank)
  },
  hero_bebop: {
    4: { channel: 11 }, // Hyper Beam (wiki: 11s channel)
  },
  hero_forge: {
    4: { channel: 8 }, // Heavy Barrage (wiki: 8s duration)
  },
  hero_kelvin: {
    4: { channel: 5 }, // Frozen Shelter (wiki: 5s duration)
    3: { channel: 5 }, // Arctic Beam (wiki: 5s beam)
  },
  hero_synth: {
    1: { channel: 2 }, // Barrage (wiki: 2s channel)
    3: { channel: 1.5 }, // Enchanter's Satchel (wiki: 1.5s channel)
  },
  hero_nano: {
    4: { channel: 3 }, // Return to Shadows (wiki: 3s channel)
  },
  hero_doorman: {
    4: { channel: 1 }, // Hotel Guest (wiki: 1s channel)
  },
  hero_ghost: {
    2: { channel: 2.5 }, // Life Drain (wiki: 2.5s tether)
  },
  hero_mirage: {
    4: { channel: 3 }, // Traveler (wiki: 3s wait time)
  },
  hero_yamato: {
    1: { channel: 1.2 }, // Power Slash (wiki: charge-up channel of about a second)
  },
};

export function getAbilityTiming(heroClass: string, slot: number): AbilityTiming | undefined {
  return ABILITY_TIMING[heroClass]?.[slot];
}
