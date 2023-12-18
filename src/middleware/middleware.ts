import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import User from '../models/user.model';

const validateToken = (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
      return res.status(401).json({message: 'Not authorized'});
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
      throw Error('Missing JWT SECRET');
  }

  jwt.verify(token, secret, async (error, decodedPayload) => {
    
    if (error || !decodedPayload || typeof decodedPayload === 'string') {
        return res.status(403).json({message: 'Not authorized'});
    }

    if (!await User.exists({_id: decodedPayload.userId})) {
        return res.status(403).json({message: 'Not authorized'});
    }

    // Lägga till userId på req 
    req.userId = decodedPayload.userId
    next()
})
}

  export default validateToken
