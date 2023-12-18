import express, { Request, Response } from 'express';
import PostModel from '../models/post.model';
import * as postController from '../controllers/postController'
const router = express.Router();

// Update Post
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post?.author.toString() === req.body.author) {
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

// Delete post
router.delete('/:postId/:userId', async (req: Request, res: Response) => {
    try {
      const postId = req.params.postId;
      const userIdFromRequest = req.params.userId;
  
      const post = await PostModel.findById(postId);
  
      if (post) {
        if (post.author.toString() === userIdFromRequest) {
          try {
            await PostModel.deleteOne({ _id: postId });
            res.status(200).json('Post deleted');
          } catch (err) {
            res.status(500).json(err);
          }
        } else {
          res.status(401).json('You dont have permission to delete this Post');
        }
      } else {
        res.status(404).json('Post not found');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


router.get('/', postController.getAllPosts)
router.post('/', postController.create)
router.get('/:id', postController.getPost)

export = router;



/* cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_SECRET 
}); */

// will try to use cloudinary
/* NEEDS TO BE FIXED!!!  */
// Create new Post
/* router.post('/', async (req: Request, res: Response) => {
  const newPostData: IPost = req.body;
  const newPost = new PostModel(newPostData);
  try { */
/*     const { image } = req.body 
    const img_upload = await cloudinary.uploader.upload(image, { 
      folder: 'posts',
      width: 1200,
      crop: 'scale'
     }) as UploadApiResponse;

    newPost.image = img_upload.secure_url; */

   /*  const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.error('Error saving post:', err);
    res.status(500).json(err);
  }
}); */

// Get Post
/* router.get('/:id', async (req: Request, res: Response) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
}); */

// Get all Posts
/* router.get('/', async (req: Request, res: Response) => {
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
}); */