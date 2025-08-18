import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import type { Request, Response } from 'express';
import { z } from 'zod';

class CallsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      title: z.string().trim().min(2, { message: 'Título é obrigatório' }),
      description: z.string().min(1, { message: 'Descrição é obrigatório' }),
      serviceId: z.string().uuid({ message: 'Serviço inválido' }),
    });

    const { description, title, serviceId } = bodySchema.parse(request.body);

    await prisma.$transaction(async (tx) => {
      if (!request?.user?.id) {
        throw new AppError('Usuário não autenticado.', 401);
      }

      const service = await tx.service.findFirst({
        where: { id: serviceId, isActive: true },
      });

      if (!service) {
        throw new AppError('Serviço não encontrado ou está inativo.', 404);
      }

      const now = new Date();
      now.setHours(now.getHours() - 3);
      const currentTime = now.getHours().toString().padStart(2, '0') + ':00';
      const availableTechnicians = await tx.user.findMany({
        where: {
          role: 'TECHNICIAN',
          technicianProfile: {
            availability: {
              contains: `"${currentTime}"`,
            },
          },
        },
        include: {
          _count: {
            select: {
              assignedCalls: { where: { status: 'OPEN' } },
            },
          },
        },
        orderBy: {
          assignedCalls: {
            _count: 'asc',
          },
        },
      });

      if (availableTechnicians.length === 0) {
        throw new AppError('Não há técnicos disponíveis no momento.', 500);
      }

      const assignedTechnician = availableTechnicians[0];

      const createdCall = await tx.call.create({
        data: {
          title,
          description,
          status: 'OPEN',
          clientId: request.user.id,
          technicianId: assignedTechnician.id,
          callServices: {
            create: {
              serviceId: service.id,
            },
          },
        },
        include: {
          client: { select: { name: true } },
          technician: { select: { name: true } },
          callServices: { include: { service: { select: { title: true } } } },
        },
      });

      return createdCall;
    });

    response.status(201).json();
  }

  async index(request: Request, response: Response) {
    let where: { clientId?: string; technicianId?: string } = {
      clientId: request.user?.id,
      technicianId: undefined,
    };

    if (request.user?.role === 'ADMIN') {
      where = {
        clientId: undefined,
        technicianId: undefined,
      };
    }

    // if (request.user?.role === 'TECHNICIAN') {
    //   where = {
    //     clientId: undefined,
    //     technicianId: request.user.id,
    //   };
    // }

    const calls = await prisma.call.findMany({
      where,
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        status: true,
        client: {
          select: {
            name: true,
            imageName: true,
          },
        },
        technician: {
          select: {
            name: true,
            imageName: true,
          },
        },
        callServices: {
          select: {
            service: {
              select: {
                title: true,
                price: true,
              },
            },
          },
        },
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    response.status(200).json({
      calls,
    });
  }

  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const call = await prisma.call.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        client: {
          select: {
            name: true,
            imageName: true,
          },
        },
        technician: {
          select: {
            name: true,
            email: true,
            imageName: true,
          },
        },
        callServices: {
          select: {
            id: true,
            service: {
              select: {
                title: true,
                price: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    response.status(200).json(
      call
        ? {
            id: call.id,
            title: call.title,
            description: call.description,
            status: call.status,
            createdAt: call.createdAt,
            updatedAt: call.updatedAt,
            clientName: call.client.name,
            clientImageName: call.client.imageName,
            technicianName: call.technician.name,
            technicianImageName: call.technician.imageName,
            technicianEmail: call.technician.email,
            services: call.callServices.map((callService) => ({
              id: callService.id,
              service: callService.service,
            })),
          }
        : null,
    );
  }

  async start(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const call = await prisma.call.findUnique({
      where: {
        id,
      },
    });

    if (call?.technicianId !== request.user?.id) {
      throw new AppError('Usuário não autorizado', 401);
    }

    await prisma.call.update({
      where: {
        id,
      },
      data: {
        status: 'IN_PROGRESS',
      },
    });

    response.status(200).json();
  }

  async finish(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const call = await prisma.call.findUnique({
      where: {
        id,
      },
    });

    if (call?.technicianId !== request.user?.id) {
      throw new AppError('Usuário não autorizado', 401);
    }

    await prisma.call.update({
      where: {
        id,
      },
      data: {
        status: 'CLOSED',
      },
    });

    response.status(200).json();
  }
}

export { CallsController };
