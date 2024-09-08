import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddlewares";
import categoriesModel from "../../Models/categoriesModel";
import subCategoriesModel from "../../Models/subCategoriesModel";
import { Subcategories } from "../../interfaces/subcategories";

export const createCategoryValidator:RequestHandler[] = [
  check('name')
  .notEmpty().withMessage('category name required')
  .isLength({min:2,max:50}).withMessage('name length must be between 2 &50')
  .custom(async (val)=>{
    const category = await categoriesModel.findOne({name:val})
    if(category){throw new Error('this category already exist')}
    return true
  }),
  validatorMiddleware
]

export const getCategoryValidator:RequestHandler[] = [
  check('id')
  .isMongoId().withMessage('invalid mongoId'),
  validatorMiddleware
]
export const updateCategoryValidator:RequestHandler[] = [
  check('id')
  .isMongoId().withMessage('invalid mongoId '),
  check('name').optional()
  .notEmpty().withMessage('category name required')
  .isLength({min:2,max:50}).withMessage('name length must be between 2 &50')
  ,
  validatorMiddleware
]
export const deleteCategoryValidator:RequestHandler[] = [
  check('id')
  .isMongoId().withMessage('invalid mongoId')
  .custom(async(val)=>{
    const subcategory =await subCategoriesModel.find({category:val})
    if(subcategory.length>0){
      const bulkOption = subcategory.map((subcategory:Subcategories)=>({
        deleteOne : {filter:{_id:subcategory._id}}
      }))
      await subCategoriesModel.bulkWrite(bulkOption)
    }
  }),
  validatorMiddleware
]