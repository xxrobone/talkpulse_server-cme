// not shure if auth is better to put here or if it can be used in routes.
import { Request, Response } from "express";
import User from "../models/user.model";

export const register = async (req: Request, res: Response) => {

    const { username, password, email } = req.body
    try {
      if (await User.findOne({ username })) {
        return res.status(400).json({message: "Username already in use, try an other name"})
      }
      if (await User.findOne({ email })) {
        return res.status(400).json({message: "E-mail already in use"})
      }
      const newUser = new User({
        username,
        email,
        password,
      });
  
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  