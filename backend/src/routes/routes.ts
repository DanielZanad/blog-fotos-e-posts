import { Router } from 'express';
import { PrismaPhotoRepository } from '../application/repositories/prisma/prisma-photo-repository';
import { PrismaPostRepository } from '../application/repositories/prisma/prisma-post-repository';
import { CreatePhotoUseCase } from '../application/useCases/Photo/create-photo-use-case';
import { DeletePhotoWithIdUseCase } from '../application/useCases/Photo/delete-photo-with-id-use-case';
import { EditPhotoWithIdUseCase } from '../application/useCases/Photo/edit-photo-with-id-use-case';
import { ListAllPhotosUseCase } from '../application/useCases/Photo/list-all-photos-use-case';
import { ListPhotoWithIdUseCase } from '../application/useCases/Photo/list-photo-with-id-use-case';
import { CreatePostUseCase } from '../application/useCases/Post/create-post-use-case';
import { DeletePostWithIdUseCase } from '../application/useCases/Post/delete-post-with-id-use-case';
import { EditPostWithIdUseCase } from '../application/useCases/Post/edit-post-with-id-use-case';
import { ListAllPostsUseCase } from '../application/useCases/Post/list-all-posts-use-case';
import { ListPostWithIdUseCase } from '../application/useCases/Post/list-post-with-id-use-case';
import { PhotoProps } from '../domain/entities/Photo';
import { PostProps } from '../domain/entities/Post';

export const routes = Router();

// Posts
routes.post('/posts', async (req, res) => {
  const { title, body } = req.body;

  const prismaPostRepository = new PrismaPostRepository();
  const createPostUseCase = new CreatePostUseCase(prismaPostRepository);

  const result = await createPostUseCase.execute({
    title,
    body,
  });

  return res.status(201).json({ data: result.props });
});

routes.get('/posts', async (req, res) => {
  const result: PostProps[] = [];

  const prismaPostRepository = new PrismaPostRepository();
  const listAllPostsUseCase = new ListAllPostsUseCase(prismaPostRepository);

  const posts = await listAllPostsUseCase.execute();

  posts.forEach((post) => {
    result.push(post.props);
  });

  return res.status(200).json({ data: result });
});

routes.get('/posts/:id', async (req, res) => {
  const { id } = req.params;

  const prismaPostRepository = new PrismaPostRepository();
  const listPostWithIdUseCase = new ListPostWithIdUseCase(prismaPostRepository);

  const result = await listPostWithIdUseCase.execute({ id });
  return res.status(200).json({ data: result.props });
});

routes.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  const prismaPostRepository = new PrismaPostRepository();

  const editPostWithIdUseCase = new EditPostWithIdUseCase(prismaPostRepository);

  const result = await editPostWithIdUseCase.execute({ id, title, body });

  return res.status(200).json({ data: result.props });
});

routes.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;

  const prismaPostRepository = new PrismaPostRepository();
  const deletePostWithIdUseCase = new DeletePostWithIdUseCase(
    prismaPostRepository,
  );

  const result = await deletePostWithIdUseCase.execute({ id });

  return res.status(200).json({ data: result.props });
});

// Photos

routes.post('/photos', async (req, res) => {
  const { title, url, thumbnail_url } = req.body;

  const prismaPhotoRepository = new PrismaPhotoRepository();
  const createPhotoUseCase = new CreatePhotoUseCase(prismaPhotoRepository);

  const result = await createPhotoUseCase.execute({
    title,
    url,
    thumbnail_url,
  });

  return res.status(201).json({ data: result.props });
});

routes.get('/photos', async (req, res) => {
  const result: PhotoProps[] = [];

  const prismaPhotoRepository = new PrismaPhotoRepository();
  const listAllPhotosUseCase = new ListAllPhotosUseCase(prismaPhotoRepository);

  const photos = await listAllPhotosUseCase.execute();
  photos.forEach((photo) => {
    result.push(photo.props);
  });

  return res.status(200).json({ data: result });
});

routes.get('/photos/:id', async (req, res) => {
  const { id } = req.params;

  const prismaPhotoRepository = new PrismaPhotoRepository();
  const listPhotoWithIdUseCase = new ListPhotoWithIdUseCase(
    prismaPhotoRepository,
  );

  const result = await listPhotoWithIdUseCase.execute({ id });

  return res.status(200).json({ data: result.props });
});

routes.put('/photos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, url, thumbnail_url } = req.body;

  const prismaPhotoRepository = new PrismaPhotoRepository();
  const editPhotoWithIdUseCase = new EditPhotoWithIdUseCase(
    prismaPhotoRepository,
  );

  const result = await editPhotoWithIdUseCase.execute({
    id,
    title,
    url,
    thumbnail_url,
  });

  return res.status(200).json({ data: result.props });
});

routes.delete('/photos/:id', async (req, res) => {
  const { id } = req.params;

  const prismaPhotoRepository = new PrismaPhotoRepository();
  const deletePhotoWithIdUseCase = new DeletePhotoWithIdUseCase(
    prismaPhotoRepository,
  );

  const result = await deletePhotoWithIdUseCase.execute({ id });

  return res.status(200).json({ data: result.props });
});
