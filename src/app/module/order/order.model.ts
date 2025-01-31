import { model, Schema } from 'mongoose';
import { OrderModel, TOrder } from './order.interface';

const OrderSchema = new Schema<TOrder, OrderModel>(
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
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  },
);

// 3. Create a Model.
OrderSchema.statics.isOrderExists = async function (id: string) {
  const isOrderExists = await Blog.findById(id);
  return isOrderExists;
};
// 3. Create a Model.
export const Blog = model<TOrder, OrderModel>('Blog', OrderSchema);

export const Order = model<TOrder>('Order', OrderSchema);
