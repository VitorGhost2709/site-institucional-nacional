import {
  AsYouType,
  parsePhoneNumberFromString,
  type CountryCode,
} from 'libphonenumber-js'

const DEFAULT_COUNTRY: CountryCode = 'BR'
const MAX_DIGITS = 15

export type PhoneValidation = {
  valid: boolean
  message?: string
  e164?: string
  formatted?: string
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '')
}

function isObviousFake(digits: string): boolean {
  if (digits.length < 3) return true
  if (/^(\d)\1+$/.test(digits)) return true
  return false
}

export function sanitizePhoneInput(value: string): string {
  let sanitized = ''

  for (const char of value) {
    if (char === '+' && sanitized.length === 0) {
      sanitized += char
      continue
    }
    if (/[\d\s().-]/.test(char)) {
      sanitized += char
    }
  }

  const digits = digitsOnly(sanitized)
  if (digits.length <= MAX_DIGITS) return sanitized

  let digitCount = 0
  let result = ''
  for (const char of sanitized) {
    if (/\d/.test(char)) {
      if (digitCount >= MAX_DIGITS) continue
      digitCount += 1
    }
    result += char
  }

  return result
}

export function formatPhoneForDisplay(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return ''

  if (trimmed.startsWith('+')) {
    return new AsYouType().input(trimmed)
  }

  return new AsYouType(DEFAULT_COUNTRY).input(trimmed)
}

export function validateInternationalPhone(value: string): PhoneValidation {
  const trimmed = value.trim()

  if (!trimmed) {
    return { valid: false, message: 'Informe um telefone ou WhatsApp válido.' }
  }

  const digits = digitsOnly(trimmed)
  if (isObviousFake(digits)) {
    return {
      valid: false,
      message: 'Esse número parece inválido. Verifique o código do país e tente novamente.',
    }
  }

  if (digits.length < 8) {
    return { valid: false, message: 'Informe um telefone ou WhatsApp válido.' }
  }

  if (digits.length > MAX_DIGITS) {
    return {
      valid: false,
      message: 'Esse número parece inválido. Verifique o código do país e tente novamente.',
    }
  }

  const hasInternationalPrefix = trimmed.startsWith('+')

  if (!hasInternationalPrefix && digits.length > 11) {
    return {
      valid: false,
      message:
        'Para números internacionais, inclua o código do país. Exemplo: +33 6 12 34 56 78.',
    }
  }

  const phoneNumber = hasInternationalPrefix
    ? parsePhoneNumberFromString(trimmed)
    : parsePhoneNumberFromString(trimmed, DEFAULT_COUNTRY)

  if (!phoneNumber?.isValid()) {
    if (hasInternationalPrefix) {
      return {
        valid: false,
        message:
          'Esse número parece inválido. Verifique o código do país e tente novamente.',
      }
    }

    return { valid: false, message: 'Informe um telefone ou WhatsApp válido.' }
  }

  return {
    valid: true,
    e164: phoneNumber.format('E.164'),
    formatted: phoneNumber.formatInternational(),
  }
}
