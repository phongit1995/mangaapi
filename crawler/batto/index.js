require("dotenv").config();
let mongoose = require("mongoose");
var Redis = require('ioredis');
const redis = require("redis");
let kue = require('kue');
const client = redis.createClient();
let {getListUrlInPage} = require("./getmanga");
client.flushdb( function (err, succeeded) {
    console.log("Xóa Thành Công :" + succeeded); // will be true if successfull
});
mongoose.connect(`mongodb://${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, {useNewUrlParser: true,useUnifiedTopology: true ,useCreateIndex: true,useFindAndModify:false},(error)=>{
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
//getListUrlInPage(2);
for (let i=2;i<=2235;i++){
    let job = queue.create("getlinkmanga",i).attempts(3).save(function(error) {
        if (!error) console.log(job.id);
        else console.log(error);
    });
}
queue.process("getlinkmanga",4,function(job,done){
    getListUrlInPage(job.data).then((data)=>{
        console.log("success" +job.id);
        done()
    })
    .catch(error=>{
        console.log(error);
    })
})