import { Router } from 'express';

import { ensureAuthenticated } from '@/middlewares/ensure-authenticated';
import { callsRoutes } from './calls-routes';
import { clientsRoutes } from './clients-routes';
import { servicesRoutes } from './services-routes';
import { sessionsRoutes } from './sessions-routes';
import { techniciansRoutes } from './technicians-routes';
import { uploadsRoutes } from './uploads-routes';
import { usersAvatarRoutes } from './users-avatar-routes';
import { usersRoutes } from './users-routes';

const routes = Router();

// Public routes
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

// Private routes
routes.use(ensureAuthenticated);
routes.use('/technicians', techniciansRoutes);
routes.use('/clients', clientsRoutes);
routes.use('/services', servicesRoutes);
routes.use('/calls', callsRoutes);
routes.use('/uploads', uploadsRoutes);
routes.use('/users-avatar', usersAvatarRoutes);

export { routes };
