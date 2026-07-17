import React from 'react';
import { Calendar, Trash2, Plus, Download, FileSpreadsheet, Check, ArrowDown, PlaneTakeoff, Info, ArrowRight } from 'lucide-react';
import { TravelLog } from '../types';
import { DESTINATION_COUNTRIES, formatDate, getDaysInclusive } from '../data';

interface TravelTimelineProps {
  travelLogs: TravelLog[];
  onAddLog: (log: TravelLog) => void;
  onDeleteLog: (id: string) => void;
}

export default function TravelTimeline({ travelLogs, onAddLog, onDeleteLog }: TravelTimelineProps) {
  // Sort logs by date descending (most recent first)
  const sortedLogs = [...travelLogs].sort(
    (a, b) => new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime()
  );

  // Form states
  const [countryCode, setCountryCode] = React.useState('FR');
  const [entryDate, setEntryDate] = React.useState('2026-08-01');
  const [exitDate, setExitDate] = React.useState('2026-08-10');
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [formError, setFormError] = React.useState('');
  const [exportType, setExportType] = React.useState<'json' | 'csv' | null>(null);

  // Handle submit new log
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!entryDate || !exitDate) {
      setFormError('Lütfen giriş ve çıkış tarihlerini seçin.');
      return;
    }

    if (new Date(entryDate) > new Date(exitDate)) {
      setFormError('Çıkış tarihi giriş tarihinden önce olamaz.');
      return;
    }

    const selectedCountry = DESTINATION_COUNTRIES.find(c => c.code === countryCode);
    if (!selectedCountry) return;

    // Build the new log
    const newLog: TravelLog = {
      id: `t-${Date.now()}`,
      countryCode: countryCode,
      countryName: selectedCountry.name,
      entryDate: entryDate,
      exitDate: exitDate,
      isSchengen: selectedCountry.isSchengen,
    };

    onAddLog(newLog);
    setShowAddForm(false);
    // Reset defaults for dates
    setEntryDate('2026-08-12');
    setExitDate('2026-08-20');
  };

  // Generate exported code content
  const handleExportData = (type: 'json' | 'csv') => {
    setExportType(type);
  };

  const getExportedString = () => {
    if (exportType === 'json') {
      return JSON.stringify(travelLogs, null, 2);
    }
    if (exportType === 'csv') {
      let csv = 'ID,Ülke Kodu,Ülke Adı,Giriş Tarihi,Çıkış Tarihi,Schengen mi\n';
      travelLogs.forEach((log) => {
        csv += `"${log.id}","${log.countryCode}","${log.countryName}","${log.entryDate}","${log.exitDate}",${log.isSchengen ? 'EVET' : 'HAYIR'}\n`;
      });
      return csv;
    }
    return '';
  };

  return (
    <div className="bg-slate-950/45 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-black/80 h-full flex flex-col justify-between">
      <div>
        {/* Title & Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-violet-500/5 border border-white/5 text-violet-400">
              <PlaneTakeoff className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-medium text-xl text-white">
                Seyahat Günlüğü & Zaman Tüneli
              </h3>
              <p className="text-xs text-slate-400">
                Giriş-çıkışlarınızı ekleyin; seyahatlerinizi kronolojik olarak görselleştirin.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="self-start sm:self-center px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-95 text-xs font-semibold text-white shadow-lg shadow-violet-600/15 flex items-center gap-1.5 transition-all duration-150 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Seyahat Ekle</span>
          </button>
        </div>

        {/* Expandable Travel Add Form */}
        {showAddForm && (
          <form
            onSubmit={handleAddSubmit}
            className="mb-8 p-5 rounded-2xl bg-[#050814]/90 border border-white/5 animate-fadeIn"
          >
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-4">
              [ ADD_NEW_TRAVEL_RECORD ]
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {/* Country Selection */}
              <div>
                <label className="block text-[8px] font-semibold text-slate-500 uppercase mb-1.5 font-mono tracking-wider">
                  Gidilen Ülke
                </label>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full bg-[#02040a] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/10 cursor-pointer"
                >
                  {DESTINATION_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Entry Date */}
              <div>
                <label className="block text-[8px] font-semibold text-slate-500 uppercase mb-1.5 font-mono tracking-wider">
                  Giriş Tarihi
                </label>
                <input
                  type="date"
                  value={entryDate}
                  onChange={(e) => setEntryDate(e.target.value)}
                  className="w-full bg-[#02040a] border border-white/5 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/10 font-mono"
                />
              </div>

              {/* Exit Date */}
              <div>
                <label className="block text-[8px] font-semibold text-slate-500 uppercase mb-1.5 font-mono tracking-wider">
                  Çıkış Tarihi
                </label>
                <input
                  type="date"
                  value={exitDate}
                  onChange={(e) => setExitDate(e.target.value)}
                  className="w-full bg-[#02040a] border border-white/5 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/10 font-mono"
                />
              </div>
            </div>

            {formError && (
              <div className="text-[11px] text-rose-400 mb-4 font-mono">⚠️ {formError}</div>
            )}

            <div className="flex gap-2.5">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-md cursor-pointer transition-colors"
              >
                Kayıt Ekle
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-xs font-semibold text-slate-400 hover:text-white cursor-pointer transition-colors"
              >
                İptal
              </button>
            </div>
          </form>
        )}

        {/* Custom Visual Timeline Connective Layout */}
        <div className="relative border-l border-white/5 pl-6 ml-3 space-y-6 max-h-[380px] overflow-y-auto pr-1">
          {sortedLogs.map((log) => {
            const daysCounted = getDaysInclusive(log.entryDate, log.exitDate);
            return (
              <div key={log.id} className="relative group">
                {/* Visual Circle Indicator on Line */}
                <span className={`absolute -left-[31px] top-2 flex h-3.5 w-3.5 rounded-full border bg-[#02040a] items-center justify-center transition-transform group-hover:scale-110 z-10 ${
                  log.isSchengen 
                    ? 'border-violet-500 shadow-md shadow-violet-500/20' 
                    : 'border-slate-700'
                }`}>
                  <span className={`h-1 w-1 rounded-full ${log.isSchengen ? 'bg-violet-500' : 'bg-slate-700'}`} />
                </span>

                {/* Log card */}
                <div className="p-4 rounded-2xl bg-[#050814]/40 border border-white/5 hover:border-violet-500/10 transition-all duration-200">
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold font-display text-white">
                          {log.countryName}
                        </span>
                        {log.isSchengen ? (
                          <span className="text-[8px] font-mono bg-violet-950/20 text-violet-300 border border-violet-500/10 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                            Schengen
                          </span>
                        ) : (
                          <span className="text-[8px] font-mono bg-white/[0.03] text-slate-500 border border-white/5 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                            Schengen Dışı
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-1 flex items-center gap-1.5">
                        <span>{log.entryDate}</span>
                        <ArrowRight className="w-3 h-3 text-slate-600" />
                        <span>{log.exitDate}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteLog(log.id)}
                      className="p-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer transition-all duration-150"
                      title="Seyahati Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-white/[0.03] pt-2 mt-2">
                    <span>Toplam Kalış</span>
                    <span className="font-semibold text-slate-300">{daysCounted} Gün</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Export Segment */}
      <div className="mt-8 pt-6 border-t border-white/5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-violet-400 shrink-0" />
            <span>Seyahatlerinizi yedekleyin veya konsolosluk sunumları için dışa aktarın.</span>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <button
              onClick={() => handleExportData('json')}
              className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-violet-500/20 text-[10px] font-semibold text-slate-300 hover:text-white cursor-pointer transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-violet-400" />
              <span>JSON Al</span>
            </button>
            <button
              onClick={() => handleExportData('csv')}
              className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-violet-500/20 text-[10px] font-semibold text-slate-300 hover:text-white cursor-pointer transition-colors flex items-center justify-center gap-1.5"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>CSV Al</span>
            </button>
          </div>
        </div>

        {/* Modal-like Text Area for copied code */}
        {exportType && (
          <div className="mt-4 p-4 rounded-2xl bg-[#050814]/90 border border-white/5 relative animate-fadeIn">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono text-violet-400 font-semibold uppercase tracking-wider">
                [ EXPORTED_DATA_CONSOLE // {exportType.toUpperCase()} ]
              </span>
              <button
                onClick={() => setExportType(null)}
                className="text-[10px] text-slate-500 hover:text-white font-mono uppercase tracking-wider"
              >
                [ Kapat ]
              </button>
            </div>
            <textarea
              readOnly
              value={getExportedString()}
              className="w-full h-32 bg-[#02040a] border border-white/5 rounded-xl p-3 text-[10px] font-mono text-slate-300 focus:outline-none"
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
            />
            <div className="text-[9px] font-mono text-slate-500 mt-2 text-right">
              * Kopyalamak için metne çift tıklayın.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
