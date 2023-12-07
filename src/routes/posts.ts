import express, { Request, Response } from 'express';
import PostModel, { IPost } from '../models/post.model';

const router = express.Router();

// Create new Post
router.post('/', async (req: Request, res: Response) => {
  const newPostData: IPost = req.body;
  const newPost = new PostModel(newPostData);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Post
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post?.userId.toString() === req.body.userId) {
      try {
        const updatedPost = await PostModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('You are not allowed to update this Post');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Post
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post && post.userId.toString() === req.body.userId) {
      try {
        await post.delete();
        res.status(200).json('Post deleted');
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('You dont have permission to delete this Post');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Post
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all Posts
router.get('/', async (req: Request, res: Response) => {
  const { userId, cat } = req.query;
  try {
    let posts;
    if (userId) {
      posts = await PostModel.find({ userId });
    } else if (cat) {
      posts = await PostModel.find({
        categories: {
          $in: [cat],
        },
      });
    } else {
      posts = await PostModel.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export = router;
