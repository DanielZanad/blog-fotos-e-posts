import { DeletePostWithIdUseCase } from './delete-post-with-id-use-case';
import { InMemoryPostRepository } from '../../../../test/repositories/in-memory-posts-repository';

const deletePostWithIdSpy = jest.fn();

const deletePostWithId = new DeletePostWithIdUseCase({
  create: jest.fn(),
  deletePostById: deletePostWithIdSpy,
  editPostById: jest.fn(),
  listAllPosts: jest.fn(),
  listPostById: jest.fn(),
});

describe('Delete post with id', () => {
  it('should be able to delete a post with id', async () => {
    const deletePostWithIdInMemory = new InMemoryPostRepository();

    const sut = new DeletePostWithIdUseCase(deletePostWithIdInMemory);

    const response = sut.execute({
      id: '123',
    });

    await expect(
      deletePostWithId.execute({
        id: '123',
      }),
    ).resolves.not.toThrow();

    expect(deletePostWithIdSpy).toBeCalled();
    expect(response).toBeTruthy();
  });

  it('should not be able to delete a post with an invalid id', async () => {
    const deletePostWithIdInMemory = new InMemoryPostRepository();

    const sut = new DeletePostWithIdUseCase(deletePostWithIdInMemory);

    await expect(
      sut.execute({
        id: '',
      }),
    ).rejects.toThrow();

    await expect(
      deletePostWithId.execute({
        id: '123',
      }),
    ).resolves.not.toThrow();

    expect(deletePostWithIdSpy).toBeCalled();
  });

  it('should not be able to delete a post without an id', async () => {
    const deletePostWithIdInMemory = new InMemoryPostRepository();

    const sut = new DeletePostWithIdUseCase(deletePostWithIdInMemory);

    await expect(
      sut.execute({
        id: '',
      }),
    ).rejects.toThrow();
  });
});
