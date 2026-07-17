import React from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, AlertCircle, Info, Check, RefreshCw } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DashboardPreview from './components/DashboardPreview';
import SchengenSimulator from './components/SchengenSimulator';
import VisaCheckSimulator from './components/VisaCheckSimulator';
import TravelTimeline from './components/TravelTimeline';
import ResidencyTracker from './components/ResidencyTracker';
import Benefits from './components/Benefits';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

import { TravelerType, TravelLog, Passport } from './types';
import { TRAVELER_PROFILES } from './data';

export default function App() {
  // Master Profile State
  const [selectedProfileId, setSelectedProfileId] = React.useState<TravelerType>('nomad');

  // Interactive Live Simulated States
  const [travelLogs, setTravelLogs] = React.useState<TravelLog[]>([]);
  const [registeredPassports, setRegisteredPassports] = React.useState<Passport[]>([]);
  const [selectedPassportId, setSelectedPassportId] = React.useState<string>('');
  const [currentSimulatedCountryCode, setCurrentSimulatedCountryCode] = React.useState<string>('ES');
  const [residencePermitCountryCode, setResidencePermitCountryCode] = React.useState<string | null>(null);

  // Trigger State Reset on Profile Switch
  React.useEffect(() => {
    const profile = TRAVELER_PROFILES[selectedProfileId];
    if (profile) {
      setTravelLogs(profile.initialTravels);
      setRegisteredPassports(profile.initialPassports);
      
      // Select the first passport from the newly loaded profile
      const firstPassport = profile.initialPassports[0];
      if (firstPassport) {
        setSelectedPassportId(firstPassport.id);
      }

      // Set a reasonable current country default based on the profile
      if (selectedProfileId === 'nomad') {
        setCurrentSimulatedCountryCode('ES'); // In Spain
        setResidencePermitCountryCode(null);
      } else if (selectedProfileId === 'tourist') {
        setCurrentSimulatedCountryCode('DE'); // In Germany
        setResidencePermitCountryCode(null);
      } else {
        setCurrentSimulatedCountryCode('DE'); // Expat in Germany
        setResidencePermitCountryCode('DE'); // Germany residence permit
      }
    }
  }, [selectedProfileId]);

  // Handler to add a new travel log
  const handleAddLog = (newLog: TravelLog) => {
    setTravelLogs((prev) => [newLog, ...prev]);
  };

  // Handler to delete a travel log
  const handleDeleteLog = (id: string) => {
    setTravelLogs((prev) => prev.filter((log) => log.id !== id));
  };

  // Handler to add an available passport to the simulated wallet
  const handleAddPassportToWallet = (passport: Passport) => {
    setRegisteredPassports((prev) => {
      if (prev.some((p) => p.countryCode === passport.countryCode)) return prev;
      return [...prev, passport];
    });
  };

  // Reset current profile's travel logs to initial defaults
  const handleResetProfileData = () => {
    const profile = TRAVELER_PROFILES[selectedProfileId];
    if (profile) {
      setTravelLogs(profile.initialTravels);
      setRegisteredPassports(profile.initialPassports);
      const firstPassport = profile.initialPassports[0];
      if (firstPassport) {
        setSelectedPassportId(firstPassport.id);
      }
      if (selectedProfileId === 'expat') {
        setResidencePermitCountryCode('DE');
      } else {
        setResidencePermitCountryCode(null);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#02040a] text-slate-100 selection:bg-violet-500/30 selection:text-white">
      {/* Stick Header Navbar */}
      <Navbar />

      {/* Hero Welcome & Profile Switcher */}
      <Hero selectedProfile={selectedProfileId} onProfileSelect={setSelectedProfileId} />

      {/* Main Interactive Showcase Grid Section */}
      <section id="simulator" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16 border-b border-white/5 pb-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-violet-400 animate-pulse shadow-lg shadow-violet-400/50" />
              <span className="text-[10px] font-mono font-semibold text-violet-400/90 uppercase tracking-widest bg-violet-950/40 border border-violet-800/30 px-2.5 py-0.5 rounded-full">
                SYSTEM CORE // ENGINE LIVE
              </span>
            </div>
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-white mt-3 tracking-tight">
              VisaFlow Canlı İnteraktif Simülatör
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mt-2 leading-relaxed">
              Mobil uygulamanın akıllı algoritma motorunu tarayıcınızda test edin.
              Aşağıdaki araçlarla seyahat ekleyip silebilir, pasaportlarınızı yönetebilir ve yasal kalış sürelerini anlık izleyebilirsiniz.
            </p>
          </div>

          <button
            onClick={handleResetProfileData}
            className="flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-[#090d16] border border-white/5 hover:border-violet-500/30 hover:bg-violet-950/10 hover:text-white text-xs font-mono text-slate-400 transition-all duration-200 cursor-pointer self-start md:self-auto shadow-sm shadow-black/50"
            title="Seçili profil verilerini fabrika ayarlarına döndür."
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Simülatör Verilerini Sıfırla</span>
          </button>
        </div>

        {/* -------------------- SHOWCASE GRID -------------------- */}
        <div className="space-y-10">
          
          {/* Row 1: Dashboard HUD (GPS status) & Visa Checker (Multi-Passport cover switcher) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Mobile Dashboard Preview HUD */}
            <div className="lg:col-span-5 h-full">
              <DashboardPreview
                travelLogs={travelLogs}
                selectedPassport={
                  registeredPassports.find((p) => p.id === selectedPassportId) ||
                  registeredPassports[0] ||
                  TRAVELER_PROFILES[selectedProfileId]?.initialPassports[0] ||
                  TRAVELER_PROFILES.nomad.initialPassports[0]
                }
                currentSimulatedCountryCode={currentSimulatedCountryCode}
                onCountryChange={setCurrentSimulatedCountryCode}
                residencePermitCountryCode={residencePermitCountryCode}
              />
            </div>

            {/* Right: Visa Checking & Multi-Passport wallets */}
            <div className="lg:col-span-7 h-full">
              <VisaCheckSimulator
                selectedPassportId={selectedPassportId}
                onPassportSelect={setSelectedPassportId}
                registeredPassports={registeredPassports}
                onAddPassportToWallet={handleAddPassportToWallet}
              />
            </div>
          </div>

          {/* Row 2: Full Width Sliding 180-Day Schengen Contribution Calendar */}
          <div className="w-full">
            <SchengenSimulator 
              travelLogs={travelLogs}
              residencePermitCountryCode={residencePermitCountryCode}
            />
          </div>

          {/* Row 3: Travel Timeline History Entry & Residency Tracker Physical presence */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left: Travel logs timeline diary */}
            <div className="h-full">
              <TravelTimeline
                travelLogs={travelLogs}
                onAddLog={handleAddLog}
                onDeleteLog={handleDeleteLog}
              />
            </div>

            {/* Right: Residency Physical Presence Accumulator */}
            <div className="h-full">
              <ResidencyTracker 
                travelLogs={travelLogs}
                residencePermitCountryCode={residencePermitCountryCode}
                setResidencePermitCountryCode={setResidencePermitCountryCode}
              />
            </div>
          </div>

        </div>
        {/* ------------------ END SHOWCASE GRID ------------------ */}

      </section>

      {/* Beautiful Benefits and Grid Information ("Neden VisaFlow?") */}
      <Benefits />

      {/* Sıkça Sorulan Sorular FAQ accordion */}
      <FAQ />

      {/* Beautiful Bottom Footer with news register and details */}
      <Footer />
    </div>
  );
}
