import { Router } from "express";
import getAllSubCategories, { createSubCategory, DeleteSubCategory, FilterSubCategories, getSubCategories, updateSubCategory } from "../controllers/subcategories";
const subCategoriesRoute:Router = Router({mergeParams:true})
subCategoriesRoute.route('/')
.get(FilterSubCategories,getAllSubCategories)
.post(createSubCategory)
subCategoriesRoute.route('/:id')
.get(getSubCategories)
.put(updateSubCategory)
.delete(DeleteSubCategory)
export default subCategoriesRoute