import { Photo } from '../../../domain/entities/Photo';
import { PhotoRepository } from '../../repositories/photos-repository';

export class ListAllPhotosUseCase {
  constructor(private photoReposiory: PhotoRepository) {}

  async execute(): Promise<Array<Photo>> {
    const result = await this.photoReposiory.listAllPhotos();

    if (result === null) throw new Error('Internal Server Error');

    return result;
  }
}
