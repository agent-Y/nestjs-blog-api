import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserType } from '@prisma/client';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Query() { page = 1, limit = 10 }: PaginationDto) {
    const skip = (page - 1) * limit;

    return this.usersService.users({
      skip,
      take: Number(limit),
    });
  }
  

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserType> {
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
