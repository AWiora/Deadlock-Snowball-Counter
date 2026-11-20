// In-game souls glyph from the Deadlock Wiki (white PNG, tinted via CSS filter)
const SOULS_ICON = 'https://cdn.deadlock.wiki/Souls_icon.png';

export function SoulsIcon({ size = 14 }: { size?: number }) {
  return (
    <img
      className="souls-icon"
      src={SOULS_ICON}
      alt=""
      aria-hidden="true"
      referrerPolicy="no-referrer"
      style={{ height: size }}
    />
  );
}
