import { UsersController } from '@/controllers/users-controller';
import { ensureAuthenticated } from '@/middlewares/ensure-authenticated';
import { verifyUserAuthorization } from '@/middlewares/verify-user-authorization';
import { Router } from 'express';

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post('/', usersController.create);
usersRoutes.put(
  '/:id',
  ensureAuthenticated,
  verifyUserAuthorization(['ADMIN', 'CLIENT', 'TECHNICIAN']),
  usersController.update,
);

export { usersRoutes };
