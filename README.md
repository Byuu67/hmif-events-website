# HMIF Event Registration Website

Project ini adalah website untuk menampilkan daftar event dan memungkinkan user untuk mendaftar. Website ini juga memiliki halaman admin untuk membuat, mengedit, dan menghapus event.

Project ini dibuat menggunakan:
- Node.js
- Express.js
- SQLite3
- EJS (template engine)
- Express-session (untuk login admin)

---

## Fitur Utama

### 1. User
- Melihat daftar event
- Melihat kuota tersisa
- Mendaftar event jika kuota masih tersedia

### 2. Admin
- Login sebagai admin
- Melihat semua event
- Membuat event baru
- Mengedit event
- Menghapus event
- Hanya admin yang bisa mengakses halaman `/admin`

---

## Cara Instalasi

### 1. Clone atau download project

### 2. Install semua dependency
Jalankan perintah di terminal:

`npm install`

Perintah ini akan meng-install:
- express
- ejs
- sqlite3
- express-session

### 3. Jalankan server
Gunakan:

`node app.js`

Jika server berhasil berjalan, akan muncul pesan:

`Server running on http://localhost:3000`

### 4. Buka website di browser
Akses dengan:

`http://localhost:3000`

### 5. Login ke halaman admin (opsional)

Masuk ke halaman login admin:

`http://localhost:3000/login`

Gunakan akun:

`username: admin`

`password: 12345`

Dengan login, admin bisa:
- Membuat event
- Mengedit event
- Menghapus event
- Melihat data event

### 6. Mengubah username/password admin (opsional)
Edit code ini di app.js:

`const ADMIN_USER = "admin";`

`const ADMIN_PASS = "12345";`

### 7. Gunakan website
