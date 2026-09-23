# DESIGN.md: Portofolio "Sehari di Pantai"

> **Untuk AI coding assistant (VS Code):** baca `PRD.md` untuk tahu **apa** yang dibangun, dan dokumen ini untuk tahu **bagaimana** tampilan dan gerakannya. Kerjakan bertahap sesuai bagian 13 (Urutan Pembangunan). Selesaikan dan uji satu fase sebelum lanjut.

## 0. Aturan Kerja untuk AI

1. Pakai token warna, font, dan ukuran di dokumen ini persis. Jangan menambah warna baru di luar daftar.
2. Semua konten (teks, gambar, project) dibaca dari `src/data/`. Jangan menulis konten langsung di komponen.
3. Animasikan hanya `transform` dan `opacity`. Jangan menganimasikan `width`, `height`, `top`, atau `left`.
4. Semua animasi GSAP dibungkus `useGSAP` dan aman di React StrictMode.
5. Hormati Quality (High/Low/Off) dan `prefers-reduced-motion` di setiap efek (lihat bagian 9).
6. Jangan menyalin gambar, SVG, atau kode dari situs lain. Ombak dan mercusuar dibuat sendiri sebagai SVG, ikon memakai `lucide-react`.
7. Di akhir tiap fase, jelaskan cara memeriksa bahwa fase itu benar.

---

## 1. Konsep dan Prinsip

**Konsep:** scroll = waktu. Pengunjung menjalani satu hari di pantai: fajar (hero), siang (tentang, skill, pengalaman), laut jernih (project), sore (wall), malam (kontak).

**Momen yang paling diingat (satu saja):** perubahan warna langit yang mulus dan ombak yang menyapu antar-bagian. Semua elemen lain dibuat tenang dan rapi supaya momen ini menonjol.

**Prinsip:**
- **Jelas dulu, indah kemudian.** Rekruter harus menemukan nama, peran, CV, dan kontak tanpa menunggu animasi.
- **Gerak dengan alasan.** Animasi yang berjalan sendiri dipakai hanya untuk atmosfer (matahari, chip mengapung, ombak, mercusuar). Elemen konten tidak perlu masuk dengan fade-up satu per satu. Efek masuk (reveal) dipakai hanya di hero dan bagian tentang.
- **Warna aksen adalah isi, bukan teks.** Turquoise dan coral dipakai sebagai warna latar tombol, garis, dan ikon. Jangan dipakai sebagai warna teks di atas latar terang.
- **Tanpa hiasan yang tidak berfungsi.** Penomoran hanya untuk urutan nyata (timeline). Label huruf kapital semua tidak dipakai.

---

## 2. Design Tokens

### 2.1 Warna (palet "Tropical Day")

| Token | Nama | Hex | Peran |
|-------|------|-----|-------|
| `ocean` | Deep Ocean | `#0B3C5D` | Teks utama di latar terang, latar section malam |
| `turquoise` | Turquoise | `#2EC4B6` | Aksen utama: tombol, item dock aktif, garis timeline |
| `shallow` | Shallow Water | `#A8E6E2` | Air dangkal, kartu, layer ombak belakang |
| `sky` | Sky | `#BFE6F5` | Langit siang |
| `sand` | Sand | `#F6E7C8` | Latar terang alternatif, sticky note |
| `foam` | Foam | `#FFFDF7` | Buih, kartu kaca, teks di atas latar gelap |
| `coral` | Coral | `#FF7F5C` | Aksen hangat, tombol CTA utama |
| `sun` | Sun | `#FFC857` | Matahari, highlight kecil, sticky note |

Titik gradien langit (hanya untuk latar, bukan untuk komponen):

| Token | Hex | Dipakai di |
|-------|-----|-----------|
| `dawn-a` | `#FFD9B8` | Hero (atas) |
| `dawn-b` | `#FFB4A2` | Hero (bawah) |
| `night` | `#071E33` | Kontak (bawah) |

### 2.2 Kontras (sudah dihitung, WCAG AA butuh >= 4.5:1 untuk teks normal)

