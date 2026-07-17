import React from 'react';
import { Compass, Shield, Activity, Smartphone, Download } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#02040a]/75 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl shadow-black/60'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-violet-700 flex items-center justify-center text-white shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-medium text-lg tracking-tight text-white flex items-center gap-1">
                Visa<span className="text-violet-400">Flow</span>
              </span>
              <span className="block text-[8px] font-mono tracking-widest text-slate-500 leading-none">
                SMART PASS SYSTEM
              </span>
            </div>
          </a>

          {/* Links - Hidden on Mobile, Premium Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#simulator"
              className="text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
            >
              Simülatör
            </a>
            <a
              href="#benefits"
              className="text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
            >
              Özellikler
            </a>
            <a
              href="#faq"
              className="text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
            >
              S.S.S
            </a>
          </div>

          {/* Right Side Info & PWA CTA */}
          <div className="flex items-center gap-3.5">
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#090d16] border border-white/5 text-[10px] font-mono text-emerald-400">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></span>
              SECURE ENGINE
            </div>
            <a
              href="#simulator"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-xs font-semibold text-white shadow-lg shadow-violet-600/15 transition-all hover:scale-[1.02] duration-200"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Yükle (PWA)</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
