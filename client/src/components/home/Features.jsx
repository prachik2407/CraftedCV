import React from 'react'
import Title from './Title'
import { Sparkles, Heart, Palette, FileHeart, Feather, Sun } from 'lucide-react'

const Features = () => {
  const features = [
    { icon: <Feather className="size-6" />, title: 'Thoughtful AI Writing', desc: 'Gentle, intelligent suggestions that help your achievements shine through.', color: 'bg-rose-100 text-rose-600' },
    { icon: <Palette className="size-6" />, title: 'Curated Templates', desc: 'Hand-picked, designer-made layouts. Every template tells a story.', color: 'bg-amber-100 text-amber-600' },
    { icon: <Sparkles className="size-6" />, title: 'Live Preview Magic', desc: 'Watch your resume come together in real-time as you write.', color: 'bg-pink-100 text-pink-600' },
    { icon: <Heart className="size-6" />, title: 'Made with Care', desc: 'Privacy-first, ad-free, and built around what truly matters — you.', color: 'bg-fuchsia-100 text-fuchsia-600' },
    { icon: <FileHeart className="size-6" />, title: 'Effortless Export', desc: 'Download as a beautiful PDF or share a personal link in one click.', color: 'bg-orange-100 text-orange-600' },
    { icon: <Sun className="size-6" />, title: 'Designed to Delight', desc: 'A calm, distraction-free space to craft your professional self.', color: 'bg-yellow-100 text-yellow-600' },
  ];

  return (
    <div id='features' className='py-24 bg-gradient-to-b from-[#FFE8DD] via-[#FFF1E6] to-[#FFF8F3] scroll-mt-12'>
      <div className="flex flex-col items-center px-4 md:px-16 lg:px-24">
        <div className="flex items-center gap-2 text-xs text-rose-700 bg-white/70 border border-rose-200 rounded-full px-4 py-1.5">
          <Sparkles size={12} />
          <span className="uppercase tracking-[0.2em] font-medium">What we offer</span>
        </div>

        <Title title='Crafted with intention' description='Every feature designed to help you tell your professional story with grace and clarity.' />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-6xl w-full">
          {features.map((f, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-white/80 backdrop-blur border border-rose-100 hover:border-rose-300 hover:shadow-xl hover:shadow-rose-100/50 transition-all hover:-translate-y-1">
              <div className={`size-14 rounded-2xl ${f.color} flex items-center justify-center mb-5`}>{f.icon}</div>
              <h3 className="text-xl text-rose-950 mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>{f.title}</h3>
              <p className="text-sm text-rose-900/70 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>
    </div>
  )
}

export default Features