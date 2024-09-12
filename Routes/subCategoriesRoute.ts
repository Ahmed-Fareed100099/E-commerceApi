import { Router } from "express";
import getAllSubCategories, { createSubCategory, DeleteSubCategory, FilterSubCategories, getSubCategories, updateSubCategory } from "../controllers/subcategories";
import { createSubCategoryValidator, deleteSubcategoryValidator, getSubCategoryValidator } from "../utils/validators/subCategoriesValidator";
import { updateCategoryValidator } from "../utils/validators/categoriesValidator";
import productsRoute from "./productsRoute";
const subCategoriesRoute:Router = Router({mergeParams:true})
subCategoriesRoute.use('/:subcategoryId/products',productsRoute)
subCategoriesRoute.route('/')
.get(FilterSubCategories,getAllSubCategories)
.post(createSubCategoryValidator,createSubCategory)
subCategoriesRoute.route('/:id')
.get(getSubCategoryValidator,getSubCategories)
.put(updateCategoryValidator,updateSubCategory)
.delete(deleteSubcategoryValidator,DeleteSubCategory)
export default subCategoriesRoute