import { Router } from 'express';
import validateToken from '../middleware/authMiddleware';
import * as votesController from '../controllers/votesController'

const router = Router()

// post votes
router.post('/posts/:postId/upvote', validateToken, votesController.upvotePost)
router.post('/posts/:postId/downvote', validateToken, votesController.downvotePost)

//comment votes
router.post('/posts/:postId/comments/:commentId/upvote', validateToken, votesController.upvoteComment);
router.post('/posts/:postId/comments/:commentId/downvote', validateToken, votesController.downvoteComment);

export default router; 
