import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import galpao2 from '../../assets/nacional/galpao2comprodutos.png'
import galpao16 from '../../assets/nacional/galpao16comprodutos.png'
import galpao17 from '../../assets/nacional/galpao17comprodutos.png'

export type OperationalSlide = {
  src: string
  caption: string
  alt: string
  objectPosition?: string
}

export const defaultOperationalSlides: OperationalSlide[] = [
  {
    src: galpao2,
    caption: 'Estrutura de armazenagem',
    alt: 'Galpão da Nacional com estrutura de armazenagem',
  },
  {
    src: galpao16,
    caption: 'Produtos organizados',
    alt: 'Produtos organizados no galpão da Nacional Distribuidora',
  },
  {
    src: galpao17,
    caption: 'Operação preparada',
    alt: 'Operação logística preparada da Nacional Distribuidora',
  },
]

export const aboutOperationalSlides: OperationalSlide[] = [
  {
    src: galpao2,
    caption: 'Estrutura operacional',
    alt: 'Galpão da Nacional Distribuidora com estrutura de armazenagem',
    objectPosition: 'center',
  },
  {
    src: galpao16,
    caption: 'Produtos organizados',
    alt: 'Produtos organizados no galpão da Nacional Distribuidora',
    objectPosition: 'center',
  },
  {
    src: galpao17,
    caption: 'Galpão e abastecimento',
    alt: 'Operação logística preparada da Nacional Distribuidora',
    objectPosition: 'center',
  },
]

const arrowClass =
  'absolute top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/80 text-primaryDark shadow-[0_8px_20px_-10px_rgba(7,31,61,0.45)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:h-10 sm:w-10'

type OperationalGalleryProps = {
  slides?: OperationalSlide[]
  autoplayMs?: number
  pauseOnHover?: boolean
  frameClassName?: string
  ariaLabel?: string
}

export function OperationalGallery({
  slides = defaultOperationalSlides,
  autoplayMs = 5500,
  pauseOnHover = false,
  frameClassName = 'relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted shadow-[0_24px_48px_-28px_rgba(7,31,61,0.28)] ring-1 ring-muted sm:aspect-[16/11]',
  ariaLabel = 'Galeria da operação da Nacional Distribuidora',
}: OperationalGalleryProps) {
  const slideCount = slides.length
  const [index, setIndex] = useState(0)
  const [autoplayEpoch, setAutoplayEpoch] = useState(0)
  const [paused, setPaused] = useState(false)

  const resetAutoplay = useCallback(() => {
    setAutoplayEpoch((epoch) => epoch + 1)
  }, [])

  const goTo = useCallback(
    (nextIndex: number) => {
      setIndex(((nextIndex % slideCount) + slideCount) % slideCount)
      resetAutoplay()
    },
    [resetAutoplay, slideCount],
  )

  const goNext = useCallback(() => {
    setIndex((current) => (current + 1) % slideCount)
    resetAutoplay()
  }, [resetAutoplay, slideCount])

  const goPrev = useCallback(() => {
    setIndex((current) => (current - 1 + slideCount) % slideCount)
    resetAutoplay()
  }, [resetAutoplay, slideCount])

  useEffect(() => {
    if (pauseOnHover && paused) return

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slideCount)
    }, autoplayMs)

    return () => window.clearInterval(id)
  }, [autoplayEpoch, autoplayMs, pauseOnHover, paused, slideCount])

  return (
    <div
      className="relative w-full"
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
    >
      <div className={frameClassName}>
        {slides.map((slide, i) => (
          <img
            key={slide.caption}
            src={slide.src}
            alt={slide.alt}
            style={slide.objectPosition ? { objectPosition: slide.objectPosition } : undefined}
            className={[
              'absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out',
              i === index ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            aria-hidden={i !== index}
          />
        ))}

        <button
          type="button"
          onClick={goPrev}
          className={`${arrowClass} left-2 sm:left-3`}
          aria-label="Imagem anterior"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.25} />
        </button>

        <button
          type="button"
          onClick={goNext}
          className={`${arrowClass} right-2 sm:right-3`}
          aria-label="Próxima imagem"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.25} />
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-primaryDark/85 via-primaryDark/35 to-transparent px-5 pb-5 pt-16 sm:px-6 sm:pb-6">
          <p className="text-sm font-extrabold tracking-tight text-white sm:text-base" aria-live="polite">
            {slides[index].caption}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label="Selecionar foto da galeria">
        {slides.map((slide, i) => (
          <button
            key={slide.caption}
            type="button"
            role="tab"
            aria-selected={i === index}
            onClick={() => goTo(i)}
            className={[
              'h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2',
              i === index ? 'w-7 bg-primary' : 'w-2 bg-primary/25 hover:bg-primary/40',
            ].join(' ')}
            aria-label={`Ver foto: ${slide.caption}`}
          />
        ))}
      </div>
    </div>
  )
}
