# TODO

- [x] Tambahkan TODO auth + profile (rencana implementasi)
- [x] Buat `src/stores/authStore.js` untuk simpan session & user di `localStorage`
- [x] Tambahkan views: `LoginView.vue`, `RegisterView.vue`, `ProfileView.vue`
- [x] Update router (`src/router/index.js`) dengan route meta + route guard
- [x] Update `src/App.vue` agar login/register tidak memakai `SidebarLayout`
- [x] Update `src/components/SidebarLayout.vue` (tambah link Profile + tombol Logout)

- [x] Verifikasi cepat:
  - [x] akses `/dashboard` redirect ke `/login`
  - [x] login dengan `achraflyy` / `13Mei2004#`
  - [x] register akun baru lalu login
  - [x] tombol logout

- [x] Perluas struktur user pada `authStore.js`: fullName, email, role, profilePicture
- [x] Tambahkan method `changePassword` pada `authStore.js`
- [x] Ubah `RegisterView.vue` jadi form: username, password, fullName, email, role
- [x] Ubah `ProfileView.vue` jadi tampilan: foto profil, full name, email, role + form change password

- [ ] Uji end-to-end: register -> login -> buka profile -> ubah password -> logout/login lagi


