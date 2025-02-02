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

export const UserServices = {
  createUserIntoDB,
};
