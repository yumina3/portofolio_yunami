// Peta logo brand asli (file di public/images/logo) untuk nama tool/skill.
// Dipakai oleh DataIcon: bila nama ada di sini -> render <img> logo asli,
// jika tidak -> jatuh kembali ke ikon lucide (iconMap.js).
//
// CATATAN sengaja TIDAK dipetakan di sini:
// - K-Means  -> tetap ikon lucide (ScatterChart), sesuai permintaan.
//
// Kunci = `name` yang dipakai di src/data/*.js (peka huruf besar-kecil).
export const LOGOS = {
  React: '/images/logo/react.png',
  Vite: '/images/logo/Vite.png',
  'Tailwind CSS': '/images/logo/tailwind.png',
  Tailwind: '/images/logo/tailwind.png',
  JavaScript: '/images/logo/Javascript.png',
  Javascript: '/images/logo/Javascript.png',
  Typescript: '/images/logo/Javascript.png',
  'Node.js': '/images/logo/nodeJS.png',
  PostgreSQL: '/images/logo/PostgreSQL.png',
  MySQL: '/images/logo/mysql.png',
  Python: '/images/logo/python.png',
  Pandas: '/images/logo/Pandas.png',
  'Scikit-learn': '/images/logo/scikit-learn.png',
  Figma: '/images/logo/figma.png',
  Excel: '/images/logo/excel.png',
  Notion: '/images/logo/notion.png',
  GitHub: '/images/logo/github.svg',
}

// Peta berdasarkan nama ikon lucide (dipakai oleh techBadges hero yang hanya
// menyimpan `icon`, bukan `name`).
export const LOGOS_BY_ICON = {
  Atom: '/images/logo/react.png',
  Zap: '/images/logo/Vite.png',
  Paintbrush: '/images/logo/tailwind.png',
  Braces: '/images/logo/Javascript.png',
  Server: '/images/logo/nodeJS.png',
  Database: '/images/logo/PostgreSQL.png',
  Python: '/images/logo/python.png',
  Table: '/images/logo/Pandas.png',
  Brain: '/images/logo/scikit-learn.png',
  PenTool: '/images/logo/figma.png',
  Excel: '/images/logo/excel.png',
  NotebookPen: '/images/logo/notion.png',
  Github: '/images/logo/github.svg',
  GitBranch: '/images/logo/github.svg',
  // ScatterChart (K-Means) -> sengaja tidak dipetakan
}
