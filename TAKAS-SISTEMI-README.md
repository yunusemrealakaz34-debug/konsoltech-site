# 🎮 KonsolTech — Oyun Takas Sistemi Kılavuzu

888 oyunluk takas/satış fiyat listesi, canlı arama ve haftalık otomatik güncelleme.

---

## 1. Ne Eklendi?

| Dosya | Görevi |
|-------|--------|
| `takas.html` | Takas sayfası — kategori sekmeleri + arama + oyun kartları |
| `takas.js` | Arama / filtre / kart render mantığı |
| `data/games.json` | **Tek veri kaynağı** — 888 oyun (PS4·PS5·Switch·Switch2) |
| `data/sources/*.csv` | Senin orijinal listelerin (yeniden derleme için) |
| `scripts/build_data.py` | CSV'leri → `games.json`'a çevirir |
| `scripts/enrich_images.py` | Oyun kapaklarını RAWG'den çeker |
| `scripts/check_new_games.py` | oyunmerkezi'nde olup sende olmayan oyunları bulur |
| `.github/workflows/haftalik-guncelle.yml` | Haftalık otomatik güncelleme (GitHub) |
| Tüm sayfalara | Menüye **"Oyun Takas"** linki eklendi |

> Menü, footer ve renkler mevcut tasarımla birebir uyumlu.

---

## 2. Sayfayı Açma / Test

`takas.html` **sunucu ister** (JSON'u `fetch` ile yükler, çift tıkla çalışmaz):

```bash
cd "KONSOLTECH DESİGN"
python3 -m http.server 8000
# tarayıcı: http://localhost:8000/takas.html
```

Yayındayken (konsoltech.tr) normal çalışır — sunucu zaten var.

---

## 3. Fiyatları Güncelleme (Manuel — En Basit Yol)

1. İlgili CSV'yi düzenle: `data/sources/ps4.csv`, `ps5.csv`, `switch1.csv`, `switch2.csv`
   - Format aynı kalsın (noktalı virgül `;` ile ayrık).
2. Derle:
   ```bash
   python3 scripts/build_data.py
   ```
3. `data/games.json` yenilenir → siteyi yeniden yükle. Bitti.

> Mevcut kapak resimleri korunur, kaybolmaz.

---

## 4. Oyun Kapaklarını Ekleme (Resimler)

Şu an kartlar resim yoksa şık bir konsol ikonu gösteriyor. Gerçek kapaklar için:

1. **Ücretsiz** API anahtarı al → https://rawg.io/apidocs
2. Çalıştır:
   ```bash
   export RAWG_KEY="senin_anahtarin"
   python3 scripts/enrich_images.py          # hepsi
   python3 scripts/enrich_images.py --limit 50   # test için 50 tane
   ```
3. `games.json`'a otomatik kapak URL'leri yazılır. İsimden eşleşmeyen birkaç oyun
   ikon olarak kalır — istersen `games.json`'da o oyunun `"image"` alanına elle URL yapıştır.

---

## 5. oyunmerkezi'nden Yeni Oyun Yakalama

Rakip sitede (oyunmerkezi.com.tr / psoyunmerkezi.com) fiyatlar JavaScript hesaplayıcıyla
sunulduğu için **fiyatlar otomatik çekilemez**. Ama **yeni eklenen oyun başlıkları** çekilebilir:

```bash
python3 scripts/check_new_games.py
```

→ `data/yeni-oyunlar.txt` dosyasına "sitede var, sende yok" listesini yazar.
Sen o oyunların fiyatını belirleyip CSV'ye ekler, `build_data.py` çalıştırırsın.

---

## 6. Haftalık Otomatik Güncelleme

Hazır `.github/workflows/haftalik-guncelle.yml` her Pazartesi otomatik:
`build_data.py` → `enrich_images.py` → `check_new_games.py` → commit.

**Aktif olması için site GitHub'da olmalı:**

1. Projeyi GitHub'a yükle (repo).
2. (Opsiyonel resim için) repo → **Settings → Secrets → Actions** → `RAWG_KEY` ekle.
3. **Settings → Pages** → kaynağı `main` yap → site `kullanici.github.io/repo` adresinde yayında.
4. Artık her hafta liste kendini günceller, sıfır müdahale.

> **Netlify** kullanırsan: klasörü https://app.netlify.com/drop adresine sürükle, haftalık
> güncelleme için "Scheduled Functions" gerekir. **cPanel** kullanırsan sunucuda cron + bu
> script'ler. Hangisini seçersen söyle, ona göre bağlarım.

---

## 7. Hızlı Özet

```
Fiyat değişti      → CSV düzenle → build_data.py
Resim isteniyor    → RAWG_KEY al → enrich_images.py
Yeni oyun var mı?  → check_new_games.py
Tam otomatik       → GitHub'a yükle, workflow halleder
```
