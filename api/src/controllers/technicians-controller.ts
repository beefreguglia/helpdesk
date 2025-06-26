import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { hash } from 'bcrypt';
import type { Request, Response } from 'express';
import { z } from 'zod';

class TechniciansController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2, { message: 'Nome é obrigatório' }),
      email: z
        .string()
        .trim()
        .email({ message: 'E-mail inválido' })
        .toLowerCase(),
      password: z
        .string()
        .min(6, { message: 'A senha deve ter pelo menos 6 dígitos' }),
      availability: z.array(z.string()),
    });

    const { email, name, password, availability } = bodySchema.parse(
      request.body,
    );

    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });

    if (userWithSameEmail) {
      throw new AppError('Já existe um usuário cadastrado com esse e-mail');
    }

    const hashedPassword = await hash(password, 8);

    const { id } = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'TECHNICIAN',
      },
    });

    const parsedAvailability = JSON.stringify(availability);

    await prisma.technician.create({
      data: { userId: id, availability: parsedAvailability },
    });

    response.status(201).json();
  }

  async index(_: Request, response: Response) {
    const technicians = await prisma.technician.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    response.status(200).json({
      technicians: technicians.map((technician) => ({
        id: technician.user.id,
        name: technician.user.name,
        email: technician.user.email,
        availability: JSON.parse(technician.availability),
      })),
    });
  }

  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const technician = await prisma.technician.findUnique({
      where: {
        userId: id,
      },
      include: {
        user: true,
      },
    });

    if (!technician) {
      throw new AppError('Técnico não encontrado', 404);
    }

    response.status(200).json({
      id: technician.user.id,
      name: technician.user.name,
      email: technician.user.email,
      availability: JSON.parse(technician.availability),
    });
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
      availability: z.array(z.string()).optional(),
    });

    const { id } = paramsSchema.parse(request.params);

    const { email, name, availability } = bodySchema.parse(request.body);

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
      },
    });

    const parsedAvailability = JSON.stringify(availability);

    await prisma.technician.update({
      where: {
        userId: id,
      },
      data: { availability: parsedAvailability },
    });

    response.status(200).json();
  }
}

export { TechniciansController };
