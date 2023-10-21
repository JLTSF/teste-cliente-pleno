import { Logger } from 'winston';
import { ClientRegisterRequestDto } from '../models/dtos';
import { ClientRepository } from '../repositories/client-repository';
import { ClientAlreadyExistsException } from '../helpers/client-service-logs';
export class ClientService {
  constructor(
    private readonly logger: Logger,
    private readonly clientRepository: ClientRepository
  ) {}

  async addClient(dto: ClientRegisterRequestDto) {
    this.logger.info('CREATE USER TO');
    const clientAlreadyExists = await this.clientRepository.hasRegister(
      dto.email
    );
    if (clientAlreadyExists) {
      throw ClientAlreadyExistsException();
    }

    const client = this.clientRepository.create(dto, '1');
    return client;
  }
}
