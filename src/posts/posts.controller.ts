import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { PostsService } from "./posts.service";
import { ParseIntPipe, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }
  
  @Get()
  getPosts(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.postsService.getPosts(skip, take);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number, @Request() request: any) {
    console.log('Authenticated user:', request.user);
    return this.postsService.getPost(id, request.user?.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':postId/comments')
  addComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Body('authorId') authorId: number,
    @Body('content') content: string,
  ) {
    return this.postsService.addComment(postId, authorId, content);
  }

  @Get(':postId/comments')
  getComments(@Param('postId', ParseIntPipe) postId: number) {
    return this.postsService.getComments(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':postId/like')
  likePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body('userId') userId: number,
  ) {
    return this.postsService.likePost(postId, userId);
  }

  @Get(':postId/likes')
  getLikes(@Param('postId', ParseIntPipe) postId: number) {
    return this.postsService.getLikes(postId);
  }
}