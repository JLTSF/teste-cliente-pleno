import { Address } from "../entities/address-model";

export interface ClientRegisterRequestDto {
  name: string;
  email: string;
  phone: string;
  cep: string;
}

export interface ClientRegisterResponseDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  cep: string;
  address: Address;
}
