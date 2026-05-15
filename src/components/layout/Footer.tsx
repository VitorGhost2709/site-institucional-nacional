import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { site } from '../../site/content'

import logo from '../../assets/nacional/logonacionalazulbranco.png'

const footerContactLink =
  'text-sm font-semibold text-ink/75 no-underline transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded-sm'

export function Footer() {
  return (
    <footer className="border-t border-muted bg-white">
      <div className="n-container py-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block transition-opacity hover:opacity-90">
              <img
                src={logo}
                alt="Nacional Distribuidora"
                className="h-16 w-auto sm:h-[4.5rem]"
                loading="lazy"
              />
            </Link>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/75">
              Distribuição voltada para o B2B, com atendimento próximo e foco em
              agilidade comercial. Estrutura preparada para apoiar o abastecimento
              de diferentes segmentos.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-12">
            <div className="lg:col-span-3">
              <div className="text-xs font-extrabold tracking-wide text-ink">
                Institucional
              </div>
              <ul className="mt-4 space-y-2 text-sm font-semibold text-ink/75">
                <li>
                  <Link className="hover:text-ink" to="/quem-somos">
                    Quem Somos
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-ink" to="/empresas-parceiras">
                    Empresas Parceiras
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-ink" to="/trabalhe-conosco">
                    Trabalhe Conosco
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-ink" to="/politica-de-privacidade">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>

            <div className="sm:col-span-1 lg:col-span-5">
              <div className="text-xs font-extrabold tracking-wide text-ink">
                Contato
              </div>
              <ul className="mt-4 space-y-3 text-sm font-semibold text-ink/75">
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <a
                    href={`tel:${site.contact.phoneTel}`}
                    className={footerContactLink}
                    aria-label="Ligar para a Nacional Distribuidora"
                  >
                    {site.contact.phone}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <a
                    href={site.contact.gmailComposeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${footerContactLink} whitespace-nowrap`}
                    aria-label="Enviar e-mail para a Nacional Distribuidora no Gmail"
                  >
                    {site.contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <a
                    href={site.contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerContactLink}
                    aria-label="Abrir endereço da Nacional Distribuidora no Google Maps"
                  >
                    {site.contact.address}
                  </a>
                </li>
              </ul>
            </div>

            <div className="sm:col-span-2 lg:col-span-4 lg:col-start-9">
              <div className="text-xs font-extrabold tracking-wide text-ink">
                Dados da empresa
              </div>
              <div className="mt-4 space-y-2 text-sm font-semibold text-ink/75">
                <div>{site.brand.legalName}</div>
                <div>
                  <span className="text-ink/60">CNPJ:</span> {site.contact.cnpj}
                </div>
                <div className="text-ink/60">{site.brand.domain}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-muted pt-6 text-xs font-semibold text-ink/60 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} {site.brand.name}. Todos os direitos reservados.</div>
          <div className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>Contagem/MG • Presença comercial</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

