import * as mongoose  from 'mongoose';
export const categorySchema= new mongoose.Schema({
    name:String,
    image:String,
    enable:{
        type:Boolean,
        default:true
    }
},{timestamps:true})
export interface Category extends mongoose.Document {
    name?:string,
    image?:string,
    enable?:boolean
}