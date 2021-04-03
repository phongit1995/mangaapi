import { ApiResult } from 'src/common/api-result';
import { dtoAddDeviceManga, dtoGetDetialManga, dtoGetListManga, dtoGetListMangaByCategory, dtoHiddenManga, dtoHiddenManyManga, dtoRemoveDeviceManga, dtoSearchManga, dtoSuggestManga } from './manga.dto';
import { MangaService } from './manga.service';
export declare class MangaController {
    private mangaService;
    constructor(mangaService: MangaService);
    getDetialManga(dataGet: dtoGetDetialManga): Promise<ApiResult<unknown>>;
    getListManga(dataGet: dtoGetListManga): Promise<ApiResult<unknown>>;
    getListMangaByCategory(dataGet: dtoGetListMangaByCategory): Promise<ApiResult<unknown>>;
    searchManga(dataGet: dtoSearchManga): Promise<ApiResult<unknown>>;
    suggestManga(dataSuggest: dtoSuggestManga): Promise<ApiResult<unknown>>;
    hiddenManga(dataHidden: dtoHiddenManga): Promise<ApiResult<unknown>>;
    addDevicesToManga(dataAdd: dtoAddDeviceManga): Promise<ApiResult<unknown>>;
    removeDevicesToManga(dataAdd: dtoRemoveDeviceManga): Promise<ApiResult<unknown>>;
    HiddenManyManga(dataAdd: dtoHiddenManyManga): Promise<ApiResult<unknown>>;
    showAllManga(): Promise<ApiResult<unknown>>;
}
