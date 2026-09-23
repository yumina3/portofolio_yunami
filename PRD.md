# PRD: Website Portofolio untuk Rekruter (Tema "Sehari di Pantai")

**Versi:** 1.1 | **Tanggal:** 20 September 2026 | **Pemilik:** yunami

> **Catatan untuk AI coding assistant:** dokumen ini menjelaskan **apa** yang dibangun dan **mengapa**. Detail visual (warna, tipografi, komponen, spesifikasi animasi) ada di `DESIGN.md`. Jika ada konflik antara kedua file, `DESIGN.md` menang untuk urusan tampilan dan gerakan, `PRD.md` menang untuk urusan fitur dan scope.
>
> **Perubahan dari v1.0:** konsep visual diganti dari gaya editorial/WebGL (Emotion Agency) menjadi *scroll storytelling* bertema pantai. Struktur fitur, alur pengguna, data, dan scope tetap sama, dengan penyesuaian pada section, tabel animasi, dan kriteria penerimaan.

---

## 1. Ringkasan Produk

Website portofolio pribadi dengan halaman utama yang menampilkan isi CV secara visual dan interaktif. Halaman utama berupa satu halaman panjang yang bercerita sebagai **perjalanan sehari di pantai**: fajar (hero), siang (tentang, skill, pengalaman), laut jernih (project), sore (wall pesan), dan malam (kontak). Perubahan warna langit dan ombak yang menyapu antar-section menjadi momen visual utama.

Target utamanya adalah HRD dan rekruter, yang biasanya hanya punya waktu 1-3 menit untuk menilai kandidat.

**Tantangan utama:** tema yang penuh gerak dan atmosfer bisa mengganggu rekruter yang butuh kecepatan dan kejelasan. Solusinya: animasi dipakai sebagai "rasa", bukan penghalang. Konten selalu terbaca, tombol Download CV ada di tempat yang mudah ditemukan, dan ada opsi mengurangi animasi.

### Ciri desain yang diadaptasi
- Preloader dengan persentase, bertema air laut yang naik.
- Dock navigasi mengambang di bawah layar dengan penanda section aktif.
- Latar yang berubah warna mengikuti scroll (fajar, siang, laut jernih, sore, malam).
- Transisi ombak antar section.
- Kartu project bertumpuk saat di-scroll.
- Wall pesan berupa sticky note.
- Panel Quality untuk mengurangi animasi.
- Footer dengan email yang bisa disalin sekali klik.

---

## 2. Goals & Non-Goals

### Goals
| # | Goal | Indikator sukses |
|---|------|------------------|
| G1 | Rekruter memahami profil kandidat dalam < 60 detik | Semua section inti terjangkau dalam 1 scroll panjang atau 1 klik dock |
| G2 | Meninggalkan kesan visual yang memorable dan profesional | Feedback kualitatif dari teman, dosen, dan rekruter |
| G3 | Memudahkan rekruter menghubungi atau mengunduh CV | Tombol kontak/CV terlihat di >= 2 titik halaman |
| G4 | Konten mudah diubah tanpa menyentuh logika kode | Semua data ada di 1 folder data terpusat |
| G5 | Performa baik | Lighthouse Performance >= 85 (mobile), Accessibility >= 90 |

### Non-Goals (fase 1)
- Sistem login atau admin panel.
- Blog, CMS berbayar, atau multi-bahasa penuh.
- Backend khusus atau database server.
- WebGL/Three.js. Semua efek memakai DOM, SVG, dan CSS.
- Wall pesan real-time (pesan pengunjung langsung tampil). Lihat fase 2.

---

## 3. Target Pengguna

### Primary persona: Rekruter / HRD
- Membuka link dari CV, LinkedIn, atau email lamaran, sering dari laptop kantor, kadang dari HP.
- **Kebutuhan:** siapa kandidat ini, skill apa, pengalaman apa, buktinya apa, cara kontaknya bagaimana.
- **Frustrasi:** loading lama, navigasi membingungkan, informasi tersembunyi di balik animasi.

