import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const createBikeIntoDB = async (bike: TBike) => {
  const result = await Bike.create(bike);
  return result;
};
const getAllBikeFromDB = async () => {
  const result = await Bike.find();
  return result;
};
const getSingleBikeFromDB = async (id: string) => {
  if (await Bike.doesNotBikeExist(id)) {
    throw new Error('product id  does not exist');
  }

  const result = await Bike.findById(id);
  return result;
};
const updateBikeFromDB = async (id: string, data: Partial<TBike>) => {
  if (await Bike.doesNotBikeExist(id)) {
    throw new Error('product id  does not exist');
  }
  const result = await Bike.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBikeFromDB = async (id: string) => {
  if (await Bike.doesNotBikeExist(id)) {
    throw new Error('product id  does not exist');
  }
  const result = await Bike.findByIdAndDelete(id);
  return result;
};
export const BikeServices = {
  createBikeIntoDB,
  getAllBikeFromDB,
  getSingleBikeFromDB,
  updateBikeFromDB,
  deleteBikeFromDB,
};
