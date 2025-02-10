import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  // const user = await User.isUserExists(payload.email)
  if (await User.isUserExists(payload.email)) {
    throw new Error('user is already exists');
  }
  const result = await User.create(payload);
  return result;
};
const getSingleUserFromDB = async (id: string) => {
  if (await User.doesUserExists(id)) {
    throw new Error('user id  does not exist');
  }

  const result = await User.findById(id);
  return result;
};
const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};
export const UserServices = {
  createUserIntoDB,
  getSingleUserFromDB,
  getAllUserFromDB,
};
