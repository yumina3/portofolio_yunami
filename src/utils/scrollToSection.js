// Scroll ke section agar KONTEN tampak pas (header di dekat atas viewport),
// bukan menempel tepi atas section sehingga padding besar + WaveTransition
// tampil sebagai "jeda kosong".
//
// Offset dihitung dari:
// - padding atas section (py-20 / md:py-[120px]) -> jangan ditampilkan;
// - tinggi section vs viewport -> kalau muat, pusatkan; kalau lebih tinggi,
//   ratakan sehingga judul section berada ~10% dari atas viewport.
export function scrollToSection(el, lenis, { duration = 1 } = {}) {
  if (!el) return

  const viewport = window.innerHeight || 0
  const height = el.offsetHeight || 0
  const padTop = parseFloat(getComputedStyle(el).paddingTop) || 0
  // Konten dianggap mulai setelah padding atas; sisakan sedikit agar tidak
  // nempel ke tepi atas layar.
  const contentTop = padTop
  const gap = 16

  let offset
  if (height > 0 && height <= viewport) {
    // Section muat di layar -> pusatkan seluruh section.
    offset = -Math.max((viewport - height) / 2, 0)
  } else {
    // Section lebih tinggi -> taruh awal KONTEN sedikit dari atas layar.
    offset = contentTop - gap
  }

  if (lenis) {
    lenis.scrollTo(el, { offset, duration })
    return
  }

  // Fallback tanpa Lenis.
  const absoluteTop = el.getBoundingClientRect().top + window.scrollY
  const top = Math.max(absoluteTop + offset, 0)
  window.scrollTo({ top, behavior: 'smooth' })
}
