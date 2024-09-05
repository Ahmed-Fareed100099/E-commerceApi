
import subCategoriesModel from "../Models/subCategoriesModel";
import { Subcategories } from "../interfaces/subcategories";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from 'express';
import express from 'express'
import { Create, DeleteOne, getAll, getOne, updateOne } from "./refactorHandling";
import { FilterData } from "../interfaces/FilterData";

export const FilterSubCategories= (req:Request,res:Response ,next:NextFunction)=>{
  let filterData:FilterData = {};
  if(req.params.categoryId){
    filterData.category = req.params.categoryId;
  }
  req.FilterData = filterData;
  next()
}
const getAllSubCategories = getAll<Subcategories>(subCategoriesModel,'subCategories')
export default getAllSubCategories

export const getSubCategories = getOne<Subcategories>(subCategoriesModel,'subCategories')
export const createSubCategory = Create<Subcategories>(subCategoriesModel,'subcategories')
export const updateSubCategory = updateOne<Subcategories>(subCategoriesModel,'subcategories')
export const DeleteSubCategory = DeleteOne<Subcategories>(subCategoriesModel,'subcategories')