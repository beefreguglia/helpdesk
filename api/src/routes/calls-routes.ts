import { CallsController } from '@/controllers/calls-controller';
import { CallsServicesController } from '@/controllers/calls-services-controller';
import { verifyUserAuthorization } from '@/middlewares/verify-user-authorization';
import { Router } from 'express';

const callsRoutes = Router();
const callsController = new CallsController();
const callsServicesController = new CallsServicesController();

callsRoutes.post(
  '/',
  verifyUserAuthorization(['CLIENT']),
  callsController.create,
);

callsRoutes.get(
  '/',
  verifyUserAuthorization(['ADMIN', 'CLIENT', 'TECHNICIAN']),
  callsController.index,
);

callsRoutes.get(
  '/:id',
  verifyUserAuthorization(['ADMIN', 'CLIENT', 'TECHNICIAN']),
  callsController.show,
);

callsRoutes.patch(
  '/:id/finish',
  verifyUserAuthorization(['ADMIN', 'TECHNICIAN']),
  callsController.finish,
);

callsRoutes.patch(
  '/:id/start',
  verifyUserAuthorization(['ADMIN', 'TECHNICIAN']),
  callsController.start,
);

callsRoutes.post(
  '/:id/additional-call-service',
  verifyUserAuthorization(['ADMIN', 'TECHNICIAN']),
  callsServicesController.create,
);

callsRoutes.delete(
  '/:callId/additional-call-service/:serviceId',
  verifyUserAuthorization(['ADMIN', 'TECHNICIAN']),
  callsServicesController.delete,
);

export { callsRoutes };
