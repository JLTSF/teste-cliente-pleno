import morgan from "morgan";
import { logger } from "./logger-helper";

export const morganMiddleware = morgan(
  ":method :url :status  :res[content-length] - :response-time ms",
  { stream: { write: (message) => logger.http(message.trim()) } }
);
