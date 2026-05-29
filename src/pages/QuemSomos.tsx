import {
  ArrowRight,
  Boxes,
  Building2,
  CheckCircle2,
  Eye,
  Handshake,
  Package,
  Target,
  Truck,
  Users,
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { OperationalGallery, aboutOperationalSlides } from '../components/home/OperationalGallery'
import { site } from '../site/content'

import galpaofundo from '../assets/nacional/galpaofundo.jpeg'
import galpao2 from '../assets/nacional/galpao2comprodutos.png'
import galpao16 from '../assets/nacional/galpao16comprodutos.png'
import galpao17 from '../assets/nacional/galpao17comprodutos.png'

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

function InfoCard(props: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-muted bg-white p-5 shadow-[0_12px_28px_-24px_rgba(7,31,61,0.18)] sm:p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 text-primary">
        {props.icon}
      </div>
      <h3 className="mt-4 text-base font-extrabold text-primaryDark">{props.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/75">{props.description}</p>
    </div>
  )
}

const structureCards = [
  {
    icon: <Users className="h-5 w-5" />,
    title: 'Atendimento comercial próximo',
    description:
      'Relacionamento direto com clientes, com foco em clareza, confiança e continuidade no dia a dia comercial.',
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: 'Operação organizada',
    description:
      'Processos e rotinas voltados à distribuição com previsibilidade, organização e suporte ao abastecimento.',
  },
  {
    icon: <Package className="h-5 w-5" />,
    title: 'Mix diversificado',
    description:
      'Trabalho com marcas e categorias de diferentes segmentos, ampliando as possibilidades de atendimento.',
  },
  {
    icon: <Truck className="h-5 w-5" />,
    title: 'Presença no abastecimento',
    description:
      'Estrutura preparada para apoiar empresas e varejo com agilidade, consistência e presença comercial.',
  },
] as const

const howWeActCards = [
  {
    icon: <Handshake className="h-5 w-5" />,
    title: 'Relacionamento comercial',
    description:
      'Atuação próxima aos clientes, com foco em confiança, continuidade e atendimento claro.',
  },
  {
    icon: <Truck className="h-5 w-5" />,
    title: 'Distribuição com agilidade',
    description:
      'Operação orientada para apoiar o abastecimento com organização e ritmo comercial.',
  },
  {
    icon: <Boxes className="h-5 w-5" />,
    title: 'Mix de produtos',
    description:
      'Trabalho com marcas e categorias que ampliam as possibilidades de atendimento ao varejo e empresas.',
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: 'Compromisso operacional',
    description:
      'Estrutura voltada à consistência da entrega e ao suporte no dia a dia comercial.',
  },
] as const

const mvvCards = [
  {
    icon: <Target className="h-5 w-5" />,
    label: 'Missão',
    text: 'Apoiar o abastecimento de empresas com atendimento próximo, estrutura organizada e compromisso com a continuidade comercial.',
  },
  {
    icon: <Eye className="h-5 w-5" />,
    label: 'Visão',
    text: 'Ser reconhecida como uma distribuidora confiável, presente e preparada para contribuir com o abastecimento de diferentes negócios.',
  },
  {
    icon: <Handshake className="h-5 w-5" />,
    label: 'Valores',
    text: 'Relacionamento, compromisso, organização, confiança, consistência operacional e respeito aos clientes.',
  },
] as const

export default function QuemSomos() {
  const { name, city } = site.brand

  return (
    <main>
      {/* Hero interna */}
      <section className="relative overflow-hidden border-b border-muted bg-surface">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          aria-hidden
        >
          <img
            src={galpaofundo}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="n-container relative py-12 sm:py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-xs font-extrabold tracking-wide text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Institucional
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
                Quem Somos
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/75 sm:text-lg">
                Estrutura, atendimento e compromisso para apoiar o abastecimento de empresas com
                consistência e proximidade.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl shadow-[0_24px_56px_-36px_rgba(7,31,61,0.28)] ring-1 ring-muted">
                <img
                  src={galpaofundo}
                  alt="Estrutura operacional da Nacional Distribuidora"
                  className="aspect-[4/3] w-full object-cover object-center sm:aspect-[5/4]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre a Nacional */}
      <section className="bg-white">
        <div className="n-container py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <SectionTitle
                eyebrow="Sobre a Nacional"
                title="Distribuição com presença e compromisso comercial."
              />
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink/80 sm:text-base">
                <p>
                  A {name} atua no abastecimento de empresas com foco em relacionamento B2B,
                  atendimento próximo e consistência operacional. Com base em {city} e estrutura
                  voltada à distribuição, a empresa trabalha para atender com agilidade, organização
                  e compromisso diferentes perfis de clientes e demandas comerciais.
                </p>
                <p>
                  Mais do que entregar produtos, a Nacional busca construir relações de confiança,
                  mantendo uma operação orientada à continuidade do atendimento, ao suporte
                  comercial e à presença no dia a dia dos negócios atendidos.
                </p>
              </div>
            </div>
            <div className="lg:col-span-6">
              <OperationalGallery
                slides={aboutOperationalSlides}
                autoplayMs={4000}
                pauseOnHover
                frameClassName="relative h-[280px] overflow-hidden rounded-2xl bg-muted shadow-[0_24px_48px_-28px_rgba(7,31,61,0.28)] ring-1 ring-muted sm:h-[400px] lg:h-[420px]"
                ariaLabel="Fotos da estrutura operacional da Nacional Distribuidora"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nossa estrutura */}
      <section className="bg-surface">
        <div className="n-container py-14 sm:py-16">
          <SectionTitle
            eyebrow="Nossa estrutura"
            title="Base operacional para apoiar o abastecimento."
            subtitle="A estrutura da Nacional Distribuidora é orientada para apoiar o abastecimento com mais previsibilidade e consistência. A operação reúne organização comercial, suporte ao cliente e base operacional preparada para atender demandas com agilidade, mantendo o foco em continuidade, relacionamento e eficiência no atendimento."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {structureCards.map((card) => (
              <li key={card.title} className="flex">
                <InfoCard
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Como atuamos */}
      <section className="bg-white">
        <div className="n-container py-14 sm:py-16">
          <SectionTitle
            eyebrow="Como atuamos"
            title="Uma forma de trabalhar próxima ao cliente."
            subtitle="Combinamos relacionamento comercial, distribuição organizada e mix de produtos para apoiar diferentes necessidades de abastecimento."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {howWeActCards.map((card) => (
              <li key={card.title} className="flex">
                <InfoCard
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="bg-surface">
        <div className="n-container py-14 sm:py-16">
          <SectionTitle
            eyebrow="Missão, visão e valores"
            title="O que orienta a nossa atuação."
          />
          <ul className="mt-10 grid gap-4 lg:grid-cols-3">
            {mvvCards.map((card) => (
              <li key={card.label} className="flex">
                <article className="flex h-full w-full flex-col rounded-2xl border border-primary/10 bg-white p-6 shadow-[0_12px_28px_-24px_rgba(7,31,61,0.18)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                    {card.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold text-primaryDark">{card.label}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/75 sm:text-base">
                    {card.text}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Galeria visual */}
      <section className="bg-white">
        <div className="n-container py-14 sm:py-16">
          <SectionTitle
            eyebrow="Nossa operação"
            title="Estrutura que sustenta o dia a dia."
            subtitle="Conheça um pouco da base operacional e da organização que apoiam o abastecimento de empresas."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            <div className="overflow-hidden rounded-2xl ring-1 ring-muted lg:col-span-7">
              <img
                src={galpao2}
                alt="Estrutura de armazenagem da Nacional Distribuidora"
                className="aspect-[16/10] h-full w-full object-cover object-center sm:aspect-[16/11] lg:min-h-[320px] lg:aspect-auto"
                loading="lazy"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              <div className="overflow-hidden rounded-2xl ring-1 ring-muted">
                <img
                  src={galpao16}
                  alt="Produtos organizados no galpão da Nacional Distribuidora"
                  className="aspect-[4/3] w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-2xl ring-1 ring-muted">
                <img
                  src={galpao17}
                  alt="Operação logística preparada da Nacional Distribuidora"
                  className="aspect-[4/3] w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-muted bg-surface">
        <div className="n-container py-14 sm:py-16">
          <div className="rounded-3xl border border-primary/10 bg-white p-8 shadow-[0_24px_56px_-36px_rgba(7,31,61,0.22)] sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                Vamos conversar?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/75 sm:text-base">
                Se a sua empresa busca um atendimento próximo e uma operação voltada ao abastecimento
                com consistência, entre em contato com a {name}.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
              <Button as="link" to="/contato" className="rounded-full px-6 py-3">
                Entrar em contato <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                as="link"
                to="/empresas-parceiras"
                variant="secondary"
                className="rounded-full px-6 py-3"
              >
                Ver empresas parceiras
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
