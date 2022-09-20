import { Photo } from '@prisma/client';
import { Router } from 'express';
import { PrismaPostRepository } from '../application/repositories/prisma/prisma-post-repository';
import { CreatePostUseCase } from '../application/useCases/Post/create-post-use-case';
import { DeletePostWithIdUseCase } from '../application/useCases/Post/delete-post-with-id';
import { EditPostWithIdUseCase } from '../application/useCases/Post/edit-post-with-id-use-case';
import { ListAllPostsUseCase } from '../application/useCases/Post/list-all-posts-use-case';
import { ListPostWithIdUseCase } from '../application/useCases/Post/list-post-with-id-use-case';
import { PostProps } from '../domain/entities/Post';

import { prisma } from '../prisma/prisma';

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

  const result: Photo = await prisma.photo.create({
    data: {
      title,
      url,
      thumbnail_url,
    },
  });

  return res.status(201).json({ data: result });
});

routes.get('/photos', async (req, res) => {
  const result: Array<Photo> = await prisma.photo.findMany();

  return res.status(200).json({ data: result });
});

routes.get('/photos/:id', async (req, res) => {
  const { id } = req.params;

  const result: Photo = await prisma.photo.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return res.status(200).json({ data: result });
});

routes.put('/photos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, url, thumbnail_url } = req.body;

  const result: Photo = await prisma.photo.update({
    where: {
      id,
    },
    data: {
      title,
      url,
      thumbnail_url,
    },
  });

  return res.status(200).json({ data: result });
});

routes.delete('/photos/:id', async (req, res) => {
  const { id } = req.params;
  const result: Photo = await prisma.photo.delete({
    where: {
      id,
    },
  });

  return res.status(200).json({ data: result });
});
