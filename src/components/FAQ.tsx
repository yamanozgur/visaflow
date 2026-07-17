import React from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData: FAQItem[] = [
    {
      question: 'Schengen 90/180 kuralı tam olarak nedir ve nasıl hesaplanır?',
      answer:
        'Schengen ülkelerinde vizesiz veya standart vizeyle kalışın altın kuralıdır. Herhangi bir seyahat gününde durup geriye dönük 180 günlük bir pencere açtığınızda, o pencere içindeki toplam Schengen kalış süreniz 90 günü geçemez. Sabit bir yıl sınırı (örn. 1 Ocak - 31 Aralık) yoktur; pencere siz seyahat ettikçe ileri doğru kayar. VisaFlow bu kayan pencereyi arka planda saniyeler içinde hesaplayarak sizi her gün yasal sınırlar içinde tutar.',
    },
    {
      question: 'PWA (Progressive Web App) nedir ve VisaFlow’u telefonuma nasıl yüklerim?',
      answer:
        'PWA, web sitelerinin bir mobil uygulama gibi davranmasını sağlayan modern bir teknolojidir. VisaFlow’u yüklemek için uygulamayı açtığınızda tarayıcı çubuğundaki "Yükle" butonuna basabilir veya tarayıcı ayarlarından "Ana Ekrana Ekle" seçeneğini kullanabilirsiniz. Uygulama anında ana ekranınıza eklenir, tam ekran açılır ve internetiniz olmasa dahi seyahat verilerinizi kaydetmenizi sağlar.',
    },
    {
      question: 'Seyahat verilerim nerede saklanıyor, gizlilik ve güvenlik nasıl sağlanıyor?',
      answer:
        'Varsayılan olarak VisaFlow, seyahat verilerinizi ve pasaport bilgilerinizi tamamen kendi cihazınızın yerel depolama (Local Storage/IndexedDB) alanında şifrelenmiş olarak tutar. Hiçbir seyahat kaydınız sunucularımıza gönderilmez. Dilerseniz ayarlardan bulut yedeklemeyi açarak, verilerinizi cihazlar arası eşitlemek üzere bulutta güvenli bir şekilde barındırabilirsiniz.',
    },
    {
      question: 'Birden fazla pasaport/vatandaşlık ile vize sorgusu nasıl çalışır?',
      answer:
        'Eğer çift vatandaşlığa veya birden fazla pasaporta (örn. Bordo ve Yeşil Türk Pasaportları) sahipseniz, VisaFlow cüzdanınıza her iki pasaportu da ekleyebilirsiniz. Vize sorgulama ekranında pasaport cover’larına dokunarak geçiş yaptığınızda, gitmek istediğiniz hedef ülkenin vize gereksinimleri seçilen pasaporta göre anında güncellenir ve hangisiyle seyahat etmenin daha avantajlı olduğunu gösterir.',
    },
    {
      question: 'Fiziksel Varlık (Residency Tracking) takipçisi ne amaçla kullanılır?',
      answer:
        'Özellikle expat’ler, yurt dışında yatırım yoluyla oturum alanlar veya uzaktan çalışarak vergi muafiyeti/mukimliği kazanmak isteyenler için tasarlanmıştır. Belirli ülkeler (örn. İspanya, Portekiz, Almanya) oturumunuzu veya vergi statünüzü korumak için yılda en az 183 gün o ülkede fiziksel olarak bulunmanızı şart koşar. VisaFlow, giriş-çıkışlarınızı analiz ederek hedef ülkede geçirdiğiniz gün sayısını ve gereken asgari limite ulaşma yüzdenizi dinamik olarak gösterir.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-[#080c14] relative border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-600/10 border border-violet-500/15 text-violet-400 text-[11px] font-mono font-semibold uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Kafanıza Takılanlar</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-4">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Schengen kuralları, PWA kurulumu ve veri güvenliği hakkında aradığınız tüm yanıtlar.
          </p>
        </div>

        {/* Accordion Layout */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/50 border-violet-500/50 shadow-lg shadow-violet-950/20'
                    : 'bg-slate-900/15 border-slate-800/80 hover:bg-slate-900/30'
                }`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer transition-colors"
                >
                  <span className="font-display font-bold text-sm sm:text-base text-white pr-4">
                    {item.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-violet-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                  )}
                </button>

                {/* Answer Box */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-850/60 animate-fadeIn">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
