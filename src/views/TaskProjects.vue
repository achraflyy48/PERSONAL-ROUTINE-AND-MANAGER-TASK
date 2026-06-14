<template>
  <section class="page">
    <h2>Task & Projects</h2>
    <p class="muted">Kelompokkan pekerjaan berdasarkan project.</p>

    <div class="grid">
      <div class="card">
        <h3 class="card-title">Projects</h3>
        <ul class="list">
          <li v-for="p in store.state.projects" :key="p.id" class="list-item">
            <span class="dot" :style="{ background: p.color }"></span>
            <span class="name">{{ p.name }}</span>
          </li>
        </ul>
      </div>

      <div class="card">
        <h3 class="card-title">Quick Add (Title saja)</h3>
        <div class="form">
          <input v-model="title" class="input" placeholder="Judul tugas baru" />
          <select v-model.number="projectId" class="select">
            <option v-for="p in store.state.projects" :key="p.id" :value="p.id">{{ p.name }}</option>
          </select>
          <button class="btn" :disabled="!title.trim()" @click="addQuick">Add</button>
        </div>
        <div class="hint">Untuk tahap awal: detail (deskripsi/prioritas/deadline/subtask) akan ditambah bertahap.</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRoutineStore } from '../stores/routineStore';

const store = useRoutineStore();
const title = ref('');
const projectId = ref(store.state.projects[0]?.id || 1);

const addQuick = () => {
  if (!title.value.trim()) return

  const id = Date.now()
  store.state.tasks.push({
    id,
    title: title.value,
    description: '',
    completed: false,
    priority: 'Penting',
    deadline: new Date().toISOString().slice(0, 10),
    deadlineLabel: 'Hari ini',
    projectId: projectId.value,
    subtasks: [],
    recurring: { enabled: false },
    dueType: 'today',
  })

  title.value = ''
}

</script>

<style scoped>
.page{ padding:1rem 0; }
.muted{ color: var(--text-muted); margin:.25rem 0 1rem; }
.grid{ display:grid; grid-template-columns: 1fr 1fr; gap:1rem; }
.card{ background: var(--card-bg); border:1px solid var(--card-border); border-radius: var(--radius); padding:1rem; }
.card-title{ margin-bottom:.75rem; }
.list{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:.5rem; }
.list-item{ display:flex; align-items:center; gap:.6rem; }
.dot{ width:.6rem; height:.6rem; border-radius:999px; }
.name{ font-weight:700; }
.form{ display:flex; flex-direction:column; gap:.6rem; }
.input{ padding:.6rem .75rem; border-radius:12px; border:1px solid var(--card-border); background:#fff; }
.select{ padding:.6rem .75rem; border-radius:12px; border:1px solid var(--card-border); background:#fff; }
.btn{ padding:.7rem .9rem; border-radius:12px; border:none; cursor:pointer; background: rgba(52,211,153,.18); color: var(--accent); font-weight:800; }
.btn:disabled{ opacity:.5; cursor:not-allowed; }
.hint{ margin-top:.75rem; color: var(--text-muted); font-size:.9rem; }

@media (max-width:768px){ .grid{ grid-template-columns:1fr; } }
</style>


