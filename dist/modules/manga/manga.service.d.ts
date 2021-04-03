import { Model } from 'mongoose';
import { Chapter } from 'src/database/chapter.model';
import { Manga } from 'src/database/manga.model';
import { CacheService } from 'src/shared/services/cache/cache.service';
import { dtoGetListManga, dtoGetListMangaByCategory, dtoSearchManga } from './manga.dto';
export declare class MangaService {
    private mangaModel;
    private cacheService;
    private chapterModel;
    constructor(mangaModel: Model<Manga>, cacheService: CacheService, chapterModel: Model<Chapter>);
    getMangaById(manga_id: string): Promise<Manga>;
    getDetialMangaById(manga_id: string): Promise<Manga>;
    getListManga(dataGet: dtoGetListManga): Promise<Manga[]>;
    getListMangaByCategory(dataGet: dtoGetListMangaByCategory): Promise<Manga[]>;
    SearchMangaByName(dataSearch: dtoSearchManga): Promise<Manga[]>;
    HiddenManga(manga_id: string[]): Promise<any>;
    getListMangaByListUrl(list_url: string[]): Promise<Manga[]>;
    updateNewChapter(manga_id: string, chapter_id: string[]): Promise<Manga>;
    addDevicesToManga(manga_id: string, devices: string): Promise<void>;
    removeDevicesToManga(manga_id: string, devices: string): Promise<void>;
}
