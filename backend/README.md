# 🚀 Learnova Backend API

Server utama Learnova yang menangani autentikasi pengguna, manajemen kursus, dan penjadwalan belajar.

## 🛠️ 1. Teknologi & Fitur

- **Node.js & Express**: Framework server-side.
- **MongoDB Atlas**: Database NoSQL cloud untuk menyimpan data aplikasi.
- **JWT Authentication**: Keamanan akun pengguna (Password di-hash dengan bcrypt).

## 🗄️ 2. Struktur Database (Data Models)

Berdasarkan skema yang digunakan, berikut adalah data utama yang dikelola:

### 👤 Users
- **Fields**: `fullName`, `email`, `password`, `profileImage`, `myCourses` (Array).
- **Contoh Data**: Martin Edwards (`martinc@gmail.com`).

### 📚 Courses
- **Fields**: `title`, `category`, `mentorName`, `mentorImage`, `image`, `description`, `rating`, `isRecommended`.
- **Contoh Data**: "Advanced Biology" oleh Dr. Smith.

### 📅 Schedules
- **Fields**: `userId`, `courseId`, `date`, `topic`, `status`, `progress`.
- **Status**: `ongoing`, `completed`.

---

## 🚀 Setup & Installation

1. **Clone Repository**:
   ```bash
   git clone https://github.com/hlaadwip/Learnova-ExamProject.git
   cd backend

2. **Install Dependencies**:
   ```bash
   npm install
   
3. **Configure Environment:**:
   Buat file .env dan isi:
   ```bash
   MONGODB_URI=isi_dengan_uri_mongodb_atlas_lo
   PORT=5000
   JWT_SECRET=secret_bebas_apa_aja

4. **Run Server**:
   ```bash
   npm run dev
