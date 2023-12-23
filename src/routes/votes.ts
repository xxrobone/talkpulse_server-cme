import { Router } from 'express';
import validateToken from '../middleware/authMiddleware';
import * as votesController from '../controllers/votesController'

const router = Router()

// post votes
router.post('/posts/:postId/upvote', validateToken, votesController.upvote)
router.post('/posts/:postId/downvote', validateToken, votesController.downvote)

//comment votes

export default router; 
