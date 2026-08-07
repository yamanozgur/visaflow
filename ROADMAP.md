# VisaFlow Roadmap & Todo List

## 📌 Planned Features & Infrastructure Upgrades

### 1. Dinamik Vize Regülasyon Güncelleme Altyapısı (Dynamic Visa Rules Sync)
- **Problem:** Ülkelerin vize politikaları (vize muafiyeti, kalış süreleri, e-vize şartları) zamanla değişebiliyor.
- **Çözüm:** 
  1. İstemci öncelikle dahili/sıkıştırılmış `visaDB` kurallarını okur (çevrimdışı desteği korumak için).
  2. İnternet bağlantısı olduğunda Firebase Firestore üzerindeki `visa_rules_overrides` koleksiyonundan son güncellemeleri/değişiklikleri çeker ve yerel kuralların üzerine yazar (`merge/override`).
  3. Yeni regülasyonlar resmi duyurulardan veya konsolosluk bültenlerinden Gemini API ile analiz edilerek Firestore'a işlenir.
- **Maliyet Projeksiyonu:**
  - **Firestore:** Ücretsiz (50.000 günlük okuma kotası küçük/orta ölçekli kullanım için 0$ maliyet çıkarır).
  - **Gemini API:** Ayda 1-2 kez periyodik çalıştığı için 0$ - < 0.05$ (neredeyse tamamen ücretsiz).
- **Durum:** Yapılacaklar Listesine Eklendi (Backlog)

### 2. Mobil Akıcılık ve Performans Optimizasyonu (Mobile Performance & Fluidity)
- **Görsel & Bayrak Yükleme İyileştirmeleri:**
  - `flagcdn.com` bayraklarına ve gelecekteki 190 ülke kapak fotoğraflarına WebP formatı, önbellekleme ve `loading="lazy"` stratejisi uygulanması.
  - Sık kullanılan bayrakların Service Worker önbelleğine (Cache-First) alınarak ağ gecikmesinin sıfırlanması.
- **CSS & DOM Render Optimizasyonu:**
  - Animasyon ve kaydırma işlemlerinde GPU ivmelendirmesi (`transform: translate3d`, `will-change`).
  - Mobil cihazlarda donma yapan ağır `backdrop-filter: blur()` efektlerinin hafifletilmesi veya opt-in hale getirilmesi.
- **Firebase & Network Throttling:**
  - Firestore veri senkronizasyonunun ve `save()` fonksiyonunun `debounce` edilerek gereksiz disk/ağ yazmalarının engellenmesi.
- **Durum:** Yapılacaklar Listesine Eklendi (Backlog)

### 3. Lansman & Fiyatlandırma Duyuru Stratejisi (Launch & Pricing Strategy)
- **Lansman Fiyatlandırma Modeli:**
  - **Aylık Plan:** $3.99/ay (7 Gün Ücretsiz Deneme)
  - **Yıllık Lansman Özel İndirimi (%50 İndirim):** $19.99/yıl (Normal fiyat $39.99/yıl yerine).
  - **Lansman Son Geçerlilik Tarihi (Urgency / Scarcity):** App Store / Google Play lansmanında kafa karışıklığını önlemek için uygulama içi paywall ve lansman duyurularına net son tarih eklenmiştir: *"⏳ Offer ends Sept 30, 2026"*.
  - **Kurucu Ömür Boyu Kartı (Founder Lifetime Pass):** İlk 200 kullanıcıya özel $49.99 tek seferlik ömür boyu erişim fırsatı.
- **Lansman Duyuru Kanalları (Launch Platforms):**
  - **Product Hunt:** "Showcase" ve topluluk oylaması lansmanı.
  - **Reddit Subreddit'leri:** r/digitalnomad, r/travel, r/SchengenVisa, r/expats, r/solotravel.
  - **Hacker News:** "Show HN: Viflo – Schengen 90/180 & Visa Tracker for Nomads" başlığıyla teknik/ürün tanıtımı.
  - **Indie Hackers & NomadList:** Göçebe ve bağımsız geliştirici topluluklarına özel içerik duyurusu.
  - **Sosyal Medya:** Twitter/X, LinkedIn ve Instagram üzerinde kurucu/ürün hikayesi paylaşımı.
