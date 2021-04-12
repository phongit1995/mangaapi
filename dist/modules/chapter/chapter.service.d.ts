import { Model } from 'mongoose';
import { Chapter } from 'src/database/chapter.model';
import { RequestService } from 'src/shared/services/request.service';
import { MangaService } from '../manga/manga.service';
import { CacheService } from 'src/shared/services/cache/cache.service';
export declare class ChapterService {
    private chapterModel;
    private mangaService;
    private requestService;
    private cacheService;
    constructor(chapterModel: Model<Chapter>, mangaService: MangaService, requestService: RequestService, cacheService: CacheService);
    getDetialChapter(chapter_id: string): Promise<Chapter>;
    getListChapterManga(manga_id: string, page: number, numberItem: number, sort: number): Promise<Array<Chapter>>;
    getListChapterMangaNoCache(manga_id: string): Promise<Array<Chapter>>;
    getTotalNumberChapter(manga_id: string): Promise<number>;
    deleteAllImagesChapter(chapter_id: string): Promise<any>;
    deleteAllImagesChapterServer(): Promise<any>;
    private getListImagesOnWeb;
    createNewChapter(manga_id: string, url: string, name: string, index: number, source: string): Promise<Chapter>;
    private IncrementToManga;
}
