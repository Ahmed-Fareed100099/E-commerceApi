import * as all from './interfaces'
import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './config/db';
import mountRoutes from './Routes';
import { Server } from 'http';
const app:express.Application = express() ;
app.use(express.json());
dotenv.config();//to run dotenv environment
dbConnection();
mountRoutes(app);
const port = process.env.PORT;
let server:Server;
server = app.listen(port ,()=>{
     console.log(`app is listen on port ${port}`);
  })
  server.on('unhandledRejection',(err:Error)=>{
    console.error(`unhandledRejection Error : ${err.name} | ${err.message}`)
    server.close(()=>{
      console.error(`application is shutting down`);
      process.exit(1);
    })
  })