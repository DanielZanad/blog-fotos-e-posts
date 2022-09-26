import { Photo } from '../../../domain/entities/Photo';
import { PhotoRepository } from '../../repositories/photos-repository';

export interface CreatePhotoUseCaseRequest {
  title: string;
  url: string;
  thumbnail_url: string;
}

export class CreatePhotoUseCase {
  constructor(private photoRepository: PhotoRepository) {}

  async execute(request: CreatePhotoUseCaseRequest): Promise<Photo> {
    const { title, url, thumbnail_url } = request;

    if (!title) throw new Error('title is missing');
    if (!url) throw new Error('url is missing');
    if (!thumbnail_url) throw new Error('thumbnail_url is missing');

    const result = await this.photoRepository.create({
      title,
      url,
      thumbnail_url,
    });

    if (result === null) throw new Error('Internal Server Error');

    return result;
  }
}
