import { model, Schema } from 'mongoose';
import { BikeModel, TBike } from './bike.interface';

const BikeSchema = new Schema<TBike, BikeModel>(
  {
    name: { type: String, required: [true, 'Name is required.'] },
    brand: { type: String, required: [true, 'Brand is required.'] },
    price: { type: Number, required: [true, 'Price is required.'] },
    category: {
      type: String,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'Electric'],
        message: '{VALUE} is not a valid category.',
      },
      required: [true, 'Category is required.'],
    },
    description: { type: String, required: [true, 'Description is required.'] },
    quantity: { type: Number, required: [true, 'Quantity is required.'] },
    inStock: {
      type: Boolean,
      default: true,
      required: [true, 'inStock is required'],
    },
  },
  {
    timestamps: true,
  },
);

BikeSchema.statics.doesNotBikeExist = async function (id: string) {
  const bikeNotExists = await Bike.findById(id);
  return !bikeNotExists;
};

// StudentSchema.statics.doesNotUserExists = async function (id: string) {
//   const notExistingUser = await Student.findById(id);
//   return !notExistingUser;
// };

export const Bike = model<TBike, BikeModel>('Bike', BikeSchema);
