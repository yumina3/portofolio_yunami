import { ICONS, FALLBACK_ICON } from './iconMap'

// Memetakan nama ikon dari src/data ke komponen lucide-react.
// Memakai peta eksplisit (iconMap.js) agar bundler bisa tree-shake.
// Jatuh kembali ke ikon netral jika nama tidak ditemukan.
export function DataIcon({ name, ...props }) {
  const Icon = ICONS[name] || FALLBACK_ICON
  return <Icon aria-hidden="true" {...props} />
}
