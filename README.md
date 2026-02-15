# 📚 Learnova App

Learnova adalah aplikasi pembelajaran berbasis **Web dan Mobile** yang telah terintegrasi dengan **Cloud Infrastructure**.  
Aplikasi ini mendukung penggunaan **local development** maupun **production deployment**.

---

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (MongoDB Atlas – Cloud)  
- **Web Frontend**: React + Vite  
- **Mobile App**: React Native (Expo)  
- **Deployment**:
  - Backend: Render
  - Web: Netlify
  - Mobile: Expo (EAS Update)

---

## 🌐 Production URL

- **Backend API**  
 https://learnova-app-backend.onrender.com

- **Web App**  
  https://learnova-app-helladwipratiwi.netlify.app/ 

- **Mobile App (Expo)**  
  https://expo.dev/preview/update?message=Initial+deploy+Learnova&updateRuntimeVersion=1.0.0&createdAt=2026-02-15T16%3A45%3A30.824Z&slug=exp&projectId=f2a3b1fd-b69c-4dcb-b5bd-dc98960f0129&group=a947459a-2762-4114-88aa-182c577000c6 

⚠️ *Catatan:* Backend menggunakan Render Free Tier, sehingga server dapat mengalami **cold start ±50–60 detik** saat pertama kali diakses.

---

## 🧩 Cara Menjalankan Aplikasi Secara Lokal

### 1. Clone Repository
```bash
git clone https://github.com/username/learnova.git
cd learnova
```

### 2. Masuk Folder Backend
```bash
cd backend
```

### 3. Konfigurasi Environment
Salin file ```bash .env.example:```
```bash
cp .env.example .env
```

Isi file ```bash.env``` sesuai konfigurasi lokal:
```bash
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

### 4. Install Dependency
```bash
npm install
```

### 5. Jalankan Backend
```bash
npm run dev
```

📌 Backend akan berjalan di:
```bash
http://localhost:5000
```

## 🌐 Web Application (Local)

### 1. Masuk Folder Web App
```bash
cd ../web-app
```

### 2. Install Dependency
```bash
npm install
```

### 3. Konfigurasi API
Pastikan base URL API mengarah ke backend lokal:
```bash
VITE_API_URL=http://localhost:5000
```

### 4. Jalankan Web App
```bash
npm run dev
```

📌 Web App dapat diakses melalui:
```bash
http://localhost:5173
```

## 📱 Mobile Application (Local)

### 1. Masuk Folder Mobile App
```bash
cd ../mobile-app
```

### 2. Install Dependency
```bash
npm install
```

### 3. Konfigurasi API Endpoint
- HP Fisik
```bash
http://YOUR_IP_:5000
```

📌 Pastikan laptop dan HP berada di jaringan WiFi yang sama

### 4. Jalankan Mobile App
```bash
npx expo start
```

Buka aplikasi menggunakan Expo Go
