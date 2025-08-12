import { ServicesController } from '@/controllers/services-controller';
import { verifyUserAuthorization } from '@/middlewares/verify-user-authorization';
import { Router } from 'express';

const servicesRoutes = Router();
const servicesController = new ServicesController();

servicesRoutes.post(
  '/',
  verifyUserAuthorization(['ADMIN']),
  servicesController.create,
);

servicesRoutes.get(
  '/',
  verifyUserAuthorization(['ADMIN']),
  servicesController.index,
);

servicesRoutes.get(
  '/active',
  verifyUserAuthorization(['CLIENT', 'TECHNICIAN']),
  servicesController.activeIndex,
);

servicesRoutes.get(
  '/:id',
  verifyUserAuthorization(['ADMIN']),
  servicesController.show,
);

servicesRoutes.patch(
  '/:id/active',
  verifyUserAuthorization(['ADMIN']),
  servicesController.active,
);

servicesRoutes.patch(
  '/:id/inactive',
  verifyUserAuthorization(['ADMIN']),
  servicesController.inactive,
);

servicesRoutes.put(
  '/:id',
  verifyUserAuthorization(['ADMIN']),
  servicesController.update,
);

export { servicesRoutes };
