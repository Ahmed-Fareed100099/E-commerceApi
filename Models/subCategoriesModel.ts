import {Schema , model} from 'mongoose';
import { Subcategories } from '../interfaces/subcategories';
const subcategoriesSchema = new Schema<Subcategories>({
  name:{type:String , required:true, unique:true,trim:true},
  category:{type:Schema.Types.ObjectId , ref:'Categories'},
  image:String,
},{timestamps:true})
export default model<Subcategories>('Subcategories', subcategoriesSchema);