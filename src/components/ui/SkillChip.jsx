import { DataIcon } from './DataIcon'

// Chip skill kaca (glassmorphism) sesuai brief hero.
// Gaya & tint diatur lewat CSS class `.skill-chip` (lihat src/index.css),
// animasi mengapung/kilau/hover dilakukan di wrapper oleh pemanggil (Hero).
//
// Props:
//   name, icon  - dari data (techBadges)
//   tint        - warna aksen kaca (turquoise|coral|sun|shallow|sky)
//   size        - 'md' (44px, default) | 'sm' (36px, mobile)
//   quality     - 'high'|'low'|'off' (mengatur blur)
//   sheen       - tampilkan elemen kilau (digerakkan GSAP)
const TINT_VAR = {
  turquoise: 'var(--turquoise)',
  coral: 'var(--coral)',
  sun: 'var(--sun)',
  shallow: 'var(--shallow)',
  sky: 'var(--sky)',
}

export function SkillChip({
  name,
  icon,
  tint = 'turquoise',
  size = 'md',
  quality = 'high',
  sheen = false,
  className = '',
  style,
  ...props
}) {
  const tintVar = TINT_VAR[tint] || TINT_VAR.turquoise
  return (
    <span
      className={`skill-chip ${size === 'sm' ? 'skill-chip--sm' : ''} ${
        quality === 'low' ? 'skill-chip--low' : ''
      } ${className}`}
      style={{ '--tint': tintVar, ...style }}
      {...props}
    >
      {sheen && <span className="skill-chip__sheen" data-sheen aria-hidden="true" />}
      {icon && (
        <span className="skill-chip__icon" aria-hidden="true">
          <DataIcon name={icon} size={16} />
        </span>
      )}
      <span className="skill-chip__label">{name}</span>
    </span>
  )
}
