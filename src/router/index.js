import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '../views/Dashboard.vue';
import Today from '../views/Today.vue';
import TaskProjects from '../views/TaskProjects.vue';
import RoutinesHabits from '../views/RoutinesHabits.vue';
import CalendarView from '../views/CalendarView.vue';

import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ProfileView from '../views/ProfileView.vue';

import { useAuthStore } from '../stores/authStore';

const routes = [
  { path: '/', redirect: '/dashboard' },

  // public
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },

  // protected
  { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/today', name: 'today', component: Today, meta: { requiresAuth: true } },
  { path: '/task-projects', name: 'task-projects', component: TaskProjects, meta: { requiresAuth: true } },
  { path: '/routines-habits', name: 'routines-habits', component: RoutinesHabits, meta: { requiresAuth: true } },
  { path: '/calendar', name: 'calendar', component: CalendarView, meta: { requiresAuth: true } },
  { path: '/profile', name: 'profile', component: ProfileView, meta: { requiresAuth: true } },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  if (to.meta?.requiresAuth && !auth.isAuthenticated.value) {
    return { name: 'login' };
  }
});



