import { Document } from "mongoose";
import { Categories } from "./categories";
import { Subcategories } from "./subcategories";

export interface products extends Document{
    
    name: string,
    description: string,
    price: number,
    priceAfterDiscount:number,
    stock: number,
    sold:number,
    image: string,
    category: Categories,
    subCategory:Subcategories,
    cover:string,
    images:string[],
    ratingAverage:number,
    ratingCount:number,
    
}