### Secondary persona: Hiring manager / user teknis
- Ingin melihat detail project, stack, dan link demo atau repo.

---

## 4. Fitur

### 4.1 Fitur Wajib (MVP)

| Section | Isi | Catatan |
|---------|-----|---------|
| **Hero (fajar)** | Nama, headline peran (mis. "Information Systems Student & Product Builder"), foto, CTA "View work" dan "Download CV" | Matahari terbit, kartu kaca, chip skill mengapung |
| **Tentang saya (siang)** | Bio singkat 2-3 paragraf, foto, tombol CV | Foto di bingkai kaca |
| **Skill / Tech stack (siang)** | Badge teknologi bergerak di jalur gelombang, plus kartu kategori (Frontend, Backend, Data/ML, dll.) | Hindari progress bar persentase karena kurang kredibel di mata rekruter |
| **Pengalaman (siang)** | 3-4 angka highlight (counter) dan timeline: organisasi/perusahaan, peran, periode, 2-4 poin pencapaian terukur | Urut dari terbaru |
| **Project (laut jernih)** | Kartu bertumpuk berisi judul, kategori, deskripsi, tag teknologi, thumbnail, tombol "View case study". Klik masuk ke halaman detail | Detail berisi masalah, peran, solusi, hasil, link demo/repo |
| **Wall (sore)** | Kumpulan sticky note berisi kesan atau pesan, plus form "Leave a note" | MVP: note tampil dari data statis, form mengirim ke email pemilik. Lihat 4.3 |
| **Kontak (malam)** | Email (klik-untuk-salin), LinkedIn, GitHub, WhatsApp opsional, CTA besar | Footer dengan bulan, mercusuar, dan CTA |

### 4.2 Fitur Pendukung (sangat disarankan)
- **Download CV (PDF)** di hero, section tentang, dan dock/navbar.
- **Preloader** singkat (maks. 2 detik) dengan persentase dan air laut yang naik, lalu tampil konten. Dilewati otomatis pada kunjungan berikutnya.
- **Dock navigasi** mengambang dengan scroll-spy dan smooth scroll ke section.
- **Mode Reduce Motion / Quality** (High, Low, Off): mematikan animasi berat, juga otomatis mengikuti `prefers-reduced-motion`.
- **Smooth scroll** (Lenis).
- **SEO dan share preview**: title, meta description, Open Graph image, sehingga link tampil rapi saat dibagikan di LinkedIn atau WhatsApp.
- **Halaman 404**.

> **Perubahan:** toggle Dark/Light mode dari v1.0 dihapus. Tema hari di pantai sudah mencakup suasana gelap (section kontak di malam hari), sehingga dua tema terpisah akan bentrok dengan konsep utama.

### 4.3 Fitur Fase 2 (opsional)
- Wall real-time: pesan pengunjung disimpan di Firebase Firestore dengan moderasi (`approved: false` sampai disetujui) dan proteksi spam.
- Fluid cursor bertema air (asap putih lembut mengikuti mouse), aktif hanya di desktop dengan Quality High.
- Sound toggle (suara ombak lembut).
- Versi bahasa Indonesia dan Inggris.
- Analytics ringan (Plausible atau GA4) untuk melihat klik CV dan kontak.

---

## 5. User Flow

### Flow utama rekruter
```
Buka link -> Preloader -> Hero (nama, peran, foto)
   -> Scroll: Tentang -> Skill -> Pengalaman -> Project (kartu bertumpuk)
   -> (opsional) Klik "View case study" -> Detail project -> Kembali
   -> Wall -> Kontak / Download CV
```

### Flow cepat (rekruter yang terburu-buru)
```
Buka link -> Klik "Download CV" di hero -> selesai
Buka link -> Dock -> langsung lompat ke Projects atau Contact
```

### Flow kontak
```
Klik tombol kontak di dock atau hero -> Section Kontak
   -> (a) Salin email  (b) Buka LinkedIn  (c) Kirim pesan lewat form Wall -> Notifikasi sukses
```

