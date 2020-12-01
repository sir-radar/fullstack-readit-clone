import { Router } from "express";
import subController from "../controllers/subController";
import authMiddleware from "../middleware/auth";
const router = Router()

router.post('/create', authMiddleware, subController.create);

export default router;
