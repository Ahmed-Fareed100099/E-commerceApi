import { Model } from "mongoose"
import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from "express";
import { FilterData } from "../interfaces/FilterData";
import ApiErrors from "../utils/ApiErrors";
import Features from "../utils/validators/features";
export const getAll =<modelType> (model:Model<any>,modelName:string)=>
  asyncHandler(async(req:Request,res:Response , next:NextFunction)=>{
    let filterData:any ={};
    if(req.FilterData){
      filterData = req.FilterData;
    }
    const documentsCount:number = await model.find().countDocuments();
    const features = new Features(model.find(filterData),req.query).sort().fields().search(modelName).pagination(documentsCount);
    const mongooseQuery = features.mongooseQuery;
    const document:modelType[] = await mongooseQuery
    res.status(200).json({data:document})
  });
  export const getOne = <modelType>(model:Model<any>,modelName:string)=>
    asyncHandler(async(req:Request , res:Response , next:NextFunction)=>{
      const document:modelType|null = await model.findById(req.params.id)
      if (!document) {return next(new ApiErrors('document not found',400))}
      res.status(200).json({data:document})
    })
  export const Create =<modelType>(model:Model<any>,modelName:string)=>
    asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const document:modelType|any =await model.create(req.body);
    res.status(201).json({data:document})  
    })
export const updateOne = <modelType>(model:Model<any> , modelName:string) =>
  asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const document:modelType|any = await model.findByIdAndUpdate(req.params.id, req.body,{new:true} )
    if (!document) {return next(new ApiErrors('document not found',400))}
    res.status(200).json({data:document})
  });
export const DeleteOne = <modelType>(model:Model<any>,modelName:string) =>
  asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const document:modelType|any =await  model.findByIdAndDelete(req.params.id)
    if (!document) {return next(new ApiErrors('document not found',400))}
    res.status(200).json({data:document})
  })  

