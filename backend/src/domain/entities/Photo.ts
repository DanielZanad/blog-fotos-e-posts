import { Entity } from '../../core/domain/Entity';

export type PhotoProps = {
  id?: string;
  title: string;
  url: string;
  thumbnail_url: string;
};

export class Photo extends Entity<PhotoProps> {
  private constructor(props: PhotoProps) {
    super(props);
  }

  static create(props: PhotoProps) {
    const photo = new Photo(props);

    return photo;
  }
}
