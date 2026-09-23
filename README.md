# Sehari di Pantai — Portofolio

Portofolio satu halaman bertema pantai ("Tropical Day"), dibangun dengan React + Vite + Tailwind.
Spesifikasi lengkap ada di `PRD.md` (fitur/scope) dan `DESIGN.md` (tampilan/motion).

## Menjalankan

```bash
npm install
npm run dev      # server pengembangan
npm run build    # build produksi ke dist/
npm run preview  # pratinjau hasil build
npm run lint     # cek kode
```

## Mengganti gambar dengan foto / screenshot asli

Gambar disimpan sebagai **base path tanpa ekstensi** di `src/data/`
(mis. `/images/profile`, `/images/projects/internshape`).

Komponen `SmartImage` akan mencoba **`.jpg`** lebih dulu, lalu otomatis jatuh ke
**`.svg`** (placeholder) bila file `.jpg` belum ada. Jadi kamu **tidak perlu
mengubah kode** — cukup taruh file dengan nama yang sama:

| Taruh file di | Untuk |
|---|---|
| `public/images/profile.jpg` | Foto profil (section About) |
| `public/images/projects/internshape.jpg` | Thumbnail InternShape |
| `public/images/projects/internshape-1.jpg`, `-2.jpg` | Gambar detail InternShape |
| `public/images/projects/diabetes-dss.jpg` (+ `-1.jpg`) | Diabetes DSS |
| `public/images/projects/e-wallet-kmeans.jpg` (+ `-1.jpg`) | E-Wallet K-Means |
| `public/images/projects/hasil-bumi.jpg` (+ `-1.jpg`) | Hasil Bumi |

Selama file `.jpg` belum ada, placeholder `.svg` di folder yang sama yang tampil.

## Form "Leave a note" (Formspree)

Form di section Wall mengirim ke [Formspree](https://formspree.io). Langkahnya:

1. Daftar gratis di <https://formspree.io> dan buat form baru.
2. Salin **endpoint** form (formatnya `https://formspree.io/f/xxxxxxxx`).
3. Salin `.env.example` menjadi `.env`, lalu isi:
   ```
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
   ```
4. Restart `npm run dev`.

File `.env` sudah di-`.gitignore`, jadi ID-mu tidak ikut ter-commit.
Selama endpoint belum diisi, form akan menampilkan pesan bahwa pengiriman
belum dikonfigurasi (bukan error).

## Konten

Semua teks/konten diambil dari `src/data/`
(`profile.js`, `skills.js`, `experiences.js`, `projects.js`, `notes.js`, `sections.js`).
