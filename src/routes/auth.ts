import { Router, Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

const router = Router();

// REGISTER / SIGNUP USER
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN USER
router.post('/login', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username }).select('+password');

    if (!user) {
      return res.status(400).json('Wrong credentials!');
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).json('Wrong credentials!');
    }
// protect password
    const { password, ...rest } = user.toObject(); 

    res.status(200).json(rest);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
