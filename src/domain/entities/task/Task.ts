export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee?: { id: string; name: string; avatar?: string };
  dueDate?: string;
  status: TaskStatus;
  projectId: string;
  commentCount: number;
  attachmentCount: number;
}
