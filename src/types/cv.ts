export type CVLanguage = 'vi' | 'en'
export type CVTemplateId = 'classic' | 'modern'

export interface CVExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string[]
}

export interface CVProject {
  id: string
  name: string
  role: string
  startDate: string
  endDate: string
  description: string[]
  technologies: string[]
}

export interface CVEducation {
  id: string
  school: string
  degree: string
  startDate: string
  endDate: string
  description: string
}

export interface CVData {
  language: CVLanguage
  fullName: string
  email: string
  phone: string
  address: string
  linkedin: string
  github: string
  summary: string
  skills: string[]
  experiences: CVExperience[]
  projects: CVProject[]
  education: CVEducation[]
}

export interface CVBuilderState {
  templateId: CVTemplateId
  cv: CVData
}

export interface CVLabels {
  subtitle: string
  personal: string
  name: string
  email: string
  phone: string
  address: string
  linkedin: string
  github: string
  summary: string
  skills: string
  skillsHint: string
  experiences: string
  projects: string
  education: string
  company: string
  position: string
  projectName: string
  role: string
  school: string
  degree: string
  startDate: string
  endDate: string
  description: string
  descriptionHint: string
  technologies: string
  technologiesHint: string
  add: string
  remove: string
  preview: string
  download: string
  classic: string
  modern: string
  current: string
  objective: string
  contact: string
  empty: string
  template: string
}