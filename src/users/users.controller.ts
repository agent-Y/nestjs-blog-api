import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserType } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserType[]> {
    return this.usersService.users({});
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserType> {
    return this.usersService.user({ id: Number(id) });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userData: { email?: string; username?: string; nickname?: string },
  ): Promise<UserType> {
    return this.usersService.updateUser({
      where: { id: Number(id) },
      data: userData,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserType> {
    return this.usersService.deleteUser({ id: Number(id) });
  }
}
