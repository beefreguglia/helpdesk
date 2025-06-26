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

export { techniciansRoutes };
