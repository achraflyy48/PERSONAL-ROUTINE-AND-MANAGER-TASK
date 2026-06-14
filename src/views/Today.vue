<template>
  <section class="page">
    <h2>Today / My Day</h2>
    <p class="muted">Tugas yang harus diselesaikan hari ini.</p>

    <div class="card">
      <div class="toolbar">
        <div class="toolbar-left">
          <span class="pill">{{ todayTasks.length }} tasks</span>
        </div>
      </div>

      <div class="list">
        <div
          v-for="task in todayTasks"
          :key="task.id"
          class="task-item"
          @click="store.toggleTask(task.id)"
        >
          <div class="task-left">
            <button
              class="check"
              type="button"
              :aria-pressed="task.completed"
              @click.stop="store.toggleTask(task.id)"
            >
              <span v-if="task.completed" class="check-icon">✓</span>
            </button>
            <div class="task-text">
              <div :class="['task-title', { done: task.completed }]">{{ task.title }}</div>
              <div class="task-meta">{{ task.deadlineLabel }} • {{ task.priority }}</div>
            </div>
          </div>
          <button
            class="delete"
            type="button"
            title="Hapus Tugas"
            @click.stop="store.deleteTask(task.id)"
          >
            ✕
          </button>
        </div>

        <div v-if="todayTasks.length === 0" class="empty">
          Tidak ada tugas untuk hari ini.
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoutineStore } from '../stores/routineStore';

const store = useRoutineStore();

const todayTasks = computed(() => store.getTodayTasks());
</script>

<style scoped>
.page{ padding:1rem 0; }
.muted{ color: var(--text-muted); margin:.25rem 0 1rem; }
.card{ background: var(--card-bg); border:1px solid var(--card-border); border-radius: var(--radius); padding:1rem; }
.toolbar{ display:flex; justify-content:space-between; align-items:center; margin-bottom:.75rem; }
.pill{ background: rgba(52,211,153,.12); color: var(--accent); border:1px solid rgba(52,211,153,.22); padding:.35rem .6rem; border-radius:999px; font-size:.85rem; }
.list{ display:flex; flex-direction:column; gap:.5rem; }
.task-item{ display:flex; justify-content:space-between; align-items:center; gap:1rem; padding:.75rem; border-radius: 12px; border:1px solid rgba(2,6,23,.08); background: rgba(2,6,23,.02); cursor:pointer; }
.task-left{ display:flex; gap:.75rem; align-items:flex-start; }
.check{ width:26px; height:26px; border-radius:9px; border:1px solid rgba(2,6,23,.15); background:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; }
.check-icon{ color: var(--accent); font-weight:900; }
.task-title{ font-weight:700; }
.task-title.done{ text-decoration:line-through; color: var(--text-muted); }
.task-meta{ color: var(--text-muted); font-size:.85rem; margin-top:.15rem; }
.delete{ border:none; background:transparent; cursor:pointer; color: rgba(239,68,68,.9); font-size:1.05rem; padding:.25rem; }
.empty{ padding:1.25rem; color: var(--text-muted); text-align:center; border:2px dashed rgba(2,6,23,.15); border-radius: var(--radius); }

@media (max-width:768px){
  .task-item{ flex-direction:row; }
}
</style>