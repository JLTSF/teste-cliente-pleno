import { ClientRegisterRequestDto } from '../models/dtos';
import { PrismaClient } from '@prisma/client';

export class ClientRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: ClientRegisterRequestDto, addressId: string) {
    const { name, email, phone, cep } = dto;
    const client = await this.prisma.client.create({
      data: {
        name,
        email,
        phone,
        addressId
      }
    });

    return client;
  }

  async hasRegister(email: string) {
    return (
      (await this.prisma.client.count({
        where: {
          email
        }
      })) > 0
    );
  }
}
