import { Task } from '../domain/task.entity';

export const TASK_PORT = Symbol('TaskPort');

export interface TaskPort {
  //Create a new task
  create(task: Task, userID: string): Promise<void>;
  //Update a task by id
  update(id: string, userID: string, task: Task): Promise<void>;
  //Return all user task
  getAll(userID: string): Promise<Task[]>;
  //Return a one task by id
  getByID(id: string, userID: string): Promise<Task | null>;
}
