import { Mail, MapPin, Phone } from 'lucide-react'
import { SimplePage } from './SimplePage'
import { site } from '../site/content'

const contactCardClass =
  'relative z-0 block min-w-0 rounded-2xl bg-surface p-5 ring-1 ring-muted transition duration-200 hover:z-20 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_36px_-28px_rgba(7,31,61,0.22)] hover:ring-primary/25'

const contactTextLinkClass =
  'text-sm font-semibold text-ink/75 no-underline transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded-sm'

export default function Contato() {
  return (
    <SimplePage
      title="Contato"
      subtitle="Entre em contato com a equipe comercial. Usamos dados provisórios nesta etapa — depois ajustamos para os canais oficiais."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className={contactCardClass}>
          <div className="flex items-center gap-2 text-sm font-extrabold text-ink">
            <Phone className="h-4 w-4 shrink-0 text-primary" /> Telefone
          </div>
          <p className="mt-2">
            <a
              href={`tel:${site.contact.phoneTel}`}
              className={contactTextLinkClass}
              aria-label="Ligar para a Nacional Distribuidora"
            >
              {site.contact.phone}
            </a>
          </p>
        </div>

        <div className={contactCardClass}>
          <div className="flex items-center gap-2 text-sm font-extrabold text-ink">
            <Mail className="h-4 w-4 shrink-0 text-primary" /> E-mail
          </div>
          <p className="mt-2">
            <a
              href={site.contact.gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${contactTextLinkClass} break-words leading-snug`}
              aria-label="Enviar e-mail para a Nacional Distribuidora no Gmail"
            >
              {site.contact.email}
            </a>
          </p>
        </div>

        <div className={contactCardClass}>
          <div className="flex items-center gap-2 text-sm font-extrabold text-ink">
            <MapPin className="h-4 w-4 shrink-0 text-primary" /> Endereço
          </div>
          <p className="mt-2">
            <a
              href={site.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${contactTextLinkClass} break-words leading-relaxed`}
              aria-label="Abrir endereço da Nacional Distribuidora no Google Maps"
            >
              {site.contact.address}
            </a>
          </p>
        </div>
      </div>
    </SimplePage>
  )
}
