import {Router} from 'express';
import { createCategory, getall ,getCategory ,updateCategory ,deleteCategory} from '../controllers/categories';

const categoriesRoute:Router = Router()
 categoriesRoute.route('/')
 .get(getall)
 .post(createCategory)
 export default categoriesRoute
 categoriesRoute.route('/:id')
 .get(getCategory)
 .put(updateCategory)
 .delete(deleteCategory)