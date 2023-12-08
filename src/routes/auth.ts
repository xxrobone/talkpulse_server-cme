import { Router, Request, Response } from 'express';
import User from '../models/user.model';
import * as authController from '../controllers/authController'
import bcrypt from 'bcrypt'

const router = Router();

// REGISTER / SIGNUP USER
/* router.post('/signup', async (req: Request, res: Response) => {

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
}); */
router.post('/signup', authController.register)

// LOGIN USER
router.post('/login', async (req: Request, res: Response) => {
  const {username, password } = req.body
  try {
    const user = await User.findOne({ username: username }).select('+password');

    if (!user) {
      return res.status(400).json('Wrong credentials!');
    }

    const validated = await bcrypt.compare(password, user.password);
    if (!validated) {
      return res.status(400).json('Wrong credentials!');
    }
// protect password
    const { ...rest } = user.toObject(); 

    res.status(200).json(rest);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
