import { logger } from '../../../helpers/logger-helper';
import { makeClientService } from '../../../services/factorires/client-service-factory';
import { ClientsHandler } from '../../http/clients-handler';

export const makeClientHandler = () => {
  const clientService = makeClientService();
  return new ClientsHandler(logger, clientService);
};
