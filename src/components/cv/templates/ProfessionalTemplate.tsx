import type { CVData, CVLabels } from '../../../types/cv'
import CVContent from '../CVContent'
import CVHeader from '../CVHeader'

interface ProfessionalTemplateProps {
    cv: CVData
    labels: CVLabels
    isVi: boolean
}

export default function ProfessionalTemplate({
    cv,
    labels,
    isVi,
}: ProfessionalTemplateProps) {
    return (
        <article className="cv-paper cv-professional">
            <div className="professional-accent" />

            <div className="cv-professional-columns">
                <aside className="cv-professional-sidebar">
                    <CVHeader
                        cv={cv}
                        labels={labels}
                        isVi={isVi}
                    />

                    <CVContent
                        cv={{
                            ...cv,
                            summary: '',
                            experiences: [],
                            projects: [],
                        }}
                        labels={labels}
                        isVi={isVi}
                        layout="default"
                    />
                </aside>

                <main className="cv-professional-main">
                    <CVContent
                        cv={{
                            ...cv,
                            education: [],
                            skills: [],
                        }}
                        labels={labels}
                        isVi={isVi}
                        layout="default"
                    />
                </main>
            </div>
        </article>
    )
}