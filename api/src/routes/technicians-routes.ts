import { TechniciansController } from '@/controllers/technicians-controller';
import { verifyUserAuthorization } from '@/middlewares/verify-user-authorization';
import { Router } from 'express';

const techniciansRoutes = Router();
const techniciansController = new TechniciansController();

techniciansRoutes.post(
  '/',
  verifyUserAuthorization(['ADMIN']),
  techniciansController.create,
);

techniciansRoutes.get(
  '/',
  verifyUserAuthorization(['ADMIN']),
  techniciansController.index,
);

techniciansRoutes.get(
  '/:id',
  verifyUserAuthorization(['ADMIN']),
  techniciansController.show,
);

techniciansRoutes.put(
  '/:id',
  verifyUserAuthorization(['ADMIN']),
  techniciansController.update,
);

export { techniciansRoutes };
