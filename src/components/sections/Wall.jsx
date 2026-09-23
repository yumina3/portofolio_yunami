import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { Send } from 'lucide-react'
import { GlassCard } from '../ui/GlassCard'
import { SectionTitle } from '../ui/SectionTitle'
import { Button } from '../ui/Button'
import { notes as seedNotes, formEndpoint, isFormConfigured } from '../../data/notes'
import { useQuality } from '../../hooks/useQuality'

// Section Wall (DESAIN.md 6.6). Form "Leave a note" + sticky note dari data.
// Note melayang pelan (Quality High), membesar & lurus saat hover (PRD A10).

const NOTE_BG = {
  sun: 'bg-sun',
  shallow: 'bg-shallow',
  foam: 'bg-foam',
  'coral-soft': 'bg-[#FFB9A6]',
}

export function Wall() {
  const { quality } = useQuality()
  const scope = useRef(null)
  const animationsOn = quality === 'high'
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [form, setForm] = useState({ name: '', message: '' })

  useGSAP(
    () => {
      if (!animationsOn) return
      const items = scope.current.querySelectorAll('[data-note]')
      items.forEach((note) => {
        const rot = Number(note.dataset.rot || 0)
        gsap.to(note, {
          y: gsap.utils.random(-8, -6),
          rotation: rot + gsap.utils.random(-1.5, 1.5),
          duration: gsap.utils.random(5, 8),
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: gsap.utils.random(0, 1.5),
        })
      })
    },
    { scope, dependencies: [animationsOn] }
  )

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) return

    // Endpoint Formspree belum diisi -> beri tahu dengan jelas, jangan error bisu.
    if (!isFormConfigured) {
      setStatus('not-configured')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      setForm({ name: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="wall" ref={scope} className="relative px-6 py-20 md:py-[120px]">
      <div className="mx-auto max-w-container">
        <div className="text-center">
          <SectionTitle>Wall of notes</SectionTitle>
          <p className="text-body mx-auto mt-3 max-w-prose text-[17px] leading-[1.65]">
            Short messages from people I have worked with. Leave one of your own.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Catatan tersebar: hanya di lajur kiri & kanan, jadi tidak pernah
              menumpuk form "Leave a note" di tengah (DESAIN.md 6.6). */}
          {seedNotes.length > 0 && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden lg:block"
            >
              {/* Lajur kiri */}
              <div className="absolute inset-y-0 left-0 w-[min(22rem,24%)]">
                {seedNotes
                  .filter((_, i) => i % 2 === 0)
                  .map((note, i) => (
                    <Note key={note.id} note={note} lane="left" index={i} />
                  ))}
              </div>
              {/* Lajur kanan */}
              <div className="absolute inset-y-0 right-0 w-[min(22rem,24%)]">
                {seedNotes
                  .filter((_, i) => i % 2 === 1)
                  .map((note, i) => (
                    <Note key={note.id} note={note} lane="right" index={i} />
                  ))}
              </div>
            </div>
          )}

          {/* Form di tengah */}
          <div className="relative z-10 mx-auto w-full max-w-md">
            <GlassCard className="p-6 md:p-8">
              <h3 className="text-[22px] font-bold text-ocean md:text-[28px]">Leave a note</h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-ocean/80">
                Sent straight to my inbox. Notes I love may appear on this wall.
              </p>

              <form onSubmit={onSubmit} className="mt-5 space-y-4">
                <div>
                  <label htmlFor="wall-name" className="text-[13px] font-medium text-ocean/80">
                    Your name
                  </label>
                  <input
                    id="wall-name"
                    name="name"
                    type="text"
                    required
                    maxLength={60}
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="mt-1 w-full rounded-[var(--radius-input)] border border-ocean/20 bg-foam px-4 py-3 text-[15px] text-ocean outline-none focus:border-turquoise"
                  />
                </div>

                <div>
                  <label htmlFor="wall-message" className="text-[13px] font-medium text-ocean/80">
                    Message
                  </label>
                  <textarea
                    id="wall-message"
                    name="message"
                    required
                    rows={4}
                    maxLength={280}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="mt-1 w-full resize-none rounded-[var(--radius-input)] border border-ocean/20 bg-foam px-4 py-3 text-[15px] text-ocean outline-none focus:border-turquoise"
                  />
                </div>

                {/* Honeypot anti-spam (PRD 8.3) */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <Button type="submit" variant="primary" disabled={status === 'sending'}>
                  <Send size={18} aria-hidden="true" />
                  {status === 'sending' ? 'Sending…' : 'Send note'}
                </Button>

                <p role="status" aria-live="polite" className="text-[13px] text-ocean/80">
                  {status === 'success' && 'Thanks. Your note is on its way.'}
                  {status === 'error' &&
                    'Message not sent. Check your connection and try again.'}
                  {status === 'not-configured' &&
                    'Sending is not set up yet. Add your Formspree endpoint to the .env file.'}
                </p>
              </form>
            </GlassCard>
          </div>

          {/* Catatan untuk layar kecil: grid di bawah form */}
          {seedNotes.length > 0 && (
            <ul className="mt-8 grid grid-cols-2 gap-4 lg:hidden">
              {seedNotes.map((note) => (
                <li key={note.id}>
                  <NoteStatic note={note} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

// Note absolut untuk desktop. Ditempatkan di dalam lajur kiri/kanan sehingga
// tidak pernah menumpuk form "Leave a note" di tengah.
function Note({ note, lane = 'left', index }) {
  // Posisi vertikal tersebar; horizontal selalu menempel ke tepi lajur.
  const topPositions = ['8%', '38%', '68%']
  const top = topPositions[index % topPositions.length]
  const pos = lane === 'right' ? { right: 0, top } : { left: 0, top }
  return (
    <div className="absolute" style={pos}>
      <div data-note data-rot={note.rotation} style={{ willChange: 'transform' }}>
        <NoteStatic note={note} />
      </div>
    </div>
  )
}

function NoteStatic({ note }) {
  return (
    <div
      className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:!rotate-0 hover:scale-105"
      style={{ transform: `rotate(${note.rotation}deg)` }}
    >
      <div
        className={`max-w-[240px] rounded-[var(--radius-note)] p-4 shadow-[var(--shadow-sm)] ${NOTE_BG[note.color] || NOTE_BG.sun}`}
      >
        <p className="text-[15px] leading-[1.55] text-ocean">{note.message}</p>
        <p className="mt-2 text-[13px] font-bold text-ocean/80">{note.name}</p>
      </div>
    </div>
  )
}
