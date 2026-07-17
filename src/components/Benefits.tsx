import { Smartphone, Shield, Zap, Sparkles, Download, Check } from 'lucide-react';

export default function Benefits() {
  const features = [
    {
      icon: Smartphone,
      title: 'PWA Teknolojisi ile Doğrudan Kurulum',
      description:
        'VisaFlow, modern PWA (Progressive Web App) altyapısını kullanır. App Store veya Google Play karmaşasına girmeden, tarayıcınızdan tek tıkla ana ekranınıza ekleyip bağımsız bir mobil uygulama olarak kullanabilirsiniz.',
      tag: 'Yenilikçi',
    },
    {
      icon: Shield,
      title: 'Güvenli, Offline ve Esnek Depolama',
      description:
        'Verileriniz varsayılan olarak tamamen cihazınızda yerel (local) olarak tutulur, sunuculara asla yüklenmez. Dilerseniz ayarlar kısmından bulut yedeklemeyi tek dokunuşla açarak seyahat verilerinizi güvenceye alabilirsiniz.',
      tag: 'Güvenli',
    },
    {
      icon: Zap,
      title: 'Zarif ve Odaklanmış Arayüz Tasarımı',
      description:
        'Sınır kapılarında, pasaport kontrolünde veya hareket halindeyken göz yormayan, yüksek kontrastlı ve sadeleştirilmiş bir arayüz sunar. İhtiyacınız olan kritik vize süre bilgisine saniyeler içinde ulaşırsınız.',
      tag: 'Ergonomik',
    },
  ];

  return (
    <section id="benefits" className="py-24 bg-[#0b0f19] relative overflow-hidden border-t border-slate-900">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-mono tracking-widest text-violet-400 font-bold uppercase">
            💡 Benzersiz Deneyim
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-3 mb-4">
            Neden VisaFlow'u Seçmelisiniz?
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Sınır kapılarında vize stresi yaşamamanız için her ayrıntıyı optimize ettik. İşte bizi farklı kılan teknolojik özellikler.
          </p>
        </div>

        {/* Features Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 md:p-8 hover:bg-slate-900 hover:border-slate-750 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-violet-500/10 text-violet-300 border border-violet-500/10 mb-5 uppercase tracking-wide">
                    {item.tag}
                  </span>

                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600/20 to-indigo-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-6">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-850 flex items-center gap-2 text-xs font-mono text-slate-500">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Test Edildi & Doğrulandı</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* PWA Direct Installation Promotion Banner */}
        <div className="mt-16 bg-gradient-to-r from-violet-950/40 via-[#0e1324] to-indigo-950/40 border border-violet-500/25 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-violet-950/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-yellow-400 animate-spin-slow" />
              <span className="text-[10px] font-mono text-yellow-400 font-bold uppercase tracking-wider">
                YENİ NESİL PWA UYGULAMASI
              </span>
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white mb-3">
              Mobil Mağaza Karmaşasına Son Verin!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              VisaFlow'u telefonunuza indirmek için hiçbir ücret ödemenize, App Store veya Google Play hesapları açmanıza gerek yok. Tarayıcınızın <strong>"Ana Ekrana Ekle"</strong> butonuna basarak, saniyeler içinde sıfır megabayt boyutunda mobil uygulamanıza kavuşabilirsiniz.
            </p>
          </div>

          <a
            href="#simulator"
            className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs sm:text-sm font-bold text-white shadow-lg shadow-violet-600/25 shrink-0 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95 transition-all duration-150"
          >
            <Download className="w-4 h-4" />
            <span>PWA Kurulumunu Simüle Et</span>
          </a>
        </div>
      </div>
    </section>
  );
}
