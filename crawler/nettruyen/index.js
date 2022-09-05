require("dotenv").config();
let mongoose = require("mongoose");
var Redis = require('ioredis');
const redis = require("redis");
let kue = require('kue');
const client = redis.createClient();
let {getListLinkInPage,getDetialComic,listCommitNotUpdate} = require("./getmanga");
client.flushdb( function (err, succeeded) {
    console.log("Xóa Thành Công :" + succeeded); // will be true if successfull
});
mongoose.connect(`${process.env.MONGO_URL}`, {useNewUrlParser: true,useUnifiedTopology: true ,useCreateIndex: true,useFindAndModify:false},(error)=>{
if(error){
    console.log(error);
    console.log('Thất Bại');
}else {
    console.log('Connect successed to mongo');
}
});
let queue  = kue.createQueue({
    redis: {
        createClientFactory: function(){
            return new Redis();
        }
    },
});
// getListLinkInPage(1);
// Get ALL Link In Chapter
// for (let i=1;i<=50;i++){
//     let job = queue.create("getLinkCommic",i).attempts(3).save(function(error) {
//         if (!error) console.log(job.id);
//         else console.log(error);
//     });
// }
// queue.process("getLinkCommic",2,function(job,done){
//     getListLinkInPage(job.data).then((data)=>{
//         console.log("page "+job.data+ " : "+ data);
//         done()
//     })
//     .catch(error=>{
//         console.log(error);
//     })
// })
// END  Get ALL Link In Chapter
// GET ALL CHAPTER IN COMMIC
listCommitNotUpdate().then(data=>{
    data.forEach((item)=>{
        let job = queue.create("getChapterComic",{url:item.url,id:item._id}).delay(500).save(function(error) {
            if (!error) console.log(job.id);
            else console.log(error);
        });
        
    })
})
queue.process("getChapterComic",4, function(job,done){
    getDetialComic(job.data.url,job.data.id).then((data)=>{
        console.log(job.data.url + " : So Page " + data.total + "  List :" + data.update);
        done()
    }).catch(error=>{
        //console.log(error);
        console.error("Lỗi URL:" + job.data.url);
        done()
    })
})
kue.app.listen(5000);