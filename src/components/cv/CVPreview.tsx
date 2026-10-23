import type {
    CVData,
    CVLabels,
    CVTemplateId,
} from '../../types/cv'

import { formatPeriod } from '../../utils/cvDate'

import {
    MarkdownContent,
    SectionTitle,
} from './MarkdownContent'

interface CVPreviewProps {
    cv: CVData
    labels: CVLabels
    isVi: boolean
    template: CVTemplateId
    setTemplate: (template: CVTemplateId) => void
}

export default function CVPreview({
    cv,
    labels,
    isVi,
    template,
    setTemplate,
}: CVPreviewProps) {
    return (
        <section className="preview-shell min-w-0">
            <div className="preview-toolbar no-print mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">
                    {labels.preview}
                </h2>

                <div className="flex items-center gap-2">
                    <label htmlFor="cv-template" className="text-sm">
                        {labels.template}
                    </label>

                    <select
                        id="cv-template"
                        value={template}
                        onChange={(event) =>
                            setTemplate(event.target.value as CVTemplateId)
                        }
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                    >
                        <option value="classic">{labels.classic}</option>
                        <option value="modern">{labels.modern}</option>
                    </select>
                </div>
            </div>
            <div className="preview-scroll-area">

                <article className={`cv-paper cv-${template}`}>
                    <header className="cv-header">
                        <h1>
                            {cv.fullName || (isVi ? 'Họ và tên' : 'Your Name')}
                        </h1>

                        {(cv.email || cv.phone || cv.address) && (
                            <>
                                <p className="cv-contact-label">
                                    {labels.contact}
                                </p>

                                <div className="cv-contact">
                                    {[cv.email, cv.phone, cv.address]
                                        .filter(Boolean)
                                        .join('  •  ')}
                                </div>
                            </>
                        )}

                        {(cv.linkedin || cv.github) && (
                            <div className="cv-contact cv-links">
                                {[
                                    { label: 'LinkedIn', url: cv.linkedin },
                                    { label: 'GitHub', url: cv.github },
                                ]
                                    .filter((link) => link.url)
                                    .map((link) => (
                                        <a
                                            key={link.label}
                                            href={
                                                link.url.startsWith('http')
                                                    ? link.url
                                                    : `https://${link.url}`
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {link.label}:{' '}
                                            {link.url.replace(/^https?:\/\//, '')}
                                        </a>
                                    ))}
                            </div>
                        )}
                    </header>

                    {cv.summary.trim() && (
                        <section className="cv-section">
                            <SectionTitle>
                                {labels.objective}
                            </SectionTitle>

                            <div className="cv-summary">
                                {cv.summary
                                    .split(/\r?\n/)
                                    .filter((paragraph) => paragraph.trim())
                                    .map((paragraph, index) => (
                                        <p key={index}>{paragraph.trim()}</p>
                                    ))}
                            </div>
                        </section>
                    )}

                    {cv.experiences.some(
                        (item) =>
                            item.company ||
                            item.position ||
                            item.description.some((line) => line.trim()),
                    ) && (
                            <section className="cv-section">
                                <SectionTitle>
                                    {labels.experiences}
                                </SectionTitle>

                                {cv.experiences
                                    .filter(
                                        (item) =>
                                            item.company ||
                                            item.position ||
                                            item.description.some((line) => line.trim()),
                                    )
                                    .map((item) => (
                                        <div key={item.id} className="cv-entry">
                                            <div className="cv-entry-heading">
                                                <strong>{item.position}</strong>

                                                <span>
                                                    {formatPeriod(
                                                        item.startDate,
                                                        item.endDate,
                                                        labels.current,
                                                    )}
                                                </span>
                                            </div>

                                            {item.company && (
                                                <p className="cv-subheading">
                                                    {item.company}
                                                </p>
                                            )}

                                            {item.description.some((line) => line.trim()) && (
                                                <MarkdownContent
                                                    text={item.description.join('\n')}
                                                />
                                            )}
                                        </div>
                                    ))}
                            </section>
                        )}

                    {cv.projects.some(
                        (item) =>
                            item.name ||
                            item.role ||
                            item.description.some((line) => line.trim()) ||
                            item.technologies.some((technology) => technology.trim()),
                    ) && (
                            <section className="cv-section">
                                <SectionTitle>
                                    {labels.projects}
                                </SectionTitle>

                                {cv.projects
                                    .filter(
                                        (item) =>
                                            item.name ||
                                            item.role ||
                                            item.description.some((line) => line.trim()) ||
                                            item.technologies.some((technology) =>
                                                technology.trim(),
                                            ),
                                    )
                                    .map((item) => (
                                        <div key={item.id} className="cv-entry">
                                            <div className="cv-entry-heading">
                                                <strong>{item.name}</strong>

                                                <span>
                                                    {formatPeriod(
                                                        item.startDate,
                                                        item.endDate,
                                                        labels.current,
                                                    )}
                                                </span>
                                            </div>

                                            {item.role && (
                                                <p className="cv-subheading">
                                                    {item.role}
                                                </p>
                                            )}

                                            {item.description.some((line) => line.trim()) && (
                                                <MarkdownContent
                                                    text={item.description.join('\n')}
                                                />
                                            )}

                                            {item.technologies.some((technology) =>
                                                technology.trim(),
                                            ) && (
                                                    <p className="cv-paragraph">
                                                        <strong>
                                                            {isVi ? 'Công nghệ: ' : 'Technologies: '}
                                                        </strong>

                                                        {item.technologies
                                                            .filter((technology) => technology.trim())
                                                            .join(', ')}
                                                    </p>
                                                )}
                                        </div>
                                    ))}
                            </section>
                        )}

                    {cv.education.some(
                        (item) =>
                            item.school ||
                            item.degree ||
                            item.description.trim(),
                    ) && (
                            <section className="cv-section">
                                <SectionTitle>
                                    {labels.education}
                                </SectionTitle>

                                {cv.education
                                    .filter(
                                        (item) =>
                                            item.school ||
                                            item.degree ||
                                            item.description.trim(),
                                    )
                                    .map((item) => (
                                        <div key={item.id} className="cv-entry">
                                            <div className="cv-entry-heading">
                                                <strong>{item.school}</strong>

                                                <span>
                                                    {formatPeriod(
                                                        item.startDate,
                                                        item.endDate,
                                                        labels.current,
                                                    )}
                                                </span>
                                            </div>

                                            {item.degree && (
                                                <p className="cv-subheading">
                                                    {item.degree}
                                                </p>
                                            )}

                                            {item.description.trim() && (
                                                <MarkdownContent text={item.description} />
                                            )}
                                        </div>
                                    ))}
                            </section>
                        )}

                    {cv.skills.some((skill) => skill.trim()) && (
                        <section className="cv-section">
                            <SectionTitle>
                                {labels.skills}
                            </SectionTitle>

                            <ul className="cv-skill-list">
                                {cv.skills
                                    .filter((skill) => skill.trim())
                                    .map((skill, index) => (
                                        <li key={`${skill}-${index}`}>
                                            <MarkdownContent text={skill} />
                                        </li>
                                    ))}
                            </ul>
                        </section>
                    )}

                    {!cv.fullName &&
                        !cv.summary &&
                        cv.experiences.length === 0 &&
                        cv.projects.length === 0 &&
                        cv.education.length === 0 &&
                        cv.skills.length === 0 && (
                            <p className="no-print cv-empty">
                                {labels.empty}
                            </p>
                        )}
                </article>
            </div>

            <p className="no-print mt-4 text-sm text-gray-500">
                {isVi
                    ? 'Khi xuất PDF, chọn “Save to PDF” trong hộp thoại in của trình duyệt.'
                    : 'When exporting, choose “Save to PDF” in the browser print dialog.'}
            </p>
        </section>
    )
}