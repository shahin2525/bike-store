import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../module/user/user.interface';
import AppError from '../error/appError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import config from '../config';
import { User } from '../module/user/user.model';
//...requiredRoles: TUserRole[]
const auth = (...requiredRoles: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(req.headers.authorization);
      const token = req.headers.authorization?.split(' ')[1];
      // console.log(token);
      if (!token) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'you are unauthorize 1');
      }
      let decoded;
      try {
        decoded = jwt.verify(token, config.jwt_secret as string);
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      } catch (error) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorize');
      }

      //   console.log(decoded);

      const { data } = decoded as JwtPayload;
      const { email, role } = data;
      const user = await User.isUserExists(email);
      if (!user) {
        throw new AppError(StatusCodes.FORBIDDEN, 'you are unauthorize 2');
      }
      const deactivate = user.deactivate;
      if (deactivate) {
        throw new AppError(StatusCodes.FORBIDDEN, 'you are unauthorize 3');
      }
      // console.log('role', role);
      // console.log('required role', requiredRoles);
      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(StatusCodes.FORBIDDEN, 'you are unauthorize 4');
      }
      req.user = decoded as JwtPayload;
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
