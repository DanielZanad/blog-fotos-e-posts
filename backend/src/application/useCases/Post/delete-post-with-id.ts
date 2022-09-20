import { Post } from '../../../domain/entities/Post';
import { PostRepository } from '../../repositories/posts-repository';

export interface DeletePostWithIdRequest {
  id: string;
}

export class DeletePostWithIdUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(request: DeletePostWithIdRequest): Promise<Post> {
    const { id } = request;

    const result = await this.postRepository.deletePostById(id);

    if (result === null) throw new Error('Internal Server Error');

    return result;
  }
}
