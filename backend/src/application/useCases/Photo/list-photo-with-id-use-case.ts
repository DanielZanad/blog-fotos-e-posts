import { Photo } from '../../../domain/entities/Photo';
import { PhotoRepository } from '../../repositories/photos-repository';

export interface ListPhotoWithIdRequest {
  id: string;
}

export class ListPhotoWithIdUseCase {
  constructor(private photoRepository: PhotoRepository) {}

  async execute(request: ListPhotoWithIdRequest): Promise<Photo> {
    const { id } = request;

    const result = await this.photoRepository.listPhotoById(id);

    if (result === null) throw new Error('Internal Server Error');

    return result;
  }
}
