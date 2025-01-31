/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../config';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: err?.message ? err.message : 'validation error',
    statusCode: err?.StatusCode ? err?.StatusCode : StatusCodes.BAD_REQUEST,
    error: err,

    // stack: err?.stack ? err.stack : null,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};
export default errorHandler;
