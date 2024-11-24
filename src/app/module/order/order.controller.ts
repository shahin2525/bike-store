import { RequestHandler } from 'express';
import { OrderServices } from './order.service';

const createOrderBike: RequestHandler = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await OrderServices.createOrderBikeIntoDB(payload);

    res.status(200).json({
      message: 'Order  created successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    console.log('controller', error);
    next(error);
  }
};
export const OrderControllers = {
  createOrderBike,
};
