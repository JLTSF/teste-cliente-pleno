import { Router } from "express";
import { makeHealthHandler } from "../handlers/factories/http/health-handler-factory";

const healthRoutes = Router();

const healthHandler = makeHealthHandler();

healthRoutes.get("/health", healthHandler.handle.bind(healthHandler));

export default healthRoutes;
