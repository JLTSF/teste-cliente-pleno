import { Logger } from "winston";
import { Request, Response } from "express";
import env from "../../env";

export class HealthHandler {
  constructor(private readonly logger: Logger) {}

  handle(req: Request, res: Response) {
    this.logger.info("HTTP HEALTH CHECK");

    return res.send({
      status: "OK",
      version: env.APP_VERSION,
    });
  }
}
