import { Request, Response } from 'express';
import Post from '../models/post.model';
import { assertDefined } from '../utils/asserts';

export const create = async (req: Request, res: Response) => {
  assertDefined(req.userId);
  const { title, link, body } = req.body;

  const post = new Post({
    title,
    link,
    body,
    author: req.userId,
  });

  try {
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create post' });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit?.toString() || '5');
  const page = parseInt(req.query.page?.toString() || '1');

  if (isNaN(page) || isNaN(limit)) {
    res.status(400).json({ message: 'Malformed page number: ' + page });
  }

  const posts = await Post.find({}, '-comments')
   /*  .sort({ createAt: 'descending', score: 'descending' }) */
    .sort({ createdAt: 'descending' })
    .limit(limit)
    .skip(limit * (page - 1))
    .populate('author')
    .exec();

  const totalCount = await Post.countDocuments();

  res.status(200).json({
    posts,
    totalPages: Math.ceil(totalCount / limit),
  });
};

export const getPost = async (req: Request, res: Response) => {
  const { postId } = req.params;

  const post = await Post.findById(postId)
    .populate('author')
    .populate('comments.author');

  if (!post) {
    return res.status(404).json({ message: 'No post found for id: ' + postId });
  }

  res.status(200).json(post);
};

// UPDATE ONE BY ID
export const updatePost = async (req: Request, res: Response) => {
  assertDefined(req.userId);
  try {
    const post = await Post.findById(req.params.postId);

    if (post?.author.toString() === req.userId) {
      const updatedFields: { [key: string]: string } = {};

      // conditional to check if there is an updated version of the title, link or body
      if (req.body.title) updatedFields.title = req.body.title;
      if (req.body.link) updatedFields.link = req.body.link;
      if (req.body.body) updatedFields.body = req.body.body;

      const updatedPost = await Post.findByIdAndUpdate(
        req.params.postId,
        { $set: updatedFields },
        { new: true }
      );

      res.status(200).json(updatedPost);
    } else {
      res.status(401).json('You are not allowed to update this Post');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to update post' });
  }
};

// DELETE ONE BY ID
export const deletePost = async (req: Request, res: Response) => {
  try {
    assertDefined(req.userId);
    const post = await Post.findById(req.params.postId);

    if (post?.author.toString() === req.userId) {
      await Post.deleteOne({ _id: req.params.postId });
      res.status(200).json('Post deleted');
    } else {
      res.status(401).json('You are not allowed to delete this Post');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to delete post' });
  }
};

