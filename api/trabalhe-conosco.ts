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

function jsonResponse(body: unknown, status = 200) {
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

function isAllowedResume(file: File) {
  if (ALLOWED_MIME.has(file.type)) return true
  return ALLOWED_EXT.test(file.name)
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Método não permitido.' }, 405)
  }

  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL
  const toEmail =
    process.env.WORK_WITH_US_TO_EMAIL ??
    process.env.CAREERS_TO_EMAIL ??
    'administrativo@nacionaldistribuicao.com.br'

  if (!apiKey || !fromEmail) {
    console.error('Variáveis RESEND_API_KEY ou RESEND_FROM_EMAIL não configuradas.')
    return jsonResponse(
      { error: 'Serviço de envio não configurado. Configure as variáveis na Vercel.' },
      503,
    )
  }

  try {
    const formData = await request.formData()

    const name = String(formData.get('name') ?? '').trim()
    const phone = String(formData.get('phone') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const city = String(formData.get('city') ?? '').trim()
    const position = String(formData.get('position') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const resumeEntry = formData.get('resume')

    if (!name || !phone || !email || !city || !position || !message) {
      return jsonResponse({ error: 'Preencha todos os campos obrigatórios.' }, 400)
    }

    if (!isValidEmail(email)) {
      return jsonResponse({ error: 'Informe um e-mail válido.' }, 400)
    }

    if (!POSITIONS.has(position)) {
      return jsonResponse({ error: 'Selecione um cargo de interesse válido.' }, 400)
    }

    if (!(resumeEntry instanceof File) || resumeEntry.size === 0) {
      return jsonResponse({ error: 'Anexe seu currículo em PDF, DOC ou DOCX.' }, 400)
    }

    if (resumeEntry.size > MAX_FILE_SIZE) {
      return jsonResponse({ error: 'O currículo deve ter no máximo 5 MB.' }, 400)
    }

    if (!isAllowedResume(resumeEntry)) {
      return jsonResponse(
        { error: 'Formato de arquivo não permitido. Use PDF, DOC ou DOCX.' },
        400,
      )
    }

    const resumeBuffer = Buffer.from(await resumeEntry.arrayBuffer())
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
      <p><strong>Currículo:</strong> arquivo anexado (${escapeHtml(resumeEntry.name)}).</p>
    `

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Nova candidatura - ${name} - ${position}`,
      html,
      attachments: [
        {
          filename: resumeEntry.name,
          content: resumeBuffer,
        },
      ],
    })

    if (error) {
      console.error('Erro Resend:', error)
      return jsonResponse({ error: 'Falha ao enviar e-mail.' }, 502)
    }

    return jsonResponse({ success: true })
  } catch (err) {
    console.error('Erro ao processar candidatura:', err)
    return jsonResponse({ error: 'Erro interno ao processar a candidatura.' }, 500)
  }
}
