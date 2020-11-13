const request = require("request-promise");
let mangaDB = require( './../model/manga');
let  fs = require( 'fs');
let path = require ( 'path');
// import chapterDB from './../model/chapter';
// import {MANGA_TYPE} from './../constant';
let {LIST_GENDER, MANGA_TYPE} = require("./../constant");
let cheerio =require( 'cheerio');
const URL = "https://bato.to/latest?page=";
const listUserAgent = JSON.parse(fs.readFileSync(path.join(__dirname,"./../userAgent.json"),'utf-8'));
const BASE_URL="https://bato.to";
 const  getListUrlInPage = async (page)=>{
    const options = {
        uri:URL+page,
        method:'get',
        headers:{
            Referer:BASE_URL,
            'User-Agent': listUserAgent[Math.floor(Math.random()*listUserAgent.length)]
        }
    }
    let dataResult = await request(options);
    dataResult = JSON.parse(dataResult);
    const $ = cheerio.load(dataResult.res.html);
    //console.log($(".item ").length);
    let listUrl = [];
    $(".item ").each(function(index,element){
       let item = cheerio.load(element);
       let listGender = item(".item-genre").text().replace(/\s/g, '').split(",");
       let check = false ;
       listGender.forEach((item)=>{
           if(LIST_GENDER.includes(item)){
               check = true;
           }
       })
       if(!check){
        listUrl.push({
            name:item(".item-text>a").text(),
            url:BASE_URL+item(".item-text>a").attr("href")
        })
       }
    })
    let listPromise = listUrl.map((item)=>{
        return createNewManga(item.url,item.name);
    })
    let data = await Promise.all(listPromise);
}
 const createNewManga = async (url,name)=>{
    return mangaDB.create({url:url,name:name,source:MANGA_TYPE.MANGA_BATO});
}
module.exports = {
    getListUrlInPage,
    createNewManga
}