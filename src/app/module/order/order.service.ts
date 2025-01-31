import { Bike } from '../bike/bike.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderBikeIntoDB = async (payload: TOrder) => {
  const findProductData = await Bike.findById(payload.product);

  if (!findProductData) {
    throw new Error('product data is not found');
  }
  const productQuantity = findProductData?.quantity;

  const payLoadQuantity = payload?.quantity;

  if (productQuantity < payLoadQuantity) {
    throw new Error('insufficient stock');
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
export const OrderServices = {
  createOrderBikeIntoDB,
  calculateRevenueFromDB,
};
