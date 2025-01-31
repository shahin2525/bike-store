import { Model } from 'mongoose';

type TCategory = 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
export type TBike = {
  name: string;
  brand: string;
  price: number;
  model: string;
  category: TCategory;
  description: string;
  quantity: number;
  bikeImage: string;
  stock: boolean;
};
export interface BikeModel extends Model<TBike> {
  // eslint-disable-next-line no-unused-vars
  doesNotBikeExist(id: string): Promise<boolean | null>;
}
// export interface StudentModel extends Model<TStudent> {
//   // eslint-disable-next-line no-unused-vars
//   doesNotUserExists(id: string): Promise<boolean | null>;
// }
