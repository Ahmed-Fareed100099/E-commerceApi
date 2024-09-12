import { timeStamp } from 'console';
import{Schema,model} from 'mongoose';
import { products } from './../interfaces/products';
const productSchema = new Schema <products>({
  name: {type:String,required:true ,unique:true},
  description: {type:String,required:true},
  price: {type:Number,required:true},
  stock: {type:Number,required:true},
  priceAfterDiscount:{type:Number},
  ratingAverage:Number,
  ratingCount:Number,
  sold:{type:Number,default:0},
  images:[String],
  category:{type:Schema.Types.ObjectId , ref:'categories'},
  subCategory:{type:Schema.Types.ObjectId,ref:'subcategories'}


},{timestamps:true})
productSchema.pre<products>(/^find/,function(next){
  this.populate({path:'category' ,select:'name'})
  this.populate({path:'subCategory' , select:'name'})
  next();
})
export default model<products>('products', productSchema);