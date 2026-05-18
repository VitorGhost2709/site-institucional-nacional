import { ExternalLink, Navigation } from 'lucide-react'
import { site } from '../../site/content'

const mapButtonBase =
  'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2'

export function ContactMap() {
  const { address, mapsUrl, mapsEmbedUrl, mapsDirectionsUrl } = site.contact

  return (
    <article className="mt-8 rounded-2xl border border-muted bg-white p-5 shadow-[0_12px_28px_-24px_rgba(7,31,61,0.18)] sm:p-6">
      <p className="text-xs font-extrabold uppercase tracking-wide text-primary">Mapa</p>
      <p className="mt-2 text-sm font-semibold leading-relaxed text-ink sm:text-base">
        {address}
      </p>

      <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-muted">
        <iframe
          title="Mapa da Nacional Distribuidora"
          src={mapsEmbedUrl}
          className="block h-[320px] w-full border-0 sm:h-[420px] lg:h-[480px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir endereço da Nacional Distribuidora no Google Maps"
          className={`${mapButtonBase} bg-primary text-white hover:bg-primaryDark`}
        >
          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
          Abrir no Google Maps
        </a>
        <a
          href={mapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir rota até a Nacional Distribuidora no Google Maps"
          className={`${mapButtonBase} border border-primary/25 bg-surface text-primaryDark hover:bg-white hover:ring-1 hover:ring-primary/20`}
        >
          <Navigation className="h-4 w-4 shrink-0" aria-hidden />
          Abrir rota no Google Maps
        </a>
      </div>
    </article>
  )
}
