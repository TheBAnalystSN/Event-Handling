export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; // ISO: '2024-12-31' etc.
}

export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onMove?: (taskId: string, direction: 'up' | 'down') => void;
  onAdd?: (task: Task) => void;
  onSortByDueDate?: () => void;
}

export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onMove?: (taskId: string, direction: 'up' | 'down') => void;
}

export interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus | 'all';
    priority?: TaskPriority | 'all';
  }) => void;
}
