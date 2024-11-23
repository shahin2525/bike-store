import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { BikeRoutes } from './app/module/bike/bike.route';
const app = express();
app.use(express.json());
app.use(cors());
// bike routes
app.use('/api/products', BikeRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
// global error handler
// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars, @typescript-eslint/no-unused-vars
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: error._message,
    success: false,
    error: error,
  });
});

export default app;
