import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResult } from 'src/common/api-result';
import { dtoCreateNewCategory } from './category.dto';
import { CategoryService } from './category.service';
@ApiTags('category')
@Controller('category')
export class CategoryController {
    constructor(
        private categoryService:CategoryService
    ){}
    @Post("/create-category")
    @ApiResponse({ status: 200, description: 'create new category success.'})
    @UsePipes(new ValidationPipe())
    async createNewCategory(@Body()dataCreate:dtoCreateNewCategory){
        const resultCategory = await this.categoryService.createNewCategory(dataCreate);
        return (new ApiResult().success(resultCategory))
    }
    @Get("/get-list")
    @ApiResponse({ status: 200, description: 'get list category success.'})
    @UsePipes(new ValidationPipe())
    async getListCategory(){
        const listCategory = await this.categoryService.getListCategory();
        return (new ApiResult().success(listCategory))
    }

}
