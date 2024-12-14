import { User } from '@prisma/client';

export class PublicUserDto {
  id: number;
  username: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
  postsCount: number;
  likesCount: number;

  constructor(user: User, postsCount: number, likesCount: number) {
    this.id = user.id;
    this.username = user.username;
    this.nickname = user.nickname;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.postsCount = postsCount;
    this.likesCount = likesCount;
  }
}