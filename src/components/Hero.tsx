import { motion } from 'motion/react';
import { Compass, Sparkles, Smartphone, ShieldCheck, Heart, ArrowDown, User } from 'lucide-react';
import { TravelerType, TravelerProfile } from '../types';
import { TRAVELER_PROFILES } from '../data';

interface HeroProps {
  selectedProfile: TravelerType;
  onProfileSelect: (type: TravelerType) => void;
}

export default function Hero({ selectedProfile, onProfileSelect }: HeroProps) {
  const profiles = Object.values(TRAVELER_PROFILES);

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-36 pb-24 flex flex-col justify-center items-center overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#131130]/35 via-[#02040a] to-[#02040a]"
    >
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* PWA Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-[10px] font-semibold text-slate-400 mb-8 backdrop-blur-md shadow-inner"
        >
          <Sparkles className="w-3 h-3 text-violet-400 animate-pulse" />
          <span className="font-mono tracking-wider">SECURE PASS // PWA READY FOR DESKTOP & MOBILE</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-medium text-4xl sm:text-6xl tracking-tight text-white mb-6 leading-[1.1]"
        >
          Sınırları Sorunsuzca Aşın. <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-violet-400">
            Vize Hesaplamalarını Bize Bırakın.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto mb-12 font-normal leading-relaxed"
        >
          Dijital göçebeler, expat’ler ve dünya gezginleri için tasarlanmış akıllı seyahat asistanı. 
          Vizelerinizi, Schengen limitlerinizi ve seyahat geçmişinizi tek merkezden anında yönetin.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20"
        >
          <a
            href="#simulator"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-200 active:scale-95 text-xs font-bold uppercase tracking-wider text-black transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Simülatörü Başlat</span>
          </a>
          <a
            href="#benefits"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 active:scale-95 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Smartphone className="w-4 h-4 text-violet-400" />
            <span>Özellikleri Keşfet</span>
          </a>
        </motion.div>

        {/* Dynamic Switcher Explanation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="border-t border-white/5 pt-12"
        >
          <div className="flex items-center justify-center gap-2 text-[10px] font-mono tracking-widest text-violet-400 font-bold uppercase mb-4">
            <User className="w-3.5 h-3.5" />
            <span>[ STEP_01: SELECT_YOUR_TRAVEL_PROFILE ]</span>
          </div>
          <p className="text-xs text-slate-400 max-w-lg mx-auto mb-10 leading-relaxed">
            Aşağıdaki hazır profillerden birini seçerek simülasyonu kendinize göre özelleştirin. 
            Tüm takipçiler ve vize sorguları seçtiğiniz profile göre canlı olarak güncellenecektir.
          </p>

          {/* Profile Switcher Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {profiles.map((profile) => {
              const isSelected = selectedProfile === profile.id;
              return (
                <button
                  key={profile.id}
                  onClick={() => onProfileSelect(profile.id as TravelerType)}
                  className={`relative p-6 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#0e0c21]/80 to-[#02040a] border-violet-500/40 shadow-xl shadow-violet-950/20 ring-1 ring-violet-500/20'
                      : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-white/10 shadow-lg shadow-black/40'
                  }`}
                >
                  {/* Selected Dot / Pulse Indicator */}
                  {isSelected && (
                    <span className="absolute top-5 right-5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75 animate-duration-1000"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                    </span>
                  )}

                  <div>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono font-semibold mb-3 ${
                      isSelected 
                        ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' 
                        : 'bg-white/5 text-slate-400'
                    }`}>
                      {profile.badge}
                    </span>
                    <h3 className="font-display font-medium text-sm sm:text-base text-white mb-2">
                      {profile.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {profile.subtitle}
                    </p>
                  </div>

                  {/* Profile Status Preview */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Pasaport: {profile.initialPassports[0]?.flag} {profile.initialPassports[0]?.countryCode}</span>
                    <span>Seyahat: {profile.initialTravels.length} kayıt</span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="mt-16 animate-bounce text-slate-500 flex flex-col items-center gap-1">
          <span className="text-[10px] font-mono tracking-widest uppercase">Canlı Simülatöre Geç</span>
          <ArrowDown className="w-4 h-4 text-violet-500" />
        </div>
      </div>
    </section>
  );
}
