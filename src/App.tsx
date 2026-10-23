import { useState } from 'react'

import {
  Download,
  Languages,
  // Languages,
} from 'lucide-react'

import type {
  CVData,
  CVEducation,
  CVExperience,
  CVProject,
  CVTemplateId,
} from './types/cv'

import { initialCV } from './data/initialCV'
import { createId } from './utils/cvDate'

import CVForm from './components/cv/CVForm'
import CVPreview from './components/cv/CVPreview'

import './styles/cv.css'
import { englishLabels, vietnameseLabels } from './data/label'

export default function App() {
  const [cv, setCV] = useState<CVData>(initialCV)
  const [template, setTemplate] =
    useState<CVTemplateId>('classic')

  const isVi = cv.language === 'vi'
  const labels = isVi ? vietnameseLabels : englishLabels

  function update<K extends keyof CVData>(
    key: K,
    value: CVData[K],
  ) {
    setCV((current) => ({
      ...current,
      [key]: value,
    }))
  }

  function updateExperience(
    id: string,
    key: keyof CVExperience,
    value: string | string[],
  ) {
    setCV((current) => ({
      ...current,
      experiences: current.experiences.map((item) =>
        item.id === id
          ? { ...item, [key]: value }
          : item,
      ),
    }))
  }

  function updateProject(
    id: string,
    key: keyof CVProject,
    value: string | string[],
  ) {
    setCV((current) => ({
      ...current,
      projects: current.projects.map((item) =>
        item.id === id
          ? { ...item, [key]: value }
          : item,
      ),
    }))
  }

  function updateEducation(
    id: string,
    key: keyof CVEducation,
    value: string,
  ) {
    setCV((current) => ({
      ...current,
      education: current.education.map((item) =>
        item.id === id
          ? { ...item, [key]: value }
          : item,
      ),
    }))
  }

  function addExperience() {
    setCV((current) => ({
      ...current,
      experiences: [
        ...current.experiences,
        {
          id: createId(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: [],
        },
      ],
    }))
  }

  function addProject() {
    setCV((current) => ({
      ...current,
      projects: [
        ...current.projects,
        {
          id: createId(),
          name: '',
          role: '',
          startDate: '',
          endDate: '',
          description: [],
          technologies: [],
        },
      ],
    }))
  }

  function addEducation() {
    setCV((current) => ({
      ...current,
      education: [
        ...current.education,
        {
          id: createId(),
          school: '',
          degree: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    }))
  }

  function removeItem(
    key: 'experiences' | 'projects' | 'education',
    id: string,
  ) {
    setCV((current) => ({
      ...current,
      [key]: current[key].filter((item) => item.id !== id),
    }))
  }

  function exportPDF() {
    window.print()
  }

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#263b30]">
      <header className="no-print border-b border-[#dce2d8] bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold">
              CV Builder
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {labels.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                update('language', isVi ? 'en' : 'vi')
              }
              className="flex items-center gap-2 rounded-lg border px-3 py-2 hover:bg-gray-50"
            >
              <Languages size={18} />
              {cv.language.toUpperCase()}
            </button>

            <button
              type="button"
              onClick={exportPDF}
              className="flex items-center gap-2 rounded-lg bg-[#355b43] px-4 py-2.5 font-medium text-white hover:bg-[#284832]"
            >
              <Download size={18} />
              {labels.download}
            </button>
          </div>
        </div>
      </header>

      <div className="app-layout mx-auto grid max-w-[1500px] gap-8 px-6 py-6 lg:h-[calc(100vh-120px)] lg:grid-cols-[minmax(360px,0.9fr)_minmax(0,1.1fr)]">
        <div className="min-h-0 min-w-0 lg:overflow-y-auto lg:pr-2">
          <CVForm
            cv={cv}
            labels={labels}
            isVi={isVi}
            update={update}
            updateExperience={updateExperience}
            updateProject={updateProject}
            updateEducation={updateEducation}
            addExperience={addExperience}
            addProject={addProject}
            addEducation={addEducation}
            removeItem={removeItem}
          />
        </div>

        <div className="min-h-0 min-w-0 lg:overflow-y-auto">
          <CVPreview
            cv={cv}
            labels={labels}
            isVi={isVi}
            template={template}
            setTemplate={setTemplate}
          />
        </div>
      </div>
    </main>
  )
}