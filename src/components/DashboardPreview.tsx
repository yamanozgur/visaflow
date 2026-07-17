import React from 'react';
import { MapPin, AlertTriangle, Calendar, ShieldAlert, CheckCircle2, Clock, Info } from 'lucide-react';
import { TravelLog, Passport } from '../types';
import { DESTINATION_COUNTRIES, VISA_REQUIREMENTS_DB, calculateSchengen90_180 } from '../data';

interface DashboardPreviewProps {
  travelLogs: TravelLog[];
  selectedPassport: Passport;
  currentSimulatedCountryCode: string;
  onCountryChange: (code: string) => void;
  residencePermitCountryCode?: string | null;
}

export default function DashboardPreview({
  travelLogs,
  selectedPassport,
  currentSimulatedCountryCode,
  onCountryChange,
  residencePermitCountryCode,
}: DashboardPreviewProps) {
  // Find country details
  const activeCountry = DESTINATION_COUNTRIES.find(c => c.code === currentSimulatedCountryCode) || DESTINATION_COUNTRIES[0];

  // Calculate Schengen status as of "today" (2026-07-16)
  const schengenResult = calculateSchengen90_180(travelLogs, '2026-07-16', residencePermitCountryCode);

  // Find if there is a current trip in this country
  const currentTrip = travelLogs.find(
    log => log.countryCode === currentSimulatedCountryCode
  );

  // Check general visa requirement for this passport + destination
  const requirementKey = `${selectedPassport.countryCode}_${currentSimulatedCountryCode}`;
  const visaRule = VISA_REQUIREMENTS_DB[requirementKey] || {
    requirement: 'visa-required',
    durationText: 'Süre Belirtilmedi',
    details: 'Vize kuralları konsolosluktan sorgulanmalıdır.',
  };

  // Determine active status and metrics
  let badgeColor = '';
  let statusText = '';
  let remainingDaysText = '';
  let progressPercentage = 0;
  let subStatusMessage = '';

  if (currentSimulatedCountryCode === selectedPassport.countryCode) {
    badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    statusText = 'Kendi Vatandaşlığınız';
    remainingDaysText = 'Sınırsız';
    progressPercentage = 100;
    subStatusMessage = 'Kendi ülkenizde yasal olarak süresiz kalabilirsiniz.';
  } else if (residencePermitCountryCode && currentSimulatedCountryCode === residencePermitCountryCode) {
    badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    statusText = 'Schengen Oturum İzniniz Var';
    remainingDaysText = 'Sınırsız';
    progressPercentage = 100;
    subStatusMessage = `${activeCountry.name} oturum izniniz olduğu için yasal kalış süresi sınırsızdır.`;
  } else if (visaRule.requirement === 'visa-free' && !activeCountry.isSchengen) {
    badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    statusText = `Vizesiz Muafiyet Girişi (${visaRule.durationText})`;
    const stayLimit = parseInt(visaRule.durationText) || 90;
    remainingDaysText = `${stayLimit} Gün Kalan`;
    progressPercentage = 100;
    subStatusMessage = `Pasaportunuza göre turistik amaçlı giriş vizesizdir.`;
  } else if (activeCountry.isSchengen) {
    // Schengen Area Rules
    if (selectedPassport.countryCode === 'DE') {
      badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      statusText = 'AB Serbest Dolaşım Alanı';
      remainingDaysText = 'Sınırsız';
      progressPercentage = 100;
      subStatusMessage = 'Alman vatandaşlığı ile AB genelinde sınırsız kalış hakkı.';
    } else {
      // Türkiye or AZ passports need vizes
      const isSchengenVisaRequired = visaRule.requirement === 'visa-required';
      progressPercentage = Math.round((schengenResult.daysRemaining / 90) * 100);

      if (isSchengenVisaRequired) {
        badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        statusText = `Schengen Vizesi Gereklidir (90/180 Kuralı)`;
        remainingDaysText = `${schengenResult.daysRemaining} Gün Kaldı`;
        subStatusMessage = `Schengen 180 günlük dönem limitiniz: ${schengenResult.totalDaysUsed}/90 gün harcandı.`;
      } else {
        // e.g. US passport: Schengen vizesiz (90/180 kuralına tabi)
        badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
        statusText = `Vizesiz Schengen Girişi (90/180 Kuralı)`;
        remainingDaysText = `${schengenResult.daysRemaining} Gün Kaldı`;
        subStatusMessage = `Schengen 180 günlük dönem limitiniz: ${schengenResult.totalDaysUsed}/90 gün harcandı.`;
      }
    }
  } else if (visaRule.requirement === 'visa-on-arrival') {
    badgeColor = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    statusText = 'Kapıda Vize / e-Vize Gerekli';
    remainingDaysText = '30 Gün Kapıda';
    progressPercentage = 80;
    subStatusMessage = 'Havalimanında veya sınır kapısında harç ödeyerek vizenizi alın.';
  } else {
    // Visa Required non-schengen
    badgeColor = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    statusText = 'Konsolosluk Vizesi Gerekli';
    remainingDaysText = 'Vize Yok';
    progressPercentage = 0;
    subStatusMessage = 'Giriş yapmadan önce fiziksel veya online vize almanız zorunludur.';
  }

  return (
    <div className="bg-slate-950/45 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-black/80 relative overflow-hidden h-full flex flex-col justify-between">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div>
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
              [ STATUS: TRACKING_ONLINE ]
            </span>
          </div>

          <div className="text-[9px] font-mono text-slate-500 flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
            <Clock className="w-3 h-3 text-violet-400" />
            <span>UTC 2026-07-16</span>
          </div>
        </div>

        {/* GPS Country Select Slider */}
        <div className="mb-8">
          <label className="block text-[9px] font-semibold text-slate-400 uppercase mb-2.5 font-mono tracking-wider">
            📌 Simüle Edilen Konum (GPS Simülatörü)
          </label>
          <div className="relative">
            <select
              value={currentSimulatedCountryCode}
              onChange={(e) => onCountryChange(e.target.value)}
              className="w-full bg-[#050814] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 font-display appearance-none cursor-pointer pr-10"
            >
              {DESTINATION_COUNTRIES.map((country) => (
                <option key={country.code} value={country.code} className="bg-[#02040a] text-white text-xs">
                  {country.flag} {country.name} ({country.isSchengen ? 'Schengen' : 'Schengen Dışı'})
                </option>
              ))}
            </select>
            <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
              ▼
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
            Telefonunuzun GPS konumu değiştiğinde, VisaFlow arka planda bulunduğunuz ülkeyi algılar ve aktif vize haklarınızı otomatik olarak devreye sokar.
          </p>
        </div>

        {/* Live HUD Display Card */}
        <div className="bg-[#050814]/70 border border-white/5 rounded-2xl p-5 mb-6 shadow-inner">
          <div className="flex items-start gap-4 mb-5">
            <div className="p-3 rounded-xl bg-violet-500/5 border border-white/5 text-violet-400 shrink-0">
              <MapPin className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                MEVCUT KONUMUNUZ
              </div>
              <h4 className="font-display font-medium text-xl sm:text-2xl text-white flex items-center gap-2 mt-0.5">
                {activeCountry.flag} {activeCountry.name}
              </h4>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono border font-semibold mt-2 ${badgeColor}`}>
                {statusText}
              </span>
            </div>
          </div>

          {/* Days Progress Wheel / Counter Row */}
          <div className="flex items-center justify-between p-4 bg-[#02040a]/80 border border-white/5 rounded-xl">
            <div>
              <div className="text-[8px] font-mono text-slate-500 uppercase tracking-wider">
                YASAL KALIŞ HAKKI
              </div>
              <div className="text-xl font-medium font-display text-white mt-1">
                {remainingDaysText}
              </div>
            </div>

            {/* Circular Progress Micro SVG */}
            <div className="relative w-12 h-12">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  className="stroke-white/5 fill-none"
                  strokeWidth="3.5"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  className="stroke-violet-500 fill-none transition-all duration-500"
                  strokeWidth="3.5"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - progressPercentage / 100)}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[9px] font-mono text-slate-400 font-bold">
                {progressPercentage}%
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 mt-3.5 leading-relaxed flex items-start gap-1.5">
            <Info className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <span>{subStatusMessage}</span>
          </div>
        </div>
      </div>

      {/* Dynamic Smart Warning Notification Center */}
      <div className="space-y-3.5">
        <div className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500/80" />
          <span>[ NOTIFICATION_CENTER ]</span>
        </div>

        {/* Alert Card Generator */}
        {activeCountry.isSchengen && selectedPassport.countryCode !== 'DE' && (
          <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/10 text-[11px] text-amber-200/90 flex gap-2.5">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <div>
              <strong className="block font-semibold mb-0.5 font-display text-white">Schengen 90 Gün Sınırı Riski</strong>
              Avrupa seyahatleriniz son 180 günde toplam {schengenResult.totalDaysUsed} güne ulaştı. Cezalı duruma düşmemek için kalan {schengenResult.daysRemaining} günü aşmadan Schengen bölgesini terk etmelisiniz.
            </div>
          </div>
        )}

        {selectedPassport.countryCode === 'TR' && activeCountry.code === 'DE' && (
          <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/10 text-[11px] text-rose-200/90 flex gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            <div>
              <strong className="block font-semibold mb-0.5 font-display text-white">Geçerli Vize Beyanı Gerekli</strong>
              Almanya için pasaportunuz vizeden muaf değildir. Giriş kontrolünde geçerli Schengen vizenizi veya oturum kartınızı ibraz etmelisiniz.
            </div>
          </div>
        )}

        {/* Standard Info alerts if everything is safe */}
        {((!activeCountry.isSchengen && visaRule.requirement === 'visa-free') || selectedPassport.countryCode === activeCountry.code) && (
          <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-[11px] text-emerald-200/90 flex gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
            <div>
              <strong className="block font-semibold mb-0.5 font-display text-white font-medium">Konum Güvenli & Uyumlu</strong>
              Herhangi bir vize ihlali bulunmamaktadır. Seyahatinizin keyfini çıkarın! Tüm verileriniz yerel depolama biriminizde şifrelenmiştir.
            </div>
          </div>
        )}

        <div className="text-[9px] font-mono text-slate-500 text-center uppercase tracking-wider">
          // All computations executed on-device
        </div>
      </div>
    </div>
  );
}
