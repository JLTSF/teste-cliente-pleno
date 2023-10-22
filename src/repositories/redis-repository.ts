import { Cluster } from 'ioredis';

export class RedisRepository {
  constructor(private readonly repository: Cluster) {}

  async get(key: string) {
    return this.repository.get(key);
  }

  async set(key: string, value: string) {
    return await this.repository.set(key, value);
  }

  async del(key: string) {
    return await this.repository.del(key);
  }

  async exist(key: string) {
    return await this.repository.exists(key);
  }
}
