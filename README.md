# Sistem Antrian Klinik by LilCode

## Fitur

- Registrasi dan Login Pengguna
- Kontrol Akses Berbasis Peran (Admin dan Staf ( untuk staff masih dalam pengembangan ))
- Manajemen Antrian Real-Time
- Pengelolaan Klinik (Tambah, Update, Hapus Klinik)
- Tampilan Status Antrian pada Berbagai Halaman
- Antarmuka Web untuk Admin, Staf, dan Tampilan Publik

## Teknologi yang Digunakan

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- socket.io
- Bootstrap
- HTML/CSS/JavaScript

## Instalasi

1. Clone repository:

   ```bash
   git clone https://github.com/yourusername/clinic-queue-system.git
   cd clinic-queue-system
   ```

2. Install dependensi backend:

   ```bash
   cd backend
   npm install
   ```

3. Install dependensi frontend:
   ```bash
   cd ../frontend
   npm install
   ```

## Variabel Lingkungan

Buat file `.env` di direktori `backend` dengan konten berikut:

```
MONGO_URI=mongodb://localhost:27017/clinicQueueDB
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

## Cara Menjalankan Aplikasi

1. Jalankan server backend:

   ```bash
   cd backend
   npm run dev
   ```

2. Server backend akan berjalan pada `http://localhost:3000`.

## Panduan Pengguna

### Admin

1. **Login** dan **Registrasi**:

   - Buka halaman `/register`.
   - Lakukan registrasi
   - Klik "Registrasi".

   - Buka halaman `/login`.
   - Masukkan username dan password.
   - Klik "Login".

2. **Dashboard**:
   - Buka halaman `/admin` setelah login.
   - Lihat status antrian saat ini dan kelola klinik.
   - Gunakan dropdown "Select Clinic" untuk memilih klinik.
   - Klik "Next" untuk melanjutkan antrian.
   - Klik "Reset Queue" untuk mereset antrian klinik yang dipilih.
   - Klik "Add Clinic" untuk menambah klinik baru menggunakan form modal.
   - Klik "Delete Clinic" untuk menghapus klinik yang dipilih.

### Tampilan Publik

1. **Lobby Display**:

   - Buka halaman `/lobby`.
   - Halaman ini akan menampilkan status antrian untuk semua klinik di area publik.

2. **Clinic Display**:
   - Buka halaman `/clinic`.
   - Halaman ini akan menampilkan status antrian untuk klinik tertentu.
   - Untuk mengatur tampilan setiap clinic atur lewat url dengan format http://localhost:3000/clinic?clinicCode={isi dengan code clinic}

---

**!!!!Untuk saat ini aplikasi masih dalam tahap pengembangan!!!!**
