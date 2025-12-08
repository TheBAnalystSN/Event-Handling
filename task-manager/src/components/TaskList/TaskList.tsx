import React, { useMemo, useState } from 'react';
import { TaskListProps } from '../../types';
import TaskItem from '../TaskItem/TaskItem';

const TaskList: React.FC<TaskListProps> = ({ tasks, onStatusChange, onDelete, onMove, onAdd, onSortByDueDate }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState<'low'|'medium'|'high'>('low');
  const [newDueDate, setNewDueDate] = useState('');

  const addTaskLocal = () => {
    if (!newTitle.trim()) return;
    const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
    const task = {
      id,
      title: newTitle,
      description: newDescription,
      priority: newPriority,
      status: 'pending' as const,
      dueDate: newDueDate || new Date().toISOString().slice(0,10),
    };
    onAdd?.(task);
    setNewTitle('');
    setNewDescription('');
    setNewPriority('low');
    setNewDueDate('');
    setShowAdd(false);
  };

  // Rendered list
  const rendered = useMemo(() => {
    if (!tasks) return null;
    return tasks.map(task => (
      <TaskItem
        key={task.id}           // unique key usage
        task={task}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
        onMove={onMove}
      />
    ));
  }, [tasks, onStatusChange, onDelete, onMove]);

  return (
    <div className="task-list">
      <div className="mb-3 flex gap-2">
        {onSortByDueDate && <button onClick={onSortByDueDate} className="px-3 py-1 border rounded">Sort by due date</button>}
        {onAdd && <button onClick={() => setShowAdd(s => !s)} className="px-3 py-1 border rounded">{showAdd ? 'Cancel' : 'Add Task'}</button>}
      </div>

      {showAdd && onAdd && (
        <div className="add-form mb-4 p-3 border rounded">
          <div className="mb-2">
            <label className="block text-sm">Title</label>
            <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full px-2 py-1 border rounded" />
          </div>
          <div className="mb-2">
            <label className="block text-sm">Description</label>
            <input value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="w-full px-2 py-1 border rounded" />
          </div>
          <div className="mb-2 flex gap-2">
            <label>
              Priority
              <select value={newPriority} onChange={(e) => setNewPriority(e.target.value as any)} className="ml-2 px-2 py-1 border rounded">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <label>
              Due
              <input value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)} type="date" className="ml-2 px-2 py-1 border rounded" />
            </label>
          </div>
          <div>
            <button onClick={addTaskLocal} className="px-3 py-1 border rounded">Create</button>
          </div>
        </div>
      )}

      <ul>{rendered}</ul>
    </div>
  );
};

export default TaskList;
