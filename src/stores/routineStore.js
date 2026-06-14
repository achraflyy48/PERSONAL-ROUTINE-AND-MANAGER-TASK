import { reactive, computed } from 'vue';

const state = reactive({
  theme: 'light',
  projects: [
    { id: 1, name: 'Pekerjaan Kantor', color: '#22c55e' },
    { id: 2, name: 'Belajar', color: '#3b82f6' },
    { id: 3, name: 'Tugas Rumah', color: '#f59e0b' },
  ],
  tasks: [
    {
      id: 1,
      title: 'Menyelesaikan tugas kuliah',
      description: 'Kerjakan sampai selesai.',
      completed: true,
      priority: 'Penting',
      deadline: new Date().toISOString().slice(0, 10),
      deadlineLabel: 'Hari ini',
      projectId: 2,
      subtasks: [],
      recurring: { enabled: true, cadence: 'weekly' },
      dueType: 'today',
    },
    {
      id: 2,
      title: 'Berolahraga minimal 45 menit',
      description: 'Fokus latihan dan konsistensi.',
      completed: true,
      priority: 'Mendesak',
      deadline: new Date().toISOString().slice(0, 10),
      deadlineLabel: 'Hari ini',
      projectId: 1,
      subtasks: [],
      recurring: { enabled: true, cadence: 'daily' },
      dueType: 'today',
    },
    {
      id: 3,
      title: 'Membaca buku minimal 30 menit',
      description: 'Baca dan catat poin penting.',
      completed: false,
      priority: 'Penting',
      deadline: new Date().toISOString().slice(0, 10),
      deadlineLabel: 'Hari ini',
      projectId: 2,
      subtasks: [],
      recurring: { enabled: true, cadence: 'daily' },
      dueType: 'today',
    },
    {
      id: 4,
      title: 'Persiapan meeting minggu depan',
      description: 'Susun agenda dan bahan presentasi.',
      completed: false,
      priority: 'Mendesak',
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      deadlineLabel: 'Besok',
      projectId: 1,
      subtasks: [],
      recurring: { enabled: false },
      dueType: 'upcoming',
    },
  ],
  habits: [
    { id: 101, name: 'Minum air putih', doneToday: true, color: '#34d399', cadence: 'daily' },
    { id: 102, name: 'Olahraga pagi', doneToday: true, color: '#22d3ee', cadence: 'daily' },
    { id: 103, name: 'Membaca', doneToday: false, color: '#a78bfa', cadence: 'daily' },
  ],
});

export function useRoutineStore() {
  const completedPercentage = computed(() => {
    if (state.tasks.length === 0) return 0;
    const completed = state.tasks.filter(t => t.completed).length;
    return Math.round((completed / state.tasks.length) * 100);
  });

  const getTodayTasks = () => state.tasks.filter(t => t.dueType === 'today');

  const getUpcoming = () => {
    // simple: upcoming tasks
    return state.tasks
      .filter(t => t.dueType !== 'today')
      .slice(0, 3)
      .map(t => {
        const proj = state.projects.find(p => p.id === t.projectId);
        return { id: t.id, title: t.title, when: t.deadlineLabel, color: proj?.color || '#34d399' };
      });
  };

  const getUrgent = () => {
    return state.tasks
      .filter(t => t.priority === 'Mendesak' && !t.completed)
      .slice(0, 3)
      .map(t => ({ id: t.id, title: t.title, when: t.deadlineLabel }));
  };

  const toggleTask = (id) => {
    const task = state.tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
  };

  const deleteTask = (id) => {
    state.tasks = state.tasks.filter(t => t.id !== id);
  };

  return {
    state,
    completedPercentage,
    getTodayTasks,
    getUpcoming,
    getUrgent,
    toggleTask,
    deleteTask,
  };
}

