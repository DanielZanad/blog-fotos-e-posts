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
  getAllPhotos(): Promise<Array<Photo> | null>;
  getPhotoById(id: string): Promise<Photo | null>;
  editPhotoById(data: PhotoEditData): Promise<Photo | null>;
  deletePhotoById(id: string): Promise<Photo | null>;
}
