import { RequestHandler } from 'express';
import { AdminServices } from './admin.service';
import { StatusCodes } from 'http-status-codes';

const deactivateUser: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.userId;
    // console.log(userData);
    await AdminServices.blockUserFromDB(id);
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'User deactivate successfully',
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
};

// const deleteOrder: RequestHandler = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     // console.log(userData);
//     await AdminServices.deleteOrderFromDB(id);
//     res.status(StatusCodes.OK).json({
//       success: true,
//       message: 'Order deleted successfully',
//       statusCode: StatusCodes.OK,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const AdminController = {
  deactivateUser,
};
