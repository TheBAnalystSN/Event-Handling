import React from 'react';
import { TaskItemProps } from '../../types';

const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange, onDelete, onMove }) => {
  const due = new Date(task.dueDate);
  const dueStr = isNaN(due.getTime()) ? task.dueDate : due.toLocaleDateString();

  const statusBadge = (status: typeof task.status) => {
    switch (status) {
      case 'pending': return 'border-yellow-500 text-yellow-700 bg-yellow-50';
      case 'in-progress': return 'border-blue-500 text-blue-700 bg-blue-50';
      case 'completed': return 'border-green-500 text-green-700 bg-green-50';
      default: return '';
    }
  };

  const priorityBadge = (p: typeof task.priority) => {
    switch (p) {
      case 'low': return 'text-green-700';
      case 'medium': return 'text-orange-700';
      case 'high': return 'text-red-700';
      default: return '';
    }
  };

  return (
    <li className="task-item p-3 mb-2 border rounded-md shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-700">{task.description}</p>
          <div className="mt-2 text-xs flex gap-3 items-center">
            <span className={`px-2 py-1 border rounded ${statusBadge(task.status)}`}>
              {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
            <span className={`px-2 py-1 text-xs border rounded ${priorityBadge(task.priority)}`}>
              Priority: {task.priority}
            </span>
            <span className="text-xs text-gray-600">Due: {dueStr}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <select
            aria-label={`Change status for ${task.title}`}
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value as any)}
            className="px-2 py-1 border rounded"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={() => onDelete(task.id)}
              className="px-2 py-1 border rounded hover:bg-red-50"
            >
              Delete
            </button>

            {onMove && (
              <>
                <button onClick={() => onMove(task.id, 'up')} className="px-2 py-1 border rounded">↑</button>
                <button onClick={() => onMove(task.id, 'down')} className="px-2 py-1 border rounded">↓</button>
              </>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
