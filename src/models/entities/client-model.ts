import { Address } from "./address-model";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
}
