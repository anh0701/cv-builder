import type { ReactNode } from 'react'

export function SectionTitle({
  children,
}: {
  children: ReactNode
}) {
  return (
    <h3 className="cv-section-title">
      {children}
    </h3>
  )
}

function renderInlineMarkdown(text: string) {
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g
  const parts = text.split(pattern)

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index}>
          {part.slice(2, -2)}
        </strong>
      )
    }

    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={index}>
          {part.slice(1, -1)}
        </em>
      )
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index}>
          {part.slice(1, -1)}
        </code>
      )
    }

    return part
  })
}

export function MarkdownContent({
  text,
}: {
  text: string
}) {
  const lines = text.replace(/\r\n/g, '\n').split('\n')

  return (
    <div className="cv-markdown">
      {lines.map((line, index) => {
        const trimmed = line.trim()

        if (!trimmed) {
          return (
            <div
              key={index}
              className="cv-md-space"
            />
          )
        }

        const heading = trimmed.match(/^(#{1,3})\s+(.+)$/)

        if (heading) {
          return (
            <p
              key={index}
              className={`cv-md-heading cv-md-heading-${heading[1].length}`}
            >
              {renderInlineMarkdown(heading[2])}
            </p>
          )
        }

        const bullet = line.match(/^(\s*)[-*+]\s+(.+)$/)

        if (bullet) {
          const indent = Math.min(
            3,
            Math.floor(
              bullet[1].replace(/\t/g, '  ').length / 2,
            ),
          )

          return (
            <div
              key={index}
              className="cv-md-bullet"
              style={{
                marginLeft: `${indent * 16}px`,
              }}
            >
              <span className="cv-md-marker">
                {indent === 0 ? '•' : '◦'}
              </span>

              <span>
                {renderInlineMarkdown(bullet[2])}
              </span>
            </div>
          )
        }

        return (
          <p
            key={index}
            className="cv-md-paragraph"
          >
            {renderInlineMarkdown(trimmed)}
          </p>
        )
      })}
    </div>
  )
}