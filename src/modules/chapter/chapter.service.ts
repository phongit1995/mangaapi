import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ERROR_TYPE } from 'src/common/constants/error';
import { Chapter } from 'src/database/chapter.model';
import { RequestService } from 'src/shared/services/request.service';
import { MangaService } from '../manga/manga.service';
import * as cheerio from 'cheerio';
import * as _eval from 'eval';
import { CacheService } from 'src/shared/services/cache/cache.service';

@Injectable()
export class ChapterService {
    constructor(
        @InjectModel("chapter")private chapterModel:Model<Chapter>,
        private mangaService:MangaService,
        private requestService:RequestService,
        private cacheService:CacheService
    ){}
    async getDetialChapter(chapter_id:string):Promise<any>{
        let chapter = await this.chapterModel.findById(chapter_id);
        if(!chapter){
            throw new HttpException(ERROR_TYPE.CHAPTER_NOT_FOUND,HttpStatus.BAD_REQUEST);
        }
        if(chapter.images.length==0){
            let listImages = await this.getListImagesOnWeb(chapter.url);
            chapter.images=listImages;
            await chapter.save();
        }
        return chapter ;
    }
    async getListChapterManga(manga_id:string):Promise<Array<Chapter>>{
        return this.chapterModel.find({
            manga:manga_id
        }).sort({index:1}).select("-images");
    }
    async deleteAllImagesChapter(chapter_id:string):Promise<any>{
        return this.chapterModel.findByIdAndUpdate(chapter_id,{images:[]});
    }
    private async getListImagesOnWeb(url:string):Promise<Array<string>>{
        const result = await this.requestService.getMethod<string>(url);
        const $ = cheerio.load(result);
        let listImages:string[]=[];
         $(".reading-detail > .page-chapter > img").each(function(){
            let images= $(this).attr("src");
            images = images.indexOf("http")>=0 ?images:images.replace("//","http://");
            listImages.push(images);
        })
        return listImages ;
    }
    async createNewChapter(manga_id:string,url:string,name:string,index:number,source:string){
        return this.chapterModel.create({manga:manga_id,index:index,title:name,source:source,url:url})
    }
}