### Struktur halaman
| Route | Fungsi |
|-------|--------|
| `/` | Home berisi Hero, Tentang, Skill, Pengalaman, Project, Wall, Kontak |
| `/projects/:slug` | Detail project |
| `*` | 404 |

> **Perubahan:** route `/projects` dan `/contact` dari v1.0 dihapus karena semua sudah ada di halaman home. Bisa ditambahkan kembali jika jumlah project bertambah banyak.

---

## 6. UI/UX

> Spesifikasi lengkap ada di `DESIGN.md`. Bagian ini adalah ringkasannya.

### 6.1 Arah Desain
- **Karakter:** hangat, segar, tenang, dan percaya diri. Satu momen yang paling diingat (perubahan langit + ombak), sisanya dibuat tenang dan rapi.
- **Palet "Tropical Day":** Deep Ocean `#0B3C5D`, Turquoise `#2EC4B6`, Shallow Water `#A8E6E2`, Sky `#BFE6F5`, Sand `#F6E7C8`, Foam `#FFFDF7`, Coral `#FF7F5C`, Sun `#FFC857`.
- **Tipografi:** judul section berfont script (Sacramento), teks UI dan body berfont sans-serif bersih (Plus Jakarta Sans). Maksimal 2 font family.
- **Grid:** 12 kolom desktop, 4 kolom mobile, margin luas.
- **Prinsip motion:** durasi 0.4-0.9 detik untuk interaksi, easing halus, tidak boleh menghambat pembacaan.

### 6.2 Layout per Section
1. **Dock navigasi:** bar kaca mengambang di tengah bawah, berisi ikon + label (Home, About, Skills, Experience, Projects, Wall, Contact). Di mobile hanya ikon, dengan label pada item aktif.
2. **Hero (fajar):** matahari terbit, kartu kaca berisi judul dan subjudul, foto, chip skill mengapung, ombak di dasar layar, indikator "Scroll".
3. **Tentang (siang):** sapaan besar, badge peran, deskripsi, tombol "View work" dan "Download CV", foto di bingkai kaca.
4. **Skill (siang):** judul "My Tech Stack", badge bergerak di jalur gelombang, 4 kartu kategori.
5. **Pengalaman (siang):** 4 kartu statistik, timeline vertikal dengan garis yang tergambar mengikuti scroll, kartu bergantian kiri-kanan.
6. **Project (laut jernih):** judul "My Portfolio", kartu bertumpuk (sticky), tiap kartu berisi screenshot di kiri dan detail di kanan.
7. **Wall (sore):** form kecil di tengah dikelilingi sticky note miring yang melayang pelan.
8. **Kontak (malam):** bulan, mercusuar dengan sinar berputar, heading besar, CTA, dan footer (GitHub, LinkedIn, email).

### 6.3 Responsivitas dan Aksesibilitas
- Mobile-first, breakpoint: 640 / 768 / 1024 / 1280.
- Navigasi keyboard penuh dan `alt` pada semua gambar.
- Kontras teks minimal WCAG AA (aturan penggunaan warna aksen ada di `DESIGN.md`).
- Animasi non-esensial dinonaktifkan di perangkat lemah atau saat reduce-motion aktif.
- Teks tidak boleh bergantung pada animasi untuk terbaca (fallback statis).

### 6.4 Spesifikasi Animasi

