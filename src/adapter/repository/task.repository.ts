import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/core/domain/task.entity';
import { TaskPort } from 'src/core/port/task.port';
import { Repository } from 'typeorm';

@Injectable()
export class TaskRepository implements TaskPort {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  //Create a new task
  async create(task: Task, userID: string): Promise<void> {
    task.user.id = userID;
    const newTask = this.taskRepository.create(task);
    await this.taskRepository.save(newTask);
  }
  //Update a task by id
  async update(id: string, userID: string, task: Task): Promise<void> {
    const existingTask = await this.taskRepository.findOne({
      where: { id: id },
    });

    // Verificar si la tarea existe
    if (!existingTask) {
      throw new Error('Task not found');
    }

    // Verificar si el usuario que intenta actualizar es el propietario
    if (existingTask.user.id !== userID) {
      throw new Error('You are not authorized to update this task');
    }

    // Actualizar la tarea con los nuevos datos
    existingTask.title = task.title;
    existingTask.description = task.description;
    existingTask.status = task.status;
    existingTask.expectedDate = task.expectedDate;

    // Guardar la tarea actualizada
    await this.taskRepository.save(existingTask);
  }
  //Return all user task
  async getAll(userID: string): Promise<Task[]> {
    const task = await this.taskRepository.find({
      where: { user: { id: userID } },
    });
    //TODO: set null response
    return task;
  }
  //Return a one task by id
  async getByID(id: string, userID: string): Promise<Task | null> {
    const task = this.taskRepository.findOne({
      where: { id: id, user: { id: userID } },
    });
    //TODO: set null response
    return task;
  }
}
