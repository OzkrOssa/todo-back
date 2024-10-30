import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { Task } from '../domain/task.entity';
import { TASK_PORT, TaskPort } from '../port/task.port';

@Injectable()
export class TaskService {
  constructor(@Inject(TASK_PORT) private readonly taskPort: TaskPort) {}

  //Create a new task
  async create(task: Task, userID: string): Promise<void> {
    await this.taskPort.create(task, userID);
  }
  //Update a task by id
  async update(id: string, userID: string, task: Task): Promise<void> {
    if (!task.title || task.title.trim().length === 0) {
      throw new BadRequestException('title is required');
    }

    const validStates = ['pending', 'in progress', 'completed'];
    if (!validStates.includes(task.status)) {
      throw new BadRequestException(
        `must contain a state: ${validStates.join(', ')}`,
      );
    }

    if (task.expectedDate && task.expectedDate < new Date()) {
      throw new BadRequestException('The expected date must be in the future.');
    }
    await this.taskPort.update(id, userID, task);
  }
  //Return all user task
  async getAll(userID: string): Promise<Task[]> {
    const tasks = this.getAll(userID);

    return tasks;
  }
  //Return a one task by id
  async getByID(id: string, userID: string): Promise<Task | null> {
    return await this.taskPort.getByID(id, userID);
  }
}
