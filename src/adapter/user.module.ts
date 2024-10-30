import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../core/domain/user.entity';
import { UserRepository } from '../adapter/repository/user.repository';
import { UserService } from '../core/service/user.service';
import { USER_PORT } from '../core/port/user.port';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    {
      provide: USER_PORT,
      useClass: UserRepository,
    },
  ],
  exports: [USER_PORT, UserService],
})
export class UserModule {}
