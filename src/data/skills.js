// Skema: PRD.md bagian 7
// skills[]      { category, items[ { name, icon } ] }
// techBadges[]  { name, icon, color }

// Ikon memakai nama ekspor dari lucide-react (dipetakan di komponen).
export const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: 'Atom' },
      { name: 'Tailwind CSS', icon: 'Paintbrush' },
      { name: 'JavaScript', icon: 'Braces' },
      { name: 'Vite', icon: 'Zap' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', icon: 'Server' },
      { name: 'PostgreSQL', icon: 'Database' },
      { name: 'MySQL', icon: 'Database' },
    ],
  },
  {
    category: 'Data / ML',
    items: [
      { name: 'Python', icon: 'Python' },
      { name: 'Pandas', icon: 'Table' },
      { name: 'Scikit-learn', icon: 'Brain' },
      { name: 'K-Means', icon: 'ScatterChart' },
    ],
  },
  {
    category: 'Tools & Design',
    items: [
      { name: 'GitHub', icon: 'Github' },
      { name: 'Figma', icon: 'PenTool' },
      { name: 'Excel', icon: 'Excel' },
      { name: 'Notion', icon: 'NotebookPen' },
    ],
  },
]

// Badge teknologi yang mengapung di hero.
// Warna hanya dari palet Tropical Day (dipakai sebagai tint kaca, bukan teks).
// - tint  : warna aksen kaca (turquoise | coral | sun | shallow | sky)
// - zone  : area hero tempat chip berada ('sand' | 'water') -> chip air dapat riak
// - depth : faktor parallax kedalaman (0.6 - 1.4) saat mouse/scroll bergerak
// - pos   : posisi dalam persen relatif terhadap hero (left/top), dijauhkan dari kartu
export const techBadges = [
  { name: 'React', icon: 'Atom', tint: 'turquoise', zone: 'sand', depth: 1.0, pos: { left: 6, top: 16 } },
  { name: 'JavaScript', icon: 'Braces', tint: 'sun', zone: 'sand', depth: 1.25, pos: { left: 13, top: 40 } },
  { name: 'Tailwind', icon: 'Paintbrush', tint: 'sky', zone: 'sand', depth: 0.75, pos: { left: 5, top: 64 } },
  { name: 'GitHub', icon: 'Github', tint: 'coral', zone: 'sand', depth: 1.1, pos: { left: 20, top: 8 } },
  { name: 'Node.js', icon: 'Server', tint: 'shallow', zone: 'water', depth: 0.9, pos: { left: 79, top: 14 } },
  { name: 'Python', icon: 'Python', tint: 'coral', zone: 'water', depth: 1.35, pos: { left: 88, top: 38 } },
  { name: 'Excel', icon: 'Excel', tint: 'turquoise', zone: 'water', depth: 1.2, pos: { left: 66, top: 20 } },
  { name: 'Figma', icon: 'PenTool', tint: 'sun', zone: 'water', depth: 0.65, pos: { left: 84, top: 62 } },
]
