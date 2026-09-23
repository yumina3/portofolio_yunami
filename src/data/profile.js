// Skema: PRD.md bagian 7 -> profile { name, headline, photo, bio[], email, location }
export const profile = {
  name: 'yunami',
  headline: 'Data & Business Intelligence Enthusiast',
  // Base path tanpa ekstensi. SmartImage mencoba berurutan:
  // `<photo>.jpg`, `<photo>.jpeg`, `<photo>.png`, lalu `<photo>.svg` (placeholder).
  // Jadi cukup taruh foto asli sebagai profile.jpg / profile.jpeg / profile.png.
  photo: '/images/profile',
  bio: [
    'Undergraduate Information System student at Universitas Negeri Semarang with a growing interest in digital procurement systems and Business Intelligence. Currently learning and developing skills in data analysis, ERP, and academic writing. Equipped with communication and management fundamentals, and eager to keep improving through new experiences, collaboration, and continuous learning in information technology.',
  ],
  location: 'Semarang, Indonesia',
}

// socials[] -> { label, url }
export const socials = [
  { label: 'GitHub', url: 'https://github.com/yumina3' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/yun-sabarina-mikanda-0a1045322' },
  { label: 'WhatsApp', url: 'https://wa.me/6285226049130' },
]
