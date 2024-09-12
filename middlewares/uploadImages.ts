import { Request } from "express";
import multer from "multer";
import ApiErrors from "../utils/ApiErrors";
import { FileFields } from "../interfaces/UploadFiles";

const uploadOptions = (): multer.Multer =>{
  const multerStorage = multer.memoryStorage()
  function multerFilter (req:Request , file:Express.Multer.File , cb:multer.FileFilterCallback){
    if (file.mimetype.startsWith('image')){cb(null,true)}
    else{
      cb(new ApiErrors('Not an image! Please upload only images', 400))
    }
  }
   const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
   return upload;
}
export const uploadSingleImage = (fieldName: string) => uploadOptions().single(fieldName);
export const uploadMultiImages = (fields: FileFields[]) => uploadOptions().fields(fields);