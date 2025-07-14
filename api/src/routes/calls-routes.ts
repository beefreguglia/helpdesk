import { CallsController } from '@/controllers/calls-controller';
import { verifyUserAuthorization } from '@/middlewares/verify-user-authorization';
import { Router } from 'express';

const callsRoutes = Router();
const callsController = new CallsController();

callsRoutes.post(
  '/',
  verifyUserAuthorization(['CLIENT']),
  callsController.create,
);

callsRoutes.get(
  '/',
  verifyUserAuthorization(['ADMIN', 'CLIENT']),
  callsController.index,
);

// callsRoutes.get(
//   '/:id',
//   verifyUserAuthorization(['ADMIN']),
//   callsController.show,
// );

// callsRoutes.patch(
//   '/:id/active',
//   verifyUserAuthorization(['ADMIN']),
//   callsController.active,
// );

// callsRoutes.patch(
//   '/:id/inactive',
//   verifyUserAuthorization(['ADMIN']),
//   callsController.inactive,
// );

// callsRoutes.put(
//   '/:id',
//   verifyUserAuthorization(['ADMIN']),
//   callsController.update,
// );

export { callsRoutes };
