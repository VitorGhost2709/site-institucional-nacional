import { useEffect, useMemo, useState } from 'react'
import { partners } from '../../data/partners'

const INTERVAL_MS = 2800
const PARTNER_COUNT = partners.length

function useVisibleCount() {
  const [count, setCount] = useState(2)

  useEffect(() => {
    const lg = window.matchMedia('(min-width: 1024px)')
    const md = window.matchMedia('(min-width: 768px)')
    const update = () => {
      if (lg.matches) setCount(6)
      else if (md.matches) setCount(4)
      else setCount(2)
    }
    update()
    lg.addEventListener('change', update)
    md.addEventListener('change', update)
    return () => {
      lg.removeEventListener('change', update)
      md.removeEventListener('change', update)
    }
  }, [])

  return count
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduced
}

export function PartnerLogosCarousel() {
  const visibleCount = useVisibleCount()
  const reducedMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)

  const loop = useMemo(() => [...partners, ...partners], [])

  useEffect(() => {
    setIndex(0)
    setAnimate(true)
  }, [visibleCount])

  useEffect(() => {
    if (reducedMotion || paused) return

    const id = window.setInterval(() => {
      setIndex((current) => current + 1)
    }, INTERVAL_MS)

    return () => window.clearInterval(id)
  }, [reducedMotion, paused])

  const handleTransitionEnd = () => {
    if (index >= PARTNER_COUNT) {
      setAnimate(false)
      setIndex(0)
      requestAnimationFrame(() => setAnimate(true))
    }
  }

  const shiftPercent = (index * 100) / loop.length

  if (reducedMotion) {
    return (
      <div
        className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6"
        aria-label="Logos das empresas parceiras"
      >
        {partners.map((partner) => (
          <PartnerLogoCard key={partner.name} partner={partner} />
        ))}
      </div>
    )
  }

  return (
    <div
      className="mt-10 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Logos das empresas parceiras"
    >
      <div
        className={`flex ${animate ? 'transition-transform duration-500 ease-in-out' : ''}`}
        style={{ transform: `translateX(-${shiftPercent}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {loop.map((partner, i) => (
          <div key={`${partner.name}-${i}`} className="w-1/2 shrink-0 px-2 md:w-1/4 lg:w-1/6">
            <PartnerLogoCard partner={partner} />
          </div>
        ))}
      </div>
    </div>
  )
}

function PartnerLogoCard({ partner }: { partner: (typeof partners)[number] }) {
  return (
    <div className="flex h-24 items-center justify-center rounded-2xl border border-muted bg-white px-4 py-3 shadow-[0_12px_28px_-24px_rgba(7,31,61,0.18)] sm:h-28">
      <img
        src={partner.logo}
        alt={partner.alt}
        className="max-h-12 max-w-[140px] object-contain sm:max-h-[4.5rem]"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}
