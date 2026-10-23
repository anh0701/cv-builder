import type {
  CVData,
  CVLabels,
  CVTemplateId,
} from '../../types/cv'

import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import ProfessionalTemplate from './templates/ProfessionalTemplate'

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
  const Template =
  template === 'professional'
    ? ProfessionalTemplate
    : template === 'modern'
      ? ModernTemplate
      : ClassicTemplate

  return (
    <section className="preview-shell min-w-0">
      {/* Thanh điều khiển luôn ở phía trên */}
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
            <option value="professional">Professional</option>
          </select>
        </div>
      </div>

      {/* Chỉ vùng này cuộn */}
      <div className="preview-scroll-area">
        <Template
          cv={cv}
          labels={labels}
          isVi={isVi}
        />

        <p className="no-print mt-4 text-sm text-gray-500">
          {isVi
            ? 'Khi xuất PDF, chọn “Save to PDF” trong hộp thoại in của trình duyệt.'
            : 'When exporting, choose “Save to PDF” in the browser print dialog.'}
        </p>
      </div>
    </section>
  )
}
