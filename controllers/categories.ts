import { NextFunction } from "express";
import categoriesModel from "../Models/categoriesModel";
import { Categories } from "../interfaces/categories";
import asyncHandler from "express-async-handler";
import express from 'express'
export const getall = asyncHandler (async(req:express.Request ,res:express.Response ,next: NextFunction ) => {
  const categories:Categories[] = await categoriesModel.find()
  res.status(200).json({data : categories});
})
export const createCategory = asyncHandler(async (req:express.Request ,res:express.Response ,next: NextFunction) => {
  const categoryCreated:Categories = await categoriesModel.create(req.body)
  res.status(201).json({data:categoryCreated})
  
})
export const getCategory = asyncHandler(async(req:express.Request,res:express.Response,next:express.NextFunction) => {
  const category:Categories | null= await categoriesModel.findById(req.params.id)
  res.status(200).json({data:category})
})
export const updateCategory = asyncHandler(async(req:express.Request,res:express.Response , next:express.NextFunction)=>{
  const categoryUpdated = await categoriesModel.findByIdAndUpdate(req.params.id,req.body, {new:true})
  res.status(200).json({ data: categoryUpdated });
})
export const deleteCategory = asyncHandler(async(req:express.Request,res:express.Response , next:express.NextFunction)=>{
  const categoryDeleted = await categoriesModel.findByIdAndDelete(req.params.id)
  res.status(204).json();
})