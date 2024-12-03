import { Body, Controller, Get, Post } from '@nestjs/common';
import { Post as PostType } from "@prisma/client"
import { PostsService } from "./posts.service"

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}
    @Get()
    findAll() {
        return this.postsService.findAll();
    }

    @Post()
    create(@Body() post: PostType): PostType {    
        this.postsService.create(post);
        return post;
    }
}
