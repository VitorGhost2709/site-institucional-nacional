import { companies } from '../data/companies'

export default function EmpresasParceiras() {
  return (
    <main className="bg-surface">
      <div className="n-container py-12 sm:py-16">
        <header className="max-w-3xl">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Empresas Parceiras
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink/75 sm:text-base">
            Conheça algumas das marcas presentes na operação comercial da Nacional Distribuidora.
          </p>
        </header>

        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {companies.map((company) => (
            <li key={company.name} className="flex">
              <article className="flex h-full w-full flex-col rounded-2xl border border-muted bg-white p-5 shadow-[0_12px_28px_-24px_rgba(7,31,61,0.18)] sm:p-6">
                <div className="flex h-32 shrink-0 items-center justify-center px-1 sm:h-32 lg:h-36">
                  <img
                    src={company.logo}
                    alt={company.alt}
                    className="h-auto w-auto max-h-24 max-w-[90%] object-contain sm:max-h-28 lg:max-h-32"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <h2 className="mt-3 text-base font-extrabold tracking-tight text-primaryDark sm:text-lg">
                  {company.name}
                </h2>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/75">
                  {company.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
