// SVG gelombang dibuat sendiri (DESAIN.md 5.9). Jangan menyalin dari situs lain.
// viewBox 0 0 1440 200, lebar digandakan agar bisa di-loop mulus.

const WAVE_PATH = 'M0,120 C240,60 480,180 720,120 C960,60 1200,180 1440,120 L1440,200 L0,200 Z'

// Pembatas ombak statis (dipakai saat Quality Off dan sebagai dasar hero).
export function WaveDivider({ fill = 'var(--shallow)', className = '', height = 120 }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height }}
    >
      <path d={WAVE_PATH} fill={fill} />
    </svg>
  )
}

// Layer ombak yang bisa dipakai berulang di transisi / dasar hero.
export function WaveLayer({ fill, opacity = 1, className = '', style }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    >
      <path d={WAVE_PATH} fill={fill} opacity={opacity} />
    </svg>
  )
}

export { WAVE_PATH }
