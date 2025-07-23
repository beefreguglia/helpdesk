import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { UserRole } from '@prisma/client';
import { hash } from 'bcrypt';
import type { Request, Response } from 'express';
import { z } from 'zod';

class UsersController {
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
      role: z
        .enum([UserRole.ADMIN, UserRole.CLIENT, UserRole.TECHNICIAN])
        .default(UserRole.CLIENT),
    });

    const { email, name, password, role } = bodySchema.parse(request.body);

    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });

    if (userWithSameEmail) {
      throw new AppError('Já existe um usuário cadastrado com esse e-mail');
    }

    const hashedPassword = await hash(password, 8);

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
      },
    });

    response.status(201).json();
  }

  async update(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const bodySchema = z.object({
      name: z.string().trim().optional(),
      email: z.string().optional(),
    });

    const { id } = paramsSchema.parse(request.params);

    const { email, name } = bodySchema.parse(request.body);

    if (email) {
      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (userWithSameEmail) {
        throw new AppError('E-mail já utilizado!', 500);
      }
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
    });

    response.status(200).json();
  }
}

export { UsersController };
