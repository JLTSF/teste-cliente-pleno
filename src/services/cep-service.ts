import { AxiosInstance } from 'axios';
import { Logger } from 'winston';
import { AddressResponseDto } from '../models/dtos/address-respone-dto';
import env from '../env';
import { CepNotFoundException } from '../helpers/client-service-logs';
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
      if (data.erro) {
        throw new CepNotFoundException();
      }
      return data;
    } catch {
      const { data } = await this.axios
        .get(this.urlSecondary + cep)
        .catch(() => {
          throw new CepNotFoundException();
        });

      return data;
    }
  }
}
