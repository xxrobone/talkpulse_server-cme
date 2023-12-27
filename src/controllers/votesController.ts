// votes.controller.ts
import { Request, Response } from "express";
import { assertDefined } from "../utils/asserts";
import Post from "../models/post.model";
import Comment from "../models/comment.model";

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

export const upvoteComment = async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const { userId } = req;

    assertDefined(userId);

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found with the ID: ' + commentId });
        }

        comment.upvote(userId);

        const upvotedComment = await comment.save();

        return res.status(200).json(upvotedComment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const downvoteComment = async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const { userId } = req;

    assertDefined(userId);

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found with the ID: ' + commentId });
        }

        comment.downvote(userId);

        const downvotedComment = await comment.save();

        return res.status(200).json(downvotedComment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
