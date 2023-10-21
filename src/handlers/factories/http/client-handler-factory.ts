import { logger } from "../../../helpers/logger-helper";
import { ClientService } from "../../../services";
import { ClientsHandler } from "../../http/clients-handler";

export const makeClientHandler = () => {
  const clientService = new ClientService(logger);
  return new ClientsHandler(logger, clientService);
};
