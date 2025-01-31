import { Model, Types } from 'mongoose';

export type TOrder = {
  email: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
};

export interface OrderModel extends Model<TOrder> {
  // eslint-disable-next-line no-unused-vars
  isOrderExists(id: string): Promise<TOrder | null>;
}