| Teks | Latar | Rasio | Boleh? |
|------|-------|-------|--------|
| ocean | foam | ~11.4:1 | Ya |
| ocean | sand | ~9.4:1 | Ya |
| ocean | sky | ~8.7:1 | Ya |
| ocean | shallow | ~8.3:1 | Ya |
| ocean | sun | ~7.5:1 | Ya |
| ocean | turquoise | ~5.3:1 | Ya (teks di tombol turquoise) |
| ocean | coral | ~4.6:1 | Ya (teks di tombol coral) |
| foam | ocean | ~11.4:1 | Ya (teks di section malam) |
| turquoise | ocean | ~5.3:1 | Ya (tombol outline di section malam) |
| coral atau turquoise | foam/sky/sand | ~2.1-2.4:1 | **Tidak** untuk teks. Hanya untuk fill, garis, ikon dekoratif |
| foam | coral atau turquoise | < 3:1 | **Tidak** |

### 2.3 CSS variables (`src/styles/tokens.css`)

```css
:root {
  --ocean: #0B3C5D;
  --turquoise: #2EC4B6;
  --shallow: #A8E6E2;
  --sky: #BFE6F5;
  --sand: #F6E7C8;
  --foam: #FFFDF7;
  --coral: #FF7F5C;
  --sun: #FFC857;
  --dawn-a: #FFD9B8;
  --dawn-b: #FFB4A2;
  --night: #071E33;

  /* dianimasikan oleh ScrollTrigger (lihat bagian 8) */
  --sky-top: #FFD9B8;
  --sky-bottom: #FFB4A2;

  --radius-card: 24px;
  --radius-frame: 28px;
  --radius-input: 12px;
  --radius-note: 6px;

  --shadow-sm: 0 2px 8px rgba(11, 60, 93, 0.10);
  --shadow-md: 0 12px 32px rgba(11, 60, 93, 0.14);
  --shadow-lg: 0 24px 64px rgba(11, 60, 93, 0.18);

  --ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
}

body {
  color: var(--ocean);
  background: linear-gradient(to bottom, var(--sky-top), var(--sky-bottom));
  background-attachment: fixed;
}
```

### 2.4 Tailwind (v3: `tailwind.config.js`)

```js
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: '#0B3C5D',
        turquoise: '#2EC4B6',
        shallow: '#A8E6E2',
        sky: '#BFE6F5',
        sand: '#F6E7C8',
        foam: '#FFFDF7',
        coral: '#FF7F5C',
        sun: '#FFC857',
        night: '#071E33',
      },
      fontFamily: {
        script: ['Sacramento', 'Dancing Script', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: { card: '24px', frame: '28px' },
      boxShadow: {
        sm2: '0 2px 8px rgba(11,60,93,0.10)',
        md2: '0 12px 32px rgba(11,60,93,0.14)',
        lg2: '0 24px 64px rgba(11,60,93,0.18)',
      },
    },
  },
};
```
Jika proyek memakai Tailwind v4, pindahkan warna dan font ke blok `@theme` di CSS dengan nama yang sama.

---

## 3. Tipografi

Dua keluarga font dari Google Fonts, dengan peran yang jelas berbeda:

| Peran | Font | Bobot | Catatan |
|-------|------|-------|---------|
| Judul dekoratif section | **Sacramento** (fallback Dancing Script, cursive) | 400 | Hanya untuk judul besar. Font script tipis sulit dibaca kecil, jadi jangan di bawah 40px |
| UI, body, judul kartu | **Plus Jakarta Sans** | 400, 500, 700 | Semua teks fungsional |

Skala tipografi:

| Elemen | Desktop | Mobile | Font |
|--------|---------|--------|------|
| Judul script section | 72px / 1.0 | 44px / 1.05 | Sacramento |
| Judul hero (nama/peran) | 56px / 1.1, bobot 700 | 36px / 1.15 | Plus Jakarta Sans |
| Judul kartu (h3) | 28px / 1.2, bobot 700 | 22px | Plus Jakarta Sans |
| Body | 17px / 1.65 | 16px / 1.65 | Plus Jakarta Sans |
| Teks kecil (tag, label dock) | 13-14px / 1.4, bobot 500 | 13px | Plus Jakarta Sans |

Aturan:
- Panjang baris body maksimal 65 karakter (`max-w-prose`).
- Sentence case untuk semua label, tombol, dan menu. Jangan pakai huruf kapital semua.
- Judul script tetap ditulis dengan elemen `<h2>` berisi teks nyata (bukan gambar), supaya terbaca screen reader.
- Muat font dengan `font-display: swap`, dan panggil `ScrollTrigger.refresh()` setelah font selesai dimuat.

