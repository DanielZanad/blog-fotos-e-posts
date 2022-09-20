import { Post } from '../../../domain/entities/Post';
import { PostRepository } from '../../repositories/posts-repository';

export class ListAllPostsUseCase {
  constructor(private postResository: PostRepository) {}

  async execute(): Promise<Array<Post>> {
    const result = await this.postResository.getAllPosts();

    if (result === null) throw new Error('Internal Server Error');

    return result;
  }
}
