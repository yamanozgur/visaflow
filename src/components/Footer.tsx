import React from 'react';
import { Compass, Mail, Heart, Github, ExternalLink, Send } from 'lucide-react';

export default function Footer() {
  const [subscribed, setSubscribed] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#04060b] border-t border-slate-900/80 pt-16 pb-12 relative overflow-hidden">
      {/* Visual bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-display font-extrabold text-lg text-white">
                Visa<span className="text-violet-400">Flow</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Sınırları aşan dijital göçebeler, expat'ler ve modern gezginler için akıllı vize ve seyahat takip asistanı. 
              VisaFlow ile seyahatlerinizi planlayın, limitlerinizi aşmayın.
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1">
                Made with <Heart className="w-3 h-3 text-rose-500 animate-pulse fill-rose-500" /> by{' '}
                <a
                  href="https://yamanozgur.github.io/ozguryaman-visaflow/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-violet-400 hover:underline inline-flex items-center gap-0.5"
                >
                  Özgür Yaman <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </span>
            </div>
          </div>

          {/* Useful Quick Anchors */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider text-slate-300 uppercase mb-4">
                UYGULAMA MODÜLLERİ
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#simulator" className="text-slate-400 hover:text-white transition-colors">
                    Akıllı Gösterge Paneli
                  </a>
                </li>
                <li>
                  <a href="#simulator" className="text-slate-400 hover:text-white transition-colors">
                    Schengen 90/180 Gün
                  </a>
                </li>
                <li>
                  <a href="#simulator" className="text-slate-400 hover:text-white transition-colors">
                    Çoklu Pasaport Sorgu
                  </a>
                </li>
                <li>
                  <a href="#simulator" className="text-slate-400 hover:text-white transition-colors">
                    Seyahat Günlüğü
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider text-slate-300 uppercase mb-4">
                TEKNOLOJİLER
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <span className="text-slate-400">PWA (Ana Ekrana Ekle)</span>
                </li>
                <li>
                  <span className="text-slate-400">Yerel Şifreli Depolama</span>
                </li>
                <li>
                  <span className="text-slate-400">Responsive Fluid Layout</span>
                </li>
                <li>
                  <span className="text-slate-400">Offline-First Engine</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Mailing Subscription List */}
          <div>
            <h4 className="text-xs font-bold font-mono tracking-wider text-slate-300 uppercase mb-4">
              GÜNCELLEMELERDEN HABERDAR OLUN
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Yeni vize anlaşmaları, Schengen güncellemeleri ve VisaFlow özelliklerinden anında haberdar olmak için bültenimize katılın.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-semibold font-display">
                🎉 Bültene başarıyla kaydoldunuz! Teşekkürler.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative grow">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-posta adresiniz"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-colors cursor-pointer flex items-center justify-center shadow-lg shadow-violet-600/15"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright details */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <span>&copy; 2026 VisaFlow. Tüm hakları saklıdır.</span>
          <div className="flex items-center gap-4">
            <a
              href="https://yamanozgur.github.io/ozguryaman-visaflow/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Orijinal Proje Sayfası</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
