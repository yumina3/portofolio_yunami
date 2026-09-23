import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, GitBranch } from 'lucide-react'
import { GlassCard } from '../components/ui/GlassCard'
import { Button } from '../components/ui/Button'
import { SmartImage } from '../components/ui/SmartImage'
import { WaveDivider } from '../components/effects/WaveDivider'
import { projects } from '../data/projects'

// Halaman detail project (PRD bagian 5). Berisi masalah, peran, solusi, hasil.
export function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  // Judul unik per halaman (PRD 8.3).
  useEffect(() => {
    if (!project) return
    const prev = document.title
    document.title = `${project.title} — yunami`
    return () => {
      document.title = prev
    }
  }, [project])

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <GlassCard className="max-w-md p-8 text-center">
          <h1 className="text-[28px] font-bold text-ocean">Project not found</h1>
          <p className="mt-3 text-[17px] leading-[1.65] text-ocean/80">
            That case study does not exist. It may have been renamed or removed.
          </p>
          <div className="mt-6 flex justify-center">
            <Button as={Link} to="/" variant="primary">
              Back to home
            </Button>
          </div>
        </GlassCard>
      </main>
    )
  }

  return (
    <main className="relative pb-32 pt-24">
      <div className="mx-auto max-w-container px-6">
        <Link
          to="/#projects"
          className="group inline-flex items-center gap-2 text-[15px] font-medium text-ocean"
        >
          <ArrowLeft size={18} aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-x-1" />
          Back to projects
        </Link>

        <header className="mt-8">
          <p className="text-sm font-medium text-ocean/70">
            {project.category} · {project.type} · {project.year}
          </p>
          <h1 className="mt-2 text-[36px] font-bold leading-[1.15] text-ocean md:text-[56px] md:leading-[1.1]">
            {project.title}
          </h1>
          <p className="mt-4 max-w-prose text-[17px] leading-[1.65] text-ocean/85">
            {project.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.demoUrl && (
              <Button as="a" variant="primary" href={project.demoUrl} target="_blank" rel="noreferrer">
                <ExternalLink size={18} aria-hidden="true" />
                Live demo
              </Button>
            )}
            {project.repoUrl && (
              <Button as="a" variant="secondary" href={project.repoUrl} target="_blank" rel="noreferrer">
                <GitBranch size={18} aria-hidden="true" />
                Source code
              </Button>
            )}
          </div>
        </header>

        <GlassCard variant="frame" className="mt-10 overflow-hidden p-3">
          <SmartImage
            base={project.thumbnail}
            alt={`Preview of ${project.title}`}
            className="aspect-[16/9] w-full bg-shallow object-cover"
          />
        </GlassCard>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            {[
              { h: 'The problem', p: project.problem },
              { h: 'My role', p: project.role },
              { h: 'What we built', p: project.solution },
              { h: 'The result', p: project.result },
            ].map((block) => (
              <section key={block.h}>
                <h2 className="text-[22px] font-bold text-ocean md:text-[28px]">{block.h}</h2>
                <p className="mt-3 max-w-prose text-[17px] leading-[1.65] text-ocean/85">
                  {block.p}
                </p>
              </section>
            ))}
          </div>

          <aside className="space-y-6">
            {project.scope?.length > 0 && (
              <GlassCard className="p-6">
                <h2 className="text-[15px] font-bold text-ocean">Scope</h2>
                <ul className="mt-3 space-y-2">
                  {project.scope.map((s) => (
                    <li key={s} className="flex gap-2 text-[15px] text-ocean/85">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                      {s}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            <GlassCard className="p-6">
              <h2 className="text-[15px] font-bold text-ocean">Stack</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span key={t} className="rounded-full bg-shallow px-3 py-1 text-[13px] font-medium text-ocean">
                    {t}
                  </span>
                ))}
              </div>
            </GlassCard>
          </aside>
        </div>

        {project.images?.length > 1 && (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {project.images.slice(1).map((src, i) => (
              <GlassCard key={src} className="overflow-hidden p-3">
                <SmartImage
                  base={src}
                  alt={`${project.title} screenshot ${i + 2}`}
                  loading="lazy"
                  className="aspect-[4/3] w-full bg-shallow object-cover"
                />
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      <div aria-hidden="true" className="mt-20">
        <WaveDivider fill="var(--shallow)" height={140} />
      </div>
    </main>
  )
}
