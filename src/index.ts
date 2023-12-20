import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import authRoute from './routes/auth';
import postsRoute from './routes/posts';
import commentsRoute from './routes/comments'
import userRoute from './routes/users'
import votesRoute from './routes/votes'
dotenv.config();

const app: Express = express();

app.use(cors());

app.use(express.json());

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

// moved this to routes, just and example, will remove
/* app.post('/profile', validateToken, authController.profile) */

mongoose.Promise = Promise

mongoose.connect(MongoDockerURI)
mongoose.connection.on('error', (err: Error) => console.log(err))

// Routes
app.use('/', authRoute);
app.use('/', postsRoute);
app.use('/', commentsRoute);
app.use('/', userRoute);
app.use('/', votesRoute);

// Server listening
app.listen(PORT, (): void => {
  console.log(`Server is running on port ${PORT}`);
});