- **Durum:** Yapılacaklar Listesine Eklendi (Backlog)

### 4. Sosyal Medya & İçerik Pazarlaması Konuları (Content Marketing Strategy)
- **Schengen 90/180 Kuralı Tuzakları:** 90 günü 1 gün dahi aşmanın ağır para cezaları, deport riski ve 180 günlük geriye dönük hareketli pencere (rolling window) mantığını açıklayan eğitici Reels / Shorts / Carousel içerikleri.
- **183 Gün Vergi Mükellefiyeti (Tax Residency Watch):** Farklı ülkelerde yıl içinde 183 günden fazla kalındığında ortaya çıkan sürpriz çifte vergilendirme ve çifte ikametgah riskleri.
- **Çifte Vatandaşlık & Çoklu Pasaport Yönetimi:** İki pasaportu olan gezginlerin hangi ülkeye hangi pasaportla girdiğini karıştırma riski ve Viflo'nun dual-passport çözümü.
- **Vize Yenileme Zamanlaması & Süre Aşımı Hatırlatmaları:** "Vizenizin bitmesine 30 gün kala yapmanız gerekenler" rehberleri.
- **Dijital Göçebe Vize Rehberleri:** İspanya, Portekiz, Yunanistan, Bali gibi popüler rotalardaki güncel vize şartları ve kalınabilecek azami süreler.
- **Durum:** Yapılacaklar Listesine Eklendi (Backlog)

### 5. Reklam & Monetizasyon Stratejisi (AdMob, Affiliate & Viberoutes Cross-Promotion)
- **Aşama 1 – İlk Lansman (Google AdMob):**
  - Ücretsiz plan kullanıcıları için temel geçiş ve banner reklam entegrasyonu (AdMob).
  - Kullanıcıların Premium'a geçiş motivasyonunu artıran "100% Reklamsız Deneyim" değeri.
- **Aşama 2 – Niş Seyahat & Göçebe Affiliate Programları:**
  - Trafik arttıkça doğrudan hedef kitleye yönelik seyahat sigortaları (SafetyWing, World Nomads), eSIM sağlayıcıları (Airalo) ve konaklama/uçuş servisleri affiliate bağlantılarına geçiş.
- **House Ad & Cross-Promotion (Viberoutes Tanıtım Alanı):**
  - Reklam bantlarından biri veya uygulama içi keşfet bölümüne yerleştirilecek özel sponsor kartı doğrudan kendi projemiz olan **Viberoutes** tanıtımına ayrılacak.
- **Durum:** Yapılacaklar Listesine Eklendi (Backlog)

### 6. Gelişmiş Kullanıcı Davranış Analitiği & Etkinlik Takibi (GA4 / Mixpanel Event Tracking)
- **Problem:** Kullanıcıların hangi ekranlarda ne kadar süre vakit geçirdiğini, hangi butonlara ve vize hesaplama özelliklerine tıkladığını ve ödeme/paywall ekranlarındaki dönüşüm oranlarını detaylı huni (funnel) şeklinde izlemek.
- **Çözüm:**
  1. Google Analytics 4 (GA4) veya Mixpanel SDK entegrasyonu ile event tracking kurulması (Paywall Impression, Add Visa Click, Export PDF/CSV Event, Calendar Sync Event).
  2. Kullanıcı segmentlerine (Free vs. Premium, Android vs. iOS PWA) göre ortalama oturum süresi ve aktiflik oranlarının analizi.
- **Durum:** Yapılacaklar Listesine Eklendi (Backlog)

