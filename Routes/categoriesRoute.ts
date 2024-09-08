import {Router} from 'express';
import { createCategory, getCategory ,updateCategory ,deleteCategory, getAllCategories} from '../controllers/categories';
import subCategoriesRoute from './subCategoriesRoute';
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from '../utils/validators/categoriesValidator';

const categoriesRoute:Router = Router()
categoriesRoute.use('/:categoryId/subcategories',subCategoriesRoute)
 categoriesRoute.route('/')
 .get(getAllCategories)
 .post(createCategoryValidator,createCategory)
 export default categoriesRoute
 categoriesRoute.route('/:id')
 .get(getCategoryValidator,getCategory)
 .put(updateCategoryValidator,updateCategory)
 .delete(deleteCategoryValidator,deleteCategory)