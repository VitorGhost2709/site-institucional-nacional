import { ArrowRight, Building2, ChevronDown, Handshake, MapPin, Target, Users } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { PartnerLogosCarousel } from '../components/home/PartnerLogosCarousel'

import galpaofundo from '../assets/nacional/galpaofundo.jpeg'

function SectionTitle(props: {
  eyebrow?: string
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <div className={props.className ?? 'max-w-2xl'}>
      {props.eyebrow ? (
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-xs font-extrabold tracking-wide text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {props.eyebrow}
        </div>
      ) : null}
      <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        {props.title}
      </h2>
      {props.subtitle ? (
        <p className="mt-3 text-sm leading-relaxed text-ink/75 sm:text-base">
          {props.subtitle}
        </p>
      ) : null}
    </div>
  )
}

function ScrollIndicator() {
  return (
    <a
      href="#quem-somos"
      className="hero-scroll-hint group absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-primaryDark/70 transition-colors hover:text-primaryDark sm:bottom-8"
      aria-label="Role para conhecer a Nacional Distribuidora"
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primaryDark/55 group-hover:text-primaryDark/80">
        Role para conhecer
      </span>
      <span className="flex h-9 w-6 items-start justify-center rounded-full border border-primaryDark/35 pt-1.5">
        <span className="h-1.5 w-1 rounded-full bg-primaryDark/70" />
      </span>
      <ChevronDown className="h-5 w-5" strokeWidth={2.25} />
    </a>
  )
}

const structureHighlights = [
  { icon: Handshake, label: 'Atendimento próximo' },
  { icon: Building2, label: 'Organização operacional' },
  { icon: Users, label: 'Presença comercial' },
] as const

const aboutHighlights = [
  { icon: MapPin, label: 'Base em Contagem/MG' },
  { icon: Target, label: 'Foco B2B' },
  { icon: Building2, label: 'Operação voltada ao abastecimento' },
] as const

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative isolate min-h-[calc(100svh-4.25rem)] overflow-hidden text-white sm:min-h-[calc(100svh-4.75rem)]">
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          <img
            src={galpaofundo}
            alt=""
            className="h-full w-full scale-[1.03] object-cover object-center blur-[3px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primaryDark/40 via-primaryDark/12 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primaryDark/35 via-transparent to-white/[0.06]" />
        </div>

        <div className="n-container relative flex min-h-[calc(100svh-4.25rem)] flex-col justify-center py-10 pb-24 sm:min-h-[calc(100svh-4.75rem)] sm:py-12 sm:pb-28 lg:py-14">
          <div className="relative max-w-4xl">
            <div className="w-full rounded-[1.75rem] border border-white/12 bg-primaryDark/70 p-6 shadow-[0_28px_64px_-32px_rgba(7,31,61,0.65)] backdrop-blur-md sm:rounded-[2rem] sm:p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3 py-1 text-xs font-extrabold tracking-wide text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Distribuição • Atacado • Presença comercial
              </div>

              <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Distribuição com presença, agilidade e confiança.
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/92 sm:text-base">
                A Nacional Distribuidora atua no abastecimento de empresas com soluções
                comerciais ágeis, atendimento próximo e estrutura preparada para atender
                diferentes segmentos.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  as="link"
                  to="/contato"
                  variant="secondary"
                  className="rounded-full px-6 py-3 shadow-[0_12px_28px_-18px_rgba(7,31,61,0.45)] focus-visible:ring-offset-surface"
                >
                  Entrar em contato <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  as="link"
                  to="/quem-somos"
                  variant="ghost"
                  className="rounded-full border-white/45 bg-white/10 px-6 py-3 text-white hover:border-white/65 hover:bg-white/15 focus-visible:ring-offset-primaryDark"
                >
                  Conheça a Nacional
                </Button>
              </div>

              <div className="mt-12 grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Atendimento comercial', value: 'Próximo e direto' },
                  { label: 'Distribuição', value: 'Agilidade no abastecimento' },
                  { label: 'Operação', value: 'Foco em consistência' },
                ].map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-2xl border border-white/15 bg-primaryDark/55 px-4 py-4 shadow-sm backdrop-blur-sm"
                  >
                    <div className="text-[11px] font-extrabold tracking-wide text-white/80">
                      {kpi.label}
                    </div>
                    <div className="mt-1 text-sm font-extrabold text-white">{kpi.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ScrollIndicator />
      </section>

      {/* Resumo Quem somos */}
      <section id="quem-somos" className="scroll-mt-20 bg-surface">
        <div className="n-container py-12 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-7">
              <SectionTitle
                eyebrow="Quem somos"
                title="Distribuidora com foco em abastecimento B2B."
                className="max-w-none"
              />
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/80 sm:text-base">
                A Nacional Distribuidora atua no abastecimento de empresas com foco em relacionamento
                B2B, atendimento próximo e consistência operacional. Com base em Contagem/MG, mantém uma
                operação voltada à organização, agilidade e suporte comercial.
              </p>
              <div className="mt-6">
                <Button as="link" to="/quem-somos" className="rounded-full px-6 py-3">
                  Conheça a Nacional <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
              {aboutHighlights.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-muted bg-white px-4 py-3.5 shadow-[0_12px_28px_-24px_rgba(7,31,61,0.18)]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-sm font-semibold text-primaryDark">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Chamada estrutura */}
      <section className="bg-white">
        <div className="n-container py-12 sm:py-14">
          <div className="w-full rounded-3xl border border-primary/10 bg-primary/[0.06] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-xs font-extrabold tracking-wide text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Estrutura
                </div>
                <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  Estrutura pensada para atender empresas.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/75 sm:text-base">
                  A Nacional Distribuidora reúne atendimento próximo, organização operacional e presença
                  comercial para apoiar o abastecimento de diferentes negócios.
                </p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {structureHighlights.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-white/80 px-4 py-3.5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="text-sm font-semibold text-primaryDark">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Empresas parceiras */}
      <section className="bg-white">
        <div className="n-container py-12 sm:py-14">
          <SectionTitle
            eyebrow="Empresas parceiras"
            title="Marcas que fortalecem nossa operação"
            subtitle="Trabalhamos com empresas reconhecidas para ampliar variedade e confiança no abastecimento."
          />

          <PartnerLogosCarousel />

          <div className="mt-8 flex justify-center sm:justify-start">
            <Button
              as="link"
              to="/empresas-parceiras"
              variant="secondary"
              className="rounded-full px-6 py-3"
            >
              Ver todas as empresas <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-muted bg-surface">
        <div className="n-container py-12 sm:py-14">
          <div className="rounded-3xl border border-primary/10 bg-white p-8 shadow-[0_24px_56px_-36px_rgba(7,31,61,0.22)] sm:p-10 lg:flex lg:w-full lg:items-center lg:justify-between lg:gap-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                Precisa abastecer sua empresa com mais organização e proximidade comercial?
              </h2>
            </div>
            <div className="mt-6 shrink-0 lg:mt-0">
              <Button as="link" to="/contato" className="rounded-full px-6 py-3">
                Entrar em contato <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
