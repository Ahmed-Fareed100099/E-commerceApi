import { NextFunction, Request, Response } from "express";
import { products } from "../interfaces/products";
import productsModel from "../Models/productsModel";
import { Create, DeleteOne, getAll, getOne, updateOne } from "./refactorHandling";
import { FilterData } from "../interfaces/FilterData";
export const filterProducts = (req:Request,res:Response,next:NextFunction)=>{
    const filterData:FilterData = {};
    if(req.params.subcategoryId){
      filterData.subCategory = req.params.subcategory;
    }
    req.FilterData = filterData;
    next();
}
export const getAllProducts= getAll<products>(productsModel,'products');
export const createProduct = Create<products>(productsModel,'products')
export const getProduct = getOne<products>(productsModel,'products')
export const updateProduct = updateOne<products>(productsModel,'products')
export const deleteProduct = DeleteOne<products>(productsModel,'products')