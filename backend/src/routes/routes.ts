import { Post, Photo } from '@prisma/client';
import { Router } from 'express';
import { prisma } from '../prisma/prisma';

export const routes = Router();

// Posts
routes.post('/posts', async (req, res) => {
  const { title, body } = req.body;

  const result: Post = await prisma.post.create({
    data: {
      title,
      body,
    },
  });

  return res.status(201).json({ data: result });
});

routes.get('/posts', async (req, res) => {
  const result: Array<Post> = await prisma.post.findMany();

  return res.status(200).json({ data: result });
});

routes.get('/posts/:id', async (req, res) => {
  const { id } = req.params;

  const result: Post = await prisma.post.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return res.status(200).json({ data: result });
});

routes.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  const result: Post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      body,
    },
  });

  return res.status(200).json({ data: result });
});

routes.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const result: Post = await prisma.post.delete({
    where: {
      id,
    },
  });

  return res.status(200).json({ data: result });
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
