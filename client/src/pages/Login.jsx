import { Lock, Mail, User2Icon, Eye, EyeOff, Heart } from 'lucide-react'
import React from 'react'
import api from '../configs/api'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'

const Login = () => {
    const dispatch = useDispatch()
    const query = new URLSearchParams(window.location.search)
    const urlState = query.get('state')
    const [state, setState] = React.useState(urlState || "login")
    const [showPassword, setShowPassword] = React.useState(false)

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await api.post(`/api/users/${state}`, formData)
            dispatch(login(data))
            localStorage.setItem('token', data.token)
            toast.success(data.message)
        } catch (error) {
            toast(error?.response?.data?.message || error.message)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-[#FFF8F3] via-[#FFF1E6] to-[#FFE5D9] relative overflow-hidden p-4'>
            {/* Soft decorative orbs */}
            <div className="absolute top-1/4 left-10 size-72 bg-rose-200 blur-[120px] opacity-50 rounded-full" />
            <div className="absolute bottom-1/4 right-10 size-80 bg-amber-200 blur-[120px] opacity-40 rounded-full" />
            <div className="absolute top-1/2 right-1/3 size-60 bg-pink-200 blur-[100px] opacity-30 rounded-full" />

            <form onSubmit={handleSubmit} className="relative w-full sm:w-[420px] text-center rounded-3xl px-8 py-10 bg-white/80 border border-rose-100 backdrop-blur-xl shadow-xl shadow-rose-200/40">
                {/* Logo */}
                <div className="flex items-center justify-center gap-2.5 mb-2">
                    <div className="size-10 rounded-full bg-gradient-to-br from-rose-400 to-amber-300 flex items-center justify-center font-bold text-white text-xl shadow-md">C</div>
                    <span className="text-rose-950 font-bold text-xl tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>CraftedCV</span>
                </div>

                <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-rose-50 border border-rose-200">
                    <Heart size={11} className="text-rose-500 fill-rose-200" />
                    <span className="text-xs text-rose-700">{state === "login" ? "Welcome back" : "Hello, lovely"}</span>
                </div>

                <h1 className="text-rose-950 text-3xl mt-4 tracking-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                    {state === "login" ? "Welcome back" : "Begin your story"}
                </h1>
                <p className="text-rose-900/60 text-sm mt-2">
                    {state === "login" ? "Sign in to continue crafting" : "Create your account in seconds"}
                </p>

                {state !== "login" && (
                    <div className="flex items-center mt-6 w-full bg-rose-50/50 border border-rose-200 focus-within:border-rose-400 transition h-12 rounded-full overflow-hidden pl-5 gap-3">
                        <User2Icon size={16} className="text-rose-400" />
                        <input type="text" name="name" placeholder="Your name" className="bg-transparent border-none outline-none ring-0 text-rose-950 placeholder:text-rose-300 w-full" value={formData.name} onChange={handleChange} required />
                    </div>
                )}

                <div className="flex items-center w-full mt-4 bg-rose-50/50 border border-rose-200 focus-within:border-rose-400 transition h-12 rounded-full overflow-hidden pl-5 gap-3">
                    <Mail size={16} className="text-rose-400" />
                    <input type="email" name="email" placeholder="Email address" className="bg-transparent border-none outline-none ring-0 text-rose-950 placeholder:text-rose-300 w-full" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="flex items-center mt-4 w-full bg-rose-50/50 border border-rose-200 focus-within:border-rose-400 transition h-12 rounded-full overflow-hidden pl-5 pr-4 gap-3">
                    <Lock size={16} className="text-rose-400" />
                    <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="bg-transparent border-none outline-none ring-0 text-rose-950 placeholder:text-rose-300 w-full" value={formData.password} onChange={handleChange} required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-rose-400 hover:text-rose-600 transition">
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>

                {state === "login" && (
                    <div className="mt-3 text-right">
                        <button type="button" className="text-xs text-rose-500 hover:text-rose-700 transition italic">Forgot password?</button>
                    </div>
                )}

                <button type="submit" className="mt-5 w-full h-12 rounded-full text-white bg-rose-500 hover:bg-rose-600 active:scale-[0.98] transition-all font-medium shadow-lg shadow-rose-200">
                    {state === "login" ? "Sign in" : "Create account"}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-rose-200" />
                    <span className="text-xs text-rose-400 uppercase tracking-[0.2em]">or</span>
                    <div className="flex-1 h-px bg-rose-200" />
                </div>

                <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-rose-900/70 text-sm cursor-pointer">
                    {state === "login" ? "New here?" : "Already have an account?"}{' '}
                    <span className="text-rose-600 hover:text-rose-800 transition font-medium">
                        {state === "login" ? "Create an account" : "Sign in"}
                    </span>
                </p>

                <p className="text-[10px] text-rose-900/40 mt-6">
                    By continuing you agree to our Terms & Privacy Policy
                </p>
            </form>

            <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
    * { font-family: 'Inter', sans-serif; }

    /* Fix browser autofill making inputs white */
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px transparent inset !important;
        -webkit-text-fill-color: #4c0519 !important;
        caret-color: #e11d48 !important;
        transition: background-color 5000s ease-in-out 0s;
        background-clip: content-box !important;
    }
`}</style>
        </div>
    )
}

export default Login