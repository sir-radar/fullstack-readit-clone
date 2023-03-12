import { Router } from 'express';
import miscController from '../controllers/miscController';
import authMiddleware from '../middleware/auth';
const router = Router();

router.post('/vote', authMiddleware, miscController.vote);

export default router;
