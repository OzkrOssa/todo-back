// src/core/service/auth.service.ts
import {
  Injectable,
  Inject,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserPort, USER_PORT } from '../port/user.port';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_PORT) private readonly userPort: UserPort,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(username: string, password: string, email: string) {
    const user = await this.userPort.findOne(username);

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userService.create(username, hashedPassword, email);

    return {
      message: 'User created successfully',
    };
  }

  async authenticate(username: string, password: string) {
    const user = await this.userPort.findOne(username);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const accessToken = this.jwtService.sign({
      id: user.id,
      username: user.username,
    });

    return {
      token: accessToken,
      email: user.email,
    };
  }
}
