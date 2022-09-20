import { Post } from '../../../domain/entities/Post';
import { prisma } from '../../../prisma/prisma';
import {
  PostCreateData,
  PostRepository,
  PostEditData,
} from '../posts-repository';

export class PrismaPostRepository implements PostRepository {
  async create({ title, body }: PostCreateData): Promise<Post | null> {
    const result = await prisma.post.create({
      data: {
        title,
        body,
      },
    });

    return Post.create(result);
  }

  async getAllPosts(): Promise<Array<Post> | null> {
    const posts = await prisma.post.findMany();

    const result: Array<Post> = [];
    posts.forEach((post) => {
      result.push(Post.create(post));
    });

    return result;
  }

  async getPostById(id: string): Promise<Post | null> {
    const result = await prisma.post.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return Post.create(result);
  }

  async editPostById({ id, title, body }: PostEditData): Promise<Post | null> {
    const result = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        body,
      },
    });

    return Post.create(result);
  }

  async deletePostById(id: string): Promise<Post | null> {
    const result = await prisma.post.delete({
      where: {
        id,
      },
    });

    return Post.create(result);
  }
}
