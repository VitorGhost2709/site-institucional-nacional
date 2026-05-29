import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  Briefcase,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  Upload,
  User,
} from 'lucide-react'
import { site } from '../site/content'
import {
  sanitizePhoneInput,
  validateInternationalPhone,
} from '../utils/internationalPhone'

const POSITIONS = [
  'Administrativo',
  'Comercial',
  'Financeiro',
  'Fiscal',
  'Operacional',
  'Logística',
  'Motorista',
  'Ajudante',
  'Estoque',
  'Outro',
] as const

const AREAS = [
  'Comercial',
  'Administrativo',
  'Operacional',
  'Logística',
  'Estoque',
  'Financeiro/Fiscal',
] as const

const HOW_IT_WORKS = [
  'Envie seus dados',
  'Anexe seu currículo',
  'A equipe analisará as informações',
  'Caso exista oportunidade compatível, entraremos em contato',
] as const

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_EXT = /\.(pdf|doc|docx)$/i

const fieldClass =
  'mt-1.5 w-full rounded-xl border border-muted bg-white px-4 py-2.5 text-sm text-ink shadow-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/15'

const labelClass = 'block text-sm font-semibold text-primaryDark'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

type FormFields = {
  name: string
  phone: string
  email: string
  city: string
  position: string
  message: string
}

type FormErrors = Partial<Record<keyof FormFields | 'resume', string>>

function validateForm(fields: FormFields, resume: File | null): FormErrors {
  const errors: FormErrors = {}

  if (!fields.name.trim()) errors.name = 'Informe seu nome completo.'

  const phoneValidation = validateInternationalPhone(fields.phone)
  if (!phoneValidation.valid) {
    errors.phone = phoneValidation.message
  }

  if (!fields.email.trim()) {
    errors.email = 'Informe seu e-mail.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = 'Informe um e-mail válido.'
  }
  if (!fields.city.trim()) errors.city = 'Informe cidade e UF.'
  if (!fields.position) errors.position = 'Selecione um cargo de interesse.'
  if (!fields.message.trim()) errors.message = 'Escreva uma breve apresentação.'

  if (!resume) {
    errors.resume = 'Anexe seu currículo.'
  } else if (resume.size > MAX_FILE_SIZE) {
    errors.resume = 'O arquivo deve ter no máximo 5 MB.'
  } else if (!ALLOWED_EXT.test(resume.name)) {
    errors.resume = 'Use PDF, DOC ou DOCX.'
  }

  return errors
}

