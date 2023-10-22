import { prisma } from '../../clients/prisma-client';
import env from '../../env';
import { logger } from '../../helpers/logger-helper';
import { ClientRepository } from '../../repositories/client-repository';
import { CepService } from '../cep-service';
import { ClientService } from '../client-service';
import axios from 'axios';

export const makeClientService = () => {
  const axiosInstance = axios.create();
  const cepService = new CepService(logger, axiosInstance);
  const clientRepository = new ClientRepository(prisma);
  return new ClientService(
    logger,
    clientRepository,
    cepService,
    env.DEFAULT_LIMIT_QUERY,
    env.DEFAULT_LIMIT_MAX_QUERY
  );
};