---

## 4. Layout, Spasi, Bentuk

- Basis spasi 8px. Kontainer maksimal 1200px, padding samping 24px (mobile) dan 48px (desktop).
- Padding vertikal section: 120px (desktop), 80px (mobile).
- Grid 12 kolom desktop, 4 kolom mobile. Teks rata kiri kecuali judul script yang boleh di tengah.
- Radius: chip, tombol, dock = penuh (`9999px`), kartu = 24px, bingkai foto = 28px, input = 12px, sticky note = 6px.
- Bayangan mengikuti ketinggian: `--shadow-sm` (chip, tombol), `--shadow-md` (kartu), `--shadow-lg` (kartu project, dock). Jangan memakai satu bayangan yang sama untuk semua elemen.
- Efek kaca (`glass`): `background: rgba(255,253,247,0.65)`, `backdrop-filter: blur(16px)`, `border: 1px solid rgba(255,253,247,0.6)`. Sediakan fallback warna solid `foam` jika `backdrop-filter` tidak didukung.

---

## 5. Komponen

### 5.1 Dock navigasi (`DockNav`)
- Posisi `fixed`, tengah bawah (`bottom: 16px`), tinggi 56px, kaca, radius penuh, `--shadow-lg`.
- Item: ikon lucide 20px + label 13px (sentence case). Urutan: Home, About, Skills, Experience, Projects, Wall, Contact.
- Aktif: latar `turquoise`, teks dan ikon `ocean`. Hover: latar `foam` opacity 60%.
- Mobile: hanya ikon, label muncul pada item aktif. Beri `aria-label` pada semua item.
- Scroll-spy dengan `IntersectionObserver` (threshold 0.5). Klik memanggil `lenis.scrollTo('#id')`.
- Beri padding bawah pada `main` agar dock tidak menutupi konten terakhir.

### 5.2 Kartu kaca (`GlassCard`)
- Efek kaca (bagian 4), radius 24px, `--shadow-md`.
- Varian `frame`: 4 titik kotak kecil (8px, latar `foam`, border `ocean`) di keempat sudut, seperti handle seleksi di alat desain. Dipakai di kartu hero dan kartu project.

### 5.3 Chip skill (`SkillChip`)
- Pill, padding 8px 16px, teks 14px bobot 500, `--shadow-sm`.
- Warna latar berganti dari `shallow`, `sky`, `sun`, `foam`, `coral` (teks selalu `ocean`).

### 5.4 Tombol (`Button`)
| Varian | Latar | Teks | Border | Dipakai untuk |
|--------|-------|------|--------|---------------|
| primary | `coral` | `ocean` | - | "View work", CTA utama |
| secondary | transparan | `ocean` | 2px `ocean` | "Download CV" |
| night | transparan | `foam` | 2px `turquoise` + glow | CTA di section kontak |
- Tinggi 48px, radius penuh, padding horizontal 28px.
- Hover: teks bergulir ke atas dan digantikan salinannya (dua lapis teks, `translateY(-100%)`), 0.35 detik `--ease-soft`. Fokus keyboard: outline 3px `ocean` (atau `foam` di section malam) dengan offset 3px.

### 5.5 Kartu statistik (`StatCard`)
- Kartu kaca kecil, angka besar (bobot 700, 40px) dan label 14px. Angka menghitung naik (bagian 8).

### 5.6 Timeline (`Timeline`)
- Garis vertikal 3px dengan gradien `turquoise` ke `coral`, di tengah (desktop) atau di kiri (mobile).
- Kartu pengalaman bergantian kiri-kanan di desktop. Isi: peran, organisasi, periode, 2-4 poin, tag teknologi.
- Ini satu-satunya tempat yang boleh memakai penanda urutan (titik bulat pada garis).

### 5.7 Kartu project bertumpuk (`ProjectCard`)
- Kartu kaca varian `frame`, `--shadow-lg`, tinggi sekitar 70vh (desktop).
- Kiri: screenshot atau mockup dalam bingkai radius 20px. Kanan: kategori (teks kecil `ocean`), judul (h3), deskripsi, tag teknologi, tombol "View case study".
- Wajib memakai `position: sticky` (bagian 8.4).