export default function TrabalheConosco() {
  const phoneInputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState<FormFields>({
    name: '',
    phone: '',
    email: '',
    city: '',
    position: '',
    message: '',
  })
  const [resume, setResume] = useState<File | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [state, setState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const updateField = (key: keyof FormFields, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handlePhoneChange = (value: string) => {
    updateField('phone', sanitizePhoneInput(value))
  }

  const handlePhoneBlur = () => {
    if (!form.phone.trim()) return
    const validation = validateInternationalPhone(form.phone)
    if (validation.valid && validation.formatted) {
      setForm((prev) => ({ ...prev, phone: validation.formatted! }))
    }
  }

  const handleFileChange = (file: File | undefined) => {
    if (!file) {
      setResume(null)
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setResume(null)
      setErrors((prev) => ({ ...prev, resume: 'O arquivo deve ter no máximo 5 MB.' }))
      return
    }

    if (!ALLOWED_EXT.test(file.name)) {
      setResume(null)
      setErrors((prev) => ({ ...prev, resume: 'Use PDF, DOC ou DOCX.' }))
      return
    }

    setResume(file)
    setErrors((prev) => ({ ...prev, resume: undefined }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validation = validateForm(form, resume)
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      setState('idle')
      if (validation.phone) {
        phoneInputRef.current?.focus()
      }
      return
    }

    const phoneValidation = validateInternationalPhone(form.phone)
    const phoneE164 = phoneValidation.e164 ?? form.phone.trim()

    setState('submitting')
    setErrorMessage('')

    const body = new FormData()
    body.append('name', form.name.trim())
    body.append('phone', phoneE164)
    body.append('email', form.email.trim())
    body.append('city', form.city.trim())
    body.append('position', form.position)
    body.append('message', form.message.trim())
    body.append('resume', resume!)

    try {
      const response = await fetch('/api/trabalhe-conosco', {
        method: 'POST',
        body,
      })

      const data = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        throw new Error(data?.error ?? 'Falha ao enviar.')
      }

      setState('success')
      setForm({
        name: '',
        phone: '',
        email: '',
        city: '',
        position: '',
        message: '',
      })
      setResume(null)
      setErrors({})
    } catch (err) {
      setState('error')
      setErrorMessage(
        err instanceof Error && err.message !== 'Falha ao enviar.'
          ? err.message
          : 'Não foi possível enviar sua candidatura no momento. Tente novamente ou entre em contato pelo e-mail administrativo@nacionaldistribuicao.com.br.',
      )
    }
  }

  return (
    <main className="bg-surface">
      <div className="n-container py-12 sm:py-16">
        <header className="max-w-3xl">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Trabalhe Conosco
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink/75 sm:text-base">
            Faça parte da Nacional Distribuidora. Envie suas informações e seu currículo para
            análise da nossa equipe.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
            Estamos sempre abertos a conhecer profissionais comprometidos, responsáveis e
            interessados em crescer junto com uma operação voltada ao abastecimento de empresas.
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-muted bg-white p-6 shadow-[0_12px_28px_-24px_rgba(7,31,61,0.18)] sm:p-8">
              <h2 className="text-lg font-extrabold text-primaryDark">Áreas de atuação</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {AREAS.map((area) => (
                  <li
                    key={area}
                    className="rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold text-primaryDark"
                  >
                    {area}
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 text-lg font-extrabold text-primaryDark">Como funciona</h2>
              <ol className="mt-4 space-y-3">
                {HOW_IT_WORKS.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm text-ink/75">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-white">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-muted bg-white p-6 shadow-[0_12px_28px_-24px_rgba(7,31,61,0.18)] sm:p-8">
              {state === 'success' ? (
                <div className="rounded-2xl border border-success/20 bg-success/5 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-success" aria-hidden />
                  <p className="mt-4 text-base font-semibold text-ink">
                    Currículo enviado com sucesso. Agradecemos seu interesse em fazer parte da{' '}
                    {site.brand.name}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="name" className={labelClass}>
                        Nome completo *
                      </label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60" />
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          className={`${fieldClass} pl-10`}
                        />
                      </div>
                      {errors.name ? (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.name}</p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Telefone / WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60" />
                        <input
                          ref={phoneInputRef}
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          inputMode="numeric"
                          value={form.phone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          onBlur={handlePhoneBlur}
                          placeholder="Digite com DDI, ex: +55 31 98765-4321"
                          aria-invalid={Boolean(errors.phone)}
                          className={`${fieldClass} pl-10 ${errors.phone ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''}`}
                        />
                      </div>
                      {errors.phone ? (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.phone}</p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClass}>
                        E-mail *
                      </label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className={`${fieldClass} pl-10`}
                        />
                      </div>
                      {errors.email ? (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.email}</p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="city" className={labelClass}>
                        Cidade/UF *
                      </label>
                      <div className="relative">
                        <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60" />
                        <input
                          id="city"
                          name="city"
                          type="text"
                          value={form.city}
                          onChange={(e) => updateField('city', e.target.value)}
                          className={`${fieldClass} pl-10`}
                          placeholder="Contagem/MG"
                        />
                      </div>
                      {errors.city ? (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.city}</p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="position" className={labelClass}>
                        Cargo de interesse *
                      </label>
                      <div className="relative">
                        <Briefcase className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60" />
                        <select
                          id="position"
                          name="position"
                          value={form.position}
                          onChange={(e) => updateField('position', e.target.value)}
                          className={`${fieldClass} pl-10`}
                        >
                          <option value="">Selecione</option>
                          {POSITIONS.map((position) => (
                            <option key={position} value={position}>
                              {position}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.position ? (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.position}</p>
                      ) : null}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="message" className={labelClass}>
                        Mensagem breve / apresentação *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={form.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        className={fieldClass}
                        placeholder="Conte um pouco sobre sua experiência e interesse."
                      />
                      {errors.message ? (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.message}</p>
                      ) : null}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="resume" className={labelClass}>
                        Currículo (PDF, DOC ou DOCX — máx. 5 MB) *
                      </label>
                      <label
                        htmlFor="resume"
                        className="mt-1.5 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-primary/25 bg-surface px-4 py-6 text-center transition hover:border-primary/40 hover:bg-white"
                      >
                        <Upload className="h-5 w-5 text-primary" aria-hidden />
                        <span className="mt-2 text-sm font-semibold text-primaryDark">
                          {resume ? resume.name : 'Clique para anexar seu currículo'}
                        </span>
                        <span className="mt-1 text-xs text-ink/60">PDF, DOC ou DOCX até 5 MB</span>
                        <input
                          id="resume"
                          name="resume"
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          className="sr-only"
                          onChange={(e) => handleFileChange(e.target.files?.[0])}
                        />
                      </label>
                      {errors.resume ? (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.resume}</p>
                      ) : null}
                    </div>
                  </div>

                  {state === 'error' ? (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {errorMessage}
                    </div>
                  ) : null}

                  <p className="text-xs leading-relaxed text-ink/65">
                    Ao enviar este formulário, você concorda que seus dados sejam utilizados pela{' '}
                    {site.brand.name} para análise de candidatura, conforme nossa{' '}
                    <Link
                      to="/politica-de-privacidade"
                      className="font-semibold text-primary underline-offset-2 hover:underline"
                    >
                      Política de Privacidade
                    </Link>
                    .
                  </p>

                  <button
                    type="submit"
                    disabled={state === 'submitting'}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    {state === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden />
                        Enviar candidatura
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
