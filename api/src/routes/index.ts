import { Router } from 'express';
import { usersRoutes } from './users-routes';
import { sessionsRoutes } from './sessions-routes';
import { techniciansRoutes } from './technicians-routes';
import { ensureAuthenticated } from '@/middlewares/ensure-authenticated';

const routes = Router();

// Public routes
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

// Private routes
routes.use(ensureAuthenticated);
routes.use('/technicians', techniciansRoutes);

export { routes };
