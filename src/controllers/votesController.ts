import { Request, Response } from "express"
import { assertDefined } from "../utils/asserts";
import Post from "../models/post.model";

export const upvote = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const { userId } = req;

    assertDefined(userId)

    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({message: 'Post not found iwitd the ID: ' + postId})
    }

    post.upvote(userId)
    
    const upvotedPost = await post.save()
    return res.status(200).json(upvotedPost)
}

export const downvote = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const { userId } = req;

    assertDefined(userId)

    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({message: 'Post not found iwitd the ID: ' + postId})
    }

    post.downvote(userId)

    const downvotedPost = await post.save()

    return res.status(200).json(downvotedPost)
}