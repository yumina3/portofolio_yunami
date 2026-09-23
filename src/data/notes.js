// Skema: PRD.md bagian 7
// notes[] { id, name, message, color, rotation }
// Fase 1: pesan yang dipilih pemilik. Form "Leave a note" mengirim ke email lewat Formspree.

// color: 'sun' | 'shallow' | 'foam' | 'coral-soft'  (sesuai DESAIN.md 5.8)
// Tambahkan note asli di sini agar tampil di wall. Kosong = wall tanpa note.
export const notes = []

// Endpoint form Wall (Formspree).
// Cara pakai:
//   1. Daftar gratis di https://formspree.io, buat form baru.
//   2. Salin endpoint-nya (format: https://formspree.io/f/xxxxxx).
//   3. Buat file `.env` di root proyek, isi:
//        VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxx
//   4. Restart `npm run dev`.
// Selama belum diisi, form akan menampilkan pesan bahwa pengiriman belum dikonfigurasi.
export const formEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || ''

// true bila endpoint sudah dikonfigurasi.
export const isFormConfigured = formEndpoint.trim().length > 0
