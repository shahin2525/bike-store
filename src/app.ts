import express from 'express';
import cors from 'cors';
// import { BikeRoutes } from './app/module/bike/bike.route';
// import { OrderRoutes } from './app/module/order/order.route';
import router from './app/routes';
import errorHandler from './app/middlewares/errorHandlers';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['https://bike-shop-frontend.vercel.app', 'http://localhost:5173'],
    credentials: true,
  }),
);

app.use('/api', router);
// order routes
// app.use('/api/orders', OrderRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// global error handler
app.use(errorHandler);
// not found route
app.all('*', (req, res) => {
  res.status(404).send('404! Page not found');
});
export default app;
