// Titik tengah: daftar act untuk latar berubah mengikuti scroll (DESAIN.md 8.3).
// Warna act disusun sebagai SATU alur gradient yang menyambung:
// fajar (hero) -> langit siang (about) -> biru laut (projects) ->
// laut dalam (wall) -> malam (contact). Tiap `bottom` act menjadi `top`
// act berikutnya supaya tidak ada potongan warna yang tegas.
export const ACTS = [
  { id: 'hero', first: '#hero', top: '#FFD9B8', bottom: '#BFE6F5', label: 'Dawn' },
  { id: 'about', first: '#about', top: '#BFE6F5', bottom: '#A8E6E2', label: 'Day' },
  { id: 'projects', first: '#projects', top: '#A8E6E2', bottom: '#2C7FA6', label: 'Clear sea' },
  { id: 'wall', first: '#wall', top: '#2C7FA6', bottom: '#2C7FA6', label: 'Deep sea' },
  { id: 'contact', first: '#contact', top: '#2C7FA6', bottom: '#071E33', label: 'Night' },
]

// Section untuk dock navigasi (DESAIN.md 5.1).
export const NAV_ITEMS = [
  { id: 'hero', label: 'Home', icon: 'Home' },
  { id: 'about', label: 'About', icon: 'User' },
  { id: 'skills', label: 'Skills', icon: 'Sparkles' },
  { id: 'experience', label: 'Experience', icon: 'Briefcase' },
  { id: 'projects', label: 'Projects', icon: 'LayoutGrid' },
  { id: 'wall', label: 'Wall', icon: 'StickyNote' },
  { id: 'contact', label: 'Contact', icon: 'Mail' },
]
