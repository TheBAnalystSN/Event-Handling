/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react';
import './index.css';
import type { Task } from './types';
import TaskFilter from './components/TaskFilter/TaskFilter';
import TaskList from './components/TaskList/TaskList';
import sampleData from './sampleData';

function App() {
  const [tasks, setTasks] = useState<Task[]>(sampleData);
  const [filters, setFilters] = useState<{ status?: string; priority?: string }>({ status: 'all', priority: 'all' });

  const filtered = useMemo(() => {
    return tasks.filter(t => {
      if (filters.status && filters.status !== 'all' && t.status !== filters.status) return false;
      if (filters.priority && filters.priority !== 'all' && t.priority !== filters.priority) return false;
      return true;
    });
  }, [tasks, filters]);

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const handleDelete = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleFilterChange = (f: { status?: any; priority?: any }) => {
    setFilters(f);
  };

  const handleMove = (taskId: string, direction: 'up' | 'down') => {
    setTasks(prev => {
      const idx = prev.findIndex(t => t.id === taskId);
      if (idx === -1) return prev;
      const copy = [...prev];
      const swapWith = direction === 'up' ? idx - 1 : idx + 1;
      if (swapWith < 0 || swapWith >= copy.length) return prev;
      const tmp = copy[swapWith];
      copy[swapWith] = copy[idx];
      copy[idx] = tmp;
      return copy;
    });
  };

  const handleAdd = (task: Task) => {
    setTasks(prev => [task, ...prev]);
  };

  const handleSortByDueDate = () => {
    setTasks(prev => [...prev].sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));
  };

  return (
    <div className="app container mx-auto p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Task Manager — Lists, Keys & Conditionals</h1>

      <TaskFilter onFilterChange={handleFilterChange} />

      <div className="mb-4 text-sm text-gray-700">
        Showing <strong>{filtered.length}</strong> of <strong>{tasks.length}</strong> tasks
      </div>

      <TaskList
        tasks={filtered}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onMove={handleMove}
        onAdd={handleAdd}
        onSortByDueDate={handleSortByDueDate}
      />
    </div>
  );
}

export default App;
