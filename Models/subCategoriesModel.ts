import {Schema , model} from 'mongoose';
import { Subcategories } from '../interfaces/subcategories';
const subcategoriesSchema = new Schema<Subcategories>({
  name:{type:String , required:true, unique:true,trim:true},
  image:String,
  category:{type:Schema.Types.ObjectId , ref:'Categories'}
},{timestamps:true})
export default model<Subcategories>('Subcategories', subcategoriesSchema);