import { Request, Response } from 'express';
import { Logger } from 'winston';
import { ClientService } from '../../services';
import { BaseException } from '../../helpers/client-service-logs';
export class ClientsHandler {
  constructor(
    private readonly logger: Logger,
    private readonly clientService: ClientService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const client = req.body;
      const response = await this.clientService.addClient(client);
      return res.send({ client: response });
    } catch (error: any) {
      this.logger.error(error.message);
      return res.status(500).send({
        error: error.message
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const { limit, offset } = req.query;
      const clients = await this.clientService.getAll(
        Number(limit),
        Number(offset)
      );
      return res.send(clients);
    } catch (error: any) {
      this.logger.error(error.message);

      if (error instanceof BaseException) {
        return res.status(error.code).send({
          error: error.message
        });
      }
      return res.status(500).send({
        error: error.message
      });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const client = await this.clientService.getClient(id);
      return res.send(client);
    } catch (error: any) {
      this.logger.error(error.message);

      if (error instanceof BaseException) {
        return res.status(error.code).send({
          error: error.message
        });
      }
      return res.status(500).send({
        error: error.message
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const client = await this.clientService.deleteClient(id);
      return res.send(client);
    } catch (error: any) {
      this.logger.error(error.message);

      if (error instanceof BaseException) {
        return res.status(error.code).send({
          error: error.message
        });
      }
      return res.status(500).send({
        error: error.message
      });
    }
  }
}
