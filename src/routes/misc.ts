import { Router } from "express";
import subController from "../controllers/subController";
import authMiddleware from "../middleware/auth";
const router = Router()

router.post('/vote', authMiddleware, subController.vote);

export default router;
