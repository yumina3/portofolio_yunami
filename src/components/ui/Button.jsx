import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useQuality } from '../../hooks/useQuality'

// Tombol sesuai DESAIN.md 5.4.
// Varian: primary (coral) | secondary (outline ocean) | night (outline turquoise di malam).
// Hover: teks bergulir ke atas, digantikan salinan (dua lapis teks).
export function Button({
  as: Tag = 'button',
  variant = 'primary',
  className = '',
  children,
  magnetic = false,
  ...props
}) {
  const rootRef = useRef(null)
  const { quality } = useQuality()

  const variants = {
    primary: 'bg-coral text-ocean',
    secondary: 'bg-transparent text-ocean border-2 border-ocean',
    night: 'bg-transparent text-foam border-2 border-turquoise shadow-[0_0_24px_rgba(46,196,182,0.35)]',
  }

  // Efek magnetik (desktop, Quality High) sesuai DESAIN.md 5.4 / 8.5.
  useGSAP(
    () => {
      if (!magnetic || quality !== 'high') return
      const el = rootRef.current
      if (!el || !window.matchMedia('(pointer: fine)').matches) return

      const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })

      const onMove = (e) => {
        const r = el.getBoundingClientRect()
        xTo((e.clientX - (r.left + r.width / 2)) * 0.25)
        yTo((e.clientY - (r.top + r.height / 2)) * 0.35)
      }
      const onLeave = () => {
        xTo(0)
        yTo(0)
      }
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)
      return () => {
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', onLeave)
      }
    },
    { dependencies: [magnetic, quality], scope: rootRef }
  )

  return (
    <Tag
      ref={rootRef}
      className={`group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-7 text-[15px] font-medium transition-transform duration-200 will-change-transform focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="flex items-center gap-2 transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[140%]">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center gap-2 translate-y-[140%] transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </Tag>
  )
}
