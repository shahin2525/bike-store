import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { BikeRoutes } from './app/module/bike/bike.route';
import { OrderRoutes } from './app/module/order/order.route';
const app = express();
app.use(express.json());
app.use(cors());
// bike routes
app.use('/api/products', BikeRoutes);
// order routes
app.use('/api/orders', OrderRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
// catch all not found route
app.all('*', function (req, res) {
  console.log('404');
  res.send('not found route');
});

// global error handler
// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars, @typescript-eslint/no-unused-vars
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: error._message || error.message || 'something went wrong',
    success: false,

    error: {
      name: error?.name || error.message,
      errors: error?.errors || error.message,
    },
    stack: `Error:something went wrong/ ${error?.errors ? error?.errors : error.message}`,
  });
});

export default app;
