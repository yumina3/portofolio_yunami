import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { GlassCard } from '../components/ui/GlassCard'
import { WaveDivider } from '../components/effects/WaveDivider'

// Halaman 404 (PRD bagian 5).
export function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <GlassCard variant="frame" className="max-w-md p-8 md:p-12">
        <p className="font-script text-[64px] leading-none text-ocean md:text-[96px]">404</p>
        <h1 className="mt-2 text-[28px] font-bold text-ocean">This shore is empty</h1>
        <p className="mt-3 text-[17px] leading-[1.65] text-ocean/80">
          The page you were looking for has drifted away. Let us head back to the beach.
        </p>
        <div className="mt-6 flex justify-center">
          <Button as={Link} to="/" variant="primary">
            Back to home
          </Button>
        </div>
      </GlassCard>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0">
        <WaveDivider fill="var(--shallow)" height={140} />
      </div>
    </main>
  )
}
