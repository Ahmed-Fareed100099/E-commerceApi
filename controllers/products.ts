import { NextFunction, Request, Response } from "express";
import { products } from "../interfaces/products";
import productsModel from "../Models/productsModel";
import { Create, DeleteOne, getAll, getOne, updateOne } from "./refactorHandling";
import { FilterData } from "../interfaces/FilterData";
import multer, { Multer }  from "multer";
import ApiErrors from "../utils/ApiErrors";
import asyncHandler  from 'express-async-handler';
import { uploadMultiImages } from "../middlewares/uploadImages";
import sharp from "sharp";
export const uploadProductImages = uploadMultiImages([{ name: 'cover', maxCount: 1 }, { name: 'images', maxCount: 10}])
/*export const resizeProductImages = asyncHandler(async (req: Request, res:Response, next: NextFunction) => {
  /*if(req.file){
  const imgName=`products-${Date.now()}.webp`
  await sharp(req.file!.buffer)
  .resize(500,500)
  .toFormat('webp')
  .webp({quality:95})
  .toFile(`uploads/products/${imgName}`)
  req.body.cover = imgName;
  }
  next();
})*/
export const resizeProductImages= asyncHandler( async(req:Request,res:Response,next:NextFunction)=>{
  if (req.files) {
    if (req.files.cover) {
      const imgName = `product-${Date.now()}-cover.webp`
      await sharp(req.files.cover[0].buffer)
        .resize(500, 500)
        .toFormat('webp')
        .webp({ quality: 95 })
        .toFile(`uploads/products/${imgName}`)
      req.body.cover = imgName;
    }
    if (req.files.images) {
      req.body.images = [];
      await Promise.all(req.files.images.map(async (image: any, index: number) => {
        const imgName = `product-${Date.now()}N${index}-.webp`;
        await sharp(image.buffer)
          .toFormat('webp')
          .webp({ quality: 95 })
          .toFile(`uploads/products/${imgName}`);
        req.body.images.push(imgName);
      }
    ))}
  }
next()
})

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