import { Post } from '@prisma/client';
import { Injectable } from '@nestjs/common';



@Injectable()
export class PostsService {
    private readonly posts : Post[] = []

    findAll() : Post[] {
        return this.posts
    }

    create(post : Post) {
        this.posts.push(post)
    }
}
