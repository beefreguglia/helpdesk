import { prisma } from '@/database/prisma';
import type { Request, Response } from 'express';
import { z } from 'zod';

class ServicesController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      title: z.string().trim().min(2, { message: 'Título é obrigatório' }),
      price: z.number().min(1, { message: 'Valor é obrigatório' }),
    });

    const { price, title } = bodySchema.parse(request.body);

    await prisma.service.create({
      data: {
        price,
        title,
      },
    });

    response.status(201).json();
  }

  // async index(_: Request, response: Response) {
  //   const services = await prisma.user.findMany({
  //     where: {
  //       role: 'CLIENT',
  //     },
  //     select: {
  //       name: true,
  //       email: true,
  //       id: true,
  //     },
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //   });

  //   response.status(200).json({
  //     services,
  //   });
  // }

  // async show(request: Request, response: Response) {
  //   const paramsSchema = z.object({
  //     id: z.string().uuid(),
  //   });

  //   const { id } = paramsSchema.parse(request.params);

  //   const client = await prisma.user.findUnique({
  //     where: {
  //       id,
  //     },
  //     select: {
  //       email: true,
  //       name: true,
  //     },
  //   });

  //   response.status(200).json(client);
  // }

  // async update(request: Request, response: Response) {
  //   const paramsSchema = z.object({
  //     id: z.string().uuid(),
  //   });

  //   const bodySchema = z.object({
  //     name: z
  //       .string()
  //       .trim()
  //       .min(2, { message: 'Nome é obrigatório' })
  //       .optional(),
  //     email: z
  //       .string()
  //       .trim()
  //       .email({ message: 'E-mail inválido' })
  //       .toLowerCase()
  //       .optional(),
  //   });

  //   const { id } = paramsSchema.parse(request.params);

  //   const { email, name } = bodySchema.parse(request.body);

  //   await prisma.user.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       email,
  //       name,
  //     },
  //   });

  //   response.status(201).json();
  // }

  // async delete(request: Request, response: Response) {
  //   const paramsSchema = z.object({
  //     id: z.string().uuid(),
  //   });

  //   const { id } = paramsSchema.parse(request.params);

  //   await prisma.user.delete({
  //     where: {
  //       id,
  //     },
  //   });

  //   response.status(200).json();
  // }
}

export { ServicesController };