| # | Animasi | Perilaku yang diinginkan | Implementasi | Prioritas |
|---|---------|--------------------------|--------------|-----------|
| A1 | **Preloader ombak** | Layar loading dengan angka `000%` naik ke `100%`, air laut naik mengisi layar, lalu terbelah membuka hero | GSAP timeline, progress nyata dari pemuatan aset (font, gambar hero) | Wajib |
| A2 | **Intro hero** | Matahari terbit dari horizon, kartu kaca dan foto muncul, chip mulai mengapung | GSAP timeline | Wajib |
| A3 | **Smooth scroll** | Scroll terasa mengalir dengan inersia | Lenis disinkronkan dengan GSAP ticker | Wajib |
| A4 | **Latar berubah mengikuti scroll** | Warna latar berinterpolasi: fajar, siang, laut jernih, sore, malam | ScrollTrigger `scrub` menganimasikan CSS variable | Wajib |
| A5 | **Transisi ombak antar section** | 2-3 layer gelombang SVG naik dari bawah dengan kecepatan berbeda, menutupi lalu membuka ke section berikutnya. Pita teks berjalan (marquee) di atasnya | ScrollTrigger `scrub` + parallax | Wajib |
| A6 | **Chip mengapung** | Chip skill di hero naik-turun dan berotasi pelan seperti mengapung di air | GSAP atau Framer Motion, loop dengan fase acak | Wajib |
| A7 | **Badge di jalur gelombang** | Badge teknologi bergerak loop di sepanjang jalur gelombang sinus | SVG motion path (GSAP MotionPathPlugin) atau CSS `offset-path` | Disarankan |
| A8 | **Counter dan timeline** | Angka menghitung naik saat terlihat, garis timeline tergambar mengikuti scroll | GSAP tween + ScrollTrigger `scrub` | Wajib |
| A9 | **Kartu project bertumpuk** | Kartu sebelumnya mengecil dan memudar saat kartu berikutnya naik menimpanya | `position: sticky` + ScrollTrigger atau `useScroll` | Wajib |
| A10 | **Sticky note melayang** | Note miring dan melayang pelan, membesar dan lurus saat hover | Framer Motion | Disarankan |
| A11 | **Kontak malam** | Sinar mercusuar berputar pelan, cincin cahaya berdenyut, pantulan bulan di air | CSS/GSAP loop | Disarankan |
| A12 | **Dock scroll-spy** | Item aktif berpindah mengikuti section yang terlihat, klik = smooth scroll | IntersectionObserver + Lenis `scrollTo` | Wajib |
| A13 | **Hover tombol** | Teks tombol bergulir ke atas dan digantikan salinannya, tombol utama sedikit magnetik (desktop) | CSS transform atau GSAP `quickTo` | Disarankan |
| A14 | **Panel Quality** | Toggle High/Low/Off, perubahan disimpan di `localStorage` | State global (Context atau Zustand) | Wajib |
| A15 | **Transisi ke detail project** | Pindah route ditutup dan dibuka dengan wipe ombak, bukan lompat langsung | React Router + wrapper transisi (GSAP), atau View Transitions API | Disarankan |
| A16 | **Salin email** | Klik email menyalin ke clipboard dan label berubah jadi "Copied" sesaat | `navigator.clipboard` + animasi teks | Wajib |
| A17 | **Fluid cursor air** | Asap putih lembut mengikuti mouse | WebGL/canvas, dimuat lazy | Fase 2 |

### 6.5 Aturan Performa dan Fallback Animasi
- **Target 60 fps** di laptop menengah. Animasikan hanya `transform` dan `opacity`.
- **Quality toggle:**
  - *High*: semua efek.
  - *Low*: layer ombak dikurangi, chip dan badge lebih sedikit, tanpa berkas cahaya dan pantulan bulan.
  - *Off*: tanpa animasi, transisi instan, latar berganti warna per section tanpa interpolasi.
  - Default otomatis: *Low* di mobile atau perangkat lemah, *Off* jika `prefers-reduced-motion` aktif.
- Semua animasi dibungkus `useGSAP` (`@gsap/react`) atau di-cleanup saat komponen unmount agar tidak bocor memori dan tidak dobel saat React StrictMode.
- Preloader tidak boleh lebih dari 2-3 detik dan otomatis dilewati pada kunjungan berikutnya.
- Konten penting (nama, kontak, tombol CV) harus tetap ada di DOM dan bisa dibaca screen reader walaupun animasi belum selesai.

---

## 7. Database Overview

**Fase 1 tidak memerlukan database server.** Karena konten diganti manual, semua data disimpan sebagai file terstruktur di dalam repo (mis. `src/data/`). Ini tercepat, gratis, dan tidak ada risiko down.

### Skema data (JSON/JS object)

