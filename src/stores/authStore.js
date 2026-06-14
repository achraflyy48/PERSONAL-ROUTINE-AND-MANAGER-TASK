import { computed, reactive } from 'vue';

const LS_USERS_KEY = 'auth_users_v1';
const LS_SESSION_KEY = 'auth_session_v1';

const seedUser = {
  username: 'achraflyy',
  // NOTE: For demo/initial access only (plain text). Upgrade to hashing when adding backend.
  password: '13Mei2004#',
  createdAt: new Date().toISOString(),
};

function loadUsers() {
  try {
    const raw = localStorage.getItem(LS_USERS_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch (_) {}

  localStorage.setItem(LS_USERS_KEY, JSON.stringify([seedUser]));
  return [seedUser];
}

function saveUsers(users) {
  localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));
}

function loadSession() {
  try {
    const raw = localStorage.getItem(LS_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.username) return null;
    return parsed;
  } catch (_) {
    return null;
  }
}

const DEFAULT_ROLES = [
  'Fullstack Developer',
  'Front End Developer',
  'Back End Developer',
  'UI / IX Design',
  'Project Manager',
];

function ensureUserShape(u) {
  if (!u || typeof u !== 'object') return null;

  const role = u.role && DEFAULT_ROLES.includes(u.role) ? u.role : 'Fullstack Developer';

  return {
    username: String(u.username ?? ''),
    password: String(u.password ?? ''),
    createdAt: u.createdAt ?? new Date().toISOString(),
    fullName: u.fullName ?? String(u.username ?? ''),
    email: u.email ?? `${String(u.username ?? '').trim()}@example.com`,
    role,
    profilePicture:
      u.profilePicture && typeof u.profilePicture === 'string'
        ? u.profilePicture
        : 'https://placehold.co/160x160/png?text=Profile',
  };
}

const state = reactive({
  currentUser: loadSession()?.username ?? null,
});

const users = loadUsers().map(ensureUserShape).filter(Boolean);

export function useAuthStore() {
  const isAuthenticated = computed(() => !!state.currentUser);

  const getCurrentUser = computed(() => {
    if (!state.currentUser) return null;
    const u = users.find((x) => x.username === state.currentUser);
    return u ? { ...u } : null;
  });

  function login(username, password) {
    const normalized = String(username ?? '').trim();
    const u = users.find((x) => x.username === normalized && x.password === password);
    if (!u) return false;

    state.currentUser = u.username;
    localStorage.setItem(LS_SESSION_KEY, JSON.stringify({ username: u.username }));
    return true;
  }

  function register({ username, password, fullName, email, role }) {
    const normalized = String(username ?? '').trim();
    if (!normalized) return { ok: false, message: 'Username wajib diisi.' };

    if (String(password ?? '').length < 6) {
      return { ok: false, message: 'Password minimal 6 karakter.' };
    }

    if (!String(fullName ?? '').trim()) {
      return { ok: false, message: 'Full name wajib diisi.' };
    }

    const normalizedEmail = String(email ?? '').trim();
    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      return { ok: false, message: 'Email tidak valid.' };
    }

    const normalizedRole = DEFAULT_ROLES.includes(role) ? role : 'Fullstack Developer';

    if (users.some((x) => x.username === normalized)) {
      return { ok: false, message: 'Username sudah terdaftar.' };
    }

    const newUser = ensureUserShape({
      username: normalized,
      password: String(password),
      createdAt: new Date().toISOString(),
      fullName: String(fullName).trim(),
      email: normalizedEmail,
      role: normalizedRole,
      profilePicture: 'https://placehold.co/160x160/png?text=Profile',
    });

    users.push(newUser);
    saveUsers(users);

    state.currentUser = newUser.username;
    localStorage.setItem(LS_SESSION_KEY, JSON.stringify({ username: newUser.username }));

    return { ok: true };
  }

  function changePassword({ username, currentPassword, newPassword }) {
    const normalizedUsername = String(username ?? '').trim();
    const u = users.find((x) => x.username === normalizedUsername);
    if (!u) {
      return { ok: false, message: 'User tidak ditemukan.' };
    }

    if (u.password !== currentPassword) {
      return { ok: false, message: 'Password saat ini salah.' };
    }

    if (String(newPassword ?? '').length < 6) {
      return { ok: false, message: 'Password minimal 6 karakter.' };
    }

    u.password = String(newPassword);
    saveUsers(users);

    return { ok: true };
  }


  function updateProfile({ username, fullName, email, role }) {
    const normalizedUsername = String(username ?? '').trim();
    const u = users.find((x) => x.username === normalizedUsername);

    if (!u) {
      return { ok: false, message: 'User tidak ditemukan.' };
    }

    const normalizedFullName = String(fullName ?? '').trim();
    if (!normalizedFullName) {
      return { ok: false, message: 'Full name wajib diisi.' };
    }

    const normalizedEmail = String(email ?? '').trim();
    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      return { ok: false, message: 'Email tidak valid.' };
    }

    const normalizedRole = DEFAULT_ROLES.includes(role) ? role : null;
    if (!normalizedRole) {
      return { ok: false, message: 'Role tidak valid.' };
    }

    u.fullName = normalizedFullName;
    u.email = normalizedEmail;
    u.role = normalizedRole;

    saveUsers(users);

    return { ok: true };
  }

  function logout() {
    state.currentUser = null;
    localStorage.removeItem(LS_SESSION_KEY);
  }

  return {
    state,
    isAuthenticated,
    getCurrentUser,
    login,
    register,
    changePassword,
    updateProfile,
    logout,
  };
}


