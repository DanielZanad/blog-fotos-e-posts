import { Post } from '../../../domain/entities/Post';
import { PostRepository } from '../../repositories/posts-repository';

export interface CreatePostUseCaseRequest {
  title: string;
  body: string;
}

export class CreatePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(request: CreatePostUseCaseRequest): Promise<Post> {
    const { title, body } = request;

    const result = await this.postRepository.create({
      title,
      body,
    });

    if (result === null) throw new Error('Internal Server Error');

    return result;
  }
}
