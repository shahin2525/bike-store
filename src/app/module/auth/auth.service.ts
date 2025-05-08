import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../error/appError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { hashSync } from 'bcryptjs';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExists(payload?.email);
  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'you are unauthorize');
  }
  const isUserBlock = user.deactivate;
  if (isUserBlock) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'you are deactivated');
  }

  const isPasswordMatch = await User.isPasswordMatch(
    payload.password,
    user.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid password');
  }
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    id: user?._id,
    name: user?.name,
    deactivate: user?.deactivate,
    phone: user?.phone,
    address: user?.address,
    city: user?.city,

    createdAt: user?.createdAt,
    updatedAt: user?.updatedAt,
  };
  const accessToken = jwt.sign(
    {
      data: jwtPayload,
    },
    config.jwt_secret as string,
    { expiresIn: '2d' },
  );
  const refreshToken = jwt.sign(
    {
      data: jwtPayload,
    },
    config.jwt_refresh_secret as string,
    { expiresIn: '20d' },
  );

  return {
    // todo first
    // token: `Bearer ${accessToken}`,
    accessToken,
    refreshToken,
  };
};
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // console.log('user', userData);
  const user = await User.isUserExists(userData?.data?.email);

  // console.log('user', user);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is blocked

  const isUserBlock = user.deactivate;
  if (isUserBlock) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'you are deactivated');
  }

  // checking if the user password is match

  const isPasswordMatch = await User.isPasswordMatch(
    payload.oldPassword,
    user.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid password');
  }

  //hash new password
  const newHashedPassword = hashSync(payload.newPassword, Number(config.salt));
  //todo
  await User.findOneAndUpdate(
    {
      email: userData?.data?.email,
      role: userData?.data?.role,
    },
    {
      password: newHashedPassword,
      // needsPasswordChange: false,
      // passwordChangedAt: new Date(),
      new: true,
    },
  );

  return null;
};
const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'you are unauthorize ');
  }

  const decoded = jwt.verify(token, config.jwt_refresh_secret as string);
  //   console.log(decoded);
  const { data } = decoded as JwtPayload;
  const { email } = data;
  const user = await User.isUserExists(email);
  if (!user) {
    throw new AppError(StatusCodes.FORBIDDEN, 'you are unauthorize ');
  }
  const isBlocked = user.deactivate;
  if (isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'you are deactivated ');
  }
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(
    {
      data: jwtPayload,
    },
    config.jwt_secret as string,
    { expiresIn: '2d' },
  );

  // console.log(accessToken);
  return {
    accessToken,
  };
};

export const LoginServices = {
  loginUser,
  changePassword,
  refreshToken,
};
