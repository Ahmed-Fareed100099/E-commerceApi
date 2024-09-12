import { RequestHandler } from "express";
import { check } from "express-validator";
import subCategoriesModel from "../../Models/subCategoriesModel";
import validatorMiddleware from "../../middlewares/validatorMiddlewares";
import productsModel from "../../Models/productsModel";
import { products } from "../../interfaces/products";
import { DeleteOne } from "../../controllers/refactorHandling";

export const createSubCategoryValidator:RequestHandler[]=[
  check('name')
  .notEmpty().withMessage('name is required')
  .isLength({min:2,max:50}).withMessage('name length must be between 2&50')
  .custom(async(val)=>{
      const subCategory = await subCategoriesModel.findOne({name:val})
      if(subCategory){throw new Error('this subCategory is already exist')}
      return true;
  }),
  validatorMiddleware
]
export const getSubCategoryValidator:RequestHandler[]=[
  check('id')
  .isMongoId().withMessage('invalid mongoId'),
  validatorMiddleware
]
export const updateSubCategoryValidator:RequestHandler[]=[
  check('id')
  .isMongoId().withMessage('invalid mongoId'),
  check('name')
  .notEmpty().withMessage('name is required')
  .isLength({min:2,max:50}).withMessage('name length must be between 2&50'),
  validatorMiddleware
]
export const deleteSubcategoryValidator:RequestHandler[] = [
  check('id')
  .isMongoId().withMessage('invalid mongoId')
  .custom(async(val)=>{
    const product =await productsModel.find({subCategory : val})
    if(product.length>0){
      const bulkOption = product.map((product:products)=>({
        deleteOne:{filter:{_id:product._id}}
      }))
      await productsModel.bulkWrite(bulkOption)
    }
  }),
  validatorMiddleware
]


