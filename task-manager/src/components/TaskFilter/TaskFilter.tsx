/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { type TaskFilterProps } from '../../types';

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  const [status, setStatus] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [priority, setPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const handleChange = (s: typeof status, p: typeof priority) => {
    setStatus(s);
    setPriority(p);
    onFilterChange({
      status: s,
      priority: p,
    });
  };

  return (
    <div className="task-filter mb-4 flex gap-4 items-center">
      <label>
        Status
        <select
          value={status}
           
          onChange={(e) => handleChange(e.target.value as any, priority)}
          className="ml-2 px-2 py-1 border rounded"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      <label>
        Priority
        <select
          value={priority}
          onChange={(e) => handleChange(status, e.target.value as any)}
          className="ml-2 px-2 py-1 border rounded"
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
    </div>
  );
};

export default TaskFilter;
