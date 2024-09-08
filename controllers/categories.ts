import { NextFunction } from "express";
import categoriesModel from "../Models/categoriesModel";
import { Categories } from "../interfaces/categories";

import { Create, DeleteOne, getAll , getOne, updateOne } from "./refactorHandling";

export const getAllCategories= getAll<Categories>(categoriesModel,'Categories');
export const createCategory = Create<Categories>(categoriesModel,'categories')
export const getCategory = getOne<Categories>(categoriesModel,'categories')
export const updateCategory = updateOne<Categories>(categoriesModel,'categories')
export const deleteCategory = DeleteOne<Categories>(categoriesModel,'categories')