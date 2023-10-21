import { Router } from "express";
import healthRoutes from "./health-router";

const router = Router();

router.use(healthRoutes);

export default router;
