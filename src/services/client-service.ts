import env from '../env';
import { Logger } from 'winston';
import { ClientRegisterRequestDto } from '../models/dtos';
import { ClientRepository } from '../repositories/client-repository';
import {
  ClientAlreadyExistsException,
  ClientNotFoundException,
  IdIsNullException,
  QueryLimitExceedsException
} from '../helpers/client-service-logs';
import { CepService } from './cep-service';
import { cleanObj } from '../utils/object';
import { obfuscateEmail } from '../utils/obfuscate';
import { CacheService } from './cache-service';
import { onlyDigits } from '../utils/string';
export class ClientService {
  constructor(
    private readonly logger: Logger,
    private readonly clientRepository: ClientRepository,
    private readonly clientCacheService: CacheService,
    private readonly addressCacheService: CacheService,
    private readonly cepService: CepService,
    private readonly defaultLimit: number,
    private readonly limitMaxQuery: number
  ) {}

  async addClient(dto: ClientRegisterRequestDto) {
    this.logger.info(`CREATING USER WITH EMAIL: ${obfuscateEmail(dto.email)}`);
    const clientAlreadyExists = await this.clientRepository.hasRegister(
      dto.email
    );

    if (clientAlreadyExists) {
      throw new ClientAlreadyExistsException();
    }

    const addressExists = await this.addressCacheService.get(
      onlyDigits(dto.cep)
    );

    if (addressExists) {
      const client = await this.clientRepository.create(
        dto,
        JSON.parse(addressExists)
      );
      return cleanObj(client, ['addressId']);
    }

    const address = await this.cepService.getAddress(dto.cep);
    const client = await this.clientRepository.create(dto, address);

    await this.addressCacheService.set(
      onlyDigits(client.address.cep),
      JSON.stringify(client.address)
    );

    return cleanObj(client, ['addressId']);
  }

  async getAll(limit: number, offset: number) {
    if (limit > this.limitMaxQuery) {
      throw new QueryLimitExceedsException();
    }

    if (isNaN(limit)) {
      limit = this.defaultLimit;
    }

    if (isNaN(offset)) {
      offset = 0;
    }

    const allClients = await this.clientRepository.getAll(limit, offset);
    const count = await this.clientRepository.count();

    const previus =
      offset > 0
        ? `${env.BASE_PATH}/clients?limit=${limit}&offset=${offset - limit}`
        : null;
    const nextPage =
      offset + limit < count
        ? `${env.BASE_PATH}/clients?limit=${limit}&offset=${offset + limit}`
        : null;
    return {
      count,
      previus,
      nextPage,
      results: allClients
    };
  }

  async getClient(id: string) {
    if (!id) {
      throw new IdIsNullException();
    }

    const clientCached = await this.clientCacheService.get(id);

    if (clientCached) {
      return cleanObj(JSON.parse(clientCached), ['addressId']);
    }

    const client = await this.clientRepository.get(id);

    if (!client) {
      throw new ClientNotFoundException();
    }

    await this.clientCacheService.set(id, JSON.stringify(client));
    return cleanObj(client, ['addressId']);
  }

  async deleteClient(id: string) {
    if (!id) {
      throw new IdIsNullException();
    }

    const userExists = await this.clientRepository.count(id);

    if (!userExists) {
      throw new ClientNotFoundException();
    }

    await this.clientRepository.del(id);
    await this.clientCacheService.del(id);

    return {
      message: 'Client deleted successfully'
    };
  }
}
