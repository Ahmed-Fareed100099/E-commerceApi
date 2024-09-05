import { NextFunction, Request, Response } from "express";
import { customErrors } from "../interfaces/customErrors";

export const GlobalErrors =(err:customErrors,req:Request,res:Response,next:NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'server Error';
    if(process.env.NODE_ENV === 'development'){
      res.status(err.statusCode).json({
      status:err.status,
      err,
      message:err.message,
      stack: err.stack
    })
   }else{
    res.status(err.statusCode).json({
      status:err.status,
      message:err.message,})
   }
  }
