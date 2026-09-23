import { SmartImage } from '../ui/SmartImage'
import { SectionTitle } from '../ui/SectionTitle'
import { projects } from '../../data/projects'

// Ikon brand GitHub (lucide tidak menyediakan ikon brand).
function GithubIcon({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.42.36.79 1.08.79 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}

// Gelembung air kecil yang naik (dekoratif).
const BUBBLES = [
  { left: '8%', size: 14, dur: '10s', delay: '0s' },
  { left: '22%', size: 8, dur: '8s', delay: '1.4s' },
  { left: '46%', size: 18, dur: '12s', delay: '0.6s' },
  { left: '63%', size: 10, dur: '9s', delay: '2.2s' },
  { left: '80%', size: 6, dur: '7.5s', delay: '1s' },
  { left: '92%', size: 12, dur: '11s', delay: '3s' },
]

// Satu makhluk laut bergerak (dekoratif). `flip` membalik arah hadap.
function SeaCreature({ src, animation, className = '', style, flip = false }) {
  return (
    <span className={`absolute ${animation} ${className}`}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className={`w-full ${flip ? '-scale-x-100' : ''}`}
        style={style}
      />
    </span>
  )
}

// Dekorasi bawah laut: anemon bergerak + gelembung + mutiara + hewan laut.
function ReefDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Gradasi radial: terang di tengah, makin ke tepi makin gelap (#071E33 / Night).
          Dibatasi ~78% tinggi supaya area transisi bawah bisa di-blend terpisah. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_45%,#3E8FB0_0%,#1E5A7E_45%,#071E33_100%)]" />

      {/* Tail blend di dasar section: melebur dari navy ke biru laut, menyatu
          dengan ombak WaveTransition berikutnya (tidak ada hard cut). */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent via-[#0B3C5D]/55 to-[#2C7FA6]" />

      {/* Sinar lembut dari atas */}
      <div className="absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[#BFE6F5]/15 blur-3xl" />

      {/* Hewan laut: ubur-ubur & kuda laut (termasuk dekat header) */}
      {/* — sekitar header — */}
      <SeaCreature
        src="/images/jellyfish.png"
        animation="jelly-pulse"
        className="left-[10%] top-[2%] w-12 opacity-60 md:w-16"
      />
      <SeaCreature
        src="/images/seahorse.png"
        animation="seahorse-drift [animation-delay:1.2s]"
        className="right-[12%] top-[6%] w-11 opacity-70 md:w-16"
      />
      <SeaCreature
        src="/images/jellyfish.png"
        animation="jelly-pulse [animation-delay:2.6s]"
        className="right-[30%] top-[3%] w-9 opacity-50 md:w-12"
        flip
      />

      {/* — badan section — */}
      <SeaCreature
        src="/images/jellyfish.png"
        animation="jelly-pulse [animation-delay:0.4s]"
        className="left-[16%] top-[22%] w-16 opacity-70 md:w-24"
      />
      <SeaCreature
        src="/images/jellyfish.png"
        animation="jelly-pulse [animation-delay:1.8s]"
        className="right-[22%] top-[46%] w-12 opacity-55 md:w-16"
      />
      <SeaCreature
        src="/images/seahorse.png"
        animation="seahorse-drift [animation-delay:0.8s]"
        className="left-[6%] top-[36%] w-14 opacity-75 md:w-20"
      />
      <SeaCreature
        src="/images/seahorse.png"
        animation="seahorse-drift [animation-delay:2.4s]"
        className="right-[8%] top-[70%] w-10 opacity-60 md:w-14"
        flip
      />
      <SeaCreature
        src="/images/jellyfish.png"
        animation="jelly-pulse [animation-delay:3.4s]"
        className="left-[28%] top-[78%] w-10 opacity-50 md:w-14"
        flip
      />

      {/* Gelembung naik */}
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="bubble-rise absolute bottom-0 rounded-full bg-white/60 ring-1 ring-white/70"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            '--dur': b.dur,
            '--delay': b.delay,
          }}
        />
      ))}

      {/* Mutiara mengkilap */}
      <span className="pearl-glow absolute right-[14%] top-[22%] h-5 w-5 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#d9f0ff_45%,#9fc9d6)] shadow-[0_0_18px_4px_rgba(255,255,255,0.45)]" />
      <span className="pearl-glow absolute left-[10%] top-[58%] h-3.5 w-3.5 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#e6f7ff_45%,#9fc9d6)] shadow-[0_0_14px_3px_rgba(255,255,255,0.4)] [animation-delay:1.5s]" />

      {/* Anemon: gambar asli, diberi tint PINK + bergoyang seperti arus */}
      <img
        src="/images/anemon.png"
        alt=""
        className="anemone-sway absolute -bottom-6 left-[3%] w-32 opacity-80 mix-blend-luminosity md:w-44"
        style={{ filter: 'hue-rotate(300deg) saturate(2.2) brightness(1.15)' }}
      />
      <img
        src="/images/anemon.png"
        alt=""
        className="anemone-sway anemone-sway--alt absolute -bottom-8 right-[4%] w-24 opacity-70 mix-blend-luminosity md:w-36"
        style={{ filter: 'hue-rotate(315deg) saturate(2) brightness(1.2)' }}
      />
    </div>
  )
}

