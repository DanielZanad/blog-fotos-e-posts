import { Post } from '../../../domain/entities/Post';
import { PostRepository } from '../../repositories/posts-repository';

export interface EditPostWithIdRequest {
  id: string;
  title: string;
  body: string;
}

export class EditPostWithIdUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(request: EditPostWithIdRequest): Promise<Post> {
    const { id, title, body } = request;

    const result = await this.postRepository.editPostById({ id, title, body });

    if (result === null) throw new Error('Internal Server Error');

    return result;
  }
}
