import { Photo } from '../../domain/entities/Photo';

export interface PhotoCreateData {
  title: string;
  url: string;
  thumbnail_url: string;
}

export interface PhotoEditData {
  id: string;
  title: string;
  url: string;
  thumbnail_url: string;
}

export interface PhotoRepository {
  create(data: PhotoCreateData): Promise<Photo | null>;
  getAllPosts(): Promise<Array<Photo> | null>;
  getPostById(id: string): Promise<Photo | null>;
  editPostById(data: PhotoEditData): Promise<Photo | null>;
  deletePostById(id: string): Promise<Photo | null>;
}
