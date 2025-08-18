import { Request, Response } from 'express';
import { z } from 'zod';

import { prisma } from '@/database/prisma';
import { DiskStorage } from '@/providers/disk-storage';
import { AppError } from '@/utils/AppError';

class UsersAvatarController {
  async updateAvatar(request: Request, response: Response) {
    const bodySchema = z.object({
      fileName: z.string().min(1, 'Nome da imagem obrigatório'),
    });

    const foundUser = await prisma.user.findUnique({
      where: {
        id: request.user?.id,
      },
    });

    if (!foundUser) {
      throw new AppError('Usuário não autorizado!');
    }

    const diskStorage = new DiskStorage();

    if (foundUser.imageName) {
      await diskStorage.deleteFile(foundUser.imageName, 'upload');
    }

    const { fileName } = bodySchema.parse(request.body);

    await prisma.user.update({
      where: {
        id: foundUser.id,
      },
      data: {
        imageName: fileName,
      },
    });

    response.status(200).json();
  }
}

export { UsersAvatarController };
