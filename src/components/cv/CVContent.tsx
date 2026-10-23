
import type { CVData, CVLabels } from '../../types/cv'
import { formatPeriod } from '../../utils/cvDate'
import {
    MarkdownContent,
    SectionTitle,
} from './MarkdownContent'

interface CVContentProps {
    cv: CVData
    labels: CVLabels
    isVi: boolean
    layout?: 'default' | 'professional'
}

export default function CVContent({
    cv,
    labels,
    isVi,
    layout = 'default',
}: CVContentProps) {
    const summarySection = cv.summary.trim() ? (
        <section className="cv-section">
            <SectionTitle>{labels.objective}</SectionTitle>

            <div className="cv-summary">
                {cv.summary
                    .split(/\r?\n/)
                    .filter((paragraph) => paragraph.trim())
                    .map((paragraph, index) => (
                        <p key={index}>{paragraph.trim()}</p>
                    ))}
            </div>
        </section>
    ) : null

    const experienceItems = cv.experiences.filter(
        (item) =>
            item.company ||
            item.position ||
            item.description.some((line) => line.trim()),
    )

    const experienceSection = experienceItems.length > 0 ? (
        <section className="cv-section">
            <SectionTitle>{labels.experiences}</SectionTitle>

            {experienceItems.map((item) => (
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
                        <p className="cv-subheading">{item.company}</p>
                    )}

                    {item.description.some((line) => line.trim()) && (
                        <MarkdownContent
                            text={item.description.join('\n')}
                        />
                    )}
                </div>
            ))}
        </section>
    ) : null

    const projectItems = cv.projects.filter(
        (item) =>
            item.name ||
            item.role ||
            item.description.some((line) => line.trim()) ||
            item.technologies.some((technology) => technology.trim()),
    )

    const projectSection = projectItems.length > 0 ? (
        <section className="cv-section">
            <SectionTitle>{labels.projects}</SectionTitle>

            {projectItems.map((item) => (
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
                        <p className="cv-subheading">{item.role}</p>
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
    ) : null

    const educationItems = cv.education.filter(
        (item) =>
            item.school ||
            item.degree ||
            item.description.trim(),
    )

    const educationSection = educationItems.length > 0 ? (
        <section className="cv-section">
            <SectionTitle>{labels.education}</SectionTitle>

            {educationItems.map((item) => (
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
                        <p className="cv-subheading">{item.degree}</p>
                    )}

                    {item.description.trim() && (
                        <MarkdownContent text={item.description} />
                    )}
                </div>
            ))}
        </section>
    ) : null

    const skillItems = cv.skills.filter((skill) => skill.trim())

    const skillsSection = skillItems.length > 0 ? (
        <section className="cv-section">
            <SectionTitle>{labels.skills}</SectionTitle>

            <ul className="cv-skill-list">
                {skillItems.map((skill, index) => (
                    <li key={`${skill}-${index}`}>
                        <MarkdownContent text={skill} />
                    </li>
                ))}
            </ul>
        </section>
    ) : null

    const isEmpty =
        !cv.fullName &&
        !cv.summary &&
        cv.experiences.length === 0 &&
        cv.projects.length === 0 &&
        cv.education.length === 0 &&
        cv.skills.length === 0

    const emptyState = isEmpty ? (
        <p className="no-print cv-empty">{labels.empty}</p>
    ) : null

    if (layout === 'professional') {
        return (
            <div className="cv-professional-columns">
                <aside className="cv-professional-sidebar">
                    {skillsSection}
                    {educationSection}
                </aside>

                <div className="cv-professional-main">
                    {summarySection}
                    {experienceSection}
                    {projectSection}
                    {emptyState}
                </div>
            </div>
        )
    }

    return (
        <>
            {summarySection}
            {experienceSection}
            {projectSection}
            {educationSection}
            {skillsSection}
            {emptyState}
        </>
    )
}