// Section Project (DESAIN.md 6.5). Kartu besar 2 kolom (zigzag):
// gambar full-bleed di satu sisi, konten di sisi lain.
export function Projects() {
  return (
    <section id="projects" className="relative isolate overflow-hidden px-6 py-20 md:py-[120px]">
      {/* Latar bergradasi biru + anemon/gelembung/mutiara */}
      <ReefDecor />

      <div className="relative mx-auto max-w-container">
        {/* Heading section: tetap seperti semula */}
        <div className="text-center">
          <SectionTitle>My Portfolio</SectionTitle>
          <p className="text-body mx-auto mt-3 max-w-prose text-[17px] leading-[1.65]">
            Projects, each with the problem, my role, and what changed as a result.
          </p>
        </div>

        <ul className="mt-16 space-y-9 md:space-y-12">
          {projects.map((project, i) => {
            const imageRight = i % 2 === 1
            return (
              <li key={project.id}>
                <article className="group relative mx-auto w-full max-w-4xl overflow-hidden rounded-[22px] bg-gradient-to-br from-[#0B3C5D] to-[#071E33] shadow-[0_18px_44px_-22px_rgba(7,30,51,0.7)] ring-1 ring-white/5">
                  {/* Glow halus di TENGAH card (area transisi gambar ↔ konten),
                      bukan menumpuk di salah satu pinggir. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-turquoise/10 blur-3xl"
                  />

                  <div
                    className={`relative grid grid-cols-1 lg:grid-cols-2 ${
                      imageRight ? 'lg:[&>*:first-child]:order-2' : ''
                    }`}
                  >
                    {/* Gambar: contain (tidak crop berlebihan), dikelilingi latar gelap.
                         Full-bleed ke pinggir card; radius luar ikut card.
                         Klik gambar -> langsung buka web project (demoUrl). */}
                    {(() => {
                      const ImageTag = project.demoUrl ? 'a' : 'div'
                      const imageProps = project.demoUrl
                        ? {
                            href: project.demoUrl,
                            target: '_blank',
                            rel: 'noreferrer',
                            'aria-label': `Open ${project.title} live site`,
                            title: `Open ${project.title} live site`,
                          }
                        : {}
                      return (
                        <ImageTag
                          {...imageProps}
                          className={`group/img relative block min-h-[200px] overflow-hidden bg-[#08283f] p-4 md:p-6 lg:min-h-[300px] ${
                            project.demoUrl ? 'cursor-pointer' : ''
                          }`}
                        >
                          <SmartImage
                            base={project.thumbnail}
                            alt={`Preview of ${project.title}`}
                            loading="lazy"
                            className="h-full w-full object-contain object-center transition-transform duration-500 ease-out group-hover/img:scale-[1.02]"
                          />
                          {/* Overlay tipis agar menyatu: mobile -> dari bawah; desktop -> dari sisi konten. */}
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-t from-[#071E33]/70 to-transparent lg:hidden"
                          />
                          <div
                            aria-hidden="true"
                            className={`absolute inset-0 hidden lg:block ${
                              imageRight
                                ? 'bg-gradient-to-l from-[#0B3C5D]/55 to-transparent'
                                : 'bg-gradient-to-r from-[#0B3C5D]/55 to-transparent'
                            }`}
                          />
                        </ImageTag>
                      )
                    })()}

                    {/* Konten teks */}
                    <div className="relative flex flex-col justify-center p-6 md:p-8 lg:p-9">
                      {/* Badge kategori (kuning) + tahun */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center rounded-full border border-sun/70 bg-sun/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-sun">
                          {project.category}
                        </span>
                        <span className="text-[13px] font-medium text-[#9fc9d6]">{project.year}</span>
                      </div>

                      {project.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          title={`Open ${project.title} live site`}
                          className="mt-4 inline-block text-[23px] font-bold leading-tight text-white transition-colors duration-300 hover:text-sun md:text-[28px]"
                        >
                          {project.title}
                        </a>
                      ) : (
                        <h3 className="mt-4 text-[23px] font-bold leading-tight text-white md:text-[28px]">
                          {project.title}
                        </h3>
                      )}

                      <p className="mt-3 max-w-prose text-[16px] leading-[1.7] text-[#c7dbe6]/80 md:text-[17px]">
                        {project.summary}
                      </p>

                      {/* Tech stack pills */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-white/[0.07] px-3 py-1 text-[13px] font-medium text-white/90"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Tombol GitHub (ghost). Web-nya dibuka lewat klik gambar. */}
                      {project.repoUrl && (
                        <div className="mt-7 flex flex-wrap gap-3">
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 text-[14px] font-medium text-white/90 transition-colors duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white"
                          >
                            <GithubIcon size={18} />
                            GitHub
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
