import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './config/db';
import categoriesRoute from './Routes/categoriesRoute';
import { Subcategories } from './interfaces/subcategories';
import subCategoriesRoute from './Routes/subCategoriesRoute';
const app:express.Application = express() ;
app.use(express.json());
dotenv.config();//to run dotenv environment
dbConnection();
 app.use('/api/v1/categories',categoriesRoute)
app.use('/api/v1/subCategories',subCategoriesRoute)
const port = process.env.PORT;
app.listen(port ,()=>{
     console.log(`app is listen on port ${port}`);
  }
)