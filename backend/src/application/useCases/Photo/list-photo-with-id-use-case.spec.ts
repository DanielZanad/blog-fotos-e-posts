import { ListPhotoWithIdUseCase } from './list-photo-with-id-use-case';
import { InMemoryPhotoRepository } from '../../../../test/repositories/in-memory-photos-repository';

const listPhotoWithIdSpy = jest.fn();

const listPhotoWithId = new ListPhotoWithIdUseCase({
  listPhotoById: listPhotoWithIdSpy,
  listAllPhotos: jest.fn(),
  editPhotoById: jest.fn(),
  deletePhotoById: jest.fn(),
  create: jest.fn(),
});

describe('List photo with id', () => {
  it('should be able to list a photo with an id', async () => {
    const listPhotoWithIdInMemory = new InMemoryPhotoRepository();

    const sut = new ListPhotoWithIdUseCase(listPhotoWithIdInMemory);

    const response = sut.execute({
      id: '123',
    });

    await expect(
      listPhotoWithId.execute({
        id: '123',
      }),
    ).resolves.not.toThrow();

    expect(listPhotoWithIdSpy).toBeCalled();
    expect(response).toBeTruthy();
  });

  it('should not be to list a photo with an invalid id', async () => {
    const listPhotoWithIdInMemory = new InMemoryPhotoRepository();

    const sut = new ListPhotoWithIdUseCase(listPhotoWithIdInMemory);

    await expect(
      sut.execute({
        id: '321',
      }),
    ).rejects.toThrow();

    await expect(
      listPhotoWithId.execute({
        id: '123',
      }),
    ).resolves.not.toThrow();

    expect(listPhotoWithIdSpy).toBeCalled();
  });

  it('should not be possible to create a new photo wihout an id', async () => {
    const listPhotoWithIdInMemory = new InMemoryPhotoRepository();

    const sut = new ListPhotoWithIdUseCase(listPhotoWithIdInMemory);

    await expect(
      sut.execute({
        id: '',
      }),
    ).rejects.toThrow();
  });
});
