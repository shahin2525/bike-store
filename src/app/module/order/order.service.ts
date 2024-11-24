import { Bike } from '../bike/bike.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderBikeIntoDB = async (payload: TOrder) => {
  const findProductData = await Bike.findById(payload.product);
  // console.log(findProductData);
  if (!findProductData) {
    throw new Error('product data is not found');
  }
  const productQuantity = findProductData?.quantity;

  const payLoadQuantity = payload?.quantity;
  console.log(payLoadQuantity);
  if (productQuantity < payLoadQuantity) {
    throw new Error('insufficient stock');
  }

  const newProductQuantity = productQuantity - payload.quantity;
  console.log(newProductQuantity);

  if (newProductQuantity <= 0) {
    await Bike.findByIdAndUpdate(
      payload.product,
      { inStock: false },
      { new: true, runValidators: true },
    );
  }

  await Bike.findByIdAndUpdate(
    payload.product,
    { quantity: newProductQuantity },
    { new: true, runValidators: true },
  );

  const result = await Order.create(payload);
  return result;
};

export const OrderServices = {
  createOrderBikeIntoDB,
};
