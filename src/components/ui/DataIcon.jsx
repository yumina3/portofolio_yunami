import { ICONS, FALLBACK_ICON } from './iconMap'
import { LOGOS, LOGOS_BY_ICON } from './logoMap'

// Menampilkan ikon untuk sebuah tool/skill.
// - Bila tersedia logo brand asli (public/images/logo), render <img> logo.
// - Jika tidak, jatuh kembali ke ikon lucide (iconMap.js).
//
// Props:
// - name  : nama ikon lucide (dari data `icon`), mis. 'Atom'.
// - label : nama tampil tool (dari data `name`), mis. 'React'. Dipakai untuk
//           mencari logo yang akurat; opsional.
// - size  : ukuran px (dipakai untuk ikon lucide maupun <img>).
// - forceIcon : paksa pakai ikon lucide (mis. untuk ikon navigasi di DockNav).
export function DataIcon({ name, label, size = 16, forceIcon = false, className, ...props }) {
  const logoSrc = !forceIcon ? LOGOS[label] || LOGOS_BY_ICON[name] : undefined

  if (logoSrc) {
    return (
      <img
        src={logoSrc}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        className={className}
        style={{ width: size, height: size, objectFit: 'contain', ...props.style }}
        {...props}
      />
    )
  }

  const Icon = ICONS[name] || FALLBACK_ICON
  return <Icon aria-hidden="true" size={size} className={className} {...props} />
}
