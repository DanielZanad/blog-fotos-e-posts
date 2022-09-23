import { CreatePostUseCase } from './create-post-use-case';
import { InMemoryPostRepository } from '../../../../test/repositories/in-memory-posts-repository';

const createPostSpy = jest.fn();

const createPost = new CreatePostUseCase({
  create: createPostSpy,
  deletePostById: jest.fn(),
  editPostById: jest.fn(),
  listAllPosts: jest.fn(),
  listPostById: jest.fn(),
});

describe('Create a post', () => {
  it('should be able to create a new post', async () => {
    const createPostInMemory = new InMemoryPostRepository();

    const sut = new CreatePostUseCase(createPostInMemory);

    const response = await sut.execute({
      title: 'test title',
      body: 'test body',
    });

    await expect(
      createPost.execute({
        title: 'test title',
        body: 'test body',
      }),
    ).resolves.not.toThrow();

    expect(createPostSpy).toBeCalled();
    expect(response).toBeTruthy();
  });

  it('should not be possible to create a new post without title', async () => {
    const createPost = new InMemoryPostRepository();

    const sut = new CreatePostUseCase(createPost);

    await expect(
      sut.execute({
        title: '',
        body: 'test body',
      }),
    ).rejects.toThrow();
  });

  it('should not be possible to create a new post without body', async () => {
    const createPost = new InMemoryPostRepository();

    const sut = new CreatePostUseCase(createPost);

    await expect(
      sut.execute({
        title: 'test title',
        body: '',
      }),
    ).rejects.toThrow();
  });
});
