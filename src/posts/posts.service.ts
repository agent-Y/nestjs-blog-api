import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) { }
  
  async getPosts(skip?: number, take?: number, userId?: number) {
    const totalItems = await this.prisma.post.count();
    const posts = await this.prisma.post.findMany({
      skip,
      take,
      include: {
        author: {
          select: { id: true, email: true, username: true, nickname: true },
        },
        likes: userId ? {
          where: { userId },
          select: { id: true },
        } : false,
      },
    });

    const postsWithLikeStatus = posts.map(post => ({
      ...post,
      isLikedByRequestUser: userId ? post.likes.length > 0 : false,
    }));

    const page = Math.floor(skip! / take!) + 1;
    const totalPages = Math.ceil(totalItems / take!);

    return {
      data: postsWithLikeStatus,
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

  async getPost(id: number, userId?: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, email: true, username: true, nickname: true },
        },
        likes: userId ? {
          where: { userId },
          select: { id: true },
        } : false,
        comments: {
          select: { id: true },
        },
      },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    return {
      ...post,
      likesCount: post.likes ? post.likes.length : 0,
      commentsCount: post.comments ? post.comments.length : 0,
      isLikedByUser: userId ? post.likes.length > 0 : false,
      comments: undefined, // Exclude comments from the returned data
    };
  }

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
      include: {
        author: {
        select: { id: true, email: true, username: true, nickname: true },
      } },
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