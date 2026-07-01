# 🚀 Bilinçli Doz - Deployment Talimatları

Merhaba Furkan! Sitenizi yayına almak için aşağıdaki adımları takip edin.

---

## 📱 HIZLI BAŞLAMA (5 dakika)

### Seçenek 1: Vercel (ÖNERİLEN - En Kolay)

**1. Adım: Vercel'e Gidin**
- https://vercel.com adresine gidin
- "Sign up" butonuna tıklayın
- GitHub hesabınız varsa GitHub ile bağlayın, yoksa e-posta ile kayıt olun

**2. Adım: Projeyi Yükleyin**
- "New Project" butonuna tıklayın
- "Import Git Repository" seçin ve GitHub repo'nuzun linkini yapıştırın
- **VEYA** Aşağıdaki dizini zip olarak yükleyin:
  ```
  package.json
  vite.config.js
  index.html
  netlify.toml
  src/
    ├─ main.jsx
    └─ App.jsx
  ```

**3. Adım: Deploy Edin**
- "Deploy" butonuna tıklayın
- 2-3 dakika sonra siteniz canlı olacak!

**4. Adım: Size verilen URL**
- Vercel size bir URL verecek: `https://bilinclidoz.vercel.app`
- Bu URL'yi QR kodunuza koyabilirsiniz

---

### Seçenek 2: Netlify (İkinci Tercih)

**1. Adım: Netlify'a Gidin**
- https://netlify.com adresine gidin
- E-mail: **furkanyayla1258@gmail.com**
- Şifre: Kendi şifrenizi seçin

**2. Adım: Siteyi Yükleyin**
- Dashboard'da "Add new site" → "Deploy manually" seçin
- Yukarıdaki klasörü zip yapıp sürükle-bırak yapın
- Netlify deploy edecek

**3. Adım: Size verilen URL**
- `https://bilinclidoz.netlify.app` gibi bir URL alacaksınız

---

## 🌐 CUSTOM DOMAIN EKLEME (İsteğe Bağlı)

Eğer `bilinclidoz.app` alan adı almak istiyorsanız:

### Alan Adı Almak
1. **Namecheap** (ÖNERİLEN - ucuz)
   - https://namecheap.com
   - Arama: `bilinclidoz.app`
   - Fiyat: ~$6/yıl
   - Satın alın

2. **Google Domains**
   - https://domains.google
   - `bilinclidoz.app` arayın
   - Satın alın

### Domain'i Bağlamak (Vercel)
1. Vercel dashboard → Sitenize gidin
2. "Settings" → "Domains"
3. "Add Domain" butonuna tıklayın
4. `bilinclidoz.app` yazın
5. Vercel size DNS ayarlarını gösterecek
6. Namecheap'e gidip bu ayarları yapılandırın
7. 10-30 dakika içinde bağlanacak!

---

## 📊 QR KOD OLUŞTURMA

Aldığınız URL'yi QR koda çevirmek için:

1. https://qr-code-generator.com adresine gidin
2. URL alanına sitenizin adresini yapıştırın: `https://bilinclidoz.vercel.app`
3. "Generate" butonuna tıklayın
4. QR kodunu indirin
5. Kartlarınıza yazdırabilirsiniz!

---

## 💡 ÖNERILER

- **Başlangıç:** Vercel'in free URL'sini kullanarak başlayın (`bilinclidoz.vercel.app`)
- **Sonra:** İstediğiniz zaman `bilinclidoz.app` custom domain ekleyin

---

## 📞 SORUN ÇIKARSA

Aşağıdakileri kontrol edin:
1. İnternet bağlantınız var mı?
2. E-mail adresiniz doğru mu? (furkanyayla1258@gmail.com)
3. Tüm dosyalar orada mı?

---

## 📋 DOSYA YAPISI

Proje klasörünüz şu şekilde olmalı:
```
bilincli-doz/
├── package.json
├── vite.config.js
├── netlify.toml
├── index.html
└── src/
    ├── main.jsx
    └── App.jsx
```

---

**İyi şanslar! 🍀 Sorularınız varsa yazın.**
