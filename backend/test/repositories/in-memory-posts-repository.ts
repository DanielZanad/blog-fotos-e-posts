import {
  PostCreateData,
  PostEditData,
  PostRepository,
} from '../../src/application/repositories/posts-repository';
import { Post } from '../../src/domain/entities/Post';

export class InMemoryPostRepository implements PostRepository {
  public items: Post[] = [];

  async create(data: PostCreateData): Promise<Post | null> {
    this.items.push(Post.create(data));

    return this.items[0];
  }
  async editPostById(data: PostEditData): Promise<Post | null> {
    this.items.push(
      Post.create({ id: '123', title: data.title, body: data.body }),
    );
    const post = this.items.find((post) => post.props.id === data.id);

    if (!post) {
      return null;
    }

    return post;
  }
  async listAllPosts(): Promise<Post[] | null> {
    this.items.push(
      Post.create({ id: '123', title: 'test 1 title', body: 'test 1 body' }),
    );
    this.items.push(
      Post.create({ id: '321', title: 'test 2 title', body: 'test 2 body' }),
    );
    this.items.push(
      Post.create({ id: '213', title: 'test 3 title', body: 'test 3 body' }),
    );
    return this.items;
  }
  async listPostById(id: string): Promise<Post | null> {
    this.items.push(
      Post.create({ id: '123', title: 'test 1 title', body: 'test 1 body' }),
    );
    const post = this.items.find((post) => post.props.id === id);

    if (!post) {
      return null;
    }

    return post;
  }
  async deletePostById(id: string): Promise<Post | null> {
    this.items.push(
      Post.create({ id: '123', title: 'test 1 title', body: 'test 1 body' }),
    );
    this.items.push(
      Post.create({ id: '321', title: 'test 2 title', body: 'test 2 body' }),
    );

    const post = this.items.find((post) => post.props.id === id);

    if (!post) {
      return null;
    }
    return this.items.filter((post) => post.props.id === id)[0];
  }
}
