import { Request, Response } from "express";
import Post from "../models/post.model";


export const create = async (req: Request, res: Response) => {
    
    await req.userId
    const { title, link, content } = req.body;

    if (!req.userId) {
        return
    }
    const post = new Post({
        title,
        link,
        content,
        author: req.userId
    })

    try {
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to create post' });
    }
}

export const getAllPosts = async (req: Request, res: Response) => {
    const posts = await Post.find().populate("author", "username");

    res.status(200).json(posts)
}