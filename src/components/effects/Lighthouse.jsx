// Mercusuar putih (siluet) dari public/images/mercusuar-white.png (DESAIN.md 5.10).
// Siluetnya sudah putih dengan latar transparan, jadi warna latar biru malam di
// belakangnya tetap terlihat. Satu berkas sinar lampu menyapu 360 derajat yang
// keluar tepat dari puncak menara. Sinar & cincin hanya di Quality High.
export function Lighthouse({ showBeam = true, className = '' }) {
  // Titik lampu (lantern room) di citra: sekitar 5% dari tinggi gambar,
  // tepat di antara tiang antena (0-1.2%) dan atap galeri (dari 7%).
  const LAMP_TOP = '5%'

  return (
    <div aria-hidden="true" className={`pointer-events-none relative ${className}`}>
      {/* Sorotan sinar berputar: keluar dari lampu di puncak menara */}
      {showBeam && (
        <div
          className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ top: LAMP_TOP }}
        >
          {/* Wadah berputar: titik pangkal sinar tepat di lampu (h-0 w-0) */}
          <div
            className="relative h-0 w-0"
            style={{ animation: 'lh-sweep 8s linear infinite' }}
          >
            {/* Kerucut sinar lebar (halo) */}
            <div
              className="absolute bottom-0 left-1/2 h-[300px] w-[190px] -translate-x-1/2 origin-bottom"
              style={{
                clipPath: 'polygon(44% 100%, 56% 100%, 100% 0%, 0% 0%)',
                background:
                  'linear-gradient(to top, rgba(255,253,247,0.7) 0%, rgba(255,253,247,0.25) 40%, rgba(255,253,247,0) 100%)',
                filter: 'blur(6px)',
              }}
            />
            {/* Berkas inti yang lebih terang & tipis */}
            <div
              className="absolute bottom-0 left-1/2 h-[320px] w-[60px] -translate-x-1/2 origin-bottom"
              style={{
                clipPath: 'polygon(45% 100%, 55% 100%, 100% 0%, 0% 0%)',
                background:
                  'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,253,247,0.5) 45%, rgba(255,253,247,0) 100%)',
                filter: 'blur(2px)',
              }}
            />
          </div>
        </div>
      )}

      {/* Menara: siluet putih, latar gambarnya transparan */}
      <img
        src="/images/mercusuar-white.png"
        alt=""
        width="736"
        height="829"
        className="relative h-40 w-auto md:h-52"
        style={{
          filter:
            'drop-shadow(0 0 14px rgba(255, 253, 247, 0.45)) drop-shadow(0 8px 24px rgba(11, 60, 93, 0.5))',
        }}
      />

      {/* Cincin cahaya berdenyut dari lampu di puncak (Quality High) */}
      {showBeam && (
        <>
          <span
            className="absolute left-1/2 z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-foam/70"
            style={{ top: LAMP_TOP, animation: 'lh-ring 3.6s ease-out infinite' }}
          />
          <span
            className="absolute left-1/2 z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-foam/50"
            style={{ top: LAMP_TOP, animation: 'lh-ring 3.6s ease-out 1.2s infinite' }}
          />
        </>
      )}

      {/* Titik lampu terang di puncak */}
      {showBeam && (
        <span
          className="absolute left-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foam"
          style={{ top: LAMP_TOP, boxShadow: '0 0 12px 5px rgba(255,253,247,0.85)' }}
        />
      )}
    </div>
  )
}
