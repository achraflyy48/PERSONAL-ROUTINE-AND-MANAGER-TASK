<template>
  <div class="auth-wrap">
    <div class="auth-card">
      <h2>Login</h2>
      <p class="muted">Akses ke website hanya untuk akun terdaftar.</p>

      <form class="form" @submit.prevent="handleLogin">
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
            autocomplete="current-password"
          />
        </label>

        <div v-if="error" class="error">{{ error }}</div>

        <button class="btn" type="submit" :disabled="!username.trim() || !password">
          Masuk
        </button>

        <div class="row">
          <span>Belum punya akun?</span>
          <RouterLink class="link" to="/register">Register</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const auth = useAuthStore();

const username = ref('');
const password = ref('');
const error = ref('');

function handleLogin() {
  error.value = '';

  const ok = auth.login(username.value.trim(), password.value);
  if (!ok) {
    error.value = 'Username atau password salah.';
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
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  padding: 22px;
}

h2 {
  margin: 0;
  font-size: 1.6rem;
  align-items: center;
  justify-content: center;
  display: flex;
  font-weight: 900;
}

.muted {
  color: var(--text-muted);
  margin: 8px 0 18px;
  align-items: center;
  justify-content: center;
  display: flex;
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
  justify-content: center;
  display: flex;
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