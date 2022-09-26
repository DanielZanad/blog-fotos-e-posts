import { DeletePhotoWithIdUseCase } from './delete-photo-with-id-use-case';
import { InMemoryPhotoRepository } from '../../../../test/repositories/in-memory-photos-repository';

const deletePhotoWithIdSpy = jest.fn();

const deletePhotoWithId = new DeletePhotoWithIdUseCase({
  deletePhotoById: deletePhotoWithIdSpy,
  create: jest.fn(),
  editPhotoById: jest.fn(),
  listAllPhotos: jest.fn(),
  listPhotoById: jest.fn(),
});

describe('Delete photo with id', () => {
  it('should delete a photo with id', async () => {
    const deletePhotoWithIdInMemory = new InMemoryPhotoRepository();

    const sut = new DeletePhotoWithIdUseCase(deletePhotoWithIdInMemory);

    const response = sut.execute({
      id: '123',
    });

    await expect(
      deletePhotoWithId.execute({
        id: '123',
      }),
    ).resolves.not.toThrow();

    expect(deletePhotoWithIdSpy).toBeCalled();
    expect(response).toBeTruthy();
  });

  it('should not be able to delete a photo with an invalid id', async () => {
    const deletePhotoWithIdInMemory = new InMemoryPhotoRepository();

    const sut = new DeletePhotoWithIdUseCase(deletePhotoWithIdInMemory);

    await expect(
      sut.execute({
        id: '890',
      }),
    ).rejects.toThrow();

    await expect(
      deletePhotoWithId.execute({
        id: '123',
      }),
    ).resolves.not.toThrow();

    expect(deletePhotoWithIdSpy).toBeCalled();
  });

  it('should not be able to delete a photo without an id', async () => {
    const deletePhotoWithIdInMemory = new InMemoryPhotoRepository();

    const sut = new DeletePhotoWithIdUseCase(deletePhotoWithIdInMemory);

    await expect(
      sut.execute({
        id: '',
      }),
    ).rejects.toThrow();
  });
});
