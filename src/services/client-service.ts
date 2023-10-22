import { Logger } from 'winston';
import { ClientRegisterRequestDto } from '../models/dtos';
import { ClientRepository } from '../repositories/client-repository';
import {
  ClientAlreadyExistsException,
  ClientNotFoundException,
  IdIsNullException,
  QueryLimitExceedsException,
  QueryParamsWrongException
} from '../helpers/client-service-logs';
import { CepService } from './cep-service';
import env from '../env';
import { cleanObj } from '../utils/object';
export class ClientService {
  constructor(
    private readonly logger: Logger,
    private readonly clientRepository: ClientRepository,
    private readonly cepService: CepService,
    private readonly defaultLimit: number,
    private readonly limitMaxQuery: number
  ) {}

  async addClient(dto: ClientRegisterRequestDto) {
    this.logger.info('CREATE USER TO');
    const clientAlreadyExists = await this.clientRepository.hasRegister(
      dto.email
    );

    if (clientAlreadyExists) {
      throw new ClientAlreadyExistsException();
    }

    const address = await this.cepService.getAddress(dto.cep);

    const client = await this.clientRepository.create(dto, address);
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
    const client = await this.clientRepository.get(id);

    if (!client) {
      throw new ClientNotFoundException();
    }
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

    const client = await this.clientRepository.del(id);

    if (!client) {
      throw new ClientNotFoundException();
    }

    return {
      message: 'Client deleted successfully'
    };
  }
}
