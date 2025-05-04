import { Response } from "express";
import mongoose from "mongoose";

export const handleCastError = (
  err: mongoose.Error.CastError,
  res: Response
) => {
  res.status(400).json({
    success: false,
    message: err.message,
    statusCode: 400,
    error: err,
    stack: err.stack,
  });
};
