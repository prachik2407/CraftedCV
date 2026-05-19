import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const logos = [
    { name: 'Airbnb',    src: 'https://www.vectorlogo.zone/logos/airbnb/airbnb-ar21.svg' },
    { name: 'Spotify',   src: 'https://www.vectorlogo.zone/logos/spotify/spotify-ar21.svg' },
    { name: 'Pinterest', src: 'https://www.vectorlogo.zone/logos/pinterest/pinterest-ar21.svg' },
    { name: 'Figma',     src: 'https://www.vectorlogo.zone/logos/figma/figma-ar21.svg' },
    { name: 'Dribbble',  src: 'https://www.vectorlogo.zone/logos/dribbble/dribbble-ar21.svg' },
    { name: 'Behance',   src: 'https://www.vectorlogo.zone/logos/behance/behance-ar21.svg' },
]

  return (
    <>
      <div className="min-h-screen pb-20 bg-gradient-to-b from-[#FFF8F3] via-[#FFF1E6] to-[#FFE8DD] relative overflow-hidden">
        <div className="absolute top-32 left-10 size-72 bg-rose-200 blur-[120px] opacity-50 rounded-full" />
        <div className="absolute top-20 right-10 size-80 bg-amber-200 blur-[120px] opacity-40 rounded-full" />
        <div className="absolute bottom-0 left-1/3 size-96 bg-pink-100 blur-[140px] opacity-50 rounded-full" />

        <nav className="relative z-50 flex items-center justify-between w-full py-5 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
          <a href="#" className="flex items-center gap-2.5">
            <div className="size-9 rounded-full bg-gradient-to-br from-rose-400 to-amber-300 flex items-center justify-center font-bold text-white text-lg shadow-md">
              C
            </div>
            <span
              className="text-rose-950 font-bold text-lg tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              CraftedCV
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-rose-900/80">
            <a href="#" className="hover:text-rose-600 transition">
              Home
            </a>
            <a href="#features" className="hover:text-rose-600 transition">
              Features
            </a>
            <a href="#testimonials" className="hover:text-rose-600 transition">
              Stories
            </a>
            <a href="#cta" className="hover:text-rose-600 transition">
              Contact
            </a>
          </div>

          <div className="flex gap-2">
            <Link
              to="/app?state=register"
              className="hidden md:block px-6 py-2 bg-rose-500 hover:bg-rose-600 active:scale-95 transition-all rounded-full text-white font-medium shadow-md shadow-rose-200"
              hidden={user}
            >
              Get Started
            </Link>
            <Link
              to="/app?state=login"
              className="hidden md:block px-6 py-2 border border-rose-300 active:scale-95 hover:bg-rose-50 transition-all rounded-full text-rose-800"
              hidden={user}
            >
              Sign in
            </Link>
            <Link
              to="/app"
              className="hidden md:block px-8 py-2 bg-rose-500 hover:bg-rose-600 active:scale-95 transition-all rounded-full text-white font-medium shadow-md shadow-rose-200"
              hidden={!user}
            >
              Dashboard
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden active:scale-90 transition text-rose-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 5h16M4 12h16M4 19h16" />
            </svg>
          </button>
        </nav>

        <div
          className={`fixed inset-0 z-[100] bg-rose-50/95 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <a href="#" className="text-rose-900">
            Home
          </a>
          <a href="#features" className="text-rose-900">
            Features
          </a>
          <a href="#testimonials" className="text-rose-900">
            Stories
          </a>
          <a href="#cta" className="text-rose-900">
            Contact
          </a>
          <button
            onClick={() => setMenuOpen(false)}
            className="aspect-square size-10 p-1 bg-rose-500 hover:bg-rose-600 transition text-white rounded-full flex items-center justify-center"
          >
            X
          </button>
        </div>

        <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 mt-12">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur border border-rose-200">
            <span className="text-xs text-rose-700">
              ✨ Beautifully crafted, intelligently powered
            </span>
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl max-w-5xl text-center mt-7 md:leading-[1.1] text-rose-950 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
          >
            Your story, told{" "}
            <em className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent not-italic">
              beautifully.
            </em>
          </h1>

          <p className="max-w-xl text-center text-base my-7 text-rose-900/70 leading-relaxed">
            Craft elegant, recruiter-ready resumes with thoughtful AI guidance.
            Where polished design meets your unique journey — every detail,
            intentionally yours.
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link
              to="/app"
              className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-9 h-12 flex items-center transition-all shadow-lg shadow-rose-200 font-medium"
            >
              Begin your story
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
            <button className="flex items-center gap-2 border border-rose-300 hover:bg-white/60 transition rounded-full px-7 h-12 text-rose-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
                <rect x="2" y="6" width="14" height="12" rx="2"></rect>
              </svg>
              <span>See how it works</span>
            </button>
          </div>

          <div className="flex items-center mt-12">
            <div className="flex -space-x-3 pr-3">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
                alt=""
                className="size-9 object-cover rounded-full border-2 border-white shadow"
              />
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                alt=""
                className="size-9 object-cover rounded-full border-2 border-white shadow"
              />
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                alt=""
                className="size-9 object-cover rounded-full border-2 border-white shadow"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200"
                alt=""
                className="size-9 object-cover rounded-full border-2 border-white shadow"
              />
              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt=""
                className="size-9 rounded-full border-2 border-white shadow"
              />
            </div>
            <div>
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-amber-400"
                    >
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                    </svg>
                  ))}
              </div>
              <p className="text-xs text-rose-900/70 mt-1">
                Loved by 10,000+ storytellers
              </p>
            </div>
          </div>

          <p className="py-6 text-rose-900/50 mt-14 text-xs uppercase tracking-[0.2em]">
            As featured by
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 max-w-4xl w-full mx-auto py-4">
  {logos.map((logo, index) => (
    <img
      key={index}
      src={logo.src}
      alt={logo.name}
      className="h-8 w-auto opacity-60 hover:opacity-100 transition grayscale hover:grayscale-0"
    />
  ))}
</div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>
    </>
  );
};

export default Hero;
