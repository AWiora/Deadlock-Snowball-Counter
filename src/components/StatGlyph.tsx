import type { AbilityDamageType, ItemStatIcon } from '../types/deadlock';

type StatTint = 'weapon' | 'vitality' | 'spirit' | 'souls' | 'none';

// Deadlock Wiki glyphs per stat, tinted by stat family like the wiki's item boxes:
// weapon stats orange, vitality stats green, ability stats purple; damage and resist
// glyphs already carry their colour.
const STAT_ICON: Record<ItemStatIcon, { file: string; tint: StatTint }> = {
  spirit_damage: { file: 'Spirit_damage.png', tint: 'none' },
  weapon_damage: { file: 'Bullet_damage.png', tint: 'none' },
  damage: { file: 'Damage_heart.png', tint: 'none' },
  spirit_resist: { file: 'Spirit_Armor.png', tint: 'none' },
  bullet_resist: { file: 'Bullet_Armor.png', tint: 'none' },
  slow: { file: 'MoveSlow.png', tint: 'spirit' },
  duration: { file: 'AttributeIconTechDuration.png', tint: 'spirit' },
  range: { file: 'AttributeIconTechRange.png', tint: 'spirit' },
  cast_range: { file: 'CastRange.png', tint: 'spirit' },
  cooldown: { file: 'AttributeIconTechCooldown.png', tint: 'spirit' },
  healing: { file: 'Healing.png', tint: 'vitality' },
  health: { file: 'Health.png', tint: 'vitality' },
  move_speed: { file: 'Move_speed.png', tint: 'vitality' },
  barrier: { file: 'Barrier.png', tint: 'vitality' },
  fire_rate: { file: 'Fire_Rate.png', tint: 'weapon' },
  ammo: { file: 'Clip_size_icon.png', tint: 'weapon' },
  melee: { file: 'Melee_damage.png', tint: 'weapon' },
  souls: { file: 'Souls_icon.png', tint: 'souls' },
};

/** Glyph for the damage an ability deals */
export const DAMAGE_TYPE_ICON: Record<AbilityDamageType, ItemStatIcon> = {
  spirit: 'spirit_damage',
  weapon: 'weapon_damage',
  melee: 'melee',
};

export function StatGlyph({ icon }: { icon?: ItemStatIcon }) {
  const glyph = icon ? STAT_ICON[icon] : undefined;
  if (!glyph) return null;
  return (
    <img
      className={`item-stat-glyph item-stat-glyph--${glyph.tint}`}
      src={`https://cdn.deadlock.wiki/${glyph.file}`}
      alt=""
      aria-hidden="true"
      referrerPolicy="no-referrer"
    />
  );
}
