import { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './middleware/middleware';
import authRoute from './routes/auth';
import userRoute from './routes/users';
import postRoute from './routes/posts';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10) || 8000;

//without docker
const MongoURI: string | undefined = process.env.MONGO_DB_URI;

//with docker
const MongoDockerURI: string | undefined = process.env.MONGO_DOCKER_URI;

/* if (!MongoURI) {
  console.error('MongoDB URI is not provided in the environment variables.');
  process.exit(1);
} */

if (!MongoDockerURI) {
  console.error('MongoDB URI is not provided in the environment variables.');
  process.exit(1);
}

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello Typescript with Node.js! Connected");
});

mongoose.Promise = Promise

mongoose.connect(MongoDockerURI)
mongoose.connection.on('error', (err: Error) => console.log(err))

// Routes
app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/posts', postRoute);

// Server listening
app.listen(PORT, (): void => {
  console.log(`Server is running on port ${PORT}`);
});
