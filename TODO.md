# TODO - Responsive UI (Personal Routine Manager)

## Plan (dibuat setelah inspeksi kode)
- [x] Standarisasi layout agar tidak overflow: aktifkan `overflow-x: hidden` di global dan pastikan container tidak memaksa lebar.
- [x] Perbaiki Sidebar agar pada mobile tidak memaksa kolom lebar dan tidak menambah scroll horizontal.

- [x] Tambahkan breakpoint untuk grid/calendar/habit/task agar selalu fit layar kecil.
- [x] Audit ukuran komponen “fixed” (mis: avatar 72px, input min-width 220px, check 26/28px) dan ganti ke ukuran relatif + batas max.
- [x] Pastikan `main.content` dan halaman tidak memakai `min-height: 100vh` yang menyebabkan double scroll.
- [x] Jalankan `npm run dev` dan cek di beberapa lebar (mis: 360px, 768px, 1024px) untuk memastikan tidak ada elemen berukuran berlebihan.
- [x] Final check: tidak ada horizontal scrolling & tampilan tetap rapi di desktop/mobile.



