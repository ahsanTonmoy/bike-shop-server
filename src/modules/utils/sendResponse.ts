import { Response } from "express";
type TSuccessResponse<T> = {
  success: boolean;
  message: string;
  statusCode: number;
  data: T | T[] | null;
};
const sendResponse = <T>(res: Response, data: TSuccessResponse<T>) => {
  res.status(data.statusCode).json({
    success: true,
    message: data.message,
    statusCode: data.statusCode,
    data: data.data,
  });
};
export default sendResponse;
