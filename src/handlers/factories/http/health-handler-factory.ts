import { HealthHandler } from "../../http/health-handler";
import { logger } from "./../../../helpers/logger-helper";

export const makeHealthHandler = () => {
  return new HealthHandler(logger);
};
