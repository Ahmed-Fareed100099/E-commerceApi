import { Document } from "mongoose";

export interface Categories extends Document{
  name:{ required: true, unique: true, type: string},
  image:string
}
