import { Post } from '../../domain/entities/Post';

export interface PostCreateData {
  title: string;
  body: string;
}

export interface PostEditData {
  id: string;
  title: string;
  body: string;
}

export interface PostRepository {
  create(data: PostCreateData): Promise<Post | null>;
  listAllPosts(): Promise<Array<Post> | null>;
  listPostById(id: string): Promise<Post | null>;
  editPostById(data: PostEditData): Promise<Post | null>;
  deletePostById(id: string): Promise<Post | null>;
}
