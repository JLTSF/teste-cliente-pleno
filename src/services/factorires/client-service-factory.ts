import { prisma } from '../../clients/prisma-client';
import env from '../../env';
import { logger } from '../../helpers/logger-helper';
import { ClientRepository } from '../../repositories/client-repository';
import { RedisRepository } from '../../repositories/redis-repository';
import { CacheService } from '../cache-service';
import { CepService } from '../cep-service';
import { ClientService } from '../client-service';
import axios from 'axios';
import { Redis } from 'ioredis';

export const makeClientService = () => {
  const axiosInstance = axios.create();
  const cepService = new CepService(logger, axiosInstance);

  const redis = new Redis.Cluster([env.REDIS_URL]);

  const redisRepository = new RedisRepository(redis);
  const clientCacheService = new CacheService(redisRepository, 'client');
  const addressCacheService = new CacheService(redisRepository, 'address');

  const clientRepository = new ClientRepository(prisma);

  return new ClientService(
    logger,
    clientRepository,
    clientCacheService,
    addressCacheService,
    cepService,
    env.DEFAULT_LIMIT_QUERY,
    env.DEFAULT_LIMIT_MAX_QUERY
  );
};
