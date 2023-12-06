import { app } from './middleware/middleware';
import { Request, Response, Application } from 'express';
import dotenv from 'dotenv'; 
const mongoose = require('mongoose');

dotenv.config();

const PORT = process.env.PORT || 8080;
const MongoURI = process.env.MONGO_DB_URI || undefined;

console.log(MongoURI)

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello Typescript with Node.js! Connected");
});

app.listen(PORT, (): void => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.Promise = Promise

mongoose.connect(MongoURI)
mongoose.connection.on('error', (err: Error) => console.log(err))

