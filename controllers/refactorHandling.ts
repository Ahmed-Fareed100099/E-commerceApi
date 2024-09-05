import { Model } from "mongoose"
import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from "express";
import { FilterData } from "../interfaces/FilterData";
export const getAll =<modelType> (model:Model<any>,modelName:string)=>
  asyncHandler(async(req:Request,res:Response , next:NextFunction)=>{
    let filterData:any ={};
    if(req.FilterData){
      filterData = req.FilterData;
    }
    const document:modelType[] = await model.find(filterData)
    res.status(200).json({data:document})
  });
  export const getOne = <modelType>(model:Model<any>,modelName:string)=>
    asyncHandler(async(req:Request , res:Response , next:NextFunction)=>{
      const document:modelType|null = await model.findById(req.params.id)
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
    res.status(200).json({data:document})
  });
export const DeleteOne = <modelType>(model:Model<any>,modelName:string) =>
  asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const document:modelType|any =await  model.findByIdAndDelete(req.params.id)
    res.status(200).json({data:document})
  })  

