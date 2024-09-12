import { Request, RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddlewares";
import productsModel from "../../Models/productsModel";
import categoriesModel from "../../Models/categoriesModel";
import subCategoriesModel from "../../Models/subCategoriesModel";


export const createProductValidator:RequestHandler[] = [
  check('name')
  .notEmpty().withMessage('category name required')
  .isLength({min:2,max:50}).withMessage('name length must be between 2 &50')
  .custom(async (val)=>{
    const category = await productsModel.findOne({name:val})
    if(category){throw new Error('this product already exist')}
    return true
  }),
  check('description')
  .notEmpty().withMessage('description is required')
  .isLength({min:10,max:500}).withMessage('description length must be between 500'),
  check('stock').optional()
  .isNumeric().withMessage('quantity must be number').toInt()
  .isInt({min:1}).withMessage('stock must be greater than 1') ,
  check('price')
  .notEmpty().withMessage('price required')
  .isNumeric().toFloat().withMessage('price must be a number')
  .isLength({min:1,max:10}).withMessage('price must be between 1 &10')
  .custom((val)=>{
    if(val<= 0 ){throw new Error('price must be greater than 0')}
    return true;
  }),
  check('priceAfterDiscount').optional()
  .isNumeric().withMessage('priceAfterDiscount must be a number')
  .isLength({min:1,max:10}).withMessage('priceAfterDiscount must be between 1&10')
  .custom((val:number ,{req})=>{
    if(val >= req.body.price||val<=0 ){throw new Error('in valid price AfterDiscount')}
    return true;
  }),
  check('stock').optional()
  .isNumeric().withMessage('stock must be a number')
  .isLength({min:1,max:100}).withMessage('stock must be between 1 &10'),
  check('category')
  .notEmpty().withMessage('category required')
  .isMongoId().withMessage('invalid categoryId')
  .custom(async(val:string)=>{
    const category =await categoriesModel.findById(val)
    if(!category){throw new Error('this category does not exist')}
    return true;
  }),
  check('subcategory')
  .notEmpty().withMessage('subcategory required')
  .isMongoId().withMessage('invalid subcategoryId')
  .custom(async(val:string, {req})=>{
    const subcategory =await subCategoriesModel.findById(val)
    if(!subcategory){throw new Error('this subcategory does not exist')}
    if(subcategory.category._id!.toString()!== req.body.category){throw new Error('this .subcategory does not belong to this category')}
    return true;
  })
  ,validatorMiddleware
]

export const getProductValidator:RequestHandler[] = [
  check('id')
  .isMongoId().withMessage('invalid mongoId'),
  validatorMiddleware
]
export const updateProductValidator:RequestHandler[] = [
  check('id')
  .isMongoId().withMessage('invalid mongoId '),
 check('name')
  .optional()
  .isLength({min:2,max:50}).withMessage('name length must be between 2 &50')
  .custom(async (val)=>{
    const category = await productsModel.findOne({name:val})
    if(category){throw new Error('this product already exist')}
    return true
  }),
  check('description')
  .optional()
  .isLength({min:10,max:500}).withMessage('description length must be between 500'),
  check('stock').optional()
  .isNumeric().withMessage('quantity must be number').toInt()
  .isInt({min:1}).withMessage('stock must be greater than 1') ,
  check('price')
  .optional()
  .isNumeric().toFloat().withMessage('price must be a number')
  .isLength({min:1,max:10}).withMessage('price must be between 1 &10')
  .custom((val)=>{
    if(val<= 0 ){throw new Error('price must be greater than 0')}
    return true;
  }),
  check('priceAfterDiscount').optional()
  .isNumeric().withMessage('priceAfterDiscount must be a number')
  .isLength({min:1,max:10}).withMessage('priceAfterDiscount must be between 1&10')
  .custom((val:number ,{req})=>{
    if(val<0 ){throw new Error('in valid price AfterDiscount')}
    return true;
  }),
  check('stock').optional()
  .isNumeric().withMessage('stock must be a number')
  .isLength({min:1,max:100}).withMessage('stock must be between 1 &10'),
  check('category')
  .optional()
  .isMongoId().withMessage('invalid categoryId')
  .custom(async(val:string)=>{
    const category =await categoriesModel.findById(val)
    if(!category){throw new Error('this category does not exist')}
    return true;
  }),
  check('subcategory')
  .optional()
  .isMongoId().withMessage('invalid subcategoryId')
  .custom(async(val:string, {req})=>{
    const subcategory =await subCategoriesModel.findById(val)
    if(!subcategory){throw new Error('this subcategory does not exist')}
    if(subcategory.category._id!.toString()!== req.body.category){throw new Error('this .subcategory does not belong to this category')}
    return true;
  })


  ,validatorMiddleware
]
export const deleteProductValidator:RequestHandler[] = [
  check('id')
  .isMongoId().withMessage('invalid mongoId'),
  validatorMiddleware
]