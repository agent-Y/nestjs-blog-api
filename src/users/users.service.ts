import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { PublicUserDto } from './dto/users.dto';
import { Omit } from 'lodash';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users({
  skip,
  take,
  cursor,
  where,
  orderBy,
}: {
  skip?: number;
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}): Promise<{
  data: PublicUserDto[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}> {
  const totalItems = await this.prisma.user.count({ where });

  const users = await this.prisma.user.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
    select: {
      id: true,
      email: true,
      username: true,
      nickname: true,
      createdAt: true,
      updatedAt: true,
      posts: { select: { id: true } },
      likes: { select: { id: true } },
    },
  }) 

  const data = users.map(
    ({ posts, likes, ...user }) =>
      new PublicUserDto(user as Omit<User, 'password'>, posts.length, likes.length),
  );

  const page = Math.floor(skip! / take!) + 1;
  const totalPages = Math.ceil(totalItems / take!);

  return {
    data,
    meta: {
      page,
      limit: take!,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}


  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
