import express, { Express, NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
const cors = require('cors');

const app: Express = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

const validation = (req: Request, res: Response, next: NextFunction) => {
  //sök efter authorization header
  const authHeader = req.headers['authorization'];
  
  // läser ut jwt
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied' });
  }


  // kolla att jwt är giltig
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw Error('Missing secret token')
  }
  // use callback function 
  jwt.verify(token, secret, (error, decodedToken: any) => {
    if (error) {
        return res.status(403).json({message: 'Not authorized'})
    }
    
    req.userId = decodedToken.userId
    next()
  });
  // läsa ut användar id från token
  // lägga till userid på req
}

app.use(express.json());


export { app };
