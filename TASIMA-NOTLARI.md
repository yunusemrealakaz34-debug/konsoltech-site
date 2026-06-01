# KonsolTech — Proje Taşıma Notları

Son güncelleme: 2026-05-21

---

## 1. Hızlı Özet

- **Proje tipi:** Statik HTML/CSS site (Bootstrap 5 + custom CSS)
- **Backend:** Yok — pure static
- **Build tool:** Yok — direkt aç + çalışır
- **Toplam boyut:** ~51 MB (büyük kısmı `images/` klasörü)
- **Çalışma şartı:** Modern tarayıcı + internet (CDN'ler için)

---

## 2. Klasör Yapısı (TAM)

```
KONSOLTECH DESİGN/
├── index.html              (Anasayfa)
├── hizmetler.html          (9 servis kartı)
├── paketler.html           (4 tier paket)
├── surec.html              (Süreç + Aras Kargo + Online takip)
├── neden-biz.html          (Atölye + Why us + Hakkımızda)
├── sss.html                (8 SSS — FAQPage schema)
├── iletisim.html           (İletişim form + bilgi)
├── styles.css              (Paylaşımlı CSS — 1300+ satır)
├── TASIMA-NOTLARI.md       (Bu dosya)
└── images/                 (26 dosya — fotoğraf + video)
    ├── hero.png
    ├── tier-alps.png
    ├── tier-hall.png
    ├── tier-tmr.jpg
    ├── gulikit .png
    ├── atölye1.png
    ├── dualsense tamir.png
    ├── edge tamir.png
    ├── ps5 slim .png
    ├── ps5 tamir .png
    ├── ps4 tamir.png
    ├── ps4 tamir (2).png
    ├── xbox tamir .png
    ├── ŞEFFAF ZEMİN BEYAZ LOGO.png
    ├── 91yzuDuxjdL._AC_SL1500_.jpg
    ├── 71zXjZ0ycHL._SL1500_.jpg
    ├── 110000452146791.jpg
    ├── Gemini_Generated_Image_tdspd7tdspd7tdsp.png
    ├── ChatGPT Image May 8, 2026, 01_42_30 PM.png
    ├── ChatGPT Image May 8, 2026, 01_42_36 PM.png
    ├── ChatGPT Image May 8, 2026, 01_42_45 PM.png
    ├── ChatGPT Image May 8, 2026, 02_19_53 PM.png
    ├── ChatGPT Image May 8, 2026, 02_42_35 PM.png
    ├── ChatGPT Image May 8, 2026, 02_45_03 PM.png
    ├── ChatGPT Image May 8, 2026, 03_55_49 PM.png
    ├── kling_20260508_VIDEO_Smooth_360_1770_0.mp4   (Haptic kart videosu)
    └── kling_20260508_VIDEO_Smooth_360_1810_0 (1).mp4 (Hero arka plan videosu)
```

---

## 3. Taşıma Adımları (Yeni PC'ye)

### A. Dosya kopyalama
1. Tüm `KONSOLTECH DESİGN/` klasörünü kopyala (51 MB)
   - Önerilen yol: USB / harici disk / cloud (Google Drive / OneDrive)
2. Yeni PC'de istediğin yere yapıştır (örnek: `Desktop/`)
3. Klasör adını koruması önemli (`KONSOLTECH DESİGN`) — yollarda Türkçe karakter sorun çıkarmaz

### B. Hiç bir kurulum gerek YOK
- npm install ❌
- Node.js ❌
- Python ❌
- PHP ❌
- Database ❌

### C. Açma
- `index.html` üzerine **çift tıkla** → varsayılan tarayıcıda açılır
- Veya VS Code / Sublime Text / Notepad++ ile aç düzenle

---

## 4. Eksiksiz Kontrol Listesi

Taşımadan sonra kontrol et:

- [ ] `index.html` → açılıyor, hero video oynatıyor
- [ ] Üst navbar → tüm sayfa linkleri çalışıyor (7 sayfa)
- [ ] Marquee (kayan yazı) → animasyon dönüyor
- [ ] Diğer Konsollar kartları → tüm resimler görünüyor
- [ ] Atölye fotoğrafı (`atölye1.png`) → yükleniyor
- [ ] **Paketler** sayfası → 4 tier kartında resim var, garanti süreleri doğru
- [ ] **Süreç** sayfası → Aras kargo kodu görünüyor, takip mockup animasyonlu
- [ ] **SSS** sayfası → accordion açılıyor
- [ ] **İletişim** form → WhatsApp'a yönlendiriyor
- [ ] Footer sosyal ikonlar (FB, IG, TikTok, WA) → 4 ikon
- [ ] Floating WhatsApp butonu (sağ alt) → tıkla, açılıyor
- [ ] Mobil görünüm (F12 → telefon ikonu → responsive)

---

## 5. Dış Bağımlılıklar (CDN)

Yeni PC'de **internet** olmalı. CDN'ler şunlar:

```
https://fonts.googleapis.com/css2?family=Inter           (Inter font)
https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/...         (Bootstrap CSS + JS)
https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/...  (Bootstrap Icons)
```

**Eğer offline çalışacaksa**: CDN dosyaları indirip lokal `vendor/` klasörüne koy, HTML'lerde linkleri değiştir. Şu an için CDN olarak kalsın — daha hızlı + güncel.

---

## 6. Önemli Sabit Bilgiler

Site içinde kullanılan bilgiler (değişirse buradan yenile + Find&Replace yap):

| Bilgi | Değer | Nerede |
|-------|-------|--------|
| Marka | KonsolTech | Tüm sayfalar |
| Kurucu | Yunus Emre Alakaz | iletisim, surec |
| WhatsApp | `0545 456 20 41` (+905454562041) | Tüm CTA'lar |
| Sabit Hat | `0212 809 71 11` (+902128097111) | Footer + iletişim |
| E-posta | `info@konsoltech.tr` | Footer + iletişim |
| Web | konsoltech.tr | Footer |
| Adres | Kavaklı Mh. Kocatepe Cd. No: 319/6C, Beylikdüzü/İstanbul | surec, iletisim |
| Aras Kargo Kodu | `260 480 565 15 34` | surec.html |
| Instagram | @konsoltekk | Footer |
| TikTok | @konsoltech | Footer |
| Facebook | https://www.facebook.com/profile.php?id=61586407559344 | Footer |

---

## 7. Yedek (Backup) Önerisi

Taşımadan ÖNCE:
1. **Tüm klasörü ZIP'le** → `KONSOLTECH_BACKUP_2026-05-21.zip`
2. ZIP'i şu yerlerin EN AZ 2'sine koy:
   - USB
   - Google Drive / OneDrive
   - E-posta (kendine — ek olarak)
3. Yedekten sonra hareket et

**Tehlike senaryosu:** Eğer taşıma sırasında bozulursa, ZIP'ten geri al → ürettiğimiz tüm kod + içerik korunur.

---

## 8. Düzenleme Yapacaksan

### Kod editörü öner
- **VS Code** (ücretsiz, en yaygın) — https://code.visualstudio.com/
- Sublime Text / Notepad++

### Sık yapılan değişiklikler
| İstek | Dosya | Ne aramalı |
|-------|-------|------------|
| Telefon değişti | Tüm 7 HTML | `905454562041` veya `2128097111` |
| Adres değişti | surec.html + iletisim.html | `Kavaklı` |
| Logo eklemek | styles.css + tüm HTML | `.kt-brand` |
| Tier garanti değişti | index.html + paketler.html + sss.html | `garanti` |
| Yeni servis eklemek | hizmetler.html | `<!-- 9. ` örneğine bak |
| CSS rengini değiştir | styles.css | `:root` (en üst) |

### Renk paleti (styles.css :root)
```css
--kt-blue:    #0095EB    /* Primary brand */
--kt-blue-hi: #00A8FF    /* Highlight */
--kt-cyan:    #2EE5FF    /* Accent glow */
--kt-bg:      #060E1F    /* Background */
--kt-surface: #0F1E36    /* Card */
```

---

## 9. Görüntü Optimizasyonu (Opsiyonel — taşımadan sonra)

`images/` klasörü ~51 MB. Site yavaş yüklüyor diye düşünüyorsan:
1. Online araç: https://tinypng.com (PNG → küçük PNG)
2. WebP'ye çevir (Squoosh.app)
3. Hero video çok büyük (~2 MB) — daha küçük encode'la (HandBrake)

**Acelesi yok.** Önce taşı, sonra optimize et.

---

## 10. Yayına Alma (Domain'e koyma)

Yeni PC'de hazır olunca konsoltech.tr alanına yüklemek için:

1. **Hosting'e FTP** (cPanel / FileZilla):
   - Tüm dosyaları `public_html/` veya `htdocs/` klasörüne yükle
2. **Netlify** (ücretsiz + kolay):
   - https://app.netlify.com/drop adresine klasörü sürükle bırak
3. **GitHub Pages** (free):
   - GitHub'a repo yükle, Settings → Pages aktif

Site şu an statik olduğu için **her platform** çalışır.

---

## 11. Eksik Bir Şey Olursa

Aşağıdaki dosyalar YENİ PC'de mutlaka var olmalı:
- ✅ 7 HTML dosyası
- ✅ `styles.css`
- ✅ `images/` klasörü (26 dosya — özellikle video'lar!)
- ✅ Bu not dosyası

Bir tanesi eksikse → site kısmen çalışır.
Mesela `styles.css` yoksa → site Bootstrap default haline döner (çirkin).
`images/hero.png` yoksa → hero görseli yerine boş alan.

---

## 12. Hızlı Kontrol Komutu (PowerShell — yeni PC'de)

Yeni PC'de aç + bu komutu çalıştır → dosya sayımı doğru mu kontrol et:

```powershell
cd "C:\Users\KULLANICI\Desktop\KONSOLTECH DESİGN"
Get-ChildItem -Recurse | Measure-Object | Select-Object Count
# Beklenen: ~34 dosya (8 HTML+CSS + 26 image)
```

---

## SON

Her şey hazır. Eski PC → yeni PC taşımada **klasörü ZIP'le, kopyala, çıkar**. Bu kadar. 🚀
