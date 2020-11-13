let mongoose = require("mongoose");
let {MANGA_TYPE} = require("./../constant");
let Schema = mongoose.Schema ;
let chapter = new Schema({
    manga:{
        type:Schema.Types.ObjectId ,
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
chapter.index({manga:1});
module.exports  = mongoose.model("chapter",chapter);