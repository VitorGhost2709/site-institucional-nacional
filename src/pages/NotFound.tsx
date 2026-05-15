import { ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/Button'

export default function NotFound() {
  return (
    <main className="bg-surface">
      <div className="n-container py-16">
        <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-muted sm:p-12">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-extrabold tracking-wide text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            404
          </div>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Página não encontrada
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink/75 sm:text-base">
            O endereço que você tentou acessar não existe ou foi movido.
          </p>
          <div className="mt-8 flex justify-center">
            <Button as="link" to="/" variant="secondary" className="px-6 py-3">
              <ArrowLeft className="h-4 w-4" /> Voltar para a Home
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

