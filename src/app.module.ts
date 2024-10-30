import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './adapter/auth.module';
import { UserModule } from './adapter/user.module';
import { TaskModule } from './adapter/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // O el tipo de base de datos que estés usando
      host: 'localhost',
      port: 3306,
      username: 'todouser',
      password: 'todopass',
      database: 'todos',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    TaskModule,
  ],
})
export class AppModule {}