### 5.8 Sticky note (`StickyNote`)
- Kotak 200-240px, radius 6px, latar bergantian `sun`, `shallow`, `foam`, dan coral muda (`#FFB9A6`, hanya untuk note, dengan teks `ocean`). Rotasi acak -6° sampai 6°. `--shadow-sm`.
- Isi: pesan (15px), nama pengirim (13px, bobot 700).

### 5.9 Pembatas ombak (`WaveTransition`, `WaveDivider`)
- SVG sendiri. Contoh path gelombang (viewBox `0 0 1440 200`), gandakan lebar 2x agar bisa di-loop mulus:
  ```
  M0,120 C240,60 480,180 720,120 C960,60 1200,180 1440,120 L1440,200 L0,200 Z
  ```
- Detail zona transisi ada di bagian 8.3.

### 5.10 Elemen atmosfer
- `SunOrb`: lingkaran `sun` 160px dengan glow (`box-shadow: 0 0 80px rgba(255,200,87,0.6)`).
- `Moon`: lingkaran `foam` 96px dengan glow lembut.
- `Lighthouse`: SVG sendiri (menara, lampu, dan sinar berupa segitiga gradien `foam` ke transparan).
- `Marquee`: teks peran berulang (mis. "Software developer, data analyst, product builder") yang berjalan horizontal.

---

## 6. Spesifikasi Section

Setiap section punya `id` untuk dock: `#hero`, `#about`, `#skills`, `#experience`, `#projects`, `#wall`, `#contact`.

### 6.1 Hero (`#hero`, fajar)
- Latar: gradien `dawn-a` ke `dawn-b`.
- Layer: matahari (di belakang kartu), kartu kaca `frame` di tengah, chip mengapung di sekitar kartu, 2-3 ombak di dasar layar, indikator "Scroll".
```
+--------------------------------------------------+
|   (chip)        (chip)            (chip)         |
|        +------------------------------+          |
| (chip) |  Nama                        | (chip)   |
|        |  Peran / headline            |          |
|        |  [View work] [Download CV]   |          |
|        +------------------------------+          |
|   (chip)   ~~~~ ombak ~~~~   (chip)              |
+--------------------------------------------------+
```
- Konten dari `profile` dan `techBadges` (ambil 6-8 chip).

### 6.2 Tentang (`#about`, siang)
- Latar: gradien `sky` ke `foam`.
- Kiri: sapaan besar, badge peran, 2-3 paragraf bio, tombol "View work" dan "Download CV". Kanan: foto di bingkai kaca dengan ikon matahari kecil di sudut.

### 6.3 Skill (`#skills`, siang)
- Judul script "My Tech Stack" (atau padanannya dari data).
- Badge teknologi berjalan loop di jalur gelombang SVG. Di bawahnya 4 kartu kategori (Frontend, Backend, Data/ML, Mobile atau sesuai data) berisi ikon dan daftar teknologi.
- Daftar teknologi tetap tersedia sebagai teks biasa (bukan hanya di dalam animasi).

### 6.4 Pengalaman (`#experience`, siang)
- 4 `StatCard` (dari `highlights`), lalu `Timeline` (dari `experiences`).

### 6.5 Project (`#projects`, laut jernih)
- Latar: gradien `shallow` ke `turquoise`, dengan berkas cahaya dari permukaan air (2-3 gradien miring `foam` opacity 0.15 yang bergeser pelan, hanya pada Quality High).
- Judul script "My Portfolio" dan satu kalimat petunjuk. Lalu `ProjectCard` bertumpuk dari `projects`.

### 6.6 Wall (`#wall`, sore)
- Latar: gradien `sun` ke `coral`.
- Kartu kaca kecil di tengah berisi form "Leave a note" (nama, pesan, tombol). Sticky note dari `notes` tersebar di sekeliling dan melayang pelan.
```
+--------------------------------------------------+
|  [note]        [note]              [note]        |
|         +----------------------+                 |
|  [note] |  Leave a note        |     [note]      |
|         |  [nama] [pesan] [OK] |                 |
|         +----------------------+                 |
|      [note]           [note]                     |
+--------------------------------------------------+
```
- Di mobile, note disusun sebagai dua kolom miring di bawah form.

