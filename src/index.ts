import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './middleware/middleware';
import authRoute from './routes/auth';
import userRoute from './routes/users';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10) || 8080;
const MongoURI: string | undefined = process.env.MONGO_DB_URI;

if (!MongoURI) {
  console.error('MongoDB URI is not provided in the environment variables.');
  process.exit(1);
}

console.log(MongoURI);

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello Typescript with Node.js! Connected");
});

mongoose.Promise = Promise

mongoose.connect(MongoURI)
mongoose.connection.on('error', (err: Error) => console.log(err))

// Routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);

// Server listening
app.listen(PORT, (): void => {
  console.log(`Server is running on port ${PORT}`);
});
