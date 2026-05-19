import React from 'react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <div id='cta' className='bg-gradient-to-b from-[#FFE5D9] to-[#FFF1E6] py-24 px-4'>
      <div className="max-w-5xl mx-auto relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-amber-100 border border-rose-200 shadow-xl shadow-rose-100/50">
        <div className="absolute -top-20 -right-20 size-60 bg-rose-300 blur-[100px] opacity-50 rounded-full" />
        <div className="absolute -bottom-20 -left-20 size-60 bg-amber-300 blur-[100px] opacity-40 rounded-full" />

        <div className="relative flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-8 md:px-14 py-16 md:py-20">
          <div className="max-w-lg">
            <h3 className="text-3xl md:text-4xl text-rose-950 tracking-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              Ready to write your next chapter?
            </h3>
            <p className="text-rose-900/70 mt-3 text-base">Join thousands of professionals who've crafted their story with CraftedCV. Free to start, beautifully simple.</p>
          </div>
          <Link to="/app" className="flex items-center gap-2 rounded-full py-4 px-9 bg-rose-500 hover:bg-rose-600 transition text-white font-semibold shadow-xl shadow-rose-300/50 whitespace-nowrap">
            <span>Start crafting</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CallToAction