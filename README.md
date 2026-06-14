# Personal Routine & Task Manager 📝

A clean, modern, and interactive web application built to help users manage their daily routines and tasks efficiently. This project demonstrates the implementation of a modern Vue 3 ecosystem, complete with user authentication, route protection, and dynamic layouts.

## ✨ Features

* **User Authentication:** Secure Login and Registration flows using custom state management (`localStorage`).
* **Protected Routes:** Implementation of Vue Router navigation guards to ensure dashboard and profile pages are only accessible to authenticated users.
* **Dynamic Layouts:** Seamless switching between a clean interface for authentication pages and a comprehensive `SidebarLayout` for the main application.
* **Profile Management:** Users can view and edit their profile details (Full Name, Email, Role, Profile Picture) and securely change their passwords.
* **Session Management:** Persistent user sessions handled via browser local storage for a seamless user experience.

## 🛠️ Tech Stack

* **Framework:** [Vue.js 3](https://vuejs.org/) (Composition API)
* **Routing:** [Vue Router 4](https://router.vuejs.org/)
* **Build Tool:** [Vite 8](https://vitejs.dev/)
* **State Management:** Custom `authStore.js` leveraging Window `localStorage`
* **Environment:** Node.js (v20+)

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js installed on your local machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/achraflyy48/PERSONAL-ROUTINE-AND-MANAGER-TASK.git

2. Navigate to the project directory:
   ```bash
   cd personal-routine-task-manager

3. Install dependencies:
   ```bash
   npm install

## 📂 Project Structure Highlights
<ul>
  <li>/src/views: Contains the main page components (LoginView.vue, RegisterView.vue, ProfileView.vue, Dashboard).</li>
  <li>/src/components: Reusable UI components, including the main SidebarLayout.vue.</li>
  <li>/src/router/index.js: Application routing configuration, meta tags, and authentication guards.</li>
  <li>/src/stores/authStore.js: Centralized logic for user sessions and local storage management.</li>
</ul>

## 📌 Upcoming Features (To-Do)
<ul>
  <li>End-to-End (E2E) testing for the full authentication flow (Register -> Login -> Profile Edit -> Logout).</li>
  <li>Advanced task filtering and sorting.</li>
  <li>Routine analytics and progress tracking.</li>
</ul>
