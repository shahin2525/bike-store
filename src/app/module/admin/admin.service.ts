import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { User } from '../user/user.model';
import { Bike } from '../bike/bike.model';

const blockUserFromDB = async (id: string) => {
  const user = await User.doesUserExists(id);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user does not found');
  }
  const userStatusBlocked = user.isBlocked;
  if (userStatusBlocked) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'user is already blocked ');
  }
  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true, runValidators: true },
  );
  return result;
};

const deleteBikeFromDB = async (id: string) => {
  const bike = await Bike.doesNotBikeExist(id);
  if (!bike) {
    throw new AppError(StatusCodes.NOT_FOUND, 'bike does not found');
  }

  const result = await Bike.findByIdAndDelete(id);
  return result;
};
export const AdminServices = {
  blockUserFromDB,
  deleteBikeFromDB,
};
