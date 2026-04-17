# Wedding - Multi Project Collection

Repository ini berisi kumpulan template undangan pernikahan digital dalam beberapa variasi tema dan teknologi.

## Ringkasan

- Total proyek utama: 8
- Paket 1: 4 proyek undangan digital (Vite + HTML/CSS/JS)
- Paket 2: 4 proyek undangan tema Jawa
- Aset promosi: gambar dan video untuk kebutuhan presentasi/marketing

## Struktur Folder

```text
Wedding/
|-- Paket1/
|   |-- Promosi/
|   |-- VideoWedding1.mp4
|   |-- Wedding1/project/
|   |-- Wedding2/project/
|   |-- Wedding3/project/
|   `-- Wedding4/project/
|-- Paket2/
|   |-- WeddingJawa1/project/
|   |-- WeddingJawa2/project/
|   |-- WeddingJawa3/project/
|   `-- WeddingJawa4/project/
`-- README.md
```

## Daftar Proyek

| Path | Kategori | Stack Utama | Catatan |
| --- | --- | --- | --- |
| `Paket1/Wedding1/project` | Undangan modern | Vite, HTML, CSS, JavaScript | Fitur countdown, galeri, guestbook, kontrol musik |
| `Paket1/Wedding2/project` | Undangan modern | Vite, HTML, CSS, JavaScript | Variasi template Paket1 |
| `Paket1/Wedding3/project` | Undangan modern | Vite, HTML, CSS, JavaScript | Variasi template Paket1 |
| `Paket1/Wedding4/project` | Undangan modern | Vite, HTML, CSS, JavaScript | Variasi template Paket1 |
| `Paket2/WeddingJawa1/project` | Undangan tema Jawa | HTML, CSS, JavaScript, Vite | Halaman aktif memakai `index.html`, `style.css`, `script.js` |
| `Paket2/WeddingJawa2/project` | Undangan tema Jawa | HTML, CSS, JavaScript, Vite | Halaman aktif memakai `index.html`, `style.css`, `script.js` |
| `Paket2/WeddingJawa3/project` | Undangan tema Jawa | HTML, CSS, JavaScript, Vite | Halaman aktif memakai `index.html`, `style.css`, `script.js` |
| `Paket2/WeddingJawa4/project` | Undangan tema Jawa | HTML, CSS, JavaScript, Vite | Halaman aktif memakai `index.html`, `style.css`, `script.js` |

## Cara Menjalankan Proyek

Setiap proyek dijalankan secara terpisah dari folder `project` masing-masing.

1. Masuk ke salah satu proyek

```bash
cd Paket1/Wedding1/project
```

Contoh lain:

```bash
cd Paket2/WeddingJawa1/project
```

2. Install dependency

```bash
npm install
```

3. Jalankan mode development

```bash
npm run dev
```

4. Build production

```bash
npm run build
```

5. Preview hasil build

```bash
npm run preview
```

Catatan tambahan untuk proyek Paket1:

```bash
npm run serve
```

## Script Umum

- `dev`: menjalankan development server
- `build`: build production
- `preview`: preview hasil build
- `lint`: tersedia di proyek Paket2 (template React/Vite)
- `serve`: tersedia di proyek Paket1

## Catatan Pengembangan

- Semua proyek bersifat independen (masing-masing punya `package.json`).
- Dependency sebaiknya di-install per proyek, bukan di root.
- File `node_modules` dan `dist` tidak perlu masuk repository.

## Lisensi

Gunakan repository ini untuk pengembangan template undangan digital internal/portofolio sesuai kebutuhan.