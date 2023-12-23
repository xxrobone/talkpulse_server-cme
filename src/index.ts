// index.ts
import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db'; // Import the new db.ts file
import authRoute from './routes/auth';
import postsRoute from './routes/posts';
import commentsRoute from './routes/comments';
import userRoute from './routes/users';
import votesRoute from './routes/votes';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

// Connect to the database
connectDB().then(() => {
  // Routes
  app.use('/', authRoute);
  app.use('/', postsRoute);
  app.use('/', commentsRoute);
  app.use('/', userRoute);
  app.use('/', votesRoute);

  const port = parseInt(process.env.PORT || '8000');
  app.listen(port, () => {
    console.log('Server listening on port ' + port);
  });
});
