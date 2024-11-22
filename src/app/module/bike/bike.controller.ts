import { RequestHandler } from 'express';
import { BikeServices } from './bike.service';

const createBike: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await BikeServices.createBikeIntoDB(data);
    res.status(200).json({
      message: 'bike  created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllBike: RequestHandler = async (req, res, next) => {
  try {
    const result = await BikeServices.getAllBikeFromDB();
    res.status(200).json({
      success: true,
      message: 'get all bike successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const BikeControllers = {
  createBike,
  getAllBike,
};
