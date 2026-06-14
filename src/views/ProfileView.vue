<template>
  <section class="page">
    <h2>Profil Pengguna</h2>
    <p class="muted">Informasi akun saat ini.</p>

    <div class="card">
      <div class="profile-header">
        <img class="avatar" :src="user?.profilePicture" alt="Foto Profil" />

        <div class="profile-meta">
          <div class="full-name">{{ user?.fullName || '-' }}</div>
          <div class="sub">{{ user?.username || '-' }}</div>
        </div>
      </div>

      <div class="grid">
        <div class="row">
          <div class="label">Full name</div>
          <div class="value">
            <input v-model="editFullName" class="input" type="text" />
          </div>
        </div>

        <div class="row">
          <div class="label">Email Address</div>
          <div class="value">
            <input v-model="editEmail" class="input" type="email" />
          </div>
        </div>

        <div class="row">
          <div class="label">Role</div>
          <div class="value">
            <select v-model="editRole" class="input">
              <option disabled value="">Pilih role</option>
              <option>Fullstack Developer</option>
              <option>Front End Developer</option>
              <option>Back End Developer</option>
              <option>UI / IX Design</option>
              <option>Project Manager</option>
            </select>
          </div>
        </div>
      </div>

      <div class="actions">
        <button class="btn" type="button" @click="handleLogout">Logout</button>
        <button class="btn-green" type="button" @click="handleUpdateProfile">
          Simpan Profil
        </button>
      </div>

      <div v-if="profileError" class="error" style="margin-top: 10px">{{ profileError }}</div>
      <div v-if="profileSuccess" class="success" style="margin-top: 10px">{{ profileSuccess }}</div>
    </div>


    <div class="card second">
      <h3>Change Password</h3>
      <p class="muted">Ubah password akun Anda.</p>

      <form class="form" @submit.prevent="handleChangePassword">
        <label class="label">
          Current Password
          <input v-model="currentPassword" class="input" type="password" autocomplete="current-password" />
        </label>

        <label class="label">
          New Password
          <input v-model="newPassword" class="input" type="password" autocomplete="new-password" />
        </label>

        <label class="label">
          Confirm New Password
          <input v-model="confirmPassword" class="input" type="password" autocomplete="new-password" />
        </label>

        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="success" class="success">{{ success }}</div>

        <button
          class="btn-green"
          type="submit"
          :disabled="!currentPassword || newPassword.length < 6 || confirmPassword !== newPassword"
        >
          Simpan Password
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const auth = useAuthStore();

const user = computed(() => auth.getCurrentUser.value);

const editFullName = ref('');
const editEmail = ref('');
const editRole = ref('');
const profileError = ref('');
const profileSuccess = ref('');

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const error = ref('');
const success = ref('');

watch(
  user,
  (u) => {
    editFullName.value = u?.fullName ?? '';
    editEmail.value = u?.email ?? '';
    editRole.value = u?.role ?? '';
  },
  { immediate: true }
);

function handleLogout() {
  auth.logout();
  router.push('/login');
}

function handleUpdateProfile() {
  profileError.value = '';
  profileSuccess.value = '';

  const res = auth.updateProfile({
    username: user.value?.username,
    fullName: editFullName.value,
    email: editEmail.value,
    role: editRole.value,
  });

  if (!res.ok) {
    profileError.value = res.message || 'Gagal menyimpan profil.';
    return;
  }

  profileSuccess.value = 'Profil berhasil diperbarui.';
}

function handleChangePassword() {
  error.value = '';
  success.value = '';

  if (confirmPassword.value !== newPassword.value) {
    error.value = 'Confirm password tidak sama.';
    return;
  }

  const res = auth.changePassword({
    username: user.value?.username,
    currentPassword: currentPassword.value,
    newPassword: newPassword.value,
  });

  if (!res.ok) {
    error.value = res.message || 'Gagal mengubah password.';
    return;
  }

  success.value = 'Password berhasil diubah.';
  currentPassword.value = '';
  newPassword.value = '';
  confirmPassword.value = '';
}
</script>

<style scoped>
.page {
  padding: 1rem 0;
}

.muted {
  color: var(--text-muted);
  margin: 0.25rem 0 1rem;
}

.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  padding: 1rem;
  margin-bottom: 1rem;
}

.card.second {
  padding: 1.25rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.avatar {
  width: clamp(54px, 10vw, 72px);
  height: clamp(54px, 10vw, 72px);
  border-radius: 18px;
  object-fit: cover;
  border: 1px solid var(--card-border);
}

.profile-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.full-name {
  font-weight: 1000;
  font-size: 1.2rem;
}

.sub {
  color: var(--text-muted);
  font-weight: 800;
}

.grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.row {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 12px;
  align-items: center;
}

.label {
  color: var(--text-muted);
  font-weight: 800;
}

.value {
  font-weight: 900;
  word-break: break-word;
}

.actions {
  margin-top: 16px;
  display: flex;
}

.btn {
  padding: 10px 14px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  background: rgba(239, 68, 68, 0.14);
  color: #ef4444;
  font-weight: 900;
}

h3 {
  margin: 0;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input {
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  background: #fff;
  width: 100%;
}

.btn-green {
  padding: 10px 14px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  background: rgba(52, 211, 153, 0.18);
  color: var(--accent);
  font-weight: 900;
  margin-left: 9px;
}

.btn-green:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error {
  color: #ef4444;
  font-weight: 800;
}

.success {
  color: #10b981;
  font-weight: 800;
}
</style>