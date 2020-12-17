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
    async getDetialChapter(chapter_id:string):Promise<Chapter>{
        const KEY_CACHE= "CACHE_DETIAL_CHAPTER_"+chapter_id;
        let dataCache= await this.cacheService.get<Chapter>(KEY_CACHE);
        if(dataCache){
            await this.IncrementToManga(dataCache.manga as string);
            return dataCache;
        }
        let chapter = await this.chapterModel.findById(chapter_id);
        if(!chapter){
            throw new HttpException(ERROR_TYPE.CHAPTER_NOT_FOUND,HttpStatus.BAD_REQUEST);
        }
        if(chapter.images.length==0){
            let listImages = await this.getListImagesOnWeb(chapter.url);
            chapter.images=listImages;
            await chapter.save();
        }
        const [beforeChapter,afterChapter]=await Promise.all([
            this.chapterModel.findOne({manga:chapter.manga,index:chapter.index-1}),
            this.chapterModel.findOne({manga:chapter.manga,index:chapter.index+1}),
        ])
        chapter = chapter.toObject();
        chapter.before= beforeChapter?._id ;
        chapter.after = afterChapter?._id ;
        await this.cacheService.set(KEY_CACHE,chapter,1000*60*60*12);
        await this.IncrementToManga(chapter.manga as string);
        return chapter ;
    }
    async getListChapterManga(manga_id:string,page:number,numberItem:number):Promise<Array<Chapter>>{
        const KEY_CACHE= "CACHE_LIST_CHAPTER_"+manga_id+"_"+page+"_"+numberItem;
        let dataCache= await this.cacheService.get<Chapter[]>(KEY_CACHE);
        if(dataCache){
            return dataCache;
        }
        dataCache =await  this.chapterModel.find({
            manga:manga_id
        }).sort({index:-1})
        .skip((page-1)*numberItem)
        .limit(numberItem)
        .select("-images -url -updatedAt -source -manga");
        await this.cacheService.set(KEY_CACHE,dataCache,1000*60*30);
        return dataCache;
    }
    async getListChapterMangaNoCache(manga_id:string):Promise<Array<Chapter>>{
        return this.chapterModel.find({
            manga:manga_id
        }).sort({index:1}).select("-images");
        
    }

    async deleteAllImagesChapter(chapter_id:string):Promise<any>{
        const KEY_CACHE= "CACHE_DETIAL_CHAPTER_"+chapter_id;
        this.cacheService.del(KEY_CACHE); 
        return this.chapterModel.findByIdAndUpdate(chapter_id,{images:[]});
    }
    async deleteAllImagesChapterServer():Promise<any>{
        return this.chapterModel.updateMany({},{images:[]});
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
    private async IncrementToManga(manga_id:string):Promise<void>{
        const KEY_CACHE_VIEW_MANGA= "CACHE_VIEWS_MANGA"+manga_id;
        const dataKey = await this.cacheService.get<number>(KEY_CACHE_VIEW_MANGA);
        if(!dataKey){
            return this.cacheService.set(KEY_CACHE_VIEW_MANGA,1);
        }
        let radomViewsAdd:number = Math.floor(Math.random()*(10-5))+5;
        if(dataKey>=radomViewsAdd){
            await this.mangaService.IncreaseViewsManga(manga_id,radomViewsAdd);
            return await this.cacheService.set(KEY_CACHE_VIEW_MANGA,dataKey-radomViewsAdd+1);
        }
        await this.cacheService.set(KEY_CACHE_VIEW_MANGA,dataKey+1);
    }
}
