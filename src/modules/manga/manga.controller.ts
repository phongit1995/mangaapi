import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResult } from 'src/common/api-result';
import { dtoGetDetialManga, dtoGetListManga, dtoGetListMangaByCategory, dtoHiddenManga, dtoSearchManga } from './manga.dto';
import { MangaService } from './manga.service';
@ApiTags("manga")
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
        await this.mangaService.getMangaById(dataGet.manga_id);
        return (new ApiResult().success())
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
    @Post("hidden-manga")
    @ApiOperation({summary:"Hidden Manga By Name"})
    @ApiResponse({ status: 200, description: 'Hidden Manga Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async hiddenManga(@Body()dataHidden:dtoHiddenManga){
        let resultGame = await this.mangaService.HiddenManga(dataHidden.manga_id);
        console.log(resultGame);
        return (new ApiResult().success())
    }
    
}