### 6.7 Kontak (`#contact`, malam)
- Latar: gradien `ocean` ke `night`. Teks `foam`.
- Bulan dengan pantulannya di air, `Lighthouse` dengan sinar berputar pelan dan cincin cahaya berdenyut.
- Heading script besar, satu kalimat pengantar, tombol varian `night`, tombol salin email, footer (GitHub, LinkedIn, email, tahun).

---

## 7. Data yang Dibutuhkan Komponen

Lihat skema lengkap di `PRD.md` bagian 7. Minimal: `profile`, `socials`, `highlights`, `skills`, `techBadges`, `experiences`, `projects`, `notes`.

---

## 8. Spesifikasi Gerak

### 8.1 Aturan umum
- Easing default: `power3.out` (GSAP) atau `--ease-soft`. Durasi interaksi 0.35-0.6 detik. Durasi gerak atmosfer 4-12 detik.
- Efek scroll memakai `scrub` (dikunci ke posisi scroll), kecuali counter yang berjalan sekali (`once: true`).
- Semua ScrollTrigger dibuat di dalam `useGSAP` dengan `scope` ref, dan `ScrollTrigger.refresh()` dipanggil setelah font dan gambar hero termuat.

### 8.2 Smooth scroll (Lenis) disinkronkan dengan GSAP
```js
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ lerp: 0.1 });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```
Nonaktifkan Lenis saat Quality Off.

### 8.3 Latar berubah dan transisi ombak

**Urutan latar (act):**

| Act | Section | `--sky-top` | `--sky-bottom` |
|-----|---------|-------------|----------------|
| Fajar | hero | `#FFD9B8` | `#FFB4A2` |
| Siang | about, skills, experience | `#BFE6F5` | `#FFFDF7` |
| Laut jernih | projects | `#A8E6E2` | `#2EC4B6` |
| Sore | wall | `#FFC857` | `#FF7F5C` |
| Malam | contact | `#0B3C5D` | `#071E33` |

**Interpolasi warna:** satu tween per pergantian act, dipicu saat section pertama act berikutnya masuk layar.
```js
const ACTS = [
  { first: '#hero',       top: '#FFD9B8', bottom: '#FFB4A2' },
  { first: '#about',      top: '#BFE6F5', bottom: '#FFFDF7' },
  { first: '#projects',   top: '#A8E6E2', bottom: '#2EC4B6' },
  { first: '#wall',       top: '#FFC857', bottom: '#FF7F5C' },
  { first: '#contact',    top: '#0B3C5D', bottom: '#071E33' },
];

useGSAP(() => {
  const root = document.documentElement;
  ACTS.slice(1).forEach((act, i) => {
    const prev = ACTS[i];
    gsap.fromTo(
      root,
      { '--sky-top': prev.top, '--sky-bottom': prev.bottom },
      {
        '--sky-top': act.top,
        '--sky-bottom': act.bottom,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: act.first,
          start: 'top 90%',
          end: 'top 30%',
          scrub: true,
        },
      }
    );
  });
}, []);
```
Sesuaikan `start` dan `end` agar warna sudah berganti tepat saat ombak menutupi layar.

**Zona transisi ombak** (`WaveTransition`), ditempatkan di antara act (hero-about, experience-projects, projects-wall, wall-contact):
- Elemen setinggi 100vh, `overflow: hidden`, tanpa konten teks.
- 3 layer SVG gelombang (bagian 5.9) bergerak `yPercent` dari 100 ke -100 dengan `scrub`, dengan kecepatan berbeda:
  | Layer | Warna | Opacity | Kecepatan relatif |
  |-------|-------|---------|-------------------|
  | Belakang | `shallow` | 0.6 | 0.6x |
  | Tengah | `turquoise` | 0.8 | 0.8x |
  | Depan | warna atas act berikutnya | 1 | 1x |
- Layer depan diberi garis buih `foam` setebal 4px di puncaknya. Karena warnanya sama dengan latar act berikutnya, tidak ada sambungan yang terlihat setelah ombak lewat.
- Pada progress sekitar 0.5 layar tertutup penuh, dan di titik itu latar body sudah berganti.
- Di atas zona, pita `Marquee` berjalan pelan (40 detik per putaran, linear).
- Quality Low: 2 layer. Quality Off: ganti dengan `WaveDivider` statis setinggi 120px.

