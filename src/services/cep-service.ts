import { AxiosInstance } from 'axios';
import { Logger } from 'winston';
import { AddressResponseDto } from '../models/dtos/address-respone-dto';
import env from '../env';
export class CepService {
  constructor(
    private readonly logger: Logger,
    private readonly axios: AxiosInstance,
    private readonly url: string = String(env.API_CEP_PROVIDER_MAIN),
    private readonly urlSecondary: string = String(
      env.API_CEP_PROVIDER_SECONDARY
    )
  ) {}

  async getAddress(cep: string): Promise<AddressResponseDto> {
    try {
      const { data } = await this.axios.get(this.url + `${cep}/json`);
      return data;
    } catch {
      const { data } = await this.axios.get(this.urlSecondary + cep);
      return data;
    }
  }
}
