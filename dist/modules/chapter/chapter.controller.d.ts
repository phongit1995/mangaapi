import { ApiResult } from 'src/common/api-result';
import { dtoDeleteImagesChapter, dtoGetDetialChapter, dtoGetListChapter } from './chapter.dto';
import { ChapterService } from './chapter.service';
export declare class ChapterController {
    private chapterService;
    constructor(chapterService: ChapterService);
    getListChapter(dataGet: dtoGetListChapter): Promise<ApiResult<unknown>>;
    getDetialListChapter(dataGet: dtoGetDetialChapter): Promise<ApiResult<unknown>>;
    getDeleteImagesChapter(dataGet: dtoDeleteImagesChapter): Promise<ApiResult<unknown>>;
    getDeleteImagesChapterServer(): Promise<ApiResult<unknown>>;
}
