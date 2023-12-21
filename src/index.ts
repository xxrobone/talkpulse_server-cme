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

//with docker
/* const MongoDockerURI: string | undefined = process.env.MONGO_DOCKER_URI; */

/* if (!MongoDockerURI) {
  console.error('MongoDB URI is not provided in the environment variables.');
  process.exit(1);
} */

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello Typescript with Node.js! Connected");
});


// Routes
app.use('/', authRoute);
app.use('/', postsRoute);
app.use('/', commentsRoute);
app.use('/', userRoute);
app.use('/', votesRoute);

const mongoURL = process.env.DB_URL;
/* const mongoURL = process.env.MONGO_DOCKER_URI; */
if (!mongoURL) throw Error('Missing db url');
mongoose.connect(mongoURL)
    .then(() => {
        const port = parseInt(process.env.PORT || '3000');
        app.listen(port, () => {
            console.log('Server listening on port ' + port);
        })
    })
