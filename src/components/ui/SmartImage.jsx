import { useMemo, useState } from 'react'

// Gambar dengan fallback otomatis (coba beberapa ekstensi berurutan).
//
// Mendukung JPG, JPEG, PNG, dan SVG. Kamu cukup menaruh file asli di public/images/
// dengan salah satu ekstensi berikut (urutan percobaan): .jpg -> .jpeg -> .png -> .svg.
// Placeholder .svg tetap dipakai sebagai cadangan bila file asli belum ada.
//
// Cara pakai (eksplisit):
//   <SmartImage src="/images/profile.png" fallback="/images/profile.svg" alt="..." />
//
// Cara pakai (base tanpa ekstensi):
//   <SmartImage base="/images/profile" alt="..." />
//   -> mencoba /images/profile.jpg, /images/profile.jpeg,
//      /images/profile.png, lalu /images/profile.svg
export function SmartImage({
  base,
  src,
  fallback,
  extensions = ['jpg', 'jpeg', 'png', 'svg'],
  alt = '',
  loading = 'lazy',
  className = '',
  ...props
}) {
  // Daftar kandidat src yang dicoba berurutan.
  const candidates = useMemo(() => {
    if (src) {
      // src eksplisit: pakai src, lalu fallback opsional.
      return fallback && fallback !== src ? [src, fallback] : [src]
    }
    if (!base) return []
    return extensions.map((ext) => `${base}.${ext}`)
  }, [src, fallback, base, extensions])

  const [index, setIndex] = useState(0)
  // Signature kandidat: bila daftar berubah (mis. `base` berganti), mulai ulang
  // dari kandidat pertama TANPA useEffect (derivasi saat render, sesuai
  // rekomendasi set-state-in-effect).
  const signature = candidates.join('|')
  const [prevSignature, setPrevSignature] = useState(signature)
  if (signature !== prevSignature) {
    setPrevSignature(signature)
    setIndex(0)
  }

  const current = candidates[Math.min(index, Math.max(candidates.length - 1, 0))]

  const onError = () => {
    setIndex((i) => (i < candidates.length - 1 ? i + 1 : i))
  }

  return (
    <img
      src={current}
      alt={alt}
      loading={loading}
      onError={onError}
      className={className}
      {...props}
    />
  )
}
