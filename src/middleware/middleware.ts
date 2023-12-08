import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
const cors = require('cors');

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  // check for authorization header
  const authHeader = req.headers['authorization'];
  
  // read jwt token
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied' });
  }


  // check for jwt validation
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw Error('Missing secret token')
  }
  // use callback function 
  jwt.verify(token, secret, (error, decodedToken: any) => {
    if (error) {
        return res.status(403).json({message: 'Not authorized'})
    }
    
    // userId is declared in types / express
    req.userId = decodedToken.userId
    next()
  });
  // check user id from token
  // add user id in the token
}

  export default validateToken
