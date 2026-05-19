import { FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon, FileText, Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import pdfToText from 'react-pdftotext'

const Dashboard = () => {
  const { user, token } = useSelector(state => state.auth)

  // CraftedCV warm palette
  const colors = ["#e11d48", "#f59e0b", "#ec4899", "#f97316", "#d946ef", "#fb7185"]

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } })
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const createResume = async (event) => {
    try {
      event.preventDefault()
      const { data } = await api.post('/api/resumes/create', { title }, { headers: { Authorization: token } })
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, { headers: { Authorization: token } })
      setTitle('')
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false)
  }

  const editTitle = async (event) => {
    try {
      event.preventDefault()
      const { data } = await api.put(`/api/resumes/update`, { resumeId: editResumeId, resumeData: { title } }, { headers: { Authorization: token } })
      setAllResumes(allResumes.map(resume => resume._id === editResumeId ? { ...resume, title } : resume))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this resume?')
      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, { headers: { Authorization: token } })
        setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => { loadAllResumes() }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#FFF8F3] via-[#FFF1E6] to-[#FFE5D9] relative overflow-hidden'>
      {/* Soft decorative orbs */}
      <div className="fixed top-1/4 -left-20 size-80 bg-rose-200 blur-[120px] opacity-40 rounded-full pointer-events-none" />
      <div className="fixed bottom-1/4 -right-20 size-80 bg-amber-200 blur-[120px] opacity-30 rounded-full pointer-events-none" />

      <div className='relative max-w-7xl mx-auto px-4 py-10'>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-rose-200 mb-3">
            <Heart size={11} className="text-rose-500 fill-rose-200" />
            <span className="text-xs text-rose-700">Your workspace</span>
          </div>
          <h1 className='text-3xl md:text-4xl text-rose-950 tracking-tight' style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
            Hello,{' '}
            <em className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent not-italic">
              {user?.name?.split(' ')[0] || 'lovely'}
            </em>
          </h1>
          <p className="text-rose-900/60 mt-2">Continue crafting your story, or begin a new chapter.</p>
        </div>

        {/* Action buttons */}
        <div className='flex flex-col sm:flex-row gap-4 mb-10'>
          <button
            onClick={() => setShowCreateResume(true)}
            className='group w-full sm:max-w-xs h-44 flex flex-col items-center justify-center rounded-3xl gap-3 bg-white/80 backdrop-blur border border-rose-100 hover:border-rose-300 hover:shadow-xl hover:shadow-rose-100/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer'
          >
            <div className='size-12 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center shadow-md shadow-rose-200'>
              <PlusIcon className='size-6 text-white' />
            </div>
            <p className='text-sm text-rose-950 font-medium' style={{ fontFamily: "'Playfair Display', serif" }}>Start a new resume</p>
            <p className='text-xs text-rose-900/60'>From a blank page</p>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className='group w-full sm:max-w-xs h-44 flex flex-col items-center justify-center rounded-3xl gap-3 bg-white/80 backdrop-blur border border-rose-100 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-100/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer'
          >
            <div className='size-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center shadow-md shadow-amber-200'>
              <UploadCloudIcon className='size-6 text-white' />
            </div>
            <p className='text-sm text-rose-950 font-medium' style={{ fontFamily: "'Playfair Display', serif" }}>Upload an existing one</p>
            <p className='text-xs text-rose-900/60'>We'll handle the rest</p>
          </button>
        </div>

        {/* My resumes section */}
        {allResumes.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-xl text-rose-950" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>Your collection</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                {allResumes.length} {allResumes.length === 1 ? 'resume' : 'resumes'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {allResumes.map((resume, index) => {
                const baseColor = colors[index % colors.length];
                return (
                  <button
                    key={index}
                    onClick={() => navigate(`/app/builder/${resume._id}`)}
                    className='relative h-44 flex flex-col items-center justify-center rounded-3xl gap-2 border group hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden bg-white/70 backdrop-blur'
                    style={{ borderColor: baseColor + '40' }}
                  >
                    <div
                      className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity"
                      style={{ background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}25)` }}
                    />
                    <FileText className="size-8 group-hover:scale-110 transition-all relative" style={{ color: baseColor }} />
                    <p className='text-sm font-medium px-3 text-center relative line-clamp-2' style={{ color: baseColor, fontFamily: "'Playfair Display', serif" }}>
                      {resume.title}
                    </p>
                    <p className='absolute bottom-2 text-[10px] text-rose-900/50 px-2 text-center'>
                      {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>

                    <div onClick={e => e.stopPropagation()} className='absolute top-2 right-2 group-hover:flex items-center hidden gap-1'>
                      <button
                        onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }}
                        className="size-7 p-1.5 rounded-full bg-white/80 hover:bg-white backdrop-blur text-rose-700 hover:text-rose-900 transition shadow-sm"
                      >
                        <PencilIcon className="size-4" />
                      </button>
                      <button
                        onClick={() => deleteResume(resume._id)}
                        className="size-7 p-1.5 rounded-full bg-white/80 hover:bg-rose-100 backdrop-blur text-rose-600 hover:text-rose-800 transition shadow-sm"
                      >
                        <TrashIcon className="size-4" />
                      </button>
                    </div>
                  </button>
                )
              })}
            </div>
          </>
        )}

        {allResumes.length === 0 && (
          <div className="text-center py-16 rounded-3xl border border-dashed border-rose-200 bg-white/40">
            <FileText className="size-12 mx-auto text-rose-300 mb-3" />
            <p className="text-rose-900/60 italic">No resumes yet — create your first one above 🌸</p>
          </div>
        )}

        {/* Create modal */}
        {showCreateResume && (
          <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className='fixed inset-0 bg-rose-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <div onClick={e => e.stopPropagation()} className='relative bg-white border border-rose-100 shadow-2xl shadow-rose-200/40 rounded-3xl w-full max-w-md p-7'>
              <h2 className='text-2xl text-rose-950 mb-1' style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Begin a new chapter</h2>
              <p className='text-sm text-rose-900/60 mb-5'>What would you like to call this one?</p>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder='e.g. Marketing Manager 2026'
                className='w-full px-4 py-3 mb-4 bg-rose-50/50 border border-rose-200 focus:border-rose-400 outline-none rounded-full text-rose-950 placeholder:text-rose-300'
                required
              />
              <button className='w-full py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-medium transition-all shadow-lg shadow-rose-200'>
                Create resume
              </button>
              <XIcon className='absolute top-4 right-4 text-rose-400 hover:text-rose-700 cursor-pointer transition' onClick={() => { setShowCreateResume(false); setTitle('') }} />
            </div>
          </form>
        )}

        {/* Upload modal */}
        {showUploadResume && (
          <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)} className='fixed inset-0 bg-rose-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <div onClick={e => e.stopPropagation()} className='relative bg-white border border-rose-100 shadow-2xl shadow-amber-200/40 rounded-3xl w-full max-w-md p-7'>
              <h2 className='text-2xl text-rose-950 mb-1' style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Upload your resume</h2>
              <p className='text-sm text-rose-900/60 mb-5'>We'll gently extract everything for you.</p>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder='Resume title'
                className='w-full px-4 py-3 mb-4 bg-rose-50/50 border border-rose-200 focus:border-rose-400 outline-none rounded-full text-rose-950 placeholder:text-rose-300'
                required
              />
              <label htmlFor="resume-input" className="block text-sm">
                <div className='flex flex-col items-center justify-center gap-2 border border-dashed border-rose-200 hover:border-rose-400 text-rose-400 hover:text-rose-600 rounded-2xl p-6 my-3 cursor-pointer transition bg-rose-50/30'>
                  {resume ? (
                    <p className='text-rose-700 font-medium'>{resume.name}</p>
                  ) : (
                    <>
                      <UploadCloud className='size-12 stroke-1' />
                      <p>Click to upload PDF</p>
                    </>
                  )}
                </div>
              </label>
              <input type="file" id='resume-input' accept='.pdf' hidden onChange={(e) => setResume(e.target.files[0])} />
              <button disabled={isLoading} className='w-full py-3 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white rounded-full font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-200 disabled:opacity-60'>
                {isLoading && <LoaderCircleIcon className='animate-spin size-4' />}
                {isLoading ? 'Processing...' : 'Upload resume'}
              </button>
              <XIcon className='absolute top-4 right-4 text-rose-400 hover:text-rose-700 cursor-pointer transition' onClick={() => { setShowUploadResume(false); setTitle('') }} />
            </div>
          </form>
        )}

        {/* Edit modal */}
        {editResumeId && (
          <form onSubmit={editTitle} onClick={() => setEditResumeId('')} className='fixed inset-0 bg-rose-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <div onClick={e => e.stopPropagation()} className='relative bg-white border border-rose-100 shadow-2xl shadow-rose-200/40 rounded-3xl w-full max-w-md p-7'>
              <h2 className='text-2xl text-rose-950 mb-1' style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Rename resume</h2>
              <p className='text-sm text-rose-900/60 mb-5'>Update the title for this one.</p>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder='New title'
                className='w-full px-4 py-3 mb-4 bg-rose-50/50 border border-rose-200 focus:border-rose-400 outline-none rounded-full text-rose-950 placeholder:text-rose-300'
                required
              />
              <button className='w-full py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-medium transition-all shadow-lg shadow-rose-200'>
                Save changes
              </button>
              <XIcon className='absolute top-4 right-4 text-rose-400 hover:text-rose-700 cursor-pointer transition' onClick={() => { setEditResumeId(''); setTitle('') }} />
            </div>
          </form>
        )}

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>
    </div>
  )
}

export default Dashboard