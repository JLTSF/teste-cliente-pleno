import { Router } from 'express';
import healthRoutes from './health-router';
import clientsRoutes from './clients-handler';

const router = Router();

router.use(healthRoutes);
router.use(clientsRoutes);

export default router;
