<template>
  <section class="page">
    <h2>Calendar</h2>
    <p class="muted">Tampilan kalender (awal) — menampilkan event dari tugas.</p>

    <div class="card">
      <div class="calendar-grid">
        <div class="day" v-for="d in days" :key="d.key">
          <div class="day-head">
            <div class="day-num">{{ d.num }}</div>
            <div class="day-name">{{ d.name }}</div>
          </div>
          <div class="events">
            <div v-for="ev in d.events" :key="ev.id" class="event" :style="{ borderColor: ev.color }">
              <div class="event-title">{{ ev.title }}</div>
              <div class="event-meta">{{ ev.when }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoutineStore } from '../stores/routineStore';

const store = useRoutineStore();

const days = computed(() => {
  // simple 3-day preview
  const today = new Date();

  const make = (offset) => {
    const date = new Date(today.getTime() + offset * 86400000);
    const key = date.toISOString().slice(0, 10);

    const events = store.state.tasks
      .filter(t => t.deadline === key && !t.completed)
      .slice(0, 4)
      .map(t => ({
        id: t.id,
        title: t.title,
        when: t.deadlineLabel,
        color: store.state.projects.find(p => p.id === t.projectId)?.color || '#34d399',
      }));

    return {
      key,
      num: date.getDate(),
      name: ['Min','Sen','Sel','Rab','Kam','Jum','Sab'][date.getDay()],
      events,
    };
  };

  return [make(0), make(1), make(2), make(3), make(4), make(5)]
    .map((x, idx) => ({ ...x, key: x.key + '-' + idx }))
    .slice(0, 6);
});


</script>

<style scoped>
.page{ padding:1rem 0; }
.muted{ color: var(--text-muted); margin:.25rem 0 1rem; }
.card{ background: var(--card-bg); border:1px solid var(--card-border); border-radius: var(--radius); padding:1rem; }
.calendar-grid{ display:grid; grid-template-columns: repeat(3, 1fr); gap:1rem; }
.day{ border:1px solid rgba(2,6,23,.08); border-radius: 14px; padding:.75rem; min-height: 140px; }
.day-head{ display:flex; flex-direction:column; gap:.15rem; margin-bottom:.5rem; }
.day-num{ font-weight:900; font-size:1.4rem; }
.day-name{ color: var(--text-muted); font-weight:700; }
.events{ display:flex; flex-direction:column; gap:.5rem; }
.event{ border-left: 4px solid; padding:.45rem .5rem; border-radius: 10px; background: rgba(2,6,23,.02); }
.event-title{ font-weight:800; font-size:.95rem; }
.event-meta{ color: var(--text-muted); font-size:.85rem; margin-top:.15rem; }

@media (max-width: 768px){
  .calendar-grid{ grid-template-columns: 1fr; }
}

@media (max-width: 420px){
  .day{ min-height: 120px; padding: .65rem; }
  .day-num{ font-size: 1.25rem; }
}
</style>
