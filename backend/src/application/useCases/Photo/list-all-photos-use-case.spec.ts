import { ListAllPhotosUseCase } from './list-all-photos-use-case';
import { InMemoryPhotoRepository } from '../../../../test/repositories/in-memory-photos-repository';

const listAllPhotosSpy = jest.fn();

const listAllPhotos = new ListAllPhotosUseCase({
  listAllPhotos: listAllPhotosSpy,
  editPhotoById: jest.fn(),
  deletePhotoById: jest.fn(),
  create: jest.fn(),
  listPhotoById: jest.fn(),
});

describe('List all photos', () => {
  it('should be able to list all photos', async () => {
    // Prepare
    const listAllPhotosInMemory = new InMemoryPhotoRepository();
    const sut = new ListAllPhotosUseCase(listAllPhotosInMemory);

    // Act
    const response = sut.execute();
    await expect(listAllPhotos.execute()).resolves.not.toThrow();

    // Assert
    expect(listAllPhotosSpy).toBeCalled();
    expect(response).toBeTruthy();
  });
});
