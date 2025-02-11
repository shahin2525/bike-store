import { RequestHandler } from 'express';
import { UserServices } from './user.service';

import StatusCodes from 'http-status-codes';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;

    const result = await UserServices.createUserIntoDB(data);
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'User registered successfully',
      statusCode: StatusCodes.CREATED,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get all user
const getAllUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserServices.getAllUserFromDB();
    res.status(200).json({
      status: true,
      message: 'Users retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get single user
const getSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await UserServices.getSingleUserFromDB(id);
    res.status(200).json({
      status: true,
      message: 'user retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.productId;
    await UserServices.deleteUserFromDB(id);
    res.status(200).json({
      status: true,
      message: 'User deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
};
