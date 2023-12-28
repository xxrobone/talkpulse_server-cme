import { Request, Response } from "express";
import Post from "../models/post.model";
import Comment from "../models/comment.model";
import User from "../models/user.model";
import { assertDefined } from "../utils/asserts";

export const createComment = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const userId = req.userId;
  
    assertDefined(userId);
    assertDefined(postId);
  
    const { commentBody } = req.body;
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'No post found for id: ' + postId });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'No user found for id: ' + userId });
      }
  
      const newComment = new Comment({
        body: commentBody,
        userId: userId,
        postId: post._id,
        author: userId,
      });
  
      post.comments.push(newComment);
  
      const savedPost = await post.save();
  
      const populatedPost = await savedPost
        .populate({
          path: 'comments',
          populate: {
            path: 'author',
            select: 'username',
          },
        });
  
      res.status(201).json(populatedPost);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to create comment' });
    }
  };
  
  export const updateComment = async (req: Request, res: Response) => {
    const { postId, commentId } = req.params;
    const { userId } = req;
    assertDefined(userId);
  
    try {
      const post = await Post.findById(postId)
  
      if (!post) {
        return res.status(404).json({ message: 'No post found with the ID: ' + postId })
      }
  
      const comment = post.comments.id(commentId)
  
      if (!comment) {
        return res.status(404).json({ message: 'No post comment found with the ID: ' + commentId })
      }
  
      const commentAny = comment as any;
  
      if (commentAny.author.toString() !== userId) {
        return res.status(403).json({ message: 'Not authorized' });
      }
      const updatedFields: { [key: string]: string } = {};
  
      // Update part - if changes are made, update comment
      if (req.body.commentBody) updatedFields.body = req.body.commentBody;
  
      Object.assign(commentAny, updatedFields);
  
      const updatedPost = await post.save();
  
      return res.status(200).json(updatedPost);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Failed to update comment' });
    }
  };


export const deleteComment = async (req: Request, res: Response) => {
    const { postId, commentId } = req.params;
    const { userId } = req;
    assertDefined(userId);

    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({ message: 'Not post found for id: ' + postId });
    }
    
    const comment = post.comments.id(commentId);

    if (!comment) {
        return res.status(404).json({ message: 'Not comment found for id: ' + commentId });
    }

    const commentAny = comment as any;

    if (commentAny.author.toString() !== userId) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    commentAny.deleteOne();

    const updatedPost = await post.save();

    return res.status(200).json(updatedPost);
}

