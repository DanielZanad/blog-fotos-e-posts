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
