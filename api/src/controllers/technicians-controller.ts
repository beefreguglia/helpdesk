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
}

export { TechniciansController };
