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
//getListLinkInPage();
// Get ALL Link In Chapter
// for (let i=1;i<=518;i++){
//     let job = queue.create("getLinkCommic",i).attempts(3).save(function(error) {
//         if (!error) console.log(job.id);
//         else console.log(error);
//     });
// }
// queue.process("getLinkCommic",8,function(job,done){
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
//getDetialComic("http://www.nettruyen.com/truyen-tranh/tuong-quan-moi-len-giuong-25476","5fabab8ff6b9654114cf7dfb");
listCommitNotUpdate().then(data=>{
    data.forEach((item)=>{
        let job = queue.create("getChapterComic",{url:item.url,id:item._id}).attempts(3).save(function(error) {
            if (!error) console.log(job.id);
            else console.log(error);
        });
        
    })
})
queue.process("getChapterComic",6, function(job,done){
    getDetialComic(job.data.url,job.data.id).then((data)=>{
        console.log(job.data.url + " : So Page " + data.total + "  List :" + data.update);
        done()
    }).catch(error=>{
        console.log(error);
        console.error("Lỗi URL:" + job.data.url);
    })
})
kue.app.listen(5000);