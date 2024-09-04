
import subCategoriesModel from "../Models/subCategoriesModel";
import { Subcategories } from "../interfaces/subcategories";
import asyncHandler from "express-async-handler";
import { NextFunction } from 'express';
import express from 'express'
const getAllSubCategories = asyncHandler(async(req:express.Request , res:express.Response , next:NextFunction)=>{
  const getSubcategories =await subCategoriesModel.find()
  res.status(200).json({data : getSubcategories})
})
export default getAllSubCategories

export const getSubCategories = asyncHandler(async(req:express.Request , res:express.Response , next:NextFunction)=>{
  const getSubCategory:Subcategories|null=await subCategoriesModel.findById(req.params.id)
  res.status(200).json({data : getSubCategory})
})
export const createSubCategory = asyncHandler(async(req:express.Request,res:express.Response,next:express.NextFunction) =>{
  const CreateSubCategory:Subcategories = await subCategoriesModel.create(req.body)
  res.status(201).json({data:CreateSubCategory})

})
export const updateSubCategory = asyncHandler(async(req:express.Request , res:express.Response , next:express.NextFunction)=>{
  const updateSubCategory:Subcategories|null=await subCategoriesModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
  res.status(200).json({data : updateSubCategory})
})
export const DeleteSubCategory = asyncHandler(async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
  const DeletedSubCategory:Subcategories|null=await subCategoriesModel.findByIdAndDelete(req.params.id)
  res.status(200).json({data : DeletedSubCategory})
})