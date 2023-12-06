import express, {Express, Application} from 'express';
const cors = require('cors');

const app: Express = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());


export { app };
