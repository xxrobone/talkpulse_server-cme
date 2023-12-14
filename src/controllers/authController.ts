// not shure if auth is better to put here or if it can be used in routes.
import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
/* import verifyEmail from 'helpers/Email'; */
import { assertDefined } from 'utils/assertDefined';

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

/*     const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw Error('Missing secret token');
    }
    const emailToken = jwt.sign({
      username
    }, secret, { expiresIn: '1h' })
    verifyEmail(username, email, emailToken) */

    await newUser.save();
    res.status(201).json({ username, id: newUser._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// verify token ====================================================
/* export const verifyToken = async (req: Request, res: Response) => {
  const { username, emailToken } = req.body;

  try {
    assertDefined(process.env.JWT_SECRET)

    const decode = jwt.verify(emailToken, process.env.JWT_SECRET);
    console.log(decode);

    const verified = await User.updateOne(
      { username },
      {
        $set: {
          confirmed: true,
        },
      }
    );

    return res.json({ status: 'sign up successful, verified' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}; */

// ===================================================================

export const logIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    // +password gets the password, needed for login, default is set select false
    const user = await User.findOne({ username: username}, '+password');

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
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '2h' });

    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!refreshTokenSecret) {
      throw Error('Missing REFRESH_TOKEN_SECRET');
    }
    // return refresh token
    const refreshToken = jwt.sign({ userId: user._id }, refreshTokenSecret, {
      expiresIn: '23h',
    });

    res.status(200).json({ token, refreshToken, username: user.username });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const refreshJWT = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  if (!refreshTokenSecret) {
    throw Error('Missing REFRESH_TOKEN_SECRET');
  }

  try {
    const decodedPayload = (await jwt.verify(
      refreshToken,
      refreshTokenSecret
    )) as { userId: string };

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw Error('Missing JWT_SECRET');
    }

    // Returnera JWT
    const token = jwt.sign({ userId: decodedPayload.userId }, secret, {
      expiresIn: '1h',
    });

    return res.status(200).json({
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: 'invalid token' });
  }
};

export const profile = async (req: Request, res: Response) => {
  const { userId } = req;

  const user = await User.findById(userId);

  if (!user) {
    console.log('User not found with id: ', userId);
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({
    username: user.username,
  });
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  // clear token / cookie
  // send response success and message
};
