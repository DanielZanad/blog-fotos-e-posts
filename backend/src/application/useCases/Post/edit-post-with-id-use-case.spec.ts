import { EditPostWithIdUseCase } from './edit-post-with-id-use-case';
import { InMemoryPostRepository } from '../../../../test/repositories/in-memory-posts-repository';

const editPostByIdSpy = jest.fn();

const editPostById = new EditPostWithIdUseCase({
  create: jest.fn(),
  editPostById: editPostByIdSpy,
  deletePostById: jest.fn(),
  listAllPosts: jest.fn(),
  listPostById: jest.fn(),
});

describe('Edit a post', () => {
  it('shoud be able to edit a post with id', async () => {
    const editPostWithIdInMemory = new InMemoryPostRepository();

    const sut = new EditPostWithIdUseCase(editPostWithIdInMemory);

    const response = await sut.execute({
      id: '123',
      title: 'test edit title',
      body: 'test edit body',
    });

    await expect(
      editPostById.execute({
        id: '123',
        title: 'test edit title',
        body: 'test edit body',
      }),
    ).resolves.not.toThrow;

    expect(editPostByIdSpy).toBeCalled();
    expect(response).toBeTruthy();
  });

  it('shoud not be able to edit a post with an invalid id', async () => {
    const editPostWithIdInMemory = new InMemoryPostRepository();

    const sut = new EditPostWithIdUseCase(editPostWithIdInMemory);

    await expect(
      sut.execute({
        id: '321',
        title: 'test edit title',
        body: 'test edit body',
      }),
    ).rejects.toThrow();

    await expect(
      editPostById.execute({
        id: '123',
        title: 'test edit title',
        body: 'test edit body',
      }),
    ).resolves.not.toThrow();
    expect(editPostByIdSpy).toBeCalled();
  });

  it('should not be able to edit a post without an id', async () => {
    const editPost = new InMemoryPostRepository();

    const sut = new EditPostWithIdUseCase(editPost);

    await expect(
      sut.execute({
        id: '',
        title: 'test edit title',
        body: 'test edit body',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to edit a post without a title', async () => {
    const editPost = new InMemoryPostRepository();

    const sut = new EditPostWithIdUseCase(editPost);

    await expect(
      sut.execute({
        id: '123',
        title: '',
        body: 'test edit body',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to edit a post without a body', async () => {
    const editPost = new InMemoryPostRepository();

    const sut = new EditPostWithIdUseCase(editPost);

    await expect(
      sut.execute({
        id: '123',
        title: 'test edit title',
        body: '',
      }),
    ).rejects.toThrow();
  });
});
