import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import { TaskService } from '../../core/service/task.service';
import { Task } from '../../core/domain/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly jwtService: JwtService,
  ) {}

  // Crear una nueva tarea
  @Post()
  async create(@Body() task: Task, @Request() req: Request) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1]; // Obtén el token del encabezado

    try {
      const decoded = await this.jwtService.verifyAsync(token);
      console.log(decoded);
      //   return this.taskService.create(task, decoded);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  // Listar todas las tareas del usuario autenticado
  @Get()
  async getAll(@Request() req: any) {
    console.log('adad');
  }

  //   // Ver los detalles de una tarea específica
  //   @Get(':id')
  //   async getByID(@Param('id') id: string, @Request() req: any) {
  //     const userId = req.user.id; // Obtén el user ID del objeto de solicitud
  //     return this.taskService.getByID(id, userId); // Pasar tanto el id de la tarea como el userId
  //   }

  //   // Editar una tarea
  //   @Put(':id')
  //   async update(
  //     @Param('id') id: string,
  //     @Body() task: Task,
  //     @Request() req: any,
  //   ) {
  //     const userId = req.user.id; // Obtén el user ID del objeto de solicitud
  //     return this.taskService.update(id, userId, task); // Pasar el id de la tarea, userId y los datos actualizados
  //   }

  //   // Eliminar una tarea
  //   @Delete(':id')
  //   async delete(@Param('id') id: string, @Request() req: any) {
  //     const userId = req.user.id; // Obtén el user ID del objeto de solicitud
  //     return this.taskService.delete(id, userId); // Pasar tanto el id de la tarea como el userId
  //   }
}
