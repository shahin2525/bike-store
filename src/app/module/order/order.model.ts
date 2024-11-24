import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const OrderSchema = new Schema<TOrder>(
  {
    email: { type: String, required: [true, 'email is required'] },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Bike',
      required: [true, 'bike is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'quantity is required'],
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: [true, 'total price is required'],
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

// 3. Create a Model.
export const Order = model<TOrder>('Order', OrderSchema);
