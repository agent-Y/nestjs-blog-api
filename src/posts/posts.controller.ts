import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from "./posts.service"
import { ParseIntPipe, Param } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

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