<template>
  <SidebarLayout v-if="showSidebar" />
  <RouterView v-else />
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import SidebarLayout from './components/SidebarLayout.vue';
import { useAuthStore } from './stores/authStore';

const route = useRoute();
const auth = useAuthStore();

const showSidebar = computed(() => {
  // Hide sidebar for public pages
  if (route.name === 'login' || route.name === 'register') return false
  return true
})

onMounted(() => {
  // default: light mode
  document.documentElement.setAttribute('data-theme', 'light')
})
</script>