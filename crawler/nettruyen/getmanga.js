const request = require("request-promise");
let mangaDB = require( '../model/manga');
let chapterDb = require("./../model/chapter");
let  fs = require( 'fs');
let path = require ( 'path');
let cheerio = require("cheerio");
let {LIST_GENDER, MANGA_TYPE} = require("../constant");
const UserAgent = require('./../userAgent.json');
const URL_PAGE="http://www.nettruyen.com/?page=";
const getListLinkInPage= async (page)=>{
    let url = URL_PAGE + page;
    const options={
        url:url,
        headers:{
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36",
            "cookie":"_ga=GA1.2.543613398.1594355006; comicvisitor=08df91f0-1872-4f63-93e0-86ced6f15a0d; __cfduid=d7d8b31265b945b9c06ee39945dd11daa1604983952; _gid=GA1.2.1212170875.1606706474; ASP.NET_SessionId=qlwudqiq4sqjfjgwscg3s11t; _gat_gtag_UA_57670566_6=1; cf_clearance=9eebd2e17908990fa50378bd5d7f7a11e4a432a5-1606710167-0-150"
        }
    }
    let resultData = await request(options);
    let $ = cheerio.load(resultData);
    let listCommic = $(".item");
    let listLink = [];
    listCommic.each(function(i,element){
        let linkCommic = cheerio.load(element)("figure > div > a ").attr("href");
        if(linkCommic) {
            listLink.push(linkCommic);
        }
    })
    //console.log(listLink);
    let listPromise = listLink.map(item=>createNewManga(item));
    let dataPromise = await Promise.all(listPromise);
    //console.log(dataPromise.length);
    return dataPromise.length ;
}
const getDetialComic =  async (url,commicId)=>{
    let data = await  request({
        uri:url,
        headers:{
            Referer:"http://www.nettruyen.com",
            'User-Agent': UserAgent[Math.floor(Math.random()*UserAgent.length)],
            "cookie":"_ga=GA1.2.543613398.1594355006; comicvisitor=08df91f0-1872-4f63-93e0-86ced6f15a0d; __cfduid=d7d8b31265b945b9c06ee39945dd11daa1604983952; _gid=GA1.2.1212170875.1606706474; ASP.NET_SessionId=qlwudqiq4sqjfjgwscg3s11t; cf_chl_1=d6a5a0361b3614c; cf_chl_prog=x17; cf_clearance=bff8534ac26e5269bc3fc87f8e546d8c439e5ee4-1606718724-0-150; _gat_gtag_UA_57670566_6=1"
        }
    })
    console.log(url);
    const $ = cheerio.load(data);
    let listChapter =[];
    const listGenders = [];
    let objects ={};
    objects["name"]= $("#item-detail > h1").text();
    objects["author"]=$("#item-detail > div.detail-info > div > div.col-xs-8.col-info > ul > li.author.row > p.col-xs-8").text();
    let status = $("#item-detail > div.detail-info > div > div.col-xs-8.col-info > ul > li.status.row > p.col-xs-8").text();
    if(status=="Đang tiến hành"){
        objects["manga_status"]=0;
    }else {objects["manga_status"]=1; }
    let images = $("#item-detail > div.detail-info > div > div.col-xs-4.col-image > img").attr("src");
    objects["image"]= images.indexOf("http")>0 ?images: images.replace("//","http://");
    let genders = $("#item-detail > div.detail-info > div > div.col-xs-8.col-info > ul > li.kind.row > p.col-xs-8>a");
    let views =$("#item-detail > div.detail-info > div > div.col-xs-8.col-info > ul > li:nth-child(4) > p.col-xs-8").text().replace(/\./g,"");
    if(views.length>15){
        views= $("#item-detail > div.detail-info > div > div.col-xs-8.col-info > ul > li:nth-child(5) > p.col-xs-8").text().replace(/\./g,"");
    }
    if(isNaN(parseInt(views))){
        views= $("#item-detail > div.detail-info > div > div.col-xs-8.col-info > ul > li:nth-child(5) > p.col-xs-8").text().replace(/\./g,"");
    }
    genders.each(function(i,element){
        listGenders.push(cheerio.load(element).text());
    })
    objects["category"]= listGenders ;
    objects["views"]=views ;
    objects["description"]=$("#item-detail > div.detail-content > p").text();
    let chapterSelect = $("#nt_listchapter > nav > ul>li:not(:first-child)");
    chapterSelect.each(function(i,element){
        let object = {};
        let elementDetial = cheerio.load(element) ;
        object.url = elementDetial("div.col-xs-5.chapter > a").attr("href");
        object.name = elementDetial("div.col-xs-5.chapter").text().replace(/\n/g, "");
        object.views = elementDetial("div.col-xs-3.text-center.small").text().replace(".","");
        if( object.url){
            listChapter.push(object);
        }
    })
    listChapter = listChapter.reverse().map((item,index)=>{item.index = index+1;return item });    
    let listPromise = listChapter.map((item)=>AddChapter(item.url,item.name,item.index,commicId));
    let dataResult = await Promise.all(listPromise);
    objects["chapters"]=dataResult;
    //console.log(objects);
    await mangaDB.updateOne({_id:commicId},{...objects});
    return {total:dataResult.length,update:dataResult.length} ;
}
const listCommitNotUpdate= ()=>{
    return mangaDB.find({
        $or:[
            {
                description:{ $exists: false }
            },
            {
                chapters:{$size:0}
            }
        ]
    }).limit(2000);
}

const createNewManga = async (url)=>{
    return mangaDB.create({url:url,source:MANGA_TYPE.NET_TRUYEN});
}
const AddChapter = async(url,name,index,comic_id)=>{
    let chapterCreate = await chapterDb.create({
        url:url,
        name:name,
        manga:comic_id,
        index:index,
        source:MANGA_TYPE.NET_TRUYEN
    })
    return chapterCreate._id ;
}

module.exports = {
    getListLinkInPage,
    getDetialComic,
    listCommitNotUpdate
}