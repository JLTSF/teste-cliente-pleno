import { RedisRepository } from '../repositories/redis-repository';

export class CacheService {
  constructor(
    private readonly repositoryCache: RedisRepository,
    private readonly prefixedKey: string
  ) {}

  async get(id: string) {
    return await this.repositoryCache.get(`${this.prefixedKey}:${id}`);
  }

  async del(id: string) {
    return await this.repositoryCache.del(`${this.prefixedKey}:${id}`);
  }

  async set(key: string, value: string) {
    return await this.repositoryCache.set(`${this.prefixedKey}:${key}`, value);
  }

  async exists(key: string) {
    return await this.repositoryCache.exist(`${this.prefixedKey}:${key}`);
  }
}
