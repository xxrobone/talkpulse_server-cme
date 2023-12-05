// will change to using middle ware
// after i first leaned more how to use typescript with node
import express, {Request,Response,Application} from 'express';
const path = require('path');
const cors = require('cors');

const app: Application = express();


// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());


module.exports = {
  app,
};
