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
    getDetialChapter(chapter_id: string): Promise<any>;
    getListChapterManga(manga_id: string): Promise<Array<Chapter>>;
    getListChapterMangaNoCache(manga_id: string): Promise<Array<Chapter>>;
    deleteAllImagesChapter(chapter_id: string): Promise<any>;
    private getListImagesOnWeb;
    createNewChapter(manga_id: string, url: string, name: string, index: number, source: string): Promise<Chapter>;
}
