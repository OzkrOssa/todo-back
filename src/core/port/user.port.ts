import { User } from '../domain/user.entity';

export const USER_PORT = Symbol('UserPort');

export interface UserPort {
  save(user: User): Promise<void>;
  findOne(username: string): Promise<User | null>;
}
