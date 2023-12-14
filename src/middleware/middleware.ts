import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
const cors = require('cors');
import User from '../models/user.model';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
 
  const authHeader = req.headers['authorization'];
  
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw Error('Missing secret token')
  }

  jwt.verify(token, secret, (error, decodedToken: any) => {
    if (error) {
      console.error('Token verification error:', error.message);
      return res.status(401).json({ message: 'Unauthorized - Invalid token', error: error.message });
    }

    if (!User.exists({ _id: decodedToken.userId })) {
      return res.status(403).json({message: 'Not authorized'})
    }
    req.userId = decodedToken.userId;
    next();
  });
}

  export default validateToken
