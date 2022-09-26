import { EditPhotoWithIdUseCase } from './edit-photo-with-id-use-case';
import { InMemoryPhotoRepository } from '../../../../test/repositories/in-memory-photos-repository';

const editPhotoWithIdSpy = jest.fn();

const editPhotoWithId = new EditPhotoWithIdUseCase({
  editPhotoById: editPhotoWithIdSpy,
  deletePhotoById: jest.fn(),
  create: jest.fn(),
  listAllPhotos: jest.fn(),
  listPhotoById: jest.fn(),
});

describe('Edit a photo', () => {
  it('should be able to edit a photo with an id', async () => {
    const editPhotoWithIdInMemory = new InMemoryPhotoRepository();

    const sut = new EditPhotoWithIdUseCase(editPhotoWithIdInMemory);

    const response = await sut.execute({
      id: '123',
      title: 'test edit title',
      url: 'test edit url',
      thumbnail_url: 'test edit thumbnail_url',
    });

    await expect(
      editPhotoWithId.execute({
        id: '123',
        title: 'test edit title',
        url: 'test edit url',
        thumbnail_url: 'test edit thumbnail_url',
      }),
    ).resolves.not.toThrow();

    expect(editPhotoWithIdSpy).toBeCalled();
    expect(response).toBeTruthy();
  });

  it('should not be able to edit a photo with an invalid id', async () => {
    const editPhotoWithIdInMemory = new InMemoryPhotoRepository();

    const sut = new EditPhotoWithIdUseCase(editPhotoWithIdInMemory);

    await expect(
      sut.execute({
        id: '321',
        title: 'test edit title',
        url: 'test edit url',
        thumbnail_url: 'test edit thumbnail_url',
      }),
    ).rejects.toThrow();

    await expect(
      editPhotoWithId.execute({
        id: '321',
        title: 'test edit title',
        url: 'test edit url',
        thumbnail_url: 'test edit thumbnail_url',
      }),
    ).resolves.not.toThrow();

    expect(editPhotoWithIdSpy).toBeCalled();
  });

  it('should not be possible to create a new photo wihout an id', async () => {
    const editPhotoWithIdInMemory = new InMemoryPhotoRepository();

    const sut = new EditPhotoWithIdUseCase(editPhotoWithIdInMemory);

    await expect(
      sut.execute({
        id: '',
        title: 'test title',
        url: 'test url',
        thumbnail_url: 'test thumbnail_url',
      }),
    ).rejects.toThrow();
  });

  it('should not be possible to create a new photo wihout a title', async () => {
    const editPhotoWithIdInMemory = new InMemoryPhotoRepository();

    const sut = new EditPhotoWithIdUseCase(editPhotoWithIdInMemory);

    await expect(
      sut.execute({
        id: '123',
        title: '',
        url: 'test url',
        thumbnail_url: 'test thumbnail_url',
      }),
    ).rejects.toThrow();
  });

  it('should not be possible to create a new photo wihout an url', async () => {
    const editPhotoWithIdInMemory = new InMemoryPhotoRepository();

    const sut = new EditPhotoWithIdUseCase(editPhotoWithIdInMemory);

    await expect(
      sut.execute({
        id: '123',
        title: 'test title',
        url: '',
        thumbnail_url: 'test thumbnail_url',
      }),
    ).rejects.toThrow();
  });

  it('should not be possible to create a new photo wihout a thumbnail_url', async () => {
    const editPhotoWithIdInMemory = new InMemoryPhotoRepository();

    const sut = new EditPhotoWithIdUseCase(editPhotoWithIdInMemory);

    await expect(
      sut.execute({
        id: '123',
        title: 'test title',
        url: 'test url',
        thumbnail_url: '',
      }),
    ).rejects.toThrow();
  });
});
