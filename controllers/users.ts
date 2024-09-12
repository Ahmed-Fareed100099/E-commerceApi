
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import { NextFunction, Request, Response } from 'express'
import { uploadSingleImage } from '../middlewares/uploadImages'
import sharp from 'sharp'
import { Create, DeleteOne, getAll, getOne } from './refactorHandling'
import { Users } from '../interfaces/Users'
import usersModel from '../Models/usersModel'
// manger

export const getAllUsers=getAll<Users>(usersModel,'users')
export const createUser=Create<Users>(usersModel,'users')
export const getUser=getOne<Users>(usersModel,'users')
export const deleteUser=DeleteOne<Users>(usersModel,'users')
export const updateUser=asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const user=await usersModel.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        image:req.body.image,
        phone:req.body.phone,
        active:req.body.active,

    },{new:true})
    res.status(200).json({data:user})
})
export const changeUserPassword=asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const user=await usersModel.findByIdAndUpdate(req.params.id,{
        password:bcrypt.hash(req.body.password,13),
        passwordChangedAt:Date.now()

    },{new:true})
})
export const uploadUserImage=uploadSingleImage('image')
export const resizeUserImage = asyncHandler(async (req: Request, res:Response, next: NextFunction) => {
    if(req.file){
        const imgName=`user-${Date.now()}.webp`
        await sharp(req.file.buffer)
        .toFormat('webp')
        .webp({quality:95})
        .toFile(`uploads/users/${imgName}`)
        req.body.image = imgName;
    }
    next()
})
// user Logged


