import { Photo } from '../../../domain/entities/Photo';
import { prisma } from '../../../prisma/prisma';
import {
  PhotoCreateData,
  PhotoEditData,
  PhotoRepository,
} from '../photos-repository';

export class PrismaPhotoRepository implements PhotoRepository {
  async create({
    title,
    url,
    thumbnail_url,
  }: PhotoCreateData): Promise<Photo | null> {
    const result = await prisma.photo.create({
      data: {
        title,
        url,
        thumbnail_url,
      },
    });

    return Photo.create(result);
  }
  async listAllPhotos(): Promise<Photo[] | null> {
    const photos = await prisma.photo.findMany();
    const result: Array<Photo> = [];
    photos.forEach((photo) => {
      result.push(Photo.create(photo));
    });

    return result;
  }
  async listPhotoById(id: string): Promise<Photo | null> {
    const result = await prisma.photo.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return Photo.create(result);
  }
  async editPhotoById({
    id,
    title,
    url,
    thumbnail_url,
  }: PhotoEditData): Promise<Photo | null> {
    const result = await prisma.photo.update({
      where: {
        id,
      },
      data: {
        title,
        url,
        thumbnail_url,
      },
    });

    return Photo.create(result);
  }
  async deletePhotoById(id: string): Promise<Photo | null> {
    const result = await prisma.photo.delete({
      where: {
        id,
      },
    });

    return Photo.create(result);
  }
}
