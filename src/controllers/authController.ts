// not shure if auth is better to put here or if it can be used in routes.
import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  try {
    if (await User.findOne({ username })) {
      return res
        .status(400)
        .json({ message: 'Username already in use, try an other name' });
    }
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'E-mail already in use' });
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

export const logIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    // user and password could be checked at the same time, i separated them
    if (!user) {
      return res.status(400).json({ message: 'Wrong credentials!' });
    }

    const validated = await bcrypt.compare(password, user.password);
    if (!validated || !user) {
      return res.status(400).json({ message: 'Wrong credentials!' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw Error('Missing secret token');
    }
    const token = jwt.sign({ userId: user._id }, secret);
    // protect password

    res.status(200).json({token, username:user.username});
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const profile = async (req: Request, res: Response) => {
    const { userId } = req

    const user = await User.findById(userId)

    if (!user) {
        console.log('User not found with id: ', userId)
       return res.status(404).json({message: 'User not found'})
    }
    res.status(200).json({
        username: user.username
    })
}
