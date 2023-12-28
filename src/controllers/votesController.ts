// votes.controller.ts

import { Request, Response } from "express";
import { assertDefined } from "../utils/asserts";
import Post from "../models/post.model";
import Comment from "../models/comment.model";


// UPVOTE POST
export const upvotePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { userId } = req;

  assertDefined(userId);

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found with the ID: ' + postId });
    }

    post.upvote(userId);

    const upvotedPost = await post.save();

    return res.status(200).json(upvotedPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// DOWNVOTE POST
export const downvotePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { userId } = req;

  assertDefined(userId);

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found with the ID: ' + postId });
    }

    post.downvote(userId);

    const downvotedPost = await post.save();

    return res.status(200).json(downvotedPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// UPVOTE COMMENT
export const upvoteComment = async (req: Request, res: Response) => {
  const { postId, commentId } = req.params;
  const { userId } = req;

  assertDefined(userId);

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found with the ID: ' + postId });
    }

    // Find the comment in the post's comments array by ID
    const comment = post.comments.find((c) => c._id.toString() === commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found with the ID: ' + commentId });
    }

    // Call upvote on the found comment
    comment.upvote(userId);

    const updatedPost = await post.save();

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// DOWNVOTE COMMENT
export const downvoteComment = async (req: Request, res: Response) => {
  const { postId, commentId } = req.params;
  const { userId } = req;

  assertDefined(userId);

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found with the ID: ' + postId });
    }

    // Check post for comment id
    const comment = post.comments.find((c) => c._id.toString() === commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found with the ID: ' + commentId });
    }

    // Downvote comment 
    comment.downvote(userId);

    const updatedPost = await post.save();

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
