// Parameter chip skill hero (mudah diubah).
// Dipakai oleh Hero (gerak) dan diteruskan ke CSS sebagai variabel kaca.
export const CHIP_LOOK = {
  glassAlpha: 0.6, // opacity lapisan kaca (atas)
  glassAlpha2: 0.28, // opacity lapisan kaca (bawah)
  tintStrength: 0.3, // kekuatan tint warna per chip
  blur: 14, // px blur kaca (high)
  blurLow: 8, // px blur kaca (low)
  sheenOpacity: 0.55, // kekuatan kilau melintas
}

export const CHIP_MOTION = {
  floatY: [14, 20], // px amplitudo mengapung
  floatRot: 3, // derajat rotasi
  floatDur: [4, 7], // detik
  driftX: [10, 16], // px drift horizontal
  driftDur: [8, 12], // detik (periode lain -> lintasan melengkung)
  sheenMin: 6, // detik jeda kilau
  sheenMax: 9,
  evadeRadius: 140, // px jarak kursor memicu menghindar
  evadeMax: 18, // px pergeseran maksimum menjauhi kursor
  parallaxMouse: 22, // px per unit depth saat mouse bergerak
  parallaxScroll: 40, // px per unit depth saat scroll
  rippleDur: 3.5, // detik riak air
  rippleStagger: 1.2,
}
