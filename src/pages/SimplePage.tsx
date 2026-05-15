export function SimplePage(props: { title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <main className="bg-surface">
      <div className="n-container py-12 sm:py-16">
        <div className="rounded-3xl bg-white p-6 ring-1 ring-muted sm:p-10">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            {props.title}
          </h1>
          {props.subtitle ? (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75 sm:text-base">
              {props.subtitle}
            </p>
          ) : null}
          {props.children ? <div className="mt-8">{props.children}</div> : null}
        </div>
      </div>
    </main>
  )
}

