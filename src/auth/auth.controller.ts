import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginData: { email: string; password: string },
  ) {
    return this.authService.login(loginData);
  }

  @Post('register')
  async register(
    @Body() userData: {
      email: string;
      password: string;
      username: string;
      nickname: string;
    },
  ) {
    return this.authService.register(userData);
  }
}
