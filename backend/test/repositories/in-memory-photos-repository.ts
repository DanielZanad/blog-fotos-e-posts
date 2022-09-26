import {
  PhotoCreateData,
  PhotoEditData,
  PhotoRepository,
} from '../../src/application/repositories/photos-repository';
import { Photo } from '../../src/domain/entities/Photo';

export class InMemoryPhotoRepository implements PhotoRepository {
  public items: Array<Photo> = [];
  async create(data: PhotoCreateData): Promise<Photo | null> {
    this.items.push(Photo.create(data));

    return this.items[0];
  }
  async listAllPhotos(): Promise<Photo[] | null> {
    this.items.push(
      Photo.create({
        id: '123',
        title: 'test 1 title',
        url: 'test 1 url',
        thumbnail_url: 'test 1 thumbnail_url',
      }),
    );

    this.items.push(
      Photo.create({
        id: '321',
        title: 'test 2 title',
        url: 'test 2 url',
        thumbnail_url: 'test 2 thumbnail_url',
      }),
    );

    this.items.push(
      Photo.create({
        id: '213',
        title: 'test 3 title',
        url: 'test 3 url',
        thumbnail_url: 'test 3 thumbnail_url',
      }),
    );

    return this.items;
  }
  async listPhotoById(id: string): Promise<Photo | null> {
    this.items.push(
      Photo.create({
        id: '123',
        title: 'test 1 title',
        url: 'test 1 url',
        thumbnail_url: 'test 1 thumbnail_url',
      }),
    );

    const photo = this.items.find((photo) => photo.props.id === id);

    return !photo ? null : photo;
  }
  async editPhotoById(data: PhotoEditData): Promise<Photo | null> {
    this.items.push(
      Photo.create({
        id: '123',
        title: data.title,
        url: data.url,
        thumbnail_url: data.thumbnail_url,
      }),
    );

    const photo = this.items.find((photo) => photo.props.id === data.id);

    return !photo ? null : photo;
  }
  async deletePhotoById(id: string): Promise<Photo | null> {
    this.items.push(
      Photo.create({
        id: '123',
        title: 'test 1 title',
        url: 'test 1 url',
        thumbnail_url: 'test 1 thumbnail_url',
      }),
    );

    this.items.push(
      Photo.create({
        id: '321',
        title: 'test 2 title',
        url: 'test 2 url',
        thumbnail_url: 'test 2 thumbnail_url',
      }),
    );

    const photo = this.items.find((photo) => photo.props.id === id);

    return !photo
      ? null
      : this.items.filter((photo) => photo.props.id === id)[0];
  }
}
