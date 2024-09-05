import {Router} from 'express';
import { createCategory, getCategory ,updateCategory ,deleteCategory, getAllCategories} from '../controllers/categories';
import subCategoriesRoute from './subCategoriesRoute';

const categoriesRoute:Router = Router()
categoriesRoute.use('/:categoryId/subcategories',subCategoriesRoute)
 categoriesRoute.route('/')
 .get(getAllCategories)
 .post(createCategory)
 export default categoriesRoute
 categoriesRoute.route('/:id')
 .get(getCategory)
 .put(updateCategory)
 .delete(deleteCategory)