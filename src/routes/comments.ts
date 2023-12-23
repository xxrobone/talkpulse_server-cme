import { Router } from 'express';
import validateToken from '../middleware/authMiddleware';
import * as commentController from '../controllers/commentsController'

const router = Router();

router.post('/posts/:postId/comments', validateToken, commentController.createComment)
router.put('/posts/:postId/comments/:commentId/update', validateToken, commentController.updateComment)
router.delete('/posts/:postId/comments/:commentId/delete', validateToken, commentController.deleteComment)

export default router;