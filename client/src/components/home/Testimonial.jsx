import React from 'react'
import Title from './Title'
import { Heart } from 'lucide-react'

const Testimonial = () => {
  const cardsData = [
    { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200', name: 'Ananya Sharma', handle: 'Marketing Manager @ Nykaa', quote: 'CraftedCV felt like having a personal designer guide me. My resume finally looks like me.' },
    { image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200', name: 'Ishita Verma', handle: 'UX Designer @ Zomato', quote: 'The serif templates are stunning. Three offers in two weeks — I\'m still in disbelief.' },
    { image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&auto=format&fit=crop&q=60', name: 'Riya Bansal', handle: 'HR Specialist @ Tata', quote: 'As someone who reviews resumes daily, I can say this is what good design looks like.' },
    { image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=60', name: 'Meera Iyer', handle: 'Content Strategist @ Hotstar', quote: 'Beautiful, intuitive, and genuinely helpful. The AI writing suggestions are spot-on.' },
  ];

  const CreateCard = ({ card }) => (
    <div className="p-6 rounded-3xl mx-3 w-80 shrink-0 bg-white/90 backdrop-blur border border-rose-100 shadow-sm hover:shadow-xl hover:shadow-rose-100/40 transition-all">
      <Heart className="size-5 text-rose-400 mb-3 fill-rose-100" />
      <p className="text-sm text-rose-900/80 leading-relaxed mb-5 italic" style={{ fontFamily: "'Playfair Display', serif" }}>"{card.quote}"</p>
      <div className="flex gap-3 items-center pt-4 border-t border-rose-100">
        <img className="size-11 rounded-full ring-2 ring-rose-200" src={card.image} alt={card.name} />
        <div>
          <p className="text-rose-950 font-medium text-sm">{card.name}</p>
          <span className="text-xs text-rose-900/60">{card.handle}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div id='testimonials' className='bg-gradient-to-b from-[#FFF8F3] via-[#FFF1E6] to-[#FFE5D9] py-24 scroll-mt-12 relative overflow-hidden'>
      <div className="flex flex-col items-center mb-12 px-4">
        <div className="flex items-center gap-2 text-xs text-rose-700 bg-white/70 border border-rose-200 rounded-full px-4 py-1.5">
          <span className="uppercase tracking-[0.2em] font-medium">Stories</span>
        </div>
        <Title title='Words from our community' description='Real journeys from people who chose to tell their professional story with us.' />
      </div>

      <div className="marquee-row w-full mx-auto max-w-6xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#FFF1E6] to-transparent"></div>
        <div className="marquee-inner flex transform-gpu min-w-[200%] py-5">
          {[...cardsData, ...cardsData].map((card, index) => <CreateCard key={index} card={card} />)}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#FFF1E6] to-transparent"></div>
      </div>

      <div className="marquee-row w-full mx-auto max-w-6xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#FFF1E6] to-transparent"></div>
        <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] py-5">
          {[...cardsData, ...cardsData].map((card, index) => <CreateCard key={index} card={card} />)}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#FFF1E6] to-transparent"></div>
      </div>

      <style>{`
        @keyframes marqueeScroll { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .marquee-inner { animation: marqueeScroll 35s linear infinite; }
        .marquee-reverse { animation-direction: reverse; }
      `}</style>
    </div>
  )
}

export default Testimonial