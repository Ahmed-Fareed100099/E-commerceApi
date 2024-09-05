import * as all from './interfaces'
import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './config/db';
import mountRoutes from './Routes';
const app:express.Application = express() ;
app.use(express.json());
dotenv.config();//to run dotenv environment
dbConnection();
mountRoutes(app);
const port = process.env.PORT;
app.listen(port ,()=>{
     console.log(`app is listen on port ${port}`);
  }
)