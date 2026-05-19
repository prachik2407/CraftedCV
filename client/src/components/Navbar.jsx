import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice'
import { LogOut } from 'lucide-react'

const Navbar = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutUser = () => {
    navigate('/')
    dispatch(logout())
  }

  return (
    <div className='bg-gradient-to-r from-[#FFF8F3] via-[#FFF1E6] to-[#FFE5D9] border-b border-rose-200/60 sticky top-0 z-40 backdrop-blur-xl'>
      <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 transition-all'>
        <Link to='/' className="flex items-center gap-2.5">
          <div className="size-9 rounded-full bg-gradient-to-br from-rose-400 to-amber-300 flex items-center justify-center font-bold text-white text-lg shadow-md">C</div>
          <span className="text-rose-950 font-bold text-lg tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>CraftedCV</span>
        </Link>

        <div className='flex items-center gap-4 text-sm'>
          <div className='max-sm:hidden flex items-center gap-2'>
            <div className='size-8 rounded-full bg-gradient-to-br from-rose-400 to-amber-300 flex items-center justify-center text-white font-semibold text-xs uppercase shadow-sm'>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <p className='text-rose-900/70'>Hello, <span className="text-rose-950 font-medium">{user?.name}</span></p>
          </div>
          <button
            onClick={logoutUser}
            className='bg-white/70 hover:bg-white border border-rose-200 hover:border-rose-400 text-rose-700 hover:text-rose-900 px-5 py-1.5 rounded-full active:scale-95 transition-all flex items-center gap-2'
          >
            <LogOut size={14} />
            <span>Sign out</span>
          </button>
        </div>
      </nav>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>
    </div>
  )
}

export default Navbar