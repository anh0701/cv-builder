import { useState } from "react";

import {
  Download,
  FileJson,
  Languages,
  Upload,
  // Languages,
} from "lucide-react";

import type {
  CVData,
  CVEducation,
  CVExperience,
  CVProject,
  CVTemplateId,
} from "./types/cv";

import { initialCV } from "./data/initialCV";
import { createId } from "./utils/cvDate";

import CVForm from "./components/cv/CVForm";
import CVPreview from "./components/cv/CVPreview";

import "./styles/cv.css";
import { englishLabels, vietnameseLabels } from "./data/label";

export default function App() {
  const [cv, setCV] = useState<CVData>(initialCV);
  const [template, setTemplate] = useState<CVTemplateId>("classic");

  const isVi = cv.language === "vi";
  const labels = isVi ? vietnameseLabels : englishLabels;

  function update<K extends keyof CVData>(key: K, value: CVData[K]) {
    setCV((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function updateExperience(
    id: string,
    key: keyof CVExperience,
    value: string | string[],
  ) {
    setCV((current) => ({
      ...current,
      experiences: current.experiences.map((item) =>
        item.id === id ? { ...item, [key]: value } : item,
      ),
    }));
  }

  function updateProject(
    id: string,
    key: keyof CVProject,
    value: string | string[],
  ) {
    setCV((current) => ({
      ...current,
      projects: current.projects.map((item) =>
        item.id === id ? { ...item, [key]: value } : item,
      ),
    }));
  }

  function updateEducation(id: string, key: keyof CVEducation, value: string) {
    setCV((current) => ({
      ...current,
      education: current.education.map((item) =>
        item.id === id ? { ...item, [key]: value } : item,
      ),
    }));
  }

  function addExperience() {
    setCV((current) => ({
      ...current,
      experiences: [
        ...current.experiences,
        {
          id: createId(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: [],
        },
      ],
    }));
  }

  function addProject() {
    setCV((current) => ({
      ...current,
      projects: [
        ...current.projects,
        {
          id: createId(),
          name: "",
          role: "",
          startDate: "",
          endDate: "",
          description: [],
          technologies: [],
        },
      ],
    }));
  }

  function addEducation() {
    setCV((current) => ({
      ...current,
      education: [
        ...current.education,
        {
          id: createId(),
          school: "",
          degree: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  }

  function removeItem(
    key: "experiences" | "projects" | "education",
    id: string,
  ) {
    setCV((current) => ({
      ...current,
      [key]: current[key].filter((item) => item.id !== id),
    }));
  }

  function exportPDF() {
    window.print();
  }

  function exportJSON() {
    const data = {
      version: 1,
      templateId: template,
      cv: cv,
    };

    const json = JSON.stringify(data, null, 2);

    const blob = new Blob([json], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `cv-${cv.fullName || "untitled"}.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  async function importJSON(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Kiểm tra cấu trúc file
      if (!data.cv || !data.templateId || !data.version) {
        throw new Error("Invalid CV JSON");
      }

      const validTemplates: CVTemplateId[] = [
        "classic",
        "modern",
        "ats",
        "sidebar",
        "professional",
      ];

      if (!validTemplates.includes(data.templateId)) {
        throw new Error("Invalid template");
      }

      const importedCV = data.cv as CVData;

      if (
        !importedCV.fullName ||
        !importedCV.language ||
        !Array.isArray(importedCV.experiences) ||
        !Array.isArray(importedCV.projects) ||
        !Array.isArray(importedCV.education) ||
        !Array.isArray(importedCV.skills)
      ) {
        throw new Error("Invalid CV data");
      }

      if (importedCV.language !== "vi" && importedCV.language !== "en") {
        throw new Error("Invalid language");
      }

      // Khôi phục dữ liệu
      setCV(importedCV);
      setTemplate(data.templateId);

      alert(
        importedCV.language === "vi"
          ? "Import CV thành công!"
          : "CV imported successfully!",
      );
    } catch (error) {
      console.error(error);

      alert("File JSON không hợp lệ hoặc không đúng định dạng CV!");
    } finally {
      event.target.value = "";
    }
  }

  function handleAvatarUpload(file: File) {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        update("avatar", reader.result);
      }
    };

    reader.readAsDataURL(file);
  }

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#263b30]">
      <header className="no-print border-b border-[#dce2d8] bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold">CV Builder</h1>

            <p className="mt-1 text-sm text-gray-500">{labels.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Language */}
            <button
              type="button"
              onClick={() => update("language", isVi ? "en" : "vi")}
              className="flex items-center gap-2 rounded-lg border px-3 py-2 hover:bg-gray-50"
            >
              <Languages size={18} />
              {cv.language.toUpperCase()}
            </button>

            {/* Import JSON */}
            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#dce2d8] px-3 py-2 hover:bg-gray-50">
              <Upload size={18} />
              <span className="hidden sm:inline">{labels.importJSON}</span>

              <input
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={importJSON}
              />
            </label>

            {/* Export JSON */}
            <button
              type="button"
              onClick={exportJSON}
              className="flex items-center gap-2 rounded-lg border border-[#dce2d8] px-3 py-2 hover:bg-gray-50"
            >
              <FileJson size={18} />
              <span className="hidden sm:inline">{labels.exportJSON}</span>
            </button>

            {/* Export PDF */}
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
            template={template}
            handleAvatarUpload={handleAvatarUpload}
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
  );
}
