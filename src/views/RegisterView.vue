<template>
  <div class="auth-wrap">
    <div class="auth-card">
      <h2>Register</h2>
      <p class="muted">Buat akun untuk mengakses website ini.</p>

      <form class="form" @submit.prevent="handleRegister">
        <label class="label">
          Username
          <input v-model="username" class="input" autocomplete="username" />
        </label>

        <label class="label">
          Password
          <input
            v-model="password"
            class="input"
            type="password"
            autocomplete="new-password"
          />
        </label>

        <label class="label">
          Full name
          <input v-model="fullName" class="input" autocomplete="name" />
        </label>

        <label class="label">
          Email Address
          <input v-model="email" class="input" autocomplete="email" />
        </label>

        <label class="label">
          Role
          <select v-model="role" class="input">
            <option disabled value="">Pilih role</option>
            <option>Fullstack Developer</option>
            <option>Front End Developer</option>
            <option>Back End Developer</option>
            <option>UI / IX Design</option>
            <option>Project Manager</option>
          </select>
        </label>

        <div v-if="error" class="error">{{ error }}</div>

        <button
          class="btn"
          type="submit"
          :disabled="!username.trim() || password.length < 6 || !fullName.trim() || !email.trim() || !role"
        >
          Buat Akun
        </button>

        <div class="row">
          <span>Punya akun?</span>
          <RouterLink class="link" to="/login">Login</RouterLink>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const auth = useAuthStore();

onMounted(() => {
  // paksa light mode untuk login/register
  document.documentElement.setAttribute('data-theme', 'light')
});


const username = ref('');
const password = ref('');
const fullName = ref('');
const email = ref('');
const role = ref('');
const error = ref('');

function handleRegister() {
  error.value = '';

  const res = auth.register({
    username: username.value,
    password: password.value,
    fullName: fullName.value,
    email: email.value,
    role: role.value,
  });

  if (!res.ok) {
    error.value = res.message || 'Gagal register.';
    return;
  }

  router.push('/dashboard');
}

</script>

<style scoped>
.auth-wrap {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: white;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  padding: 22px;
  box-shadow: 0 0 7px #00ff00, 0 0 8px #00ff00;
}

h2 {
  margin: 0;
  font-size: 1.6rem;
}

.muted {
  color: var(--text-muted);
  margin: 8px 0 18px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 700;
  font-size: 0.95rem;
}

.input {
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  background: #fff;
}

.btn {
  padding: 12px 14px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  background: rgba(52, 211, 153, 0.18);
  color: var(--accent);
  font-weight: 900;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.row {
  margin-top: 6px;
  display: flex;
  justify-content: center;
  gap: 6px;
  color: var(--text-muted);
}

.link {
  color: var(--accent);
  text-decoration: none;
  font-weight: 900;
  margin-top: -3px;
}

.error {
  color: #ef4444;
  font-weight: 800;
}

.hint {
  margin-top: 8px;
  color: var(--text-muted);
  font-size: 0.9rem;
}
</style>