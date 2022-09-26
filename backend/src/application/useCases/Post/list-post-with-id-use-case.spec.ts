import { ListPostWithIdUseCase } from './list-post-with-id-use-case';
import { InMemoryPostRepository } from '../../../../test/repositories/in-memory-posts-repository';

const listPostWithIdSpy = jest.fn();

const listPostWithId = new ListPostWithIdUseCase({
  create: jest.fn(),
  deletePostById: jest.fn(),
  editPostById: jest.fn(),
  listAllPosts: jest.fn(),
  listPostById: listPostWithIdSpy,
});

describe('List post with id', () => {
  it('should be able to list a post with id', async () => {
    const listPostWithIdInMemory = new InMemoryPostRepository();

    const sut = new ListPostWithIdUseCase(listPostWithIdInMemory);

    const response = sut.execute({
      id: '123',
    });

    await expect(
      listPostWithId.execute({
        id: '123',
      }),
    ).resolves.not.toThrow();

    expect(listPostWithIdSpy).toBeCalled();
    expect(response).toBeTruthy();
  });

  it('should be not able to list a post with an invalid id', async () => {
    const listPostWithIdInMemory = new InMemoryPostRepository();

    const sut = new ListPostWithIdUseCase(listPostWithIdInMemory);

    await expect(
      sut.execute({
        id: '321',
      }),
    ).rejects.toThrow();

    await expect(
      listPostWithId.execute({
        id: '123',
      }),
    ).resolves.not.toThrow();

    expect(listPostWithIdSpy).toBeCalled();
  });

  it('should not be able to list a post without an id', async () => {
    const listPostWithIdInMemory = new InMemoryPostRepository();

    const sut = new ListPostWithIdUseCase(listPostWithIdInMemory);

    await expect(
      sut.execute({
        id: '',
      }),
    ).rejects.toThrow();
  });
});
