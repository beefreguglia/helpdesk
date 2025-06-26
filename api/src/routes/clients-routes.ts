import { ClientsController } from '@/controllers/clients-controller';
import { verifyUserAuthorization } from '@/middlewares/verify-user-authorization';
import { Router } from 'express';

const clientsRoutes = Router();
const clientsController = new ClientsController();

clientsRoutes.get(
  '/',
  verifyUserAuthorization(['ADMIN']),
  clientsController.index,
);

clientsRoutes.get(
  '/:id',
  verifyUserAuthorization(['ADMIN']),
  clientsController.show,
);

clientsRoutes.put(
  '/:id',
  verifyUserAuthorization(['ADMIN']),
  clientsController.update,
);

clientsRoutes.delete(
  '/:id',
  verifyUserAuthorization(['ADMIN']),
  clientsController.delete,
);

export { clientsRoutes };
