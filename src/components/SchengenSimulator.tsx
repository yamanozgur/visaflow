import React from 'react';
import { Calendar, Sliders, AlertCircle, HelpCircle, Check, Info, ArrowRight } from 'lucide-react';
import { TravelLog } from '../types';
import { calculateSchengen90_180, formatDate, parseDate, getDaysInclusive, DESTINATION_COUNTRIES } from '../data';

interface SchengenSimulatorProps {
  travelLogs: TravelLog[];
  residencePermitCountryCode?: string | null;
}

export default function SchengenSimulator({ 
  travelLogs, 
  residencePermitCountryCode 
}: SchengenSimulatorProps) {
  const referenceDateStr = '2026-07-16'; // Simulated Today
  const result = calculateSchengen90_180(travelLogs, referenceDateStr, residencePermitCountryCode);

  // Future Travel Simulator States
  const [futureEntry, setFutureEntry] = React.useState('2026-08-01');
  const [futureExit, setFutureExit] = React.useState('2026-08-15');
  const [simulationChecked, setSimulationChecked] = React.useState(false);
  const [simulationResult, setSimulationResult] = React.useState<{
    valid: boolean;
    totalDays: number;
    usedDaysInWindow: number;
    errorMsg?: string;
  } | null>(null);

  // Calculate future trip simulation
  const handleSimulateFutureTrip = () => {
    if (!futureEntry || !futureExit) return;

    if (new Date(futureEntry) > new Date(futureExit)) {
      setSimulationResult({
        valid: false,
        totalDays: 0,
        usedDaysInWindow: 0,
        errorMsg: 'Çıkış tarihi giriş tarihinden önce olamaz.',
      });
      setSimulationChecked(true);
      return;
    }

    // Create a temporary travel log list containing the future trip
    const tempLog: TravelLog = {
      id: 'future-temp',
      countryCode: 'DE', // Simulated Germany
      countryName: 'Almanya (Simüle)',
      entryDate: futureEntry,
      exitDate: futureExit,
      isSchengen: true,
    };

    const combinedLogs = [...travelLogs, tempLog];
    
    // We want to calculate the status on the day of future exit to check if they overstay
    const futureResult = calculateSchengen90_180(combinedLogs, futureExit, residencePermitCountryCode);

    setSimulationResult({
      valid: !futureResult.isOverstayed,
      totalDays: getDaysInclusive(futureEntry, futureExit),
      usedDaysInWindow: futureResult.totalDaysUsed,
    });
    setSimulationChecked(true);
  };

  // Generate 180 dots representation
  const dotsArray = Object.entries(result.dayByDayMap).sort(
    (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
  );

  return (
    <div className="bg-slate-950/45 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-black/80 h-full flex flex-col justify-between">
        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-xl bg-violet-500/5 border border-white/5 text-violet-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-medium text-xl text-white">
              Schengen 90/180 Gün Takipçisi
            </h3>
            <p className="text-xs text-slate-400">
              Avrupa seyahatlerinin en karmaşık kuralını saniyeler içinde hatasız hesaplayın.
            </p>
          </div>
        </div>

        {/* Stats Summary Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#050814] border border-white/5 rounded-2xl p-4 text-center flex flex-col justify-center">
            <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-wider">
              [ 180 GÜNLÜK PENCERE ]
            </span>
            <span className="block font-mono text-[10px] text-white mt-2 font-medium">
              {result.windowStart} / {result.windowEnd}
            </span>
          </div>

          <div className="bg-[#050814] border border-white/5 rounded-2xl p-4 text-center relative overflow-hidden flex flex-col justify-center">
            <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-wider">
              [ SCHENGEN'DE GEÇEN SÜRE ]
            </span>
            <span className={`block font-display font-medium text-xl mt-1.5 ${result.isOverstayed ? 'text-rose-400' : 'text-violet-400'}`}>
              {result.totalDaysUsed} / 90 Gün
            </span>
          </div>

          <div className="bg-[#050814] border border-white/5 rounded-2xl p-4 text-center flex flex-col justify-center">
            <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-wider">
              [ YASAL KALAN SÜRE ]
            </span>
            <span className="block font-display font-medium text-xl text-emerald-400 mt-1.5">
              {result.daysRemaining} Gün
            </span>
          </div>
        </div>

        {/* Active Schengen Residence Permit Banner */}
        {residencePermitCountryCode && (
          <div className="mb-8 p-4.5 rounded-2xl bg-violet-500/5 border border-violet-500/10 text-[11px] text-violet-300 flex items-start gap-3">
            <Info className="w-4.5 h-4.5 text-violet-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold mb-1 text-white font-display uppercase tracking-wider text-[10px]">
                ℹ️ Schengen Oturum İzni Aktif: {
                  DESTINATION_COUNTRIES.find(c => c.code === residencePermitCountryCode)?.name || residencePermitCountryCode
                }
              </strong>
              Schengen Kanunu gereği, oturum izninizin bulunduğu <strong>{
                DESTINATION_COUNTRIES.find(c => c.code === residencePermitCountryCode)?.name || residencePermitCountryCode
              }</strong> ülkesinde geçirdiğiniz süreler Schengen 90-günlük limitinizden düşülmez. Ancak, oturum izniniz olmayan diğer Schengen ülkelerinde (örneğin Fransa, İtalya vb.) yapacağınız seyahatler 90/180-gün sınırına <strong>tabi olmaya devam eder</strong>.
            </div>
          </div>
        )}

      {/* Interactive visual 180-day sliding grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest font-mono">
            [ SCHENGEN_GRID // 180_DAYS_TIMEFRAME ]
          </span>
          <div className="flex items-center gap-4 text-[9px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded bg-violet-600 block"></span>
              <span>Avrupa ({result.totalDaysUsed} gün)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded bg-white/5 border border-white/5 block"></span>
              <span>Diğer</span>
            </div>
          </div>
        </div>

        {/* The Grid Container - GitHub style */}
        <div className="bg-[#050814]/70 border border-white/5 rounded-2xl p-4">
          <div className="grid grid-cols-[repeat(15,_minmax(0,_1fr))] sm:grid-cols-[repeat(30,_minmax(0,_1fr))] gap-1.5 justify-center">
            {dotsArray.map(([dateStr, inSchengen], index) => {
              const isToday = dateStr === referenceDateStr;
              return (
                <div
                  key={dateStr}
                  className={`aspect-square w-full rounded-sm transition-all duration-200 relative group cursor-help ${
                    inSchengen
                      ? 'bg-violet-600 shadow-md shadow-violet-600/10'
                      : 'bg-white/[0.03] border border-white/5 hover:border-violet-500/30'
                  } ${isToday ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-950' : ''}`}
                >
                  {/* Tooltip on Hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-[#050814] text-[9px] font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-xl border border-white/5">
                    {dateStr} - {inSchengen ? 'Avrupa (Schengen)' : 'Schengen Dışı'}
                    {isToday ? ' (Bugün)' : ''}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center mt-3.5 text-[9px] font-mono text-slate-500">
            <span>← 180 Gün Önce ({result.windowStart})</span>
            <span>Bugün ({referenceDateStr}) →</span>
          </div>
        </div>

        <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
          Schengen kuralı sabit bir tarih aralığına bakmaz; <strong>"kayan pencere"</strong> sistemi kullanır. Bugün attığınız her adım, son 180 günlük seyahat geçmişinizle harmanlanarak anında tekrar hesaplanır.
        </p>
      </div>

      {/* List of trips inside this window */}
      <div className="mb-8">
        <span className="block text-[9px] font-semibold text-slate-500 uppercase tracking-widest font-mono mb-3">
          [ COMPLIANCE_LOG // RECENT_SCHENGEN_TRIPS ]
        </span>

        {result.activeWindowLogs.length === 0 ? (
          <div className="text-center py-6 bg-white/[0.01] rounded-xl border border-dashed border-white/5 text-[11px] text-slate-500">
            Bu 180 günlük pencerede herhangi bir Schengen kaydı bulunmamaktadır.
          </div>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {result.activeWindowLogs.map((log) => (
              <div
                key={log.logId}
                className="flex items-center justify-between p-3 rounded-xl bg-[#050814]/40 border border-white/5 hover:border-violet-500/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-xs font-semibold font-display text-white">
                    {log.countryName}
                  </div>
                  <div className="text-[9px] font-mono text-slate-500">
                    {log.entryDate} <ArrowRight className="w-3 h-3 inline-block text-slate-600" /> {log.exitDate}
                  </div>
                </div>

                <div className="text-[10px] font-mono font-semibold text-violet-400 bg-violet-950/20 px-2.5 py-1 rounded-lg border border-violet-500/10">
                  +{log.daysCounted} Gün
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Future Trip Simulator Module */}
      <div className="bg-[#050814]/80 border border-white/5 rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center gap-2 mb-4">
          <Sliders className="w-4 h-4 text-emerald-400" />
          <h4 className="font-display font-medium text-xs text-white uppercase tracking-wider">
            Gelecek Seyahat Planlayıcı
          </h4>
        </div>

        <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
          Gelecekte yapmayı planladığınız bir Schengen seyahatini simüle edin. VisaFlow o seyahat esnasındaki geriye dönük 180 günlük limitinizi hesaplar ve ceza riskini raporlar.
        </p>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[8px] font-semibold text-slate-500 uppercase mb-1.5 font-mono tracking-wider">
              Planlanan Giriş Tarihi
            </label>
            <input
              type="date"
              value={futureEntry}
              onChange={(e) => {
                setFutureEntry(e.target.value);
                setSimulationChecked(false);
              }}
              className="w-full bg-[#02040a] border border-white/5 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/10 font-mono"
            />
          </div>

          <div>
            <label className="block text-[8px] font-semibold text-slate-500 uppercase mb-1.5 font-mono tracking-wider">
              Planlanan Çıkış Tarihi
            </label>
            <input
              type="date"
              value={futureExit}
              onChange={(e) => {
                setFutureExit(e.target.value);
                setSimulationChecked(false);
              }}
              className="w-full bg-[#02040a] border border-white/5 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/10 font-mono"
            />
          </div>
        </div>

        {/* Simulate CTA */}
        <button
          onClick={handleSimulateFutureTrip}
          className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-[0.98] transition-transform text-xs font-semibold text-white shadow-lg shadow-violet-600/15 cursor-pointer"
        >
          Seyahat Planını Kontrol Et
        </button>

        {/* Simulation Output Reports */}
        {simulationChecked && simulationResult && (
          <div className="mt-4 pt-4 border-t border-white/5">
            {simulationResult.errorMsg ? (
              <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/10 text-xs text-rose-300">
                {simulationResult.errorMsg}
              </div>
            ) : simulationResult.valid ? (
              <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-[11px] text-emerald-300/90 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold mb-0.5 font-display text-white">✅ Seyahat Güvenli & Uyumlu!</strong>
                  Planlanan {simulationResult.totalDays} günlük seyahatiniz boyunca Schengen sınırlarında aşım yapılmıyor. Çıkış tarihindeki son 180 günlük Schengen kullanımı: <strong>{simulationResult.usedDaysInWindow} / 90 gün</strong>.
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/10 text-[11px] text-rose-300/90 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold mb-0.5 font-display text-white">⚠️ UYARI: Schengen Limiti Aşılıyor!</strong>
                  Bu planlanan {simulationResult.totalDays} günlük seyahat, çıkış tarihindeki 180 günlük limitinizi <strong>{simulationResult.usedDaysInWindow} güne</strong> çıkararak yasal sınırı aşıyor. Tarihlerinizi revize edin veya giriş-çıkış kaydınızı değiştirin.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
