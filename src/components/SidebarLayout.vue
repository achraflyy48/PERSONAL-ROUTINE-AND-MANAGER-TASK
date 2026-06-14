<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">Routine Manager</div>

      <nav class="nav">
        <RouterLink class="nav-link" to="/dashboard">Dashboard</RouterLink>
        <RouterLink class="nav-link" to="/today">Today</RouterLink>
        <RouterLink class="nav-link" to="/task-projects">Task & Projects</RouterLink>
        <RouterLink class="nav-link" to="/routines-habits">Routines / Habits</RouterLink>
        <RouterLink class="nav-link" to="/calendar">Calendar</RouterLink>
        <RouterLink class="nav-link" to="/profile">Profil</RouterLink>
      </nav>

      <div class="sidebar-footer">
        <button class="logout" type="button" @click="handleLogout">
          Logout
        </button>
      </div>
    </aside>

    <main class="content">
      <RouterView />
    </main>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const auth = useAuthStore();

function handleLogout() {
  auth.logout();
  router.push('/login');
}
</script>


<style scoped>
.app-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 260px 1fr;
}

.sidebar {
  background: var(--sidebar-bg);
  color: #f1f5f9;
  padding: 1.25rem;
  border-right: 1px solid var(--card-border);
}


.brand {
  font-weight: 800;
  margin-bottom: 1rem;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-link {
  color: var(--nav-link);
  text-decoration: none;
  padding: 0.6rem 0.75rem;
  border-radius: 0.75rem;
  transition: background 0.2s ease, color 0.2s ease;
}


.nav-link:hover {
  background: rgba(52, 211, 153, 0.12);
  color: #34d399;
}

:deep(.router-link-active) {
  background: rgba(52, 211, 153, 0.15);
  color: #34d399;
}

.content {
  background: var(--content-bg);
  color: var(--text);
  padding: 1rem 2rem;
  overflow: auto;
  min-height: 100vh;
}




@media (max-width: 768px) {
  .app-shell {
    grid-template-columns: 1fr;
  }
  .sidebar {
    border-right: none;
    border-bottom: 1px solid rgba(71, 85, 105, 0.4);
  }
}

.sidebar-footer {
  margin-top: 1.25rem;
}

.logout {
  width: 100%;
  padding: 0.65rem 0.75rem;
  margin: 0;
  border-radius: 0.75rem;
  border: 1px solid rgba(239, 68, 68, 0.35);
  background: rgba(239, 68, 68, 0.12);
  color: #ef4444;
  cursor: pointer;
  font-weight: 900;
  transition: background 0.2s ease;
}

.logout:hover {
  background: rgba(239, 68, 68, 0.18);
}
</style>


