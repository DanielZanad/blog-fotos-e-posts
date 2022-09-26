import { Photo } from '../../../domain/entities/Photo';
import { PhotoRepository } from '../../repositories/photos-repository';

export interface EditPhotoWithIdRequest {
  id: string;
  title: string;
  url: string;
  thumbnail_url: string;
}

export class EditPhotoWithIdUseCase {
  constructor(private photoRepository: PhotoRepository) {}

  async execute(request: EditPhotoWithIdRequest): Promise<Photo> {
    const { id, title, url, thumbnail_url } = request;

    if (!id) throw new Error('id is missing');
    if (!title) throw new Error('title is missing');
    if (!url) throw new Error('url is missing');
    if (!thumbnail_url) throw new Error('thumbnail_url is missing');

    const result = await this.photoRepository.editPhotoById({
      id,
      title,
      url,
      thumbnail_url,
    });

    if (result === null) throw new Error('Internal Server Error');

    return result;
  }
}
