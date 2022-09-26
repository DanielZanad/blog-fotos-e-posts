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
  listAllPhotos(): Promise<Array<Photo> | null>;
  listPhotoById(id: string): Promise<Photo | null>;
  editPhotoById(data: PhotoEditData): Promise<Photo | null>;
  deletePhotoById(id: string): Promise<Photo | null>;
}
