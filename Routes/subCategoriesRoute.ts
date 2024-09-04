import { Router } from "express";
import getAllSubCategories, { createSubCategory, DeleteSubCategory, getSubCategories, updateSubCategory } from "../controllers/subcategories";
const subCategoriesRoute:Router = Router()
subCategoriesRoute.route('/')
.get(getAllSubCategories)
.post(createSubCategory)
subCategoriesRoute.route('/:id')
.get(getSubCategories)
.put(updateSubCategory)
.delete(DeleteSubCategory)
export default subCategoriesRoute