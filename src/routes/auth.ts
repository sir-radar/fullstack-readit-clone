import { Router } from "express";
import authController from "../controllers/authController";
const router = Router()

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/me', authController.me);
router.get('/logout', authController.logout);

export default router;
