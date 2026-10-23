import {
  Plus,
  Trash2,
} from 'lucide-react'

import type {
  CVData,
  CVEducation,
  CVExperience,
  CVLabels,
  CVProject,
} from '../../types/cv'

import {
  Field,
  TextField,
  MonthField,
} from '../common/Fields'

interface CVFormProps {
  cv: CVData
  labels: CVLabels
  isVi: boolean

  update: <K extends keyof CVData>(
    key: K,
    value: CVData[K],
  ) => void

  updateExperience: (
    id: string,
    key: keyof CVExperience,
    value: string | string[],
  ) => void

  updateProject: (
    id: string,
    key: keyof CVProject,
    value: string | string[],
  ) => void

  updateEducation: (
    id: string,
    key: keyof CVEducation,
    value: string,
  ) => void

  addExperience: () => void
  addProject: () => void
  addEducation: () => void

  removeItem: (
    key: 'experiences' | 'projects' | 'education',
    id: string,
  ) => void
}

export default function CVForm({
  cv,
  labels,
  isVi,
  update,
  updateExperience,
  updateProject,
  updateEducation,
  addExperience,
  addProject,
  addEducation,
  removeItem,
}: CVFormProps) {
  return (
    <section className="no-print min-w-0 space-y-6">
      {/* Thông tin cá nhân */}
      <div className="rounded-2xl border border-[#e0e4dc] bg-white p-6">
        <h2 className="mb-5 text-lg font-semibold">
          {labels.personal}
        </h2>

        <div className="space-y-4">
          <Field
            label={labels.name}
            value={cv.fullName}
            onChange={(v) => update('fullName', v)}
          />

          <Field
            label={labels.email}
            value={cv.email}
            onChange={(v) => update('email', v)}
          />

          <Field
            label={labels.phone}
            value={cv.phone}
            onChange={(v) => update('phone', v)}
          />

          <Field
            label={labels.address}
            value={cv.address}
            onChange={(v) => update('address', v)}
          />

          <Field
            label={labels.linkedin}
            value={cv.linkedin}
            onChange={(v) => update('linkedin', v)}
          />

          <Field
            label={labels.github}
            value={cv.github}
            onChange={(v) => update('github', v)}
          />

          <TextField
            label={labels.summary}
            value={cv.summary}
            onChange={(v) => update('summary', v)}
            placeholder={
              isVi
                ? 'Tóm tắt kinh nghiệm và thế mạnh...'
                : 'Summarize your experience and strengths...'
            }
          />

          <TextField
            label={labels.skills}
            value={cv.skills.join('\n')}
            onChange={(v) => update('skills', v.split(/\r?\n/))}
            hint={labels.skillsHint}
            rows={5}
            placeholder={'Java\nSpring Boot\nSQL\nReact'}
          />
        </div>
      </div>

      {/* Kinh nghiệm làm việc */}
      <div className="rounded-2xl border border-[#e0e4dc] bg-white p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">
            {labels.experiences}
          </h2>

          <button
            type="button"
            onClick={addExperience}
            className="cv-add"
          >
            <Plus size={16} />
            {labels.add}
          </button>
        </div>

        {cv.experiences.map((item, index) => (
          <div key={item.id} className="cv-form-item">
            <div className="mb-4 flex items-center justify-between">
              <strong>
                {labels.experiences} #{index + 1}
              </strong>

              <button
                type="button"
                onClick={() =>
                  removeItem('experiences', item.id)
                }
                className="cv-remove"
              >
                <Trash2 size={15} />
                {labels.remove}
              </button>
            </div>

            <div className="space-y-4">
              <Field
                label={labels.company}
                value={item.company}
                onChange={(v) =>
                  updateExperience(item.id, 'company', v)
                }
              />

              <Field
                label={labels.position}
                value={item.position}
                onChange={(v) =>
                  updateExperience(item.id, 'position', v)
                }
              />

              <div className="grid grid-cols-2 gap-3">
                <MonthField
                  label={labels.startDate}
                  value={item.startDate}
                  currentLabel={labels.current}
                  onChange={(v) =>
                    updateExperience(item.id, 'startDate', v)
                  }
                />

                <MonthField
                  label={labels.endDate}
                  value={item.endDate}
                  currentLabel={labels.current}
                  allowCurrent
                  onChange={(v) =>
                    updateExperience(item.id, 'endDate', v)
                  }
                />
              </div>

              <TextField
                label={labels.description}
                value={item.description.join('\n')}
                onChange={(v) =>
                  updateExperience(
                    item.id,
                    'description',
                    v.split('\n'),
                  )
                }
                hint={labels.descriptionHint}
                rows={5}
                placeholder={
                  isVi
                    ? '- Phát triển API bằng Spring Boot\n- Làm việc với SQL'
                    : '- Developed APIs with Spring Boot\n- Worked with SQL'
                }
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dự án */}
      <div className="rounded-2xl border border-[#e0e4dc] bg-white p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">
            {labels.projects}
          </h2>

          <button
            type="button"
            onClick={addProject}
            className="cv-add"
          >
            <Plus size={16} />
            {labels.add}
          </button>
        </div>

        {cv.projects.map((item, index) => (
          <div key={item.id} className="cv-form-item">
            <div className="mb-4 flex items-center justify-between">
              <strong>
                {labels.projects} #{index + 1}
              </strong>

              <button
                type="button"
                onClick={() => removeItem('projects', item.id)}
                className="cv-remove"
              >
                <Trash2 size={15} />
                {labels.remove}
              </button>
            </div>

            <div className="space-y-4">
              <Field
                label={labels.projectName}
                value={item.name}
                onChange={(v) =>
                  updateProject(item.id, 'name', v)
                }
              />

              <Field
                label={labels.role}
                value={item.role}
                onChange={(v) =>
                  updateProject(item.id, 'role', v)
                }
              />

              <div className="grid grid-cols-2 gap-3">
                <MonthField
                  label={labels.startDate}
                  value={item.startDate}
                  currentLabel={labels.current}
                  onChange={(v) =>
                    updateProject(item.id, 'startDate', v)
                  }
                />

                <MonthField
                  label={labels.endDate}
                  value={item.endDate}
                  currentLabel={labels.current}
                  allowCurrent
                  onChange={(v) =>
                    updateProject(item.id, 'endDate', v)
                  }
                />
              </div>

              <TextField
                label={labels.description}
                value={item.description.join('\n')}
                onChange={(v) =>
                  updateProject(
                    item.id,
                    'description',
                    v.split('\n'),
                  )
                }
                hint={labels.descriptionHint}
                rows={5}
                placeholder={
                  isVi
                    ? '- Xây dựng giao diện bằng React\n- Thiết kế API bằng Spring Boot'
                    : '- Built the UI with React\n- Designed APIs with Spring Boot'
                }
              />

              <TextField
                label={labels.technologies}
                value={item.technologies.join('\n')}
                onChange={(v) =>
                  updateProject(
                    item.id,
                    'technologies',
                    v.split('\n'),
                  )
                }
                hint={labels.technologiesHint}
                rows={3}
                placeholder={'React\nTypeScript\nPostgreSQL'}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Học vấn */}
      <div className="rounded-2xl border border-[#e0e4dc] bg-white p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">
            {labels.education}
          </h2>

          <button
            type="button"
            onClick={addEducation}
            className="cv-add"
          >
            <Plus size={16} />
            {labels.add}
          </button>
        </div>

        {cv.education.map((item, index) => (
          <div key={item.id} className="cv-form-item">
            <div className="mb-4 flex items-center justify-between">
              <strong>
                {labels.education} #{index + 1}
              </strong>

              <button
                type="button"
                onClick={() => removeItem('education', item.id)}
                className="cv-remove"
              >
                <Trash2 size={15} />
                {labels.remove}
              </button>
            </div>

            <div className="space-y-4">
              <Field
                label={labels.school}
                value={item.school}
                onChange={(v) =>
                  updateEducation(item.id, 'school', v)
                }
              />

              <Field
                label={labels.degree}
                value={item.degree}
                onChange={(v) =>
                  updateEducation(item.id, 'degree', v)
                }
              />

              <div className="grid grid-cols-2 gap-3">
                <MonthField
                  label={labels.startDate}
                  value={item.startDate}
                  currentLabel={labels.current}
                  onChange={(v) =>
                    updateEducation(item.id, 'startDate', v)
                  }
                />

                <MonthField
                  label={labels.endDate}
                  value={item.endDate}
                  currentLabel={labels.current}
                  allowCurrent
                  onChange={(v) =>
                    updateEducation(item.id, 'endDate', v)
                  }
                />
              </div>

              <TextField
                label={labels.description}
                value={item.description}
                onChange={(v) =>
                  updateEducation(item.id, 'description', v)
                }
                hint={labels.descriptionHint}
                rows={4}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}