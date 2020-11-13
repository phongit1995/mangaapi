import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResult } from 'src/common/api-result';
import { dtoDeleteImagesChapter, dtoGetDetialChapter, dtoGetListChapter } from './chapter.dto';
import { ChapterService } from './chapter.service';
@ApiTags('chapter')
@Controller('chapter')
export class ChapterController {
    constructor(private chapterService:ChapterService){}
    @Post("list-chapter")
    @ApiResponse({ status: 200, description: 'Get List Chapter Success Fully.'})
    @UsePipes(new ValidationPipe())
    async getListChapter(@Body()dataGet:dtoGetListChapter){
        const listChapter = await this.chapterService.getListChapterManga(dataGet.manga_id);
        return (new ApiResult().success(listChapter))
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
}
