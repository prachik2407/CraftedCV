import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Heart, Save, Share2Icon, Sparkles, User } from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const { token } = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id: '', title: '', personal_info: {}, professional_summary: "",
    experience: [], education: [], project: [], skills: [],
    template: "classic", accent_color: "#3B82F6", public: false,
  })

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get('/api/resumes/get/' + resumeId, { headers: { Authorization: token } })
      if (data.resume) {
        setResumeData(data.resume)
        document.title = data.resume.title;
      }
    } catch (error) { console.log(error.message) }
  }

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ]

  const activeSection = sections[activeSectionIndex]

  useEffect(() => { loadExistingResume() }, [])

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData()
      formData.append("resumeId", resumeId)
      formData.append("resumeData", JSON.stringify({ public: !resumeData.public }))
      const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } })
      setResumeData({ ...resumeData, public: !resumeData.public })
      toast.success(data.message)
    } catch (error) { console.error("Error saving resume:", error) }
  }

  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeId;
    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" })
    } else { alert('Share not supported on this browser.') }
  }

  const downloadResume = () => { window.print(); }

  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData)
      if (typeof resumeData.personal_info.image === 'object') {
        delete updatedResumeData.personal_info.image
      }
      const formData = new FormData();
      formData.append("resumeId", resumeId)
      formData.append('resumeData', JSON.stringify(updatedResumeData))
      removeBackground && formData.append("removeBackground", "yes");
      typeof resumeData.personal_info.image === 'object' && formData.append("image", resumeData.personal_info.image)
      const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } })
      setResumeData(data.resume)
      toast.success(data.message)
    } catch (error) { console.error("Error saving resume:", error) }
  }

  const progressPct = (activeSectionIndex / (sections.length - 1)) * 100

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#FFF8F3] via-[#FFF1E6] to-[#FFE5D9] relative overflow-hidden'>
      {/* Soft decorative orbs */}
      <div className="fixed top-1/4 -left-20 size-80 bg-rose-200 blur-[120px] opacity-30 rounded-full pointer-events-none" />
      <div className="fixed bottom-1/4 -right-20 size-80 bg-amber-200 blur-[120px] opacity-25 rounded-full pointer-events-none" />

      {/* Top bar */}
      <div className="relative max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        <Link to={'/app'} className='inline-flex gap-2 items-center text-rose-700 hover:text-rose-900 transition group'>
          <ArrowLeftIcon className="size-4 group-hover:-translate-x-0.5 transition" />
          <span className="text-sm">Back to Dashboard</span>
        </Link>

        <div className="flex items-center gap-2">
          {resumeData.public && (
            <button onClick={handleShare} className='flex items-center gap-1.5 px-4 py-2 text-xs rounded-full bg-pink-100 border border-pink-200 text-pink-700 hover:bg-pink-200 transition'>
              <Share2Icon className='size-3.5' /> Share
            </button>
          )}
          <button onClick={changeResumeVisibility} className='flex items-center gap-1.5 px-4 py-2 text-xs rounded-full bg-amber-100 border border-amber-200 text-amber-700 hover:bg-amber-200 transition'>
            {resumeData.public ? <EyeIcon className="size-3.5" /> : <EyeOffIcon className="size-3.5" />}
            {resumeData.public ? 'Public' : 'Private'}
          </button>
          <button onClick={downloadResume} className='flex items-center gap-1.5 px-5 py-2 text-xs rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium shadow-lg shadow-rose-200 transition'>
            <DownloadIcon className='size-3.5' /> Download
          </button>
        </div>
      </div>

      {/* Resume title display */}
      <div className="relative max-w-7xl mx-auto px-4 mb-4">
        <div className="flex items-center gap-2 text-xs text-rose-700">
          <Heart size={11} className="text-rose-500 fill-rose-200" />
          <span>Crafting: <span className="text-rose-950 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>{resumeData.title || 'Untitled Resume'}</span></span>
        </div>
      </div>

      <div className='relative max-w-7xl mx-auto px-4 pb-12'>
        <div className='grid lg:grid-cols-12 gap-6'>

          {/* Left Panel - Form */}
          <div className='lg:col-span-5'>
            <div className='relative rounded-3xl bg-white/80 border border-rose-100 backdrop-blur-xl shadow-xl shadow-rose-200/30 overflow-hidden'>

              {/* Progress bar */}
              <div className="h-1 bg-rose-100 relative">
                <div
                  className="h-full bg-gradient-to-r from-rose-400 via-pink-400 to-amber-400 transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* Section pills */}
              <div className="px-6 pt-4 pb-3 flex items-center gap-1 overflow-x-auto scrollbar-hide">
                {sections.map((section, idx) => {
                  const Icon = section.icon
                  const isActive = idx === activeSectionIndex
                  const isDone = idx < activeSectionIndex
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSectionIndex(idx)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-rose-500 text-white shadow-md shadow-rose-200'
                          : isDone
                            ? 'bg-rose-100 text-rose-700 border border-rose-200'
                            : 'text-rose-900/50 hover:text-rose-700 hover:bg-rose-50'
                      }`}
                    >
                      <Icon size={13} />
                      <span className="hidden sm:inline">{section.name}</span>
                    </button>
                  )
                })}
              </div>

              {/* Toolbar */}
              <div className="px-6 py-3 border-t border-b border-rose-100 flex items-center justify-between gap-2 flex-wrap bg-rose-50/40">
                <div className='flex items-center gap-2'>
                  <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData(prev => ({ ...prev, template }))} />
                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />
                </div>

                <div className='flex items-center gap-1'>
                  <button
                    onClick={() => setActiveSectionIndex(prev => Math.max(prev - 1, 0))}
                    disabled={activeSectionIndex === 0}
                    className='flex items-center gap-1 px-3 py-1.5 rounded-full text-xs text-rose-700 hover:bg-white transition disabled:opacity-30 disabled:hover:bg-transparent'
                  >
                    <ChevronLeft className="size-4" /> Prev
                  </button>
                  <button
                    onClick={() => setActiveSectionIndex(prev => Math.min(prev + 1, sections.length - 1))}
                    disabled={activeSectionIndex === sections.length - 1}
                    className='flex items-center gap-1 px-3 py-1.5 rounded-full text-xs text-rose-600 hover:bg-rose-100 transition disabled:opacity-30 disabled:hover:bg-transparent'
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* Form content */}
              <div className="p-2">
                <div className='bg-white rounded-2xl p-5 space-y-6'>
                  {activeSection.id === 'personal' && (
                    <PersonalInfoForm data={resumeData.personal_info} onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />
                  )}
                  {activeSection.id === 'summary' && (
                    <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))} setResumeData={setResumeData} />
                  )}
                  {activeSection.id === 'experience' && (
                    <ExperienceForm data={resumeData.experience} onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))} />
                  )}
                  {activeSection.id === 'education' && (
                    <EducationForm data={resumeData.education} onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} />
                  )}
                  {activeSection.id === 'projects' && (
                    <ProjectForm data={resumeData.project} onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))} />
                  )}
                  {activeSection.id === 'skills' && (
                    <SkillsForm data={resumeData.skills} onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} />
                  )}
                </div>
              </div>

              {/* Save button */}
              <div className="px-6 pb-5 pt-1 flex items-center justify-between gap-3">
                <p className="text-xs text-rose-900/60 italic">
                  Step <span className="text-rose-950 font-medium not-italic">{activeSectionIndex + 1}</span> of {sections.length}
                </p>
                <button
                  onClick={() => { toast.promise(saveResume(), { loading: 'Saving...', success: 'Saved!', error: 'Failed' }) }}
                  className='flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full px-5 py-2 text-sm font-medium shadow-lg shadow-rose-200 transition active:scale-95'
                >
                  <Save size={14} /> Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Preview (keep white for print) */}
          <div className='lg:col-span-7'>
            <div className='rounded-3xl bg-white border border-rose-100 shadow-xl shadow-rose-200/30 overflow-hidden'>
              <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </div>
  )
}

export default ResumeBuilder