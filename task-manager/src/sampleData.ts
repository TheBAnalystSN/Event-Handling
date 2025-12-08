import { Task } from './types';

const sample: Task[] = [
  {
    id: 't1',
    title: 'Task 1',
    description: 'Description 1',
    status: 'pending',
    priority: 'low',
    dueDate: '2023-12-31',
  },
  {
    id: 't2',
    title: 'Task 2',
    description: 'Description 2',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2024-01-01',
  },
  {
    id: 't3',
    title: 'Task 3',
    description: 'Description 3',
    status: 'completed',
    priority: 'high',
    dueDate: '2024-01-02',
  },
];

export default sample;
