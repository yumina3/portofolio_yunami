import { Mail } from 'lucide-react'
import { socials as socialLinks } from '../../data/profile'

// Icon brand inline (lucide tidak menyediakan ikon brand).
const socialIcons = {
  GitHub: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.42.36.79 1.08.79 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  ),
  LinkedIn: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  ),
  WhatsApp: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15c-1.53 0-3.03-.41-4.34-1.19l-.31-.18-3.12.82.83-3.04-.2-.32a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.25-8.24 8.25Z" />
    </svg>
  ),
  Default: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
}
import { SectionTitle } from '../ui/SectionTitle'
import { Lighthouse } from '../effects/Lighthouse'
import { profile } from '../../data/profile'
import { useQuality } from '../../hooks/useQuality'

// Section Kontak (DESAIN.md 6.7). Latar malam, mercusuar.
export function Contact() {
  const { quality } = useQuality()
  const showAtmosphere = quality === 'high'

  return (
    <section id="contact" className="on-night relative overflow-hidden px-6 pb-40 pt-40 md:pt-[220px]">
      <div className="relative z-10 mx-auto max-w-container text-center">
        {/* Mercusuar sebagai elemen utama di atas judul; sinar berputar saat Quality High. */}
        <div className="mb-10 flex justify-center">
          <Lighthouse showBeam={showAtmosphere} />
        </div>

        <SectionTitle>Let us work together</SectionTitle>
        <p className="text-body-on-dark mx-auto mt-4 max-w-prose text-[17px] leading-[1.65]">
          I am looking for an internship where I can learn from a real team and ship things
          people use. If that sounds like your team, say hello.
        </p>

        {/* Footer */}
        <footer className="mt-20 border-t border-foam/15 pt-8">
          <ul className="flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-foam/20 bg-foam/5 text-foam/85 transition hover:border-turquoise hover:bg-turquoise/10 hover:text-turquoise focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise"
                >
                  {(() => {
                    const Icon = socialIcons[s.label] ?? socialIcons.Default
                    return <Icon className="h-5 w-5" />
                  })()}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${profile.email}`}
                aria-label={`Email ${profile.email}`}
                title={profile.email}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-foam/20 bg-foam/5 text-foam/85 transition hover:border-turquoise hover:bg-turquoise/10 hover:text-turquoise focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
              </a>
            </li>
          </ul>
          <p className="mt-6 text-[13px] text-foam/60">
            © {new Date().getFullYear()} {profile.name}. Driven by data, guided by strategy.
          </p>
        </footer>
      </div>
    </section>
  )
}
