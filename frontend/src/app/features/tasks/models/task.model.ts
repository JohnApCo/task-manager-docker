import { Priority } from "./priority.enum";

export interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  createdAt?: string;
}
