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
      status: true,
      message: 'Bikes retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// get single bike
const getSingleBike: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const result = await BikeServices.getSingleBikeFromDB(id);
    res.status(200).json({
      status: true,
      message: 'Bike retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// update bike
const updateBike: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const data = req.body;
    const result = await BikeServices.updateBikeFromDB(id, data);
    res.status(200).json({
      status: true,
      message: 'Bike updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// delete bike
const deleteBike: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.productId;
    await BikeServices.deleteBikeFromDB(id);
    res.status(200).json({
      status: true,
      message: 'Bike deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
export const BikeControllers = {
  createBike,
  getAllBike,
  getSingleBike,
  updateBike,
  deleteBike,
};
