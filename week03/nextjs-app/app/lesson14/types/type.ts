export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'to_do' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  start_date: string;
  due_date?: string;
  assignee_id?: number;
  created_at?: string;
  updated_at?: string;
}