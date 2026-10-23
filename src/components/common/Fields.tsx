import { useEffect, useState } from 'react'
import {
  getCurrentMonth,
  toMonthInput,
} from '../../utils/cvDate'

interface FieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}

export function Field({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
}: FieldProps) {
  return (
    <label className="block text-sm font-medium text-[#34483a]">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="cv-input"
      />
    </label>
  )
}

interface TextFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  rows?: number
  placeholder?: string
  hint?: string
}

export function TextField({
  label,
  value,
  onChange,
  rows = 4,
  placeholder = '',
  hint,
}: TextFieldProps) {
  return (
    <label className="block text-sm font-medium text-[#34483a]">
      {label}

      {hint && (
        <span className="mt-1 block text-xs font-normal text-gray-500">
          {hint}
        </span>
      )}

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="cv-input resize-y"
      />
    </label>
  )
}

interface MonthFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  currentLabel: string
  allowCurrent?: boolean
}

export function MonthField({
  label,
  value,
  onChange,
  currentLabel,
  allowCurrent = false,
}: MonthFieldProps) {
  const isCurrent = value === 'current'
  const normalizedValue = isCurrent ? '' : toMonthInput(value)
  const [savedYear, savedMonth] = normalizedValue.split('-')

  const [month, setMonth] = useState(savedMonth ?? '')
  const [year, setYear] = useState(savedYear ?? '')

  useEffect(() => {
    setMonth(savedMonth ?? '')
    setYear(savedYear ?? '')
  }, [savedMonth, savedYear])

  const currentYear = Number(getCurrentMonth().slice(0, 4))
  const selectedYear = Number(year)
  const years = Array.from(
    { length: currentYear - 1989 },
    (_, index) => currentYear - index,
  )

  function selectMonth(nextMonth: string) {
    setMonth(nextMonth)

    if (nextMonth && year) {
      onChange(`${year}-${nextMonth.padStart(2, '0')}`)
    } else {
      onChange('')
    }
  }

  function selectYear(nextYear: string) {
    setYear(nextYear)

    if (month && nextYear) {
      onChange(`${nextYear}-${month.padStart(2, '0')}`)
    } else {
      onChange('')
    }
  }

  return (
    <div className="text-sm font-medium text-[#34483a]">
      <span className="block">{label}</span>

      <div className="mt-[6px] grid grid-cols-2 gap-2">
        <select
          value={month}
          disabled={isCurrent}
          onChange={(event) => selectMonth(event.target.value)}
          className="cv-input"
          aria-label={`${label} - Month`}
        >
          <option value="">Select month</option>
          {Array.from({ length: 12 }, (_, index) => {
            const number = String(index + 1).padStart(2, '0')
            return (
              <option key={number} value={number}>
                {number}
              </option>
            )
          })}
        </select>

        <select
          value={year}
          disabled={isCurrent}
          onChange={(event) => selectYear(event.target.value)}
          className="cv-input"
          aria-label={`${label} - Year`}
        >
          <option value="">Select year</option>
          {years.map((itemYear) => (
            <option key={itemYear} value={String(itemYear)}>
              {itemYear}
            </option>
          ))}
          {year && selectedYear < 1990 && (
            <option value={year}>{year}</option>
          )}
        </select>
      </div>

      {allowCurrent && (
        <label className="mt-2 flex cursor-pointer items-center gap-2 font-normal">
          <input
            type="checkbox"
            checked={isCurrent}
            onChange={(event) => {
              if (event.target.checked) {
                onChange('current')
              } else {
                onChange('')
                setMonth('')
                setYear('')
              }
            }}
          />
          {currentLabel}
        </label>
      )}
    </div>
  )
}
