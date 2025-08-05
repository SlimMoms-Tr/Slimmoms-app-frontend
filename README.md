# SlimMoms App Frontend

SlimMoms uygulamasının React tabanlı frontend'i. Kullanıcıların günlük kalori takibi yapabilecekleri, besin günlüğü tutabilecekleri modern web uygulaması.

## 🚀 Özellikler

- **Modern UI**: Material-UI ile modern ve responsive tasarım
- **Authentication**: JWT tabanlı kullanıcı kimlik doğrulama
- **Calorie Calculator**: Günlük kalori hesaplama
- **Food Diary**: Besin günlüğü yönetimi
- **Product Search**: Besin ürünleri arama
- **State Management**: Redux Toolkit ile state yönetimi
- **Form Validation**: Formik + Yup ile form doğrulama

## 🛠️ Teknolojiler

- **React 19** - UI library
- **Vite** - Build tool
- **Material-UI** - UI components
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Axios** - HTTP client
- **Formik + Yup** - Form handling
- **React Toastify** - Notifications

## 📋 Gereksinimler

- Node.js 18+
- Backend API (SlimMoms Backend)

## 🔧 Kurulum

1. **Repository'yi klonlayın:**

```bash
git clone https://github.com/SlimMoms-Tr/Slimmoms-app-frontend.git
cd Slimmoms-app-frontend
```

2. **Bağımlılıkları yükleyin:**

```bash
npm install
```

3. **Environment variables oluşturun:**

```bash
# .env dosyası oluşturun
VITE_API_URL=https://slimmoms-app-backend.onrender.com
```

4. **Uygulamayı çalıştırın:**

```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

## 📱 Sayfalar

- **Ana Sayfa** (`/`) - Uygulama tanıtımı
- **Giriş** (`/login`) - Kullanıcı girişi
- **Kayıt** (`/register`) - Kullanıcı kaydı
- **Hesap Makinesi** (`/calculator`) - Kalori hesaplama
- **Günlük** (`/diary`) - Besin günlüğü

## 🎨 Bileşenler

- **Header** - Navigasyon ve kullanıcı bilgileri
- **LoginForm** - Giriş formu
- **RegistrationForm** - Kayıt formu
- **DailyCaloriesForm** - Kalori hesaplama formu
- **DiaryProductsList** - Besin listesi
- **ProductSearch** - Ürün arama

## 📊 State Management

### Redux Store

- **auth** - Kimlik doğrulama durumu
- **dailyCalories** - Günlük kalori hesaplamaları
- **day** - Günlük besin verileri
- **user** - Kullanıcı bilgileri

## 🚀 Deployment

### Vercel

1. Vercel.com'da yeni proje oluşturun
2. GitHub repository'nizi bağlayın
3. Environment variables'ları ayarlayın:
   - `VITE_API_URL`: Backend API URL'i
4. Deploy edin

### Environment Variables

```env
VITE_API_URL=https://slimmoms-app-backend.onrender.com
```

## 📝 Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Build preview
- `npm run lint` - ESLint kontrolü

## 🔧 Konfigürasyon

### Vite Config

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
});
```

### API Konfigürasyonu

```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
```

## 🎯 Özellikler

### Authentication

- JWT token tabanlı kimlik doğrulama
- Otomatik token yenileme
- Güvenli logout

### Calorie Calculator

- Kullanıcı bilgilerine göre kalori hesaplama
- Aktivite seviyesi dikkate alma
- Hedef kilo hesaplama

### Food Diary

- Günlük besin ekleme/silme
- Kalori takibi
- Tarih bazlı filtreleme

### Product Search

- Besin ürünleri arama
- Otomatik tamamlama
- Kalori bilgisi

## 📞 İletişim

Proje hakkında sorularınız için: [GitHub Issues](https://github.com/SlimMoms-Tr/Slimmoms-app-frontend/issues)
