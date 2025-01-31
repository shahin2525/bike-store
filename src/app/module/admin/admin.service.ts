import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { User } from '../user/user.model';

const blockUserFromDB = async (id: string) => {
  const user = await User.doesUserExists(id);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user does not found');
  }
  const userStatusDeactivate = user.deactivate;
  if (userStatusDeactivate) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'user is already deactivated ');
  }
  const result = await User.findByIdAndUpdate(
    id,
    { deactivate: true },
    { new: true, runValidators: true },
  );
  return result;
};



// const deleteOrderFromDB = async (id: string) => {
//   const bike = await Bike.doesNotBikeExist(id);
//   if (!bike) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'bike does not found');
//   }

//   const result = await Bike.findByIdAndDelete(id);
//   return result;
// };
export const AdminServices = {
  blockUserFromDB,
  // deleteOrderFromDB,
};
