import { app } from './middleware/middleware';
import { Request, Response, Application } from 'express';

const PORT = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello Typescript with Node.js! Connected");
});

app.listen(PORT, (): void => {
  console.log(`Server is running on port ${PORT}`);
});