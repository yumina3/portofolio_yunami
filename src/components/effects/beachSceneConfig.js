// Parameter ilustrasi HeroBeachScene (dipisah agar Fast Refresh tetap bekerja).
// Ubah nilai di sini untuk menyetel pasang-surut, caustic, kilau, bintang laut,
// intro, dan parallax tanpa menyentuh logika komponen.
export const SCENE = {
  // Pasang-surut (tide group)
  tideAmplitude: 18, // px gerak y (naik/turun)
  tideDuration: 8, // detik per siklus
  foamDrift: 30, // px gerak x duplikat garis buih (ombak merayap)
  wetBandAmplitude: 12, // px gerak y pita pasir basah
  wetBandDelay: 0.4, // detik

  // Caustic
  causticADuration: 28, // detik, arah diagonal
  causticBDuration: 40, // detik, arah berlawanan
  causticBreath: 10, // detik, napas scale 1 -> 1.03

  // Kilau air
  glints: 10, // jumlah titik kilau (High)
  glintMin: 1.5, // detik
  glintMax: 3, // detik

  // Blink-blink pasir (kilau butir pasir)
  sandSpark: 26, // jumlah titik kelip (High)
  sparkMin: 1.1, // detik siklus tercepat
  sparkMax: 3.4, // detik siklus terlambat

  // Bintang laut
  starfish: 3, // jumlah bintang laut
  starfishWobble: 3, // derajat, +/-
  starfishWobbleDuration: 6, // detik

  // Intro (setelah preloader)
  introRise: 1.6, // detik tide naik dari bawah

  // Parallax scroll (scrub)
  scrollSand: -8, // yPercent
  scrollTide: -18, // yPercent
  scrollStarfish: -12, // yPercent

  // Parallax mouse (High, pointer halus)
  mouseSand: 6, // px
  mouseWater: 12, // px
  mouseStarfish: 8, // px
}
