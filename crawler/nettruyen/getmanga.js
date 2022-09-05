const request = require("request-promise");
let mangaDB = require( '../model/manga');
let chapterDb = require("./../model/chapter");
let  fs = require( 'fs');
let path = require ( 'path');
let cheerio = require("cheerio");
let {LIST_GENDER, MANGA_TYPE} = require("../constant");
const UserAgent = require('./../userAgent.json');
const URL_PAGE="http://www.nettruyenme.com/?page=";
const getListLinkInPage= async (page)=>{
    let url = URL_PAGE + page;
    const options={
        url:url,
        method:'get',
        headers: {
            "User-Agent": "PostmanRuntime/7.29.2",
            Accept: "*/*",
            "Cache-Control": "no-cache",
            "Postman-Token": "70dda507-a90e-4da8-b7e1-6b33093676e9",
            Host: "www.nettruyenme.com",
            Connection: "keep-alive",
          },
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
        headers: {
            "User-Agent": "PostmanRuntime/7.29.2",
            Accept: "*/*",
            "Cache-Control": "no-cache",
            "Postman-Token": "70dda507-a90e-4da8-b7e1-6b33093676e9",
            Host: "www.nettruyenme.com",
            Connection: "keep-alive",
          },
    })
    const $ = cheerio.load(data);
    let listChapter =[];
    const listGenders = [];
    let objects ={
        crawler:true
    };
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
       crawler:false
    })
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