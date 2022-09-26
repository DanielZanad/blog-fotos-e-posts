import { Photo } from '../../../domain/entities/Photo';
import { PhotoRepository } from '../../repositories/photos-repository';

export interface DeletePhotoWithIdRequest {
  id: string;
}

export class DeletePhotoWithIdUseCase {
  constructor(private photoRepository: PhotoRepository) {}

  async execute(request: DeletePhotoWithIdRequest): Promise<Photo> {
    const { id } = request;

    if (!id) throw new Error('Id is missing');

    const result = await this.photoRepository.deletePhotoById(id);

    if (result === null) throw new Error('Internal Server Error');

    return result;
  }
}
