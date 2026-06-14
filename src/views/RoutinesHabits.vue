<template>
  <section class="page">
    <h2>Routines / Habits</h2>
    <p class="muted">Checklist kebiasaan harian.</p>

    <div class="card">
      <div class="quick-add">
        <input v-model="newHabit" class="input" placeholder="Tambah kebiasaan baru" />
        <select v-model="newCadence" class="select">
          <option value="daily">daily</option>
          <option value="weekly">weekly</option>
        </select>
        <input v-model="newColor" class="color" type="color" />
        <button class="btn" :disabled="!newHabit.trim()" @click="addHabit">Add</button>
      </div>

      <div class="habit-list">
        <div
          v-for="h in store.state.habits"
          :key="h.id"
          class="habit"
        >
          <div class="habit-main" @click="toggleHabit(h.id)">
            <button class="check" type="button" :aria-pressed="h.doneToday">
              <span v-if="h.doneToday" class="check-icon">✓</span>
            </button>
            <div class="habit-body">
              <div class="habit-title">{{ h.name }}</div>
              <div class="habit-meta">{{ h.cadence }}</div>
            </div>
            <span class="badge" :style="{ background: h.color }"></span>
          </div>

          <button class="delete" type="button" title="Hapus habit" @click="deleteHabit(h.id)">
            ✕
          </button>
        </div>

        <div v-if="store.state.habits.length === 0" class="empty">
          Tidak ada habit.
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRoutineStore } from '../stores/routineStore'

const store = useRoutineStore();

const newHabit = ref('')
const newCadence = ref('daily')
const newColor = ref('#34d399')

const toggleHabit = (id) => {
  const h = store.state.habits.find(x => x.id === id)
  if (h) h.doneToday = !h.doneToday
}

const addHabit = () => {
  if (!newHabit.value.trim()) return
  store.state.habits.push({
    id: Date.now(),
    name: newHabit.value,
    doneToday: false,
    color: newColor.value,
    cadence: newCadence.value,
  })
  newHabit.value = ''
}

const deleteHabit = (id) => {
  store.state.habits = store.state.habits.filter(h => h.id !== id)
}
</script>

<style scoped>
.page{ padding:1rem 0; }
.muted{ color: var(--text-muted); margin:.25rem 0 1rem; }
.card{ background: var(--card-bg); border:1px solid var(--card-border); border-radius: var(--radius); padding:1rem; }

.quick-add{
  display:flex;
  gap:.6rem;
  align-items:center;
  flex-wrap:wrap;
  margin-bottom:1rem;
}
.input{ padding:.6rem .75rem; border-radius:12px; border:1px solid var(--card-border); background:#fff; min-width: 0; width: clamp(160px, 26vw, 220px); }
.select{ padding:.6rem .75rem; border-radius:12px; border:1px solid var(--card-border); background:#fff; }
.color{ width:44px; height:38px; border:none; padding:0; background:transparent; }
.btn{ padding:.7rem .9rem; border-radius:12px; border:none; cursor:pointer; background: rgba(52,211,153,.18); color: var(--accent); font-weight:800; }
.btn:disabled{ opacity:.5; cursor:not-allowed; }

.habit-list{ display:flex; flex-direction:column; gap:.6rem; }
.habit{ display:flex; align-items:center; justify-content:space-between; gap:1rem; padding:.75rem; border-radius: 14px; border:1px solid rgba(2,6,23,.08); background: rgba(2,6,23,.02); }
.habit-main{ display:flex; align-items:center; gap:.8rem; cursor:pointer; flex:1; }


@media (max-width: 420px){
  .habit{ gap:.5rem; padding:.6rem; }
  .color{ width:36px; }
}

.check{ width:clamp(22px, 4.8vw, 28px); height:clamp(22px, 4.8vw, 28px); border-radius:10px; border:1px solid rgba(2,6,23,.15); background:#fff; display:flex; align-items:center; justify-content:center; flex:0 0 auto; }
.check-icon{ color: var(--accent); font-weight:900; }
.habit-title{ font-weight:800; }
.habit-meta{ color: var(--text-muted); font-size:.85rem; margin-top:.15rem; }
.habit-body{ flex:1; }
.badge{ width:10px; height:10px; border-radius:999px; }

.delete{ border:none; background:transparent; cursor:pointer; color: rgba(239,68,68,.9); font-size:1.05rem; padding:.25rem; }

.empty{ padding:1.25rem; color: var(--text-muted); text-align:center; border:2px dashed rgba(2,6,23,.15); border-radius: var(--radius); }
</style>



