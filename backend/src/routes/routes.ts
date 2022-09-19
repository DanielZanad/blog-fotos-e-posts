import { Router } from 'express';
import { prisma } from '../prisma/prisma';

export const routes = Router();

routes.post('/posts', async (req, res) => {
  const { title, body } = req.body;

  const result = await prisma.post.create({
    data: {
      title,
      body,
    },
  });

  return res.status(201).json({ data: result });
});

routes.get('/posts', async (req, res) => {
  const result = await prisma.post.findMany();

  return res.status(200).json({ data: result });
});

routes.get('/posts/:id', async (req, res) => {
  const { id } = req.params;

  const result = await prisma.post.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return res.status(200).json({ data: result });
});

routes.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  const result = await prisma.post.update({
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
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });

  return res.status(200).json({ data: result });
});
