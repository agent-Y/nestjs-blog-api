import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async addComment(postId: number, authorId: number, content: string) {
    return this.prisma.comment.create({
      data: {
        content,
        post: { connect: { id: postId } },
        author: { connect: { id: authorId } },
      },
    });
  }

  async getComments(postId: number) {
    return this.prisma.comment.findMany({
      where: { postId },
      include: { author: true },
    });
  }

  async likePost(postId: number, userId: number) {
    return this.prisma.like.create({
      data: {
        post: { connect: { id: postId } },
        user: { connect: { id: userId } },
      },
    });
  }

  async getLikes(postId: number) {
    return this.prisma.like.count({
      where: { postId },
    });
  }
}