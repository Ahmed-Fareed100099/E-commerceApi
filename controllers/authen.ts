
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import usersModel from "../Models/usersModel";
import  bcrypt  from 'bcryptjs';
import ApiErrors from "../utils/ApiErrors";
import { createToken } from "../utils/createToken";
import { Users } from "../interfaces/Users";

export const login=asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const user=await usersModel.findOne(req.body.email)
    if(!user || !(await bcrypt.compare(req.body.password,user.password))){
        return next(new ApiErrors('Invalid email or password',401))
    }
    const token=createToken(user._id,user.role)
    res.status(200).json({token,data:user})

})
export const signup=asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const user:Users=await usersModel.create(req.body)
    const token=createToken(user._id,user.role)
    res.status(200).json({token,data:user})

})