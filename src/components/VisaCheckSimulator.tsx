import React from 'react';
import { Globe, Plus, Check, ShieldCheck, FileText, ArrowRight, BookOpen } from 'lucide-react';
import { Passport, VisaRequirement } from '../types';
import { SIMULATOR_PASSPORTS, DESTINATION_COUNTRIES, VISA_REQUIREMENTS_DB } from '../data';

interface VisaCheckSimulatorProps {
  selectedPassportId: string;
  onPassportSelect: (id: string) => void;
  registeredPassports: Passport[];
  onAddPassportToWallet: (passport: Passport) => void;
}

export default function VisaCheckSimulator({
  selectedPassportId,
  onPassportSelect,
  registeredPassports,
  onAddPassportToWallet,
}: VisaCheckSimulatorProps) {
  // Target country state
  const [targetCountryCode, setTargetCountryCode] = React.useState('TH'); // Default Thailand
  const [showAddMenu, setShowAddMenu] = React.useState(false);

  // Active passport object
  const activePassport =
    registeredPassports.find(p => p.id === selectedPassportId) || registeredPassports[0] || SIMULATOR_PASSPORTS[0];

  // Lookup visa requirement
  const lookupKey = `${activePassport.countryCode}_${targetCountryCode}`;
  const visaRule = VISA_REQUIREMENTS_DB[lookupKey] || {
    requirement: 'visa-required',
    durationText: 'Vize Gerekli',
    details: 'Vize kuralları konsolosluklar ile teyit edilmelidir.',
  };

  // Target country object
  const targetCountry =
    DESTINATION_COUNTRIES.find(c => c.code === targetCountryCode) || DESTINATION_COUNTRIES[0];

  // Unregistered passports that can be added
  const availableToAdd = SIMULATOR_PASSPORTS.filter(
    p => !registeredPassports.some(rp => rp.countryCode === p.countryCode)
  );

  // Styling helper for passport cover backgrounds
  const getPassportCoverBg = (color: string) => {
    switch (color) {
      case 'burgundy':
        return 'bg-gradient-to-br from-[#591218] via-[#3d0b0f] to-[#1a0406] border-red-500/20';
      case 'navy':
        return 'bg-gradient-to-br from-[#0c1f3b] via-[#071324] to-[#02050a] border-blue-500/20';
      case 'blue':
        return 'bg-gradient-to-br from-[#0b3338] via-[#061e21] to-[#010708] border-teal-500/20';
      case 'green':
        return 'bg-gradient-to-br from-[#0e2c1e] via-[#081b12] to-[#010503] border-emerald-500/20';
      default:
        return 'bg-gradient-to-br from-[#121826] via-[#090d16] to-[#02040a] border-white/5';
    }
  };

  return (
    <div className="bg-slate-950/45 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-black/80 h-full flex flex-col justify-between">
      <div>
        {/* Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-xl bg-violet-500/5 border border-white/5 text-violet-400">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-medium text-xl text-white">
              Çoklu Pasaport Sorgu & Cüzdan
            </h3>
            <p className="text-xs text-slate-400">
              Farklı pasaportlarınız için seyahat vizelerini ve muafiyetlerini eşzamanlı izleyin.
            </p>
          </div>
        </div>

        {/* Passport Wallet Management */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest font-mono">
              [ PASSPORT_WALLET // DIGITAL_KEYCARDS ]
            </span>

            {availableToAdd.length > 0 && !showAddMenu && (
              <button
                onClick={() => setShowAddMenu(true)}
                className="text-[10px] font-bold font-mono text-violet-400 hover:text-violet-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Plus className="w-3 h-3" /> YENİ EKLE
              </button>
            )}
          </div>

          {/* Wallet Cards Slide */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {registeredPassports.map((passport) => {
              const isSelected = selectedPassportId === passport.id;
              return (
                <button
                  key={passport.id}
                  onClick={() => onPassportSelect(passport.id)}
                  className={`relative p-5 rounded-2xl border text-left flex flex-col justify-between aspect-[1.58/1] overflow-hidden transition-all duration-300 shadow-xl ${getPassportCoverBg(
                    passport.color
                  )} ${
                    isSelected
                      ? 'ring-2 ring-violet-500 ring-offset-2 ring-offset-[#02040a] scale-[1.02]'
                      : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  {/* Decorative gold seal pattern in cover */}
                  <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full border border-yellow-500/5 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border border-yellow-500/5" />
                  </div>

                  <div className="flex items-start justify-between">
                    <span className="text-xl leading-none">{passport.flag}</span>
                    <span className="text-[8px] font-mono tracking-widest text-yellow-500/70 font-bold uppercase">
                      PASSPORT
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="text-xs font-semibold text-slate-100 font-display truncate">
                      {passport.name}
                    </div>
                    <div className="text-[9px] font-mono text-slate-400 mt-1 uppercase tracking-wider">
                      CITIZEN: {passport.countryCode}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dropdown Menu to add available passports */}
          {showAddMenu && (
            <div className="p-4 rounded-xl bg-[#050814] border border-white/5 text-xs mb-4 animate-fadeIn">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-wider">// CÜZDANA YENİ PASAPORT EKLE</span>
                <button
                  onClick={() => setShowAddMenu(false)}
                  className="text-[9px] text-slate-400 hover:text-white uppercase font-mono tracking-wider"
                >
                  [ KAPAT ]
                </button>
              </div>

              <div className="space-y-1.5">
                {availableToAdd.map((passport) => (
                  <button
                    key={passport.id}
                    onClick={() => {
                      onAddPassportToWallet(passport);
                      setShowAddMenu(false);
                      onPassportSelect(passport.id);
                    }}
                    className="w-full text-left p-2.5 rounded-lg bg-[#02040a] border border-white/5 hover:border-violet-500/30 flex items-center justify-between group transition-colors text-xs"
                  >
                    <span className="text-slate-200">
                      {passport.flag} {passport.name} ({passport.countryCode})
                    </span>
                    <span className="text-[9px] font-mono font-bold text-violet-400 group-hover:text-violet-300">
                      EKLE →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Visa Check Terminal */}
        <div className="space-y-4">
          <span className="block text-[9px] font-semibold text-slate-500 uppercase tracking-widest font-mono">
            [ VISA_CHECKER // LIVE_PROTOCOLS ]
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Source Display */}
            <div className="bg-[#050814] border border-white/5 rounded-xl p-3.5 flex items-center gap-3">
              <span className="text-2xl">{activePassport.flag}</span>
              <div>
                <span className="block text-[8px] font-mono text-slate-500 uppercase leading-none">
                  KULLANILAN PASAPORT
                </span>
                <span className="text-xs font-bold font-display text-white mt-1.5 block">
                  {activePassport.name}
                </span>
              </div>
            </div>

            {/* Destination Selector */}
            <div className="bg-[#050814] border border-white/5 rounded-xl p-3.5 flex items-center gap-3">
              <span className="text-2xl">{targetCountry.flag}</span>
              <div className="grow">
                <span className="block text-[8px] font-mono text-slate-500 uppercase leading-none mb-1">
                  HEDEF ÜLKE
                </span>
                <select
                  value={targetCountryCode}
                  onChange={(e) => setTargetCountryCode(e.target.value)}
                  className="bg-transparent border-none text-xs font-bold text-white focus:outline-none focus:ring-0 p-0 m-0 w-full cursor-pointer appearance-none"
                >
                  {DESTINATION_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code} className="bg-[#02040a] text-white">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Visa Result Display */}
        <div className="mt-6 p-5 rounded-2xl bg-[#050814]/75 border border-white/5 shadow-inner">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
              VİZE REJİMİ RAPORU
            </span>
            <span className="text-[9px] font-mono text-slate-400 bg-[#02040a] border border-white/5 px-2 py-1 rounded">
              BÖLGE: {targetCountry.isSchengen ? 'SCHENGEN AREA' : 'INTERNATIONAL'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
            <div>
              <div className="text-[10px] font-mono text-slate-500 uppercase">Yasal Kalış Limiti</div>
              <div className="text-xl font-medium font-display text-white mt-1.5">
                {visaRule.durationText}
              </div>
            </div>

            {/* Badge Indicator */}
            {visaRule.requirement === 'visa-free' && (
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/5 text-emerald-400 border border-emerald-500/10 font-bold text-[10px] uppercase tracking-wider font-mono">
                ✅ VİZE MUAFİYETİ
              </span>
            )}
            {visaRule.requirement === 'visa-on-arrival' && (
              <span className="px-3.5 py-1.5 rounded-full bg-violet-500/5 text-violet-400 border border-violet-500/10 font-bold text-[10px] uppercase tracking-wider font-mono">
                🛂 KAPIDA VİZE
              </span>
            )}
            {visaRule.requirement === 'e-visa' && (
              <span className="px-3.5 py-1.5 rounded-full bg-blue-500/5 text-blue-400 border border-blue-500/10 font-bold text-[10px] uppercase tracking-wider font-mono">
                🌐 E-VİZE GEREKLİ
              </span>
            )}
            {visaRule.requirement === 'visa-required' && (
              <span className="px-3.5 py-1.5 rounded-full bg-rose-500/5 text-rose-400 border border-rose-500/10 font-bold text-[10px] uppercase tracking-wider font-mono">
                ⚠️ VİZE ZORUNLU
              </span>
            )}
          </div>

          {/* Details */}
          <p className="text-xs text-slate-300 leading-relaxed mt-4 flex items-start gap-2.5">
            <BookOpen className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <span>{visaRule.details}</span>
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-slate-500">
        <span>Sorgulanan: {activePassport.countryCode} → {targetCountryCode}</span>
        <span className="text-violet-400">Aktif Pasaport Sayısı: {registeredPassports.length}</span>
      </div>
    </div>
  );
}
