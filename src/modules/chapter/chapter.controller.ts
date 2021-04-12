import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResult } from 'src/common/api-result';
import { dtoDeleteImagesChapter, dtoGetDetialChapter, dtoGetListChapter } from './chapter.dto';
import { ChapterService } from './chapter.service';
@ApiTags('chapter')
@Controller('chapter')
export class ChapterController {
    constructor(private chapterService:ChapterService){}
    @Post("list-chapter")
    @ApiResponse({ status: 200, description: 'Get List Chapter Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async getListChapter(@Body()dataGet:dtoGetListChapter){
        const listChapter = await this.chapterService.getListChapterManga(dataGet.manga_id,dataGet.page,dataGet.numberItem,dataGet.sort);
        let totalNumber = await this.chapterService.getTotalNumberChapter(dataGet.manga_id);
        return (new ApiResult().success(listChapter).setNumberCount(totalNumber))
    }
    @Post("detial-chapter")
    @ApiResponse({ status: 200, description: 'Get Detial Chapter Success Fully.'})
    @UsePipes(new ValidationPipe())
    async getDetialListChapter(@Body()dataGet:dtoGetDetialChapter){
        const detialChapter = await this.chapterService.getDetialChapter(dataGet.id);
        return (new ApiResult().success(detialChapter))
    }
    @Post("delete-images-chapter")
    @ApiResponse({ status: 200, description: 'Delete Images Of Chapter Success.'})
    @UsePipes(new ValidationPipe())
    async getDeleteImagesChapter(@Body()dataGet:dtoDeleteImagesChapter){
        await this.chapterService.deleteAllImagesChapter(dataGet.id);
        return (new ApiResult().success())
    }
    @Post("delete-images-chapter-server")
    @ApiOperation({summary:"Delete Images Of Server Images. ForAdmin"})
    @ApiResponse({ status: 200, description: 'Delete Images Of Chapter Success. '})
    @UsePipes(new ValidationPipe())
    async getDeleteImagesChapterServer(){
        const dataResult = await this.chapterService.deleteAllImagesChapterServer();
        return (new ApiResult().success(dataResult));
    }
}
