import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResult } from 'src/common/api-result';
import { dtoAddDeviceManga, dtoGetDetialManga, dtoGetListManga, dtoGetListMangaByCategory, dtoHiddenManga, dtoHiddenManyManga, dtoRemoveDeviceManga, dtoSearchManga, dtoSuggestManga } from './manga.dto';
import { MangaService } from './manga.service';
@ApiTags("manga")
@ApiConsumes("Manga Api")
@Controller('manga')
export class MangaController {
    constructor(
        private mangaService:MangaService
    ){}
    @Post("detial-manga")
    @ApiOperation({summary:"Get Detial Manga Buy Id"})
    @ApiResponse({ status: 200, description: 'Hidden Manga Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async getDetialManga(@Body()dataGet:dtoGetDetialManga){
        const detialManga=await this.mangaService.getDetialMangaById(dataGet.manga_id);
        return (new ApiResult().success(detialManga))
    }
    @Post("get-list")
    @ApiOperation({summary:"Get List Of Manga"})
    @ApiResponse({ status: 200, description: 'Get List Chapter Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async getListManga(@Body()dataGet:dtoGetListManga){
        const listManga = await this.mangaService.getListManga(dataGet);
        return (new ApiResult().success(listManga))
    }
    @Post("get-list-category")
    @ApiOperation({summary:"Get List Of Manga By Category"})
    @ApiResponse({ status: 200, description: 'Get List Chapter Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async getListMangaByCategory(@Body()dataGet:dtoGetListMangaByCategory){
        const listManga = await this.mangaService.getListMangaByCategory(dataGet);
        return (new ApiResult().success(listManga))
    }
    @Post("search-manga")
    @ApiOperation({summary:"Search Manga By Name"})
    @ApiResponse({ status: 200, description: 'Get List Chapter Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async searchManga(@Body()dataGet:dtoSearchManga){
        const listManga = await this.mangaService.SearchMangaByName(dataGet);
        return (new ApiResult().success(listManga))
    }
    @Post("suggest-manga")
    @ApiOperation({summary:"List Suggest Manga"})
    @ApiResponse({ status: 200, description: 'List Suggest Manga Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async suggestManga(@Body()dataSuggest:dtoSuggestManga){
        const listSuggest= await this.mangaService.listSuggestManga(dataSuggest.category,dataSuggest.page,dataSuggest.numberItem,dataSuggest.type_sort);
        return (new ApiResult().success(listSuggest))
    }
    @Post("hidden-manga")
    @ApiOperation({summary:"Hidden Manga By Name"})
    @ApiResponse({ status: 200, description: 'Hidden Manga Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async hiddenManga(@Body()dataHidden:dtoHiddenManga){
        let resultGame = await this.mangaService.HiddenManga(dataHidden.manga_id);
        return (new ApiResult().success())
    }
    @Post("add-devices")
    @ApiOperation({summary:"Add Devices When Follow Manga "})
    @ApiResponse({ status: 200, description: 'Add Device Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async addDevicesToManga(@Body()dataAdd:dtoAddDeviceManga){
        await this.mangaService.addDevicesToManga(dataAdd.manga_id,dataAdd.device);
        return (new ApiResult().success())
    }
    @Post("remove-devices")
    @ApiOperation({summary:"Remove Devices When UnFollow Manga "})
    @ApiResponse({ status: 200, description: 'Remove Device Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async removeDevicesToManga(@Body()dataAdd:dtoRemoveDeviceManga){
        await this.mangaService.removeDevicesToManga(dataAdd.manga_id,dataAdd.device);
        return (new ApiResult().success())
    }
    @Post("hidden-many-manga")
    @ApiOperation({summary:"Hidden Many Manga "})
    @ApiResponse({ status: 200, description: 'Hidden Many Manga Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async HiddenManyManga(@Body()dataAdd:dtoHiddenManyManga){
        await this.mangaService.hiddenManyManga(dataAdd.manga_number);
        return (new ApiResult().success())
    }
    @Get("show-all-manga")
    @ApiOperation({summary:"Show All  Manga Hidden"})
    @ApiResponse({ status: 200, description: 'Show All  Manga Hidden'})
    @UsePipes(new ValidationPipe({transform:true}))
    async showAllManga(){
        await this.mangaService.showAllManga()
        return (new ApiResult().success())
    }
}