```
profile        { name, headline, photo, bio[], email, cvUrl, location }
socials[]      { label, url }
highlights[]   { label, value }
skills[]       { category, items[ { name, icon } ] }
techBadges[]   { name, icon, color }
experiences[]  { id, role, organization, startDate, endDate|null,
                 description[], techStack[] }
projects[]     { id, slug, title, year, category, type, scope[], stack[],
                 thumbnail, summary, problem, role, solution,
                 result, demoUrl?, repoUrl?, images[] }
notes[]        { id, name, message, color, rotation }
```

Data awal project: InternShape, Diabetes DSS, E-Wallet K-Means, Hasil Bumi (gambar placeholder, ganti dengan screenshot asli).

### Wall pesan
- **Fase 1:** `notes[]` berisi pesan yang dipilih pemilik. Form "Leave a note" mengirim pesan ke email pemilik lewat EmailJS atau Formspree. Pemilik menambahkan pesan yang layak tampil ke `notes[]` secara manual.
- **Fase 2:** koleksi Firestore `wall_notes` dengan field `{ name, message, color, createdAt, approved }`. Halaman hanya menampilkan dokumen `approved: true`.

---

## 8. Technical Requirements

### 8.1 Tech Stack
| Kebutuhan | Pilihan | Alasan |
|-----------|---------|--------|
| Framework | **React 18+ (Vite)** | Sesuai permintaan, build dan HMR cepat |
| Bahasa | JavaScript atau TypeScript | TypeScript disarankan agar skema data aman |
| Styling | **Tailwind CSS** | Kontrol desain penuh, cocok untuk layout dan design tokens kustom |
| Routing | React Router | Halaman detail project |
| Animasi | **GSAP + ScrollTrigger** (`@gsap/react`), Framer Motion untuk animasi UI sederhana | Kontrol scroll dan timeline yang presisi |
| Smooth scroll | Lenis | Scroll halus |
| Ikon | lucide-react | Ringan dan konsisten |
| State global | React Context atau Zustand | Quality dan preferensi |
| Form | EmailJS atau Formspree | Tanpa backend |
| Hosting | Vercel, Netlify, atau Firebase Hosting | Deploy gratis dari GitHub |

### 8.2 Struktur Folder
```
src/
  components/   (layout/, sections/, ui/, effects/)
  pages/        (Home, ProjectDetail, NotFound)
  data/         (profile, skills, experiences, projects, notes)
  hooks/        (useQuality, useReducedMotion, useScrollSpy, ...)
  assets/       (images, fonts, cv.pdf, svg/)
  styles/
  App.jsx
  main.jsx
```

### 8.3 Non-Functional Requirements
- **Performa:** LCP < 2.5 detik, gambar WebP/AVIF, lazy-load di bawah fold. Total bundle awal idealnya < 300 KB gzip.
- **Kompatibilitas:** Chrome, Edge, Safari, Firefox versi terbaru, iOS Safari, Android Chrome.
- **SEO:** meta tag, sitemap, `robots.txt`, judul unik per halaman. Karena Vite adalah SPA, pastikan konten utama tetap terbaca oleh crawler (pertimbangkan prerender jika perlu).
- **Keamanan:** tidak ada data sensitif di repo, serta proteksi spam pada form (honeypot atau reCAPTCHA).
- **Maintainability:** semua teks dan gambar diubah lewat `src/data/` tanpa menyentuh komponen.

---

## 9. Scope Project

### In Scope (MVP)
- 7 section (hero, tentang, skill, pengalaman, project, wall, kontak).
- Halaman detail project dan halaman 404.
- Download CV, Quality toggle (reduce motion), preloader, dock navigasi.
- Animasi berprioritas **Wajib** dan **Disarankan** pada tabel 6.4 (A1-A16).
- Responsif mobile dan desktop, SEO dasar, deploy publik dengan URL sendiri.

### Out of Scope (MVP)
- Admin panel atau CMS, login, blog.
- Multi-bahasa, sound.
- Wall real-time dan fluid cursor (A17).
- WebGL/Three.js.
- Backend dan database server.

