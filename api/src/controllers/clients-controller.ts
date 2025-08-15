import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import type { Request, Response } from 'express';
import { z } from 'zod';

class ClientsController {
  async index(_: Request, response: Response) {
    const clients = await prisma.user.findMany({
      where: {
        role: 'CLIENT',
      },
      select: {
        name: true,
        email: true,
        id: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    response.status(200).json({
      clients,
    });
  }

  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const client = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
      },
    });

    response.status(200).json(client);
  }

  async update(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(2, { message: 'Nome é obrigatório' })
        .optional(),
      email: z
        .string()
        .trim()
        .email({ message: 'E-mail inválido' })
        .toLowerCase()
        .optional(),
    });

    const { id } = paramsSchema.parse(request.params);

    const { email, name } = bodySchema.parse(request.body);

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
      },
    });

    response.status(201).json();
  }

  async delete(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    if (request.user?.role === 'CLIENT') {
      if (request.user.id !== id) {
        throw new AppError('Cliente só pode deletar a própria conta');
      }
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    response.status(200).json();
  }
}

export { ClientsController };
