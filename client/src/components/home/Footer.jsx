import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="bg-gradient-to-b from-[#FFF1E6] to-[#FDEAD7] border-t border-rose-200/60 px-6 md:px-16 lg:px-24 xl:px-32 pt-16 pb-8">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center lg:justify-between gap-10 md:gap-16">
          <div className="max-w-sm">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="size-9 rounded-full bg-gradient-to-br from-rose-400 to-amber-300 flex items-center justify-center font-bold text-white text-lg shadow-md">C</div>
              <span className="text-rose-950 font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>CraftedCV</span>
            </a>
            <p className="text-sm text-rose-900/70 leading-relaxed">A thoughtful resume builder for storytellers, dreamers, and doers. Designed with care, built with love.</p>
            <div className="flex items-center gap-4 mt-5">
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="text-rose-500 hover:text-rose-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="text-rose-500 hover:text-rose-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://www.pinterest.com" target="_blank" rel="noreferrer" className="text-rose-500 hover:text-rose-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.137.893 2.739a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" /></svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16">
            <div>
              <p className="text-rose-950 font-semibold text-sm uppercase tracking-[0.15em] mb-3">Product</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-rose-900/70 hover:text-rose-600 transition">Templates</a></li>
                <li><a href="#" className="text-rose-900/70 hover:text-rose-600 transition">Examples</a></li>
                <li><a href="#" className="text-rose-900/70 hover:text-rose-600 transition">Pricing</a></li>
                <li><a href="#" className="text-rose-900/70 hover:text-rose-600 transition">Updates</a></li>
              </ul>
            </div>
            <div>
              <p className="text-rose-950 font-semibold text-sm uppercase tracking-[0.15em] mb-3">Inspire</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-rose-900/70 hover:text-rose-600 transition">Career Blog</a></li>
                <li><a href="#" className="text-rose-900/70 hover:text-rose-600 transition">Cover Letters</a></li>
                <li><a href="#" className="text-rose-900/70 hover:text-rose-600 transition">Interview Tips</a></li>
                <li><a href="#" className="text-rose-900/70 hover:text-rose-600 transition">Community</a></li>
              </ul>
            </div>
            <div>
              <p className="text-rose-950 font-semibold text-sm uppercase tracking-[0.15em] mb-3">Company</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-rose-900/70 hover:text-rose-600 transition">About</a></li>
                <li><a href="#" className="text-rose-900/70 hover:text-rose-600 transition">Privacy</a></li>
                <li><a href="#" className="text-rose-900/70 hover:text-rose-600 transition">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-rose-200/60 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-rose-900/60">© 2026 CraftedCV. Made with 🌸 in India.</p>
          <p className="text-xs text-rose-900/60">Crafted with care · Built with React + Tailwind</p>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>
    </>
  )
}

export default Footer