import { Injectable, Logger } from '@nestjs/common';
import { Cron ,Timeout } from '@nestjs/schedule';
import { ChapterService } from 'src/modules/chapter/chapter.service';
import { MangaService } from 'src/modules/manga/manga.service';
import { RequestService } from 'src/shared/services/request.service';
import * as cheerio from 'cheerio';
import {xorBy} from 'lodash';
const BASE_URL="https://bato.to";
@Injectable()
export class TasksService {
constructor(private mangaService:MangaService,
    private chapterService:ChapterService,
    private requestService:RequestService){}
    private readonly logger = new Logger(TasksService.name);
    private readonly URL_WEBSITE:string="http://www.nettruyen.com/";
  @Timeout(1000)
  async handleCron() {
    this.logger.debug(Date.now());
    await this.getListMangaNews();
  }
  async getListMangaNews(){
      let listLinkURL = await this.getListUrlNewsManga();
      console.log("total Link In Web :" +listLinkURL.length);
      let listMangaNeedUpdate = await this.mangaService.getListMangaByListUrl(listLinkURL);
      console.log("total Link In DB :" +listMangaNeedUpdate.length);
      const ListPromiseUpdateManga = listMangaNeedUpdate.map(item=>this.updateMangaInfo(item));
      await Promise.all(ListPromiseUpdateManga);
      //await this.updateMangaInfo(listMangaNeedUpdate[1]);
  }
  private async getListUrlNewsManga():Promise<string[]>{
      const resultFetch = await this.requestService.getMethod<string>(this.URL_WEBSITE);
      const $ = cheerio.load(resultFetch);
      let listLink:string[] = [];
      $(".item").each(function(index,element){
          let link = cheerio.load(element)("figure > div > a ").attr("href");
          if(link) listLink.push(link);
      })
      return listLink;
  }
  private async updateMangaInfo(manga_info:{_id?:string,url?:string}){
      const ListChapterInDb = await this.chapterService.getListChapterManga(manga_info._id);
      console.log("list Chapter In DB : "+ListChapterInDb.length);
      let listChapterOnWeb = await this.getListChapterFromWeb(manga_info.url);
   
      let ListChapterNeedUpdate = xorBy(listChapterOnWeb,ListChapterInDb,'url');
      if(ListChapterNeedUpdate.length==0){
        return true;
      }
      console.log(ListChapterNeedUpdate);
      const ArrayPromiseInsertChapter = await ListChapterNeedUpdate.map((item)=>{
          return this.chapterService.createNewChapter(manga_info._id,item.url,item.name,item.index,item.source);
      })
      const resultInsertChapter =await Promise.all(ArrayPromiseInsertChapter);
      const listIdChapterInsert:string[] = resultInsertChapter.map(item=>item._id);
      await this.mangaService.updateNewChapter(manga_info._id,listIdChapterInsert);
      console.log("update succes manga_id : "+ manga_info._id);
  }
  private async getListChapterFromWeb(url:string){
      const resultFetch = await this.requestService.getMethod<string>(url);
      const $ = cheerio.load(resultFetch);
      let ListChapter=[];
      $("#nt_listchapter > nav > ul>li:not(:first-child)").each(function(index,element){
          let object={};
          let elementDetial = cheerio.load(element) ;
          object["url"] = elementDetial("div.col-xs-5.chapter > a").attr("href");
          object["name"] = elementDetial("div.col-xs-5.chapter").text().replace(/\n/g, "");
          if( object["url"]){
            ListChapter.push(object);
          }
      })
      ListChapter = ListChapter.reverse().map((item,index)=>{item.index = index+1;return item });
      return ListChapter;
  }
}