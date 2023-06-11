import type { Response } from "express";

type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
};

const sendResponse = <T>(res: Response, data: IApiResponse<T>) => {
  const responseData = {
    success: data.success,
    message: data.message,
    data: data.data,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