### 8.4 Kartu project bertumpuk
```css
.project-card { position: sticky; top: calc(96px + var(--i) * 24px); }
```
```js
cards.forEach((card, i) => {
  const next = cards[i + 1];
  if (!next) return;
  gsap.to(card, {
    scale: 0.92,
    opacity: 0.6,
    ease: 'none',
    scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 30%', scrub: true },
  });
});
```
Beri tinggi ruang scroll (mis. `min-height: 100vh` per kartu) supaya penumpukan terasa. Di mobile, kurangi offset menjadi `top: calc(72px + var(--i) * 16px)`.

### 8.5 Elemen lain

| Efek | Spesifikasi |
|------|-------------|
| Preloader | Maks. 2 detik. Angka `000%` ke `100%` mengikuti progres pemuatan aset nyata. Air naik mengisi layar (`scaleY` dari bawah, warna `turquoise`), lalu terbelah membuka hero. Dilewati jika `sessionStorage` sudah menandai kunjungan |
| Matahari terbit | `y: +120px -> 0`, `opacity: 0 -> 1`, 1.4 detik `power2.out`, dimulai setelah preloader |
| Reveal hero dan tentang | Kartu, judul, dan foto: `y: 24 -> 0`, `opacity: 0 -> 1`, 0.7 detik, stagger 0.08. **Hanya** di hero dan tentang |
| Chip mengapung | Tiap chip: `y` +/- 12 sampai 20px, `rotation` +/- 3°, durasi 4-7 detik, `yoyo`, `repeat: -1`, `sine.inOut`, delay acak |
| Badge di jalur gelombang | Loop 30-40 detik, `linear`, jarak antar badge merata sepanjang path |
| Counter | 0 ke nilai, 1.6 detik `power2.out`, sekali saat 80% kartu terlihat |
| Timeline | Garis `scaleY: 0 -> 1` (`transform-origin: top`), `scrub`, dari awal sampai akhir section |
| Sticky note | `y` +/- 8px, rotasi +/- 1.5°, 5-8 detik loop. Hover: `scale 1.05` dan rotasi 0°, 0.3 detik |
| Berkas cahaya (laut jernih) | 2-3 gradien miring, `x` bergeser 40px bolak-balik selama 10 detik, opacity 0.15. Hanya Quality High |
| Mercusuar | Sinar `rotate: 0 -> 360` selama 12 detik `linear`, opacity 0.35. Cincin cahaya: `scale 1 -> 2.2`, `opacity 0.5 -> 0`, 3 detik, stagger 1 detik |
| Salin email | Klik -> `navigator.clipboard.writeText`, label jadi "Copied" selama 1.5 detik, lalu kembali. Fallback jika clipboard tidak tersedia: pilih teks email |
| Transisi ke detail project | Ombak menutup layar (0.6 detik), route berganti, ombak terbuka (0.6 detik). Alternatif: View Transitions API |

---

## 9. Quality dan Reduce Motion

| Efek | High | Low | Off |
|------|------|-----|-----|
| Lenis smooth scroll | Ya | Ya | Tidak |
| Latar berubah mengikuti scroll | Interpolasi halus | Interpolasi halus | Berganti langsung per section |
| Zona ombak | 3 layer + marquee | 2 layer | Pembatas statis |
| Chip dan badge | Semua, melayang | Setengah jumlah, statis | Statis |
| Kartu project bertumpuk | Sticky + scale | Sticky saja | Ditumpuk vertikal biasa |
| Sticky note melayang | Ya | Tidak | Tidak |
| Berkas cahaya, pantulan bulan, sinar mercusuar | Ya | Tidak | Tidak |
| Preloader | Ya | Singkat (0.8 detik) | Tidak |
| Magnetik tombol | Ya (desktop) | Tidak | Tidak |

- Default otomatis: `Low` di layar < 768px atau perangkat dengan `navigator.hardwareConcurrency <= 4`, `Off` jika `prefers-reduced-motion: reduce`.
- Pilihan pengguna disimpan di `localStorage` dan menimpa default. Sediakan kontrol Quality yang mudah ditemukan (mis. ikon kecil di dock atau footer).
- Bungkus semua kondisi di hook `useQuality()` yang mengembalikan `'high' | 'low' | 'off'`.

---

## 10. Responsif

