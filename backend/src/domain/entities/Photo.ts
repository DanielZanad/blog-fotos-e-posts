import { Entity } from '../../core/domain/Entity';

type PhotoProps = {
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
