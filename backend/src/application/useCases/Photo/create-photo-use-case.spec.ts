import { CreatePhotoUseCase } from './create-photo-use-case';
import { InMemoryPhotoRepository } from '../../../../test/repositories/in-memory-photos-repository';

const createPhotoSpy = jest.fn();

const createPhoto = new CreatePhotoUseCase({
  create: createPhotoSpy,
  deletePhotoById: jest.fn(),
  editPhotoById: jest.fn(),
  listAllPhotos: jest.fn(),
  listPhotoById: jest.fn(),
});

describe('Create a photo', () => {
  it('should be able to create a new photo', async () => {
    const createPhotoInMemory = new InMemoryPhotoRepository();

    const sut = new CreatePhotoUseCase(createPhotoInMemory);

    const response = await sut.execute({
      title: 'test title',
      url: 'test url',
      thumbnail_url: 'test thumbnail_url',
    });

    await expect(
      createPhoto.execute({
        title: 'test title',
        url: 'test url',
        thumbnail_url: 'test thumbnail_url',
      }),
    ).resolves.not.toThrow();

    expect(createPhotoSpy).toBeCalled();
    expect(response).toBeTruthy();
  });

  it('should not be possible to create a new photo wihout a title', async () => {
    const createPhotoInMemory = new InMemoryPhotoRepository();

    const sut = new CreatePhotoUseCase(createPhotoInMemory);

    await expect(
      sut.execute({
        title: '',
        url: 'test url',
        thumbnail_url: 'test thumbnail_url',
      }),
    ).rejects.toThrow();
  });

  it('should not be possible to create a new photo wihout an url', async () => {
    const createPhotoInMemory = new InMemoryPhotoRepository();

    const sut = new CreatePhotoUseCase(createPhotoInMemory);

    await expect(
      sut.execute({
        title: 'test title',
        url: '',
        thumbnail_url: 'test thumbnail_url',
      }),
    ).rejects.toThrow();
  });

  it('should not be possible to create a new photo wihout a thumbnail_url', async () => {
    const createPhotoInMemory = new InMemoryPhotoRepository();

    const sut = new CreatePhotoUseCase(createPhotoInMemory);

    await expect(
      sut.execute({
        title: 'test title',
        url: 'test url',
        thumbnail_url: '',
      }),
    ).rejects.toThrow();
  });
});
