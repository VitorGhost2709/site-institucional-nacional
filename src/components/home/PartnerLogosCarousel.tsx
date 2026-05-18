import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { partners } from '../../data/partners'

const AUTOPLAY_MS = 2800
const TRANSITION_MS = 500
const GAP_PX = 16 // gap-4

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

function useStepPx(
  viewportRef: React.RefObject<HTMLDivElement | null>,
  visibleCount: number,
) {
  const [stepPx, setStepPx] = useState(0)

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    const measure = () => {
      const width = el.clientWidth
      const cardWidth = (width - GAP_PX * (visibleCount - 1)) / visibleCount
      setStepPx(cardWidth + GAP_PX)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [visibleCount])

  return stepPx
}

export function PartnerLogosCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const visibleCount = useVisibleCount()
  const reducedMotion = usePrefersReducedMotion()
  const stepPx = useStepPx(viewportRef, visibleCount)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [slideOffset, setSlideOffset] = useState(0)
  const [enableTransition, setEnableTransition] = useState(true)

  const windowItems = useMemo(
    () =>
      Array.from({ length: visibleCount + 1 }, (_, i) =>
        partners[(currentIndex + i) % partners.length],
      ),
    [currentIndex, visibleCount],
  )

  const cardWidthCss = `calc((100% - ${(visibleCount - 1) * 1}rem) / ${visibleCount})`

  useEffect(() => {
    setCurrentIndex(0)
    setSlideOffset(0)
  }, [visibleCount])

  useEffect(() => {
    if (reducedMotion || paused || stepPx === 0 || slideOffset > 0) return

    const id = window.setInterval(() => {
      setEnableTransition(true)
      setSlideOffset(1)
    }, AUTOPLAY_MS)

    return () => window.clearInterval(id)
  }, [reducedMotion, paused, stepPx, slideOffset])

  const handleTransitionEnd = useCallback(() => {
    if (slideOffset === 0) return

    setEnableTransition(false)
    setSlideOffset(0)
    setCurrentIndex((i) => (i + 1) % partners.length)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => setEnableTransition(true))
    })
  }, [slideOffset])

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
      ref={viewportRef}
      className="mt-10 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Logos das empresas parceiras"
      aria-live="off"
    >
      <div
        className="flex gap-4"
        style={{
          transform: `translate3d(-${slideOffset * stepPx}px, 0, 0)`,
          transition:
            enableTransition && slideOffset > 0
              ? `transform ${TRANSITION_MS}ms ease-in-out`
              : 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {windowItems.map((partner, i) => (
          <div
            key={`${partner.name}-${(currentIndex + i) % partners.length}`}
            className="shrink-0"
            style={{ width: cardWidthCss }}
          >
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
