import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
const cors = require('cors');

const validateToken = (req: Request, res: Response, next: NextFunction) => {
 
  const authHeader = req.headers['authorization'];
  
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied' });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw Error('Missing secret token')
  }

  jwt.verify(token, secret, (error, decodedToken: any) => {
    if (error) {
        return res.status(403).json({message: 'Not authorized'})
    }
    req.userId = decodedToken.userId
    next()
  });
}

  export default validateToken
