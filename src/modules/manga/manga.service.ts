import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chapter } from 'src/database/chapter.model';
import { Manga, MANGA_TYPE } from 'src/database/manga.model';
import { CacheService } from 'src/shared/services/cache/cache.service';
import { dtoGetListManga, dtoGetListMangaByCategory, dtoSearchManga } from './manga.dto';

@Injectable()
export class MangaService {
    constructor(@InjectModel('manga' )private mangaModel:Model<Manga>,
    private cacheService:CacheService,
    @InjectModel('chapter' )private chapterModel:Model<Chapter>){}
    async getMangaById(manga_id:string):Promise<Manga>{
        return this.mangaModel.findById(manga_id).select("-chapters");
    }
    async getDetialMangaById(manga_id:string):Promise<Manga>{
        let Manga =  await this.mangaModel.findById(manga_id).select("-chapters");
        if(!Manga.first_chapter){
            const chapter = await this.chapterModel.findOne({manga:manga_id});
            Manga.first_chapter = chapter._id ;
            await Manga.save();
        }
        return Manga ;
    }
    async getMangaDataById(manga_id:string):Promise<Manga>{
        let Manga =  await this.mangaModel.findById(manga_id).select("-chapters");
        return Manga ;
    }
    async getListManga(dataGet:dtoGetListManga):Promise<Manga[]>{
        const KEY_CACHE:string="CACHE_LIST_MANGA_"+dataGet.page+"_"+dataGet.type+"_"+dataGet.numberItem;
        let listManga:Manga[] = await this.cacheService.get<Manga[]>(KEY_CACHE);
        if(listManga){
            console.log("cache");
            return listManga;
        }
        let sortOptions:object={}
        if(dataGet.type==0){
            sortOptions["views"]=-1
        }
        else {
            sortOptions["chapter_update"]=-1;
        }
        listManga = await this.mangaModel.find({enable:true})
        .skip((dataGet.page-1)*dataGet.numberItem)
        .limit(dataGet.numberItem).sort(sortOptions)
        .select("-chapters");
        await this.cacheService.set(KEY_CACHE,listManga,1000*60*30);
        return listManga;
    }
    async getListMangaByCategory(dataGet:dtoGetListMangaByCategory):Promise<Manga[]>{
        const KEY_CACHE:string="CACHE_LIST_MANGA_"+dataGet.category+"_" +dataGet.page+"_"+dataGet.type+"_"+dataGet.numberItem;
        let listManga:Manga[] = await this.cacheService.get<Manga[]>(KEY_CACHE);
        if(listManga){
            return listManga;
        }
        let sortOptions:object={}
        if(dataGet.type==0){
            sortOptions["views"]=-1
        }
        else {
            sortOptions["chapter_update"]=-1;
        }
        listManga = await this.mangaModel.find({category:dataGet.category,enable:true})
        .skip((dataGet.page-1)*dataGet.numberItem)
        .limit(dataGet.numberItem).sort(sortOptions)
        .select("-chapters");
        await this.cacheService.set(KEY_CACHE,listManga);
        return listManga;
    }
    async SearchMangaByName(dataSearch:dtoSearchManga):Promise<Manga[]>{
        return this.mangaModel.find({
            enable:true,
            name:{$regex:dataSearch.name,$options:'i'}
        })
        .skip((dataSearch.page-1)*dataSearch.numberItem)
        .limit(dataSearch.numberItem).sort({views:-1})
        .select("-chapters");
    }
    async HiddenManga(manga_id:string[]):Promise<any>{
        return this.mangaModel.updateMany({
            _id:{$in:manga_id}
        },{enable:false})
    }
    async getListMangaByListUrl(list_url:string[]):Promise<Manga[]>{
        return this.mangaModel.find({url:{$in:list_url}}).select({_id:1,url:1});
    }
    async updateNewChapter(manga_id:string,chapter_id:string[]){
        return this.mangaModel.findByIdAndUpdate(manga_id,{
            $push:{chapters:{$each:chapter_id}},
            chapter_update: new Date()
        })
    }
    async addDevicesToManga(manga_id:string,devices:string){
        let manga = await this.mangaModel.findById(manga_id);
        if( manga.devices.indexOf(devices)<0){
            manga.devices.push(devices);
        }
        await manga.save();
    }
    async removeDevicesToManga(manga_id:string,devices:string){
        let manga = await this.mangaModel.findById(manga_id);
        manga.devices = manga.devices.filter(item=>item!=devices);
        manga.save();
    }
    async IncreaseViewsManga(manga_id:string,view:number):Promise<void>{
        await this.mangaModel.findByIdAndUpdate(manga_id,{$inc:{views:view}})
    }
    async hiddenManyManga(number_manga:number){
        const listManga = await this.mangaModel.find().sort({views:-1}).limit(number_manga);
        const ListPromise = listManga.map((manga)=>{
            return this.mangaModel.findByIdAndUpdate(manga._id,{enable:false});
            
        })
        await Promise.all(ListPromise);
    }
    async showAllManga(){
        await this.mangaModel.updateMany({},{
            enable:true
        })
    }
}
