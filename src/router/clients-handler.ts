import { Router } from 'express';
import { makeClientHandler } from '../handlers/factories/http/client-handler-factory';

const clientsRoutes = Router();

const clientsHandler = makeClientHandler();

clientsRoutes.post('/clients', clientsHandler.handle.bind(clientsHandler));
clientsRoutes.get('/clients', clientsHandler.getAll.bind(clientsHandler));
clientsRoutes.get('/clients/:id', clientsHandler.getUser.bind(clientsHandler));
clientsRoutes.delete(
  '/clients/:id',
  clientsHandler.deleteUser.bind(clientsHandler)
);

export default clientsRoutes;
