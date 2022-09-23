import { Post } from '../../../domain/entities/Post';
import { PostRepository } from '../../repositories/posts-repository';

export interface ListPostWithIdRequest {
  id: string;
}

export class ListPostWithIdUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(request: ListPostWithIdRequest): Promise<Post> {
    const { id } = request;

    if (!id) {
      throw new Error('Id is missing');
    }

    const result = await this.postRepository.listPostById(id);

    if (result === null) throw new Error('Internal Server Error');

    return result;
  }
}
