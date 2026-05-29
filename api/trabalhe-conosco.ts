import { Resend } from 'resend'

export const config = {
  runtime: 'nodejs',
}

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_MIME = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])
const ALLOWED_EXT = /\.(pdf|doc|docx)$/i

const POSITIONS = new Set([
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
])

type ApiResponse = {
  success: boolean
  message?: string
}

function jsonResponse(body: ApiResponse, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isValidFromEmail(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return false
  if (/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(trimmed)) return true
  return /^.+\s+<[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+>$/.test(trimmed)
}

function isAllowedResume(filename: string, mimeType: string) {
  if (mimeType && ALLOWED_MIME.has(mimeType)) return true
  return ALLOWED_EXT.test(filename)
}

function getResumeContentType(filename: string, mimeType: string) {
  if (mimeType && ALLOWED_MIME.has(mimeType)) return mimeType
  const lower = filename.toLowerCase()
  if (lower.endsWith('.pdf')) return 'application/pdf'
  if (lower.endsWith('.doc')) return 'application/msword'
  if (lower.endsWith('.docx')) {
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  }
  return 'application/octet-stream'
}

function getResumeFilename(entry: Blob): string {
  if ('name' in entry && typeof entry.name === 'string' && entry.name.trim()) {
    return entry.name.trim()
  }
  return 'curriculo.pdf'
}

function validateEnv(): { ok: true; config: EnvConfig } | { ok: false; message: string } {
  const missing: string[] = []

  if (!process.env.RESEND_API_KEY?.trim()) missing.push('RESEND_API_KEY')
  if (!process.env.RESEND_FROM_EMAIL?.trim()) missing.push('RESEND_FROM_EMAIL')
  if (!process.env.WORK_WITH_US_TO_EMAIL?.trim()) missing.push('WORK_WITH_US_TO_EMAIL')

  if (missing.length > 0) {
    return {
      ok: false,
      message: `Configuração de envio ausente: ${missing.join(', ')}`,
    }
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL!.trim()
  if (!isValidFromEmail(fromEmail)) {
    return {
      ok: false,
      message:
        'RESEND_FROM_EMAIL inválido. Use "email@dominio.com" ou "Nome <email@dominio.com>".',
    }
  }

  return {
    ok: true,
    config: {
      apiKey: process.env.RESEND_API_KEY!.trim(),
      fromEmail,
      toEmail: process.env.WORK_WITH_US_TO_EMAIL!.trim(),
    },
  }
}

type EnvConfig = {
  apiKey: string
  fromEmail: string
  toEmail: string
}

function getResendErrorMessage(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return 'Falha ao enviar e-mail pelo Resend.'
  }

  const record = error as Record<string, unknown>
  const statusCode = typeof record.statusCode === 'number' ? record.statusCode : undefined
  const rawMessage = String(record.message ?? record.name ?? '').trim()

  if (!rawMessage) {
    return 'Falha ao enviar e-mail pelo Resend.'
  }

  const lower = rawMessage.toLowerCase()

  if (
    lower.includes('not verified') ||
    lower.includes('domain') ||
    lower.includes('verify') ||
    statusCode === 403
  ) {
    return (
      'Domínio do remetente não verificado no Resend. Verifique nacionaldistribuicao.com.br ' +
      'em Resend > Domains antes de enviar candidaturas.'
    )
  }

  if (lower.includes('invalid from') || lower.includes('from address')) {
    return 'RESEND_FROM_EMAIL inválido ou não autorizado no Resend.'
  }

  if (lower.includes('attachment') || lower.includes('file')) {
    return 'Falha ao anexar o currículo no e-mail. Verifique o formato PDF, DOC ou DOCX.'
  }

  return `Falha ao enviar e-mail pelo Resend: ${rawMessage}`
}

function logStageError(stage: string, err: unknown) {
  const info =
    err instanceof Error
      ? { name: err.name, message: err.message, stack: err.stack }
      : { value: String(err) }

  console.error(`[trabalhe-conosco] Falha na etapa "${stage}":`, info)
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return jsonResponse({ success: false, message: 'Método não permitido.' }, 405)
  }

  const envCheck = validateEnv()
  if (!envCheck.ok) {
    console.error('[trabalhe-conosco] Configuração ausente:', envCheck.message)
    return jsonResponse({ success: false, message: envCheck.message }, 500)
  }

  const { apiKey, fromEmail, toEmail } = envCheck.config

  try {
    let formData: FormData

    try {
      formData = await request.formData()
    } catch (err) {
      logStageError('formData', err)
      return jsonResponse(
        {
          success: false,
          message:
            'Não foi possível ler os dados do formulário. Verifique o anexo e tente novamente.',
        },
        400,
      )
    }

    const name = String(formData.get('name') ?? '').trim()
    const phone = String(formData.get('phone') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const city = String(formData.get('city') ?? '').trim()
    const position = String(formData.get('position') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const resumeEntry = formData.get('resume')

    if (!name || !phone || !email || !city || !position || !message) {
      return jsonResponse(
        { success: false, message: 'Preencha todos os campos obrigatórios.' },
        400,
      )
    }

    if (!isValidEmail(email)) {
      return jsonResponse({ success: false, message: 'Informe um e-mail válido.' }, 400)
    }

    if (!POSITIONS.has(position)) {
      return jsonResponse(
        { success: false, message: 'Selecione um cargo de interesse válido.' },
        400,
      )
    }

    if (!(resumeEntry instanceof Blob) || resumeEntry.size === 0) {
      return jsonResponse(
        { success: false, message: 'Anexe seu currículo em PDF, DOC ou DOCX.' },
        400,
      )
    }

    const resumeName = getResumeFilename(resumeEntry)
    const resumeMime = 'type' in resumeEntry ? String(resumeEntry.type ?? '') : ''

    if (resumeEntry.size > MAX_FILE_SIZE) {
      return jsonResponse(
        { success: false, message: 'O currículo deve ter no máximo 5 MB.' },
        400,
      )
    }

    if (!isAllowedResume(resumeName, resumeMime)) {
      return jsonResponse(
        { success: false, message: 'Formato de arquivo não permitido. Use PDF, DOC ou DOCX.' },
        400,
      )
    }

    let resumeBuffer: Buffer

    try {
      resumeBuffer = Buffer.from(await resumeEntry.arrayBuffer())
    } catch (err) {
      logStageError('resume-buffer', err)
      return jsonResponse(
        {
          success: false,
          message: 'Não foi possível ler o arquivo do currículo. Tente anexar novamente.',
        },
        400,
      )
    }

    const resend = new Resend(apiKey)

    const sentAt = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'America/Sao_Paulo',
    }).format(new Date())

    const html = `
      <p>Nova candidatura recebida pelo site da Nacional Distribuidora.</p>
      <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
      <p><strong>Telefone / WhatsApp:</strong> ${escapeHtml(phone)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Cidade/UF:</strong> ${escapeHtml(city)}</p>
      <p><strong>Cargo de interesse:</strong> ${escapeHtml(position)}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      <p><strong>Enviado em:</strong> ${escapeHtml(sentAt)}</p>
      <p><strong>Currículo:</strong> arquivo anexado (${escapeHtml(resumeName)}).</p>
    `

    let sendResult: Awaited<ReturnType<typeof resend.emails.send>>

    try {
      sendResult = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: email,
        subject: `Nova candidatura - ${name} - ${position}`,
        html,
        attachments: [
          {
            filename: resumeName,
            content: resumeBuffer,
            contentType: getResumeContentType(resumeName, resumeMime),
          },
        ],
      })
    } catch (err) {
      logStageError('resend-send', err)
      const resendMessage =
        err instanceof Error && err.message ? getResendErrorMessage({ message: err.message }) : getResendErrorMessage(err)
      return jsonResponse({ success: false, message: resendMessage }, 502)
    }

    if (sendResult.error) {
      console.error('[trabalhe-conosco] Erro Resend:', {
        name: sendResult.error.name,
        message: sendResult.error.message,
        statusCode: (sendResult.error as { statusCode?: number }).statusCode,
      })
      return jsonResponse(
        { success: false, message: getResendErrorMessage(sendResult.error) },
        502,
      )
    }

    return jsonResponse({ success: true })
  } catch (err) {
    logStageError('unexpected', err)
    return jsonResponse(
      {
        success: false,
        message: 'Erro interno ao processar a candidatura. Tente novamente em instantes.',
      },
      500,
    )
  }
}