| Breakpoint | Perubahan utama |
|------------|-----------------|
| < 640px | Dock hanya ikon. Chip hero 4 buah. Ombak 2 layer. Kartu project satu kolom (screenshot di atas). Timeline satu sisi. Sticky note dua kolom |
| 640-1023px | Dock dengan label pada item aktif. Kartu project mulai dua kolom |
| >= 1024px | Layout penuh sesuai bagian 6 |

Uji di lebar 360, 768, 1280, dan 1920px. Tidak boleh ada scroll horizontal.

---

## 11. Aksesibilitas

- Kontras mengikuti tabel 2.2.
- Fokus keyboard selalu terlihat (outline 3px, offset 3px). Urutan tab mengikuti urutan visual.
- Dock memakai `<nav aria-label="Main">`, item aktif diberi `aria-current="true"`.
- Gambar bermakna diberi `alt`, elemen dekoratif (ombak, matahari, cahaya) diberi `aria-hidden="true"`.
- Konten tidak boleh hanya muncul lewat animasi. Dengan Quality Off semua teks tampil penuh.
- Target sentuh minimal 44x44px.
- Kartu bertumpuk dan sticky note tetap bisa dibaca urut oleh screen reader (urutan DOM = urutan baca).

---

## 12. Teks dan Nada

- Bahasa sederhana, kalimat aktif, sentence case. Tidak ada kalimat promosi berlebihan.
- Tombol menyebut apa yang terjadi: "Download CV", "View work", "View case study", "Leave a note", "Copy email".
- Satu aksi memakai nama yang sama di seluruh alur: setelah "Copy email", label berubah menjadi "Copied".
- Pesan error menjelaskan masalah dan solusinya, contoh: "Message not sent. Check your connection and try again."
- Wall kosong: "No notes yet. Be the first to leave one."
- Isi headline dan bio diambil dari `src/data/profile`, jangan ditulis di komponen.

---

## 13. Urutan Pembangunan

| Fase | Isi | Selesai jika |
|------|-----|--------------|
| 1 | Setup Vite + Tailwind, tokens (bagian 2), font, Lenis + ScrollTrigger, routing, `DockNav` dengan scroll-spy, section kosong dengan tinggi benar, data awal di `src/data/` | Dock berpindah aktif saat scroll, klik dock men-scroll dengan halus, warna dan font sesuai token |
| 2 | Hero (matahari, kartu kaca, chip mengapung, ombak dasar) dan Tentang | Hero terbaca jelas, tombol CV berfungsi, chip melayang dengan halus, StrictMode tidak menggandakan animasi |
| 3 | Latar berubah (8.3) dan `WaveTransition` | Warna berganti mulus antar act, ombak menutup dan membuka tanpa sambungan terlihat |
| 4 | Skill (badge di jalur gelombang), Pengalaman (counter + timeline) | Badge bergerak loop, counter berjalan sekali, garis timeline tergambar mengikuti scroll |
| 5 | Project: kartu bertumpuk, halaman detail, transisi route | Kartu menumpuk dan mengecil dengan benar, klik membuka detail, tombol kembali berfungsi |
| 6 | Wall (form ke EmailJS/Formspree + note dari data) dan Kontak (bulan, mercusuar, salin email) | Form terkirim dan menampilkan status, salin email berfungsi, mercusuar berputar |
| 7 | Quality/reduce motion (bagian 9), performa, aksesibilitas, SEO, halaman 404, preloader | Lighthouse mobile memenuhi target di `PRD.md`, semua konten terbaca dengan Quality Off |

---

## 14. Do dan Don't

**Do**
- Pakai teks `ocean` di atas semua latar terang dan di atas tombol turquoise atau coral.
- Simpan semua konten di `src/data/`.
- Uji tiap fase di browser (desktop dan lebar mobile) sebelum lanjut.
- Bersihkan ScrollTrigger dan event listener saat komponen unmount.

**Don't**
- Jangan memakai turquoise atau coral sebagai warna teks di latar terang.
- Jangan menambahkan fade-up ke setiap kartu dan section.
- Jangan memakai penomoran (01, 02, ...) kecuali pada urutan nyata.
- Jangan memakai WebGL/Three.js di fase 1.
- Jangan menyalin aset, SVG, atau kode dari situs referensi.
- Jangan menaruh animasi yang bisa menutupi tombol Download CV atau kontak.
