import {Schema , model} from 'mongoose';
import { Subcategories } from '../interfaces/subcategories';
const subcategoriesSchema = new Schema<Subcategories>({
  name:{type:String , required:true, unique:true,trim:true},
  category:{type:Schema.Types.ObjectId , ref:'categories'},
  image:String,
},{timestamps:true})
subcategoriesSchema.pre<Subcategories>(/^find/,function(next){
  this.populate({path:'category' , select : 'name'})
  next();
}) 
export default model<Subcategories>('subcategories', subcategoriesSchema);























// import { Schema, model } from 'mongoose';
// import { Subcategories } from '../interfaces/subcategories';

// const subcategoriesSchema = new Schema<Subcategories>({
//   name: { type: String, required: true, unique: true, trim: true },
//   category: { type: Schema.Types.ObjectId, ref: 'categories' },
//   image: String,
// }, { timestamps: true })

// subcategoriesSchema.pre<Subcategories>(/^find/,function(next){
//   this.populate()
// })

// export default model<Subcategories>('subcategories', subcategoriesSchema);