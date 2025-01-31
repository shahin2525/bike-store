import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { Bike } from '../bike/bike.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderBikeIntoDB = async (payload: TOrder) => {
  const findProductData = await Bike.findById(payload.product);

  if (!findProductData) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Bike  is not found');
  }
  const productQuantity = findProductData?.quantity;

  const payLoadQuantity = payload?.quantity;

  if (productQuantity < payLoadQuantity) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'insufficient stock');
  }
  const productStock = findProductData.stock;
  if (!productStock) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Bike stock does not available',
    );
  }
  const newProductQuantity = productQuantity - payload.quantity;

  // add  inStock false if product quantity <=0
  if (newProductQuantity <= 0) {
    await Bike.findByIdAndUpdate(
      payload.product,
      { stock: false },
      { new: true, runValidators: true },
    );
  }

  // new quantity updated
  await Bike.findByIdAndUpdate(
    payload.product,
    { quantity: newProductQuantity },
    { new: true, runValidators: true },
  );

  const result = await Order.create(payload);
  return result;
};

const calculateRevenueFromDB = async () => {
  const allOrdersRevenue = await Order.aggregate([
    {
      $project: {
        revenue: '$totalPrice',
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$revenue' },
      },
    },
    {
      $project: { _id: 0 },
    },
  ]);
  if (allOrdersRevenue.length > 0) {
    return allOrdersRevenue;
  } else {
    return 0;
  }
};
const deleteOrderFromDB = async (id: string) => {
  if (!(await Order.isOrderExists(id))) {
    throw new AppError(StatusCodes.NOT_FOUND, 'order id not found');
  }

  const result = await Order.findByIdAndDelete(id);
  return result;
};

const updateOrderFromDB = async (id: string, data: Partial<TOrder>) => {
  if (!(await Order.isOrderExists(id))) {
    throw new AppError(StatusCodes.NOT_FOUND, 'order id  not found');
  }
  const result = await Order.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result;
};
const getAllOrderFromDB = async () => {
  const result = await Order.find();
  return result;
};
const getSingleOrderFromDB = async (id: string) => {
  if (!(await Order.isOrderExists(id))) {
    throw new AppError(StatusCodes.NOT_FOUND, 'order id not found');
  }

  const result = await Order.findById(id);
  return result;
};
export const OrderServices = {
  createOrderBikeIntoDB,
  calculateRevenueFromDB,
  deleteOrderFromDB,
  updateOrderFromDB,
  getSingleOrderFromDB,
  getAllOrderFromDB,
};
