import { ArrowRight, Boxes, CheckCircle2, ChevronDown, Handshake, Truck } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { OperationalGallery } from '../components/home/OperationalGallery'
import { PartnerLogosCarousel } from '../components/home/PartnerLogosCarousel'

import galpaofundo from '../assets/nacional/galpaofundo.jpeg'

function SectionTitle(props: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-2xl">
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

      {/* Quem somos */}
      <section id="quem-somos" className="scroll-mt-20 bg-surface">
        <div className="n-container py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <SectionTitle
                eyebrow="Quem somos"
                title="Uma distribuidora preparada para abastecer empresas."
                subtitle="Atuamos com foco em relacionamento B2B e consistência operacional. O objetivo é apoiar o abastecimento do seu negócio com atendimento direto, processos claros e responsabilidade comercial."
              />
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'Atendimento comercial com proximidade',
                  'Organização e clareza nos processos',
                  'Distribuição com foco em agilidade',
                  'Compromisso com continuidade e confiança',
                ].map((t) => (
                  <div
                    key={t}
                    className="flex items-start gap-2 rounded-2xl border border-muted bg-white p-4 shadow-[0_12px_28px_-24px_rgba(7,31,61,0.18)]"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <div className="text-sm font-semibold text-ink/80">{t}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <OperationalGallery />
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="bg-white">
        <div className="n-container py-14 sm:py-16">
          <SectionTitle
            eyebrow="Diferenciais"
            title="O que sustenta a operação no dia a dia."
            subtitle="Pilares práticos para uma rotina de distribuição comercial: atendimento, ritmo, mix e compromisso."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Atendimento próximo',
                desc: 'Contato direto e atenção comercial para apoiar sua compra.',
                icon: <Handshake className="h-5 w-5 text-primary" />,
                tag: 'Institucional',
              },
              {
                title: 'Agilidade na distribuição',
                desc: 'Processo pensado para reduzir atrito e manter o fluxo.',
                icon: <Truck className="h-5 w-5 text-primary" />,
                tag: 'Logística',
              },
              {
                title: 'Mix diversificado',
                desc: 'Alimentos, bebidas, embalagens e mercadorias em geral.',
                icon: <Boxes className="h-5 w-5 text-primary" />,
                tag: 'Atacado',
              },
              {
                title: 'Compromisso comercial',
                desc: 'Seriedade, consistência e foco na continuidade do relacionamento.',
                icon: <CheckCircle2 className="h-5 w-5 text-primary" />,
                tag: 'Confiança',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-3xl border border-muted bg-surface p-6 shadow-[0_16px_36px_-28px_rgba(7,31,61,0.22)] transition-shadow hover:shadow-[0_20px_40px_-26px_rgba(7,31,61,0.28)]"
              >
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-extrabold text-ink/70 ring-1 ring-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {card.tag}
                  </div>
                  <div className="rounded-2xl bg-white p-2 ring-1 ring-muted">{card.icon}</div>
                </div>
                <div className="mt-5 text-base font-extrabold tracking-tight text-ink">
                  {card.title}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atuação */}
      <section className="bg-muted/40">
        <div className="n-container py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <SectionTitle
                eyebrow="Atuação"
                title="Distribuição atacadista para o abastecimento B2B."
                subtitle="Com foco em mercadorias em geral — principalmente produtos alimentícios — atendemos negócios que precisam de regularidade, atendimento comercial e reposição com ritmo."
              />

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'Produtos alimentícios',
                  'Bebidas',
                  'Embalagens',
                  'Mercadorias em geral',
                ].map((s) => (
                  <div
                    key={s}
                    className="rounded-2xl border border-muted bg-white px-4 py-3 text-sm font-extrabold text-ink shadow-sm"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-primary/10 bg-white p-8 shadow-[0_20px_48px_-32px_rgba(7,31,61,0.2)]">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-xs font-extrabold tracking-wide text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Distribuição • Estoque • Entrega
                </div>
                <div className="mt-4 text-2xl font-extrabold tracking-tight text-ink">
                  Uma base preparada para manter o seu fluxo.
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">
                  Do estoque à entrega, a operação é organizada para reduzir atrito e manter
                  consistência comercial. Se o seu negócio precisa de reposição e presença, a
                  Nacional está pronta para apoiar.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: 'Ritmo', value: 'Agilidade' },
                    { label: 'Direção', value: 'Presença' },
                    { label: 'Entrega', value: 'Confiança' },
                  ].map((p) => (
                    <div key={p.label} className="rounded-2xl bg-surface p-4 ring-1 ring-muted">
                      <div className="text-[11px] font-extrabold tracking-wide text-ink/60">
                        {p.label}
                      </div>
                      <div className="mt-1 text-sm font-extrabold text-primaryDark">{p.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parceiros */}
      <section className="bg-white">
        <div className="n-container py-14 sm:py-16">
          <SectionTitle
            eyebrow="Empresas parceiras"
            title="Marcas que fortalecem nossa operação"
            subtitle="Trabalhamos com empresas parceiras reconhecidas para oferecer variedade, qualidade e confiança no abastecimento dos nossos clientes."
          />

          <PartnerLogosCarousel />
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-muted bg-surface">
        <div className="n-container py-14 sm:py-16">
          <div className="rounded-3xl border border-primary/10 bg-white p-8 shadow-[0_24px_56px_-36px_rgba(7,31,61,0.22)] sm:p-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-xs font-extrabold tracking-wide text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Contato comercial
              </div>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                Vamos conversar sobre abastecimento e distribuição?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75 sm:text-base">
                Fale com a equipe comercial e entenda como a Nacional pode apoiar o seu negócio com
                atendimento próximo e operação preparada.
              </p>
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0 lg:flex lg:justify-end">
              <Button as="link" to="/contato" variant="primary" className="rounded-full px-6 py-3">
                Entrar em contato <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
