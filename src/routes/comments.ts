import { Router } from 'express';
import validateToken from '../middleware/middleware';
import * as commentController from '../controllers/commentsController'

const router = Router();

router.post('/', validateToken, commentController.createComment)
router.delete('/:commentId', validateToken, commentController.deleteComment)

export default router;