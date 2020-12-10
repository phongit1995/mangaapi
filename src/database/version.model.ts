import * as mongoose  from 'mongoose';
export enum TYPE_VERSION{
    ANDROID="ANDROID",
    IOS="IOS"
}
export const VersionSchema= new mongoose.Schema({
    name:String,
    support:{
        type:Boolean,
        default:true
    },
    type:{
        type:String,
        default:TYPE_VERSION.ANDROID
    },
    enable:{
        type:Boolean,
        default:true
    }
},{timestamps:true})
export interface Version extends mongoose.Document {
    name?:string,
    support?:boolean,
    type?:string,
    enable?:boolean
}