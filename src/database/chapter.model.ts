import * as mongoose  from 'mongoose';
import { Manga, MANGA_TYPE } from './manga.model';
export const chapterSchema:mongoose.Schema = new mongoose.Schema({
    manga:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"manga"
    },
    index:{
        type:Number,
        default:1
    },
    title:{
        type:String
    },
    url:{
        type:String
    },
    images:[
        {
            type:String
        }
    ],
    source:{
        type:String,
        default:MANGA_TYPE.MANGA_BATO
    }
},{timestamps:true})
chapterSchema.index({source:1})
export interface Chapter extends mongoose.Document {
    manga:string|Manga,
    index?:number,
    source?:string,
    images?:string[],
    title?:string,
    url?:string,
    status_update_images?:boolean,
    before?:string,
    after?:string
}