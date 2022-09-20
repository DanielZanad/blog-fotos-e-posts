import { Entity } from '../../core/domain/Entity';

export type PostProps = {
  id?: string;
  title: string;
  body: string;
};

export class Post extends Entity<PostProps> {
  private constructor(props: PostProps) {
    super(props);
  }

  static create(props: PostProps) {
    const post = new Post(props);

    return post;
  }
}
