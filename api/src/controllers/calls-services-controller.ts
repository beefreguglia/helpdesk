import { prisma } from '@/database/prisma';
import type { Request, Response } from 'express';
import { z } from 'zod';

class CallsServicesController {
  async create(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
      serviceId: z.string().uuid(),
    });

    const { serviceId } = bodySchema.parse(request.body);

    await prisma.callService.create({
      data: {
        callId: id,
        serviceId,
      },
    });

    response.status(201).json();
  }

  async delete(request: Request, response: Response) {
    const paramsSchema = z.object({
      callId: z.string().uuid(),
      serviceId: z.string().uuid(),
    });

    const { callId, serviceId } = paramsSchema.parse(request.params);

    await prisma.callService.delete({
      where: {
        callId,
        id: serviceId,
      },
    });

    response.status(201).json();
  }
}

export { CallsServicesController };
