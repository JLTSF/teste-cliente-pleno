import { ClientRegisterRequestDto } from '../models/dtos';
import { PrismaClient } from '@prisma/client';
import { AddressResponseDto } from '../models/dtos/address-respone-dto';

export class ClientRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: ClientRegisterRequestDto, address: AddressResponseDto) {
    const { name, email, phone } = dto;
    const client = await this.prisma.client.create({
      data: {
        name,
        email,
        phone,
        address: {
          connectOrCreate: {
            where: {
              id: address.id
            },
            create: {
              cep: address.cep,
              city: address.localidade ?? (address.city as string),
              neighborhood: address.neighborhood ?? (address.bairro as string),
              state: address.state ?? (address.uf as string),
              street: address.street ?? (address.logradouro as string)
            }
          }
        }
      },
      include: {
        address: true
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

  async getAll(take: number, skip: number) {
    const clients = await this.prisma.client.findMany({
      select: {
        id: true,
        name: true
      },
      take,
      skip
    });
    return clients;
  }

  async count(count?: string) {
    if (count) {
      return await this.prisma.client.count({
        where: {
          id: count
        }
      });
    }
    return await this.prisma.client.count();
  }

  async get(id: string) {
    return await this.prisma.client.findUnique({
      where: {
        id
      },
      include: {
        address: true
      }
    });
  }

  async del(id: string) {
    return await this.prisma.client.delete({
      where: {
        id
      }
    });
  }
}
