import type { DamageProfile } from '../types/deadlock';

// Shop category icons from the Deadlock Wiki (cdn.deadlock.wiki)
const WEAPON_ICON = 'https://cdn.deadlock.wiki/Weapon_icon.png';
const SPIRIT_ICON = 'https://cdn.deadlock.wiki/Spirit_icon_noborder.png';

function Glyph({ src }: { src: string }) {
  return (
    <img
      className="dmg-icon-glyph"
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
    />
  );
}

/** Weapon / spirit damage icon; hybrid shows both glyphs overlapped. */
export function DamageTypeIcon({ type }: { type: DamageProfile }) {
  return (
    <span className={`dmg-icon dmg-icon--${type}`} aria-hidden="true">
      {type !== 'spirit' && <Glyph src={WEAPON_ICON} />}
      {type !== 'bullet' && <Glyph src={SPIRIT_ICON} />}
    </span>
  );
}
