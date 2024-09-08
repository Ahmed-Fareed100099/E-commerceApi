import { Document } from "mongoose";
import { Categories } from "./categories";

export interface Subcategories extends Document{

  name:{type:string , required:true , unique:true, trim:true  },
  image:string;
  category:Categories;
  
}