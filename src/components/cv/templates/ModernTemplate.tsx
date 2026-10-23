import type { CVData, CVLabels } from '../../../types/cv'
import CVContent from '../CVContent'
import CVHeader from '../CVHeader'

interface CVTemplateProps {
    cv: CVData
    labels: CVLabels
    isVi: boolean
}

export default function ModernTemplate({
    cv,
    labels,
    isVi,
}: CVTemplateProps) {
    return (
        <article className="cv-paper cv-modern">
            <CVHeader cv={cv} labels={labels} isVi={isVi} />
            <CVContent cv={cv} labels={labels} isVi={isVi} />
        </article>
    )
}