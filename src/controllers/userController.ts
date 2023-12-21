import { Request, Response } from "express";
import User from "../models/user.model";

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            username: user.username,
            email: user.email,
            // Add other user details as needed
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to get user' });
    }
};

