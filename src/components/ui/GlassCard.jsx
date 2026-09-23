// Kartu kaca sesuai DESAIN.md 5.2.
// Varian 'frame' menambahkan 4 handle sudut seperti seleksi alat desain.
export function GlassCard({ variant = 'plain', className = '', children, ...props }) {
  const isFrame = variant === 'frame'
  return (
    <div
      className={`glass relative rounded-[var(--radius-card)] shadow-[var(--shadow-md)] ${
        isFrame ? 'rounded-[var(--radius-frame)]' : ''
      } ${className}`}
      {...props}
    >
      {isFrame && <FrameHandles />}
      {children}
    </div>
  )
}

// 4 titik kotak kecil 8px di keempat sudut (latar foam, border ocean).
export function FrameHandles() {
  const positions = [
    '-top-2 -left-2',
    '-top-2 -right-2',
    '-bottom-2 -left-2',
    '-bottom-2 -right-2',
  ]
  return (
    <>
      {positions.map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`pointer-events-none absolute ${pos} z-10 h-2 w-2 rounded-[2px] border border-ocean bg-foam`}
        />
      ))}
    </>
  )
}
