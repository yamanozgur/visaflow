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
