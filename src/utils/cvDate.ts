export function createId() {
  return crypto.randomUUID()
}

export function getCurrentMonth() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')

  return `${now.getFullYear()}-${month}`
}

export function toMonthInput(value: string) {
  if (!value || value === 'current') return ''

  if (/^\d{4}-\d{2}$/.test(value)) {
    return value
  }

  // Hỗ trợ dữ liệu cũ dạng MM/YYYY.
  const legacy = value.match(/^(\d{1,2})\/(\d{4})$/)

  if (legacy) {
    return `${legacy[2]}-${legacy[1].padStart(2, '0')}`
  }

  return ''
}

export function formatMonth(
  value: string,
  currentLabel: string,
) {
  if (!value) return ''
  if (value === 'current') return currentLabel

  const normalized = toMonthInput(value)

  if (!normalized) return value

  const [year, month] = normalized.split('-')

  return `${month}/${year}`
}

export function formatPeriod(
  start: string,
  end: string,
  currentLabel: string,
) {
  const startText = formatMonth(start, currentLabel)
  const endText = formatMonth(end, currentLabel)

  if (!startText && !endText) return ''

  return `${startText || '...'} – ${endText || '...'}`
}