import { Request, Response } from 'express';
import { Logger } from 'winston';
import { ClientService } from '../../services';
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
        limit as string,
        Number(offset)
      );
      return res.send(clients);
    } catch (error: any) {
      this.logger.error(error.message);
      return res.status(500).send({
        error: error.message
      });
    }
  }
}
