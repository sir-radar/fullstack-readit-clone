import { Router } from "express";
import postController from "../controllers/postController";
import authMiddleware from "../middleware/auth";
const router = Router()

router.post('/create', authMiddleware, postController.create);
router.get('/', postController.getPosts);
router.get('/:identifier/:slug', postController.getPost);
router.post('/:identifier/:slug/comments',authMiddleware, postController.commentOnPost);

export default router;
