import { ChapterService } from 'src/modules/chapter/chapter.service';
import { MangaService } from 'src/modules/manga/manga.service';
import { RequestService } from 'src/shared/services/request.service';
export declare class TasksService {
    private mangaService;
    private chapterService;
    private requestService;
    constructor(mangaService: MangaService, chapterService: ChapterService, requestService: RequestService);
    private readonly logger;
    private readonly URL_WEBSITE;
    handleCron(): Promise<void>;
    getListMangaNews(): Promise<void>;
    private getListUrlNewsManga;
    private updateMangaInfo;
    private getListChapterFromWeb;
}
