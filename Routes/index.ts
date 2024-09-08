import { Application, Request, Response,NextFunction } from "express";
import categoriesRoute from "./categoriesRoute";
import subCategoriesRoute from "./subCategoriesRoute";
import { Error } from "mongoose";
import { GlobalErrors } from "../middlewares/globalErrors";
import ApiErrors from "../utils/ApiErrors";
import productsRoute from "./productsRoute";



const mountRoutes = (app:Application)=>{
   app.use('/api/v1/categories',categoriesRoute)
  app.use('/api/v1/subCategories',subCategoriesRoute)
  app.use(`/api/v1/products`,productsRoute)
  app.all('*',(err:Error,req:Request,res:Response,next:NextFunction) => {
    return next(new ApiErrors(`the route${req.originalUrl} not found`,400))
    
  })
  app.use(GlobalErrors)
}
export default mountRoutes;