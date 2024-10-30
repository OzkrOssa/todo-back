import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from '../adapter/repository/task.repository';
import { TaskService } from '../core/service/task.service';
import { TASK_PORT } from '../core/port/task.port';
import { Task } from 'src/core/domain/task.entity';
import { TaskController } from './controller/task.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [
    TaskService,
    JwtService,
    {
      provide: TASK_PORT,
      useClass: TaskRepository,
    },
  ],
  exports: [TASK_PORT, TaskService],
})
export class TaskModule {}
