import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../../core/service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: { username: string; password: string; email: string },
  ) {
    return this.authService.register(
      registerDto.username,
      registerDto.password,
      registerDto.email,
    );
  }

  @Post('login')
  async login(@Body() authDto: { username: string; password: string }) {
    return this.authService.authenticate(authDto.username, authDto.password);
  }
}
