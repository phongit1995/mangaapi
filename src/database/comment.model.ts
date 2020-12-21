import * as mongoose  from 'mongoose';
const ReplySchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    message:{
        type:String
    }
},{timestamps:true})
export const CommentSchema:mongoose.Schema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    message:{
        type:String
    },
    chapter:{
        type:mongoose.Types.ObjectId,
        ref:'chapter'
    },
    manga:{
        type:mongoose.Types.ObjectId,
        ref:'manga'
    },
    replyCount:{
        type:Number,
        default:0
    },
    reply:[ReplySchema]
},
{timestamps:true})
interface ReplyComment {
    user?:string,
    message?:string
}
export interface Comment extends mongoose.Document {
    user?:string,
    message?:string,
    chapter?:string,
    manga?:string,
    replyCount?:number,
    reply?:Array<ReplyComment>
}