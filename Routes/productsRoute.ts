import { Router } from "express";
import { getAll } from '../controllers/refactorHandling';
import { createProduct, deleteProduct, filterProducts, getAllProducts, getProduct, resizeProductImages, updateProduct, uploadProductImages } from "../controllers/products";
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from "../utils/validators/productValidator";
const productsRoute:Router = Router({mergeParams:true});
productsRoute.route('/')
.get(uploadProductImages,resizeProductImages,filterProducts,getAllProducts)
.post(createProductValidator,createProduct)
productsRoute.route('/:id')
.get(getProductValidator,getProduct)
.put(updateProductValidator,updateProduct)
.delete(deleteProductValidator,deleteProduct)
export default productsRoute;


