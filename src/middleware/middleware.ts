import express, {Request,Response,Application} from 'express';
const cors = require('cors');

const app: Application = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());


export { app };
