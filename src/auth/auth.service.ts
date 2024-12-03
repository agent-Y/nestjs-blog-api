import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        nickname: user.nickname,
      },
    };
  }

  async register(userData: {
    email: string;
    password: string;
    username: string;
    nickname: string;
  }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const user = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        nickname: user.nickname,
      },
    };
  }
}