### Milestone (estimasi 6-7 minggu, bisa dipadatkan)
| Fase | Durasi | Output |
|------|--------|--------|
| 1. Discovery & konten | 1 minggu | Kumpulkan foto, teks, project, CV. Siapkan screenshot project dan aset ombak/mercusuar |
| 2. Desain | 1 minggu | Wireframe dan desain hi-fi (Figma) desktop dan mobile, mengacu ke `DESIGN.md` |
| 3. Setup & struktur | 0.5 minggu | Repo Vite, Tailwind, design tokens, routing, layout, dock, data terpusat |
| 4. Pengembangan section | 2 minggu | Hero, Tentang, Skill, Pengalaman, Project, Wall, Kontak, dan halaman detail project |
| 5. Animasi lanjutan | 1 minggu | Latar berubah, transisi ombak, kartu bertumpuk, badge gelombang, transisi halaman (A4, A5, A7, A9, A15) |
| 5b. Polish | 1 minggu | Quality toggle, performa, aksesibilitas, SEO |
| 6. QA & rilis | 0.5 minggu | Uji lintas perangkat, deploy, domain |
| 7. (Opsional) Fase 2 | Menyesuaikan | Wall real-time, fluid cursor, bilingual, analytics |

### Risiko dan Mitigasi
| Risiko | Mitigasi |
|--------|----------|
| Animasi berat membuat lambat di HP atau laptop kantor | Quality toggle, batasi layer ombak, animasikan hanya transform dan opacity |
| Terlalu artistik sehingga rekruter bingung | Tombol CV di hero dan dock, urutan section mengikuti struktur CV, teks tetap jelas |
| Konten belum siap saat desain dimulai | Selesaikan fase konten lebih dulu |
| Scope membengkak | Patuhi daftar Out of Scope, pindahkan ide baru ke fase 2 |
| Animasi berbasis scroll (latar, ombak, kartu bertumpuk) rawan bug | Bangun bertahap sesuai fase di `DESIGN.md`, uji di browser tiap fase |
| Animasi bentrok dengan lifecycle React (dobel jalan, memory leak) | Gunakan `useGSAP` dan cleanup, uji dengan StrictMode |
| Aset visual (awan, ombak, foto) melanggar lisensi | Buat ombak sebagai SVG sendiri, pakai ikon lucide, jangan menyalin aset dari situs lain |
| Wall menerima spam | Fase 1 tanpa penyimpanan publik (form ke email), fase 2 dengan moderasi |

### Keputusan Terbuka
- Bahasa teks halaman: Inggris, Indonesia, atau campuran yang konsisten (default sementara: Inggris untuk headline, konsisten di seluruh halaman).
- Nama, foto, dan CV final.
- Layanan form yang dipakai (EmailJS atau Formspree).

---

## 10. Acceptance Criteria

- [ ] Semua 7 section tampil dan datanya bersumber dari `src/data/`.
- [ ] Tombol Download CV berfungsi di hero dan section tentang.
- [ ] Layout rapi di lebar 360px hingga 1920px.
- [ ] Latar berubah mulus dari fajar ke malam mengikuti scroll, dan teks tetap terbaca di setiap titik (kontras >= 4.5:1).
- [ ] Transisi ombak berjalan antar section tanpa menutupi tombol atau teks yang sedang dibaca.
- [ ] Kartu project bertumpuk berfungsi di desktop dan mobile.
- [ ] Dock menandai section aktif dengan benar dan bisa dioperasikan keyboard.
- [ ] Quality toggle (High/Low/Off) berfungsi dan tersimpan di browser.
- [ ] Animasi Wajib pada tabel 6.4 berjalan mulus (~60 fps) di laptop menengah.
- [ ] Dengan Quality Off atau `prefers-reduced-motion`, semua konten tetap tampil penuh tanpa animasi.
- [ ] Tidak ada efek animasi yang menutupi tombol Download CV atau kontak.
- [ ] Lighthouse mobile: Performance >= 85, Accessibility >= 90, SEO >= 90.
- [ ] Link yang dibagikan di WhatsApp/LinkedIn menampilkan preview yang benar.
- [ ] Ganti nama, foto, atau project cukup dengan mengedit file data.
