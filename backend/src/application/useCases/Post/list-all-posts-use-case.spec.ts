import { ListAllPostsUseCase } from './list-all-posts-use-case';
import { InMemoryPostRepository } from '../../../../test/repositories/in-memory-posts-repository';

const listAllPostsSpy = jest.fn();

const listAllPosts = new ListAllPostsUseCase({
  create: jest.fn(),
  deletePostById: jest.fn(),
  editPostById: jest.fn(),
  listAllPosts: listAllPostsSpy,
  listPostById: jest.fn(),
});

describe('List all posts', () => {
  it('should be able to list all posts', async () => {
    const listAllPostsInMemory = new InMemoryPostRepository();

    const sut = new ListAllPostsUseCase(listAllPostsInMemory);

    const response = sut.execute();

    await expect(listAllPosts.execute()).resolves.not.toThrow;

    expect(listAllPostsSpy).toBeCalled();
    expect(response).toBeTruthy();
  });
});
