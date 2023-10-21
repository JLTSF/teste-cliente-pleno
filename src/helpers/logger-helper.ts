import { transports, format, createLogger } from "winston";
import env from "../env";

export const logger = createLogger({
  level: env.ENVIRONMENT === "development" ? "debug" : "info",
  transports: [
    new transports.Console({ level: "http" }),
    new transports.File({ filename: "logs/app.log" }),
  ],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf((info) => `${info.timestamp} [${info.level}] ${info.message}`)
  ),
});
