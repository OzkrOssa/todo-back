// src/adapters/repositories/user.repository.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../core/domain/user.entity';
import { UserPort } from '../../core/port/user.port';

@Injectable()
export class UserRepository implements UserPort {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  findOne(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async save(user: User): Promise<void> {
    await this.userRepository.save(user);
  }
}
