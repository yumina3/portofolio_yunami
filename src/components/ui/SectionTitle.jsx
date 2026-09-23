// Judul script section (DESAIN.md 3). Selalu <h2> berisi teks nyata.
// Judul SELALU putih + halo gelap (lihat .section-title di index.css) supaya
// terbaca di latar yang berganti mengikuti scroll.
export function SectionTitle({ children, className = '', as: Tag = 'h2' }) {
  return (
    <Tag
      className={`section-title font-script text-[44px] leading-[1.05] md:text-[72px] md:leading-none ${className}`}
    >
      {children}
    </Tag>
  )
}
