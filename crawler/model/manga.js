let mongoose = require("mongoose");
let {MANGA_TYPE,TYPE_STATUS_MANGA} = require("./../constant");
let Schema = mongoose.Schema ;
let manga = new Schema({
    name:String,
    author:String,
    category:[
        {type:String}
    ],
    image:String,
    views:{
        type:Number,
        default:0
    },
    description:String,
    url:String,
    manga_status:{
        type:Number,
        default:TYPE_STATUS_MANGA.ON_GOING
    },
    chapters:[
        {type:mongoose.Types.ObjectId,
        ref:'chapter'}
    ],
    chapter_update:{
        type:Date,
        default:Date.now
    },
    enable:{
        type:Boolean,
        default:true
    },
    source:{
        type:String,
        default:MANGA_TYPE.MANGA_BATO
    }
},{timestamps:true})
module.exports  = mongoose.model("manga",manga);