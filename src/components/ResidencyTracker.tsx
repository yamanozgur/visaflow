import React from 'react';
import { ShieldCheck, HelpCircle, Activity, Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { TravelLog } from '../types';
import { DESTINATION_COUNTRIES, calculatePhysicalPresence } from '../data';

interface ResidencyTrackerProps {
  travelLogs: TravelLog[];
  residencePermitCountryCode: string | null;
  setResidencePermitCountryCode: (code: string | null) => void;
}

export default function ResidencyTracker({ 
  travelLogs, 
  residencePermitCountryCode, 
  setResidencePermitCountryCode 
}: ResidencyTrackerProps) {
  // Local fallback country if no residency is declared globally, so they can still track presence
  const [localCountryCode, setLocalCountryCode] = React.useState('DE');
  const [requiredDays, setRequiredDays] = React.useState(183); // Standard tax residency requirement
  const [targetYear, setTargetYear] = React.useState(2026);

  // Active tracked country is either the declared residency country or the local fallback
  const activeCountryCode = residencePermitCountryCode || localCountryCode;

  // Run calculation
  const result = calculatePhysicalPresence(travelLogs, activeCountryCode, targetYear);

  const handleToggleResidencePermit = (enabled: boolean) => {
    if (enabled) {
      setResidencePermitCountryCode(activeCountryCode);
    } else {
      setResidencePermitCountryCode(null);
    }
  };

  const handleCountryChange = (code: string) => {
    setLocalCountryCode(code);
    if (residencePermitCountryCode !== null) {
      setResidencePermitCountryCode(code);
    }
  };

  return (
    <div className="bg-slate-950/45 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-black/80 h-full flex flex-col justify-between">
      <div>
        {/* Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-xl bg-violet-500/5 border border-white/5 text-violet-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-medium text-xl text-white">
              Oturum İzni & Fiziksel Varlık Takibi
            </h3>
            <p className="text-xs text-slate-400">
              Belirli bir ülkede oturum iznini veya vergi mukimliğini koruma durumunuzu izleyin.
            </p>
          </div>
        </div>

        {/* Residency Declaration Switch */}
        <div className="mb-6 p-4 rounded-2xl bg-[#050814]/80 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-[80%]">
            <span className="block text-[9px] font-mono text-violet-400 font-semibold uppercase tracking-wider leading-none">
              // TEKİL SCHENGEN OTURUM BEYANI
            </span>
            <span className="block text-xs font-semibold text-white mt-2 leading-tight">
              Seçili ülkede aktif Schengen Oturum İznim var
            </span>
            <span className="block text-[10px] text-slate-400 mt-1 leading-relaxed">
              Aktifleştirildiğinde, bu ülkedeki seyahatleriniz Schengen 90-günlük limitinden düşülmez. Yasal sınır gereği <strong>sadece 1 adet</strong> aktif Schengen oturum izni tanımlanabilir.
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleToggleResidencePermit(residencePermitCountryCode === null)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              residencePermitCountryCode !== null ? 'bg-violet-600' : 'bg-slate-800'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                residencePermitCountryCode !== null ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Inputs row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
          {/* Target Country */}
          <div>
            <label className="block text-[8px] font-semibold text-slate-500 uppercase mb-1.5 font-mono tracking-wider">
              Hedef Oturum Ülkesi
            </label>
            <select
              value={activeCountryCode}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-full bg-[#02040a] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/10 cursor-pointer"
            >
              {DESTINATION_COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Required threshold */}
          <div>
            <label className="block text-[8px] font-semibold text-slate-500 uppercase mb-1.5 font-mono tracking-wider">
              Gereken Fiziksel Gün
            </label>
            <select
              value={requiredDays}
              onChange={(e) => setRequiredDays(Number(e.target.value))}
              className="w-full bg-[#02040a] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/10 cursor-pointer"
            >
              <option value={183}>183 Gün (Standart Vergi Muafiyeti)</option>
              <option value={90}>90 Gün (Oturum İzni Koruma)</option>
              <option value={60}>60 Gün (Hafif Yerleşim Sınırı)</option>
              <option value={180}>180 Gün (Yarım Sene Şartı)</option>
            </select>
          </div>

          {/* Calculation year */}
          <div>
            <label className="block text-[8px] font-semibold text-slate-500 uppercase mb-1.5 font-mono tracking-wider">
              Hesaplanan Yıl
            </label>
            <select
              value={targetYear}
              onChange={(e) => setTargetYear(Number(e.target.value))}
              className="w-full bg-[#02040a] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/10 cursor-pointer"
            >
              <option value={2026}>2026 Yılı</option>
              <option value={2025}>2025 Yılı</option>
            </select>
          </div>
        </div>

        {/* Visual Progress Stats */}
        <div className="bg-[#050814]/80 border border-white/5 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                Biriktirilen Toplam Varlık
              </span>
              <span className="block font-display font-medium text-2xl text-white mt-1">
                {result.daysPresent} <span className="text-xs text-slate-500">/ {requiredDays} Gün</span>
              </span>
            </div>

            <div className="text-right">
              <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                İlerleme Durumu
              </span>
              <span className="block font-display font-medium text-xl text-violet-400 mt-1">
                %{result.percentage}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-[#02040a] rounded-full overflow-hidden border border-white/5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                result.isCompliant
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : 'bg-gradient-to-r from-violet-600 to-indigo-500'
              }`}
              style={{ width: `${result.percentage}%` }}
            />
          </div>

          <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-2 tracking-wider">
            <span>0 Gün</span>
            <span>%100 Hedef ({requiredDays} Gün)</span>
          </div>
        </div>

        {/* Residency Report Card */}
        {result.isCompliant ? (
          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-[11px] text-emerald-300/90 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold mb-0.5 font-display text-white">✅ Varlık Şartı Sağlandı!</strong>
              {result.countryName} ülkesinde {targetYear} yılı boyunca toplam {result.daysPresent} gün fiziksel varlık biriktirdiniz. Bu miktar, belirlenen {requiredDays} günlük asgari yasal sınırı aşarak vergi mükellefiyeti veya oturum hakkınızı güvence altına almaktadır.
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-violet-500/5 border border-white/5 text-[11px] text-violet-300/90 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold mb-0.5 font-display text-white">⚠️ Kalan Süre Mevcut</strong>
              {targetYear} yılında {result.countryName} ülkesinde şu ana kadar {result.daysPresent} gün kaldınız. {requiredDays} günlük yasal şartı tamamlamak için yıl sonuna kadar <strong>{requiredDays - result.daysPresent} gün daha</strong> bu ülkede fiziksel olarak bulunmanız gerekmektedir.
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 text-[10px] font-mono text-slate-500 flex justify-between items-center">
        <span>Yasal Takip Parametresi: {requiredDays} Gün</span>
        <span className="text-violet-400">Vergi ve Oturum Güvencesi</span>
      </div>
    </div>
  );
}
