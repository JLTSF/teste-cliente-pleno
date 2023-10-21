import { Logger } from 'winston';
import { ClientRegisterRequestDto } from '../models/dtos';
import { ClientRepository } from '../repositories/client-repository';
import { ClientAlreadyExistsException } from '../helpers/client-service-logs';
import { CepService } from './cep-service';
export class ClientService {
  constructor(
    private readonly logger: Logger,
    private readonly clientRepository: ClientRepository,
    private readonly cepService: CepService
  ) {}

  async addClient(dto: ClientRegisterRequestDto) {
    this.logger.info('CREATE USER TO');
    const clientAlreadyExists = await this.clientRepository.hasRegister(
      dto.email
    );

    if (clientAlreadyExists) {
      throw ClientAlreadyExistsException();
    }

    const address = await this.cepService.getAddress(dto.cep);

    const client = this.clientRepository.create(dto, address);
    return client;
  }

  async getAll(limit: string = '2', offset: number = 0) {
    const allClients = await this.clientRepository.getAll();

    const nextPage = null;
    return {
      nextPage,
      results: allClients
    };
  }
}
