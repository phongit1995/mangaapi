import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/database/category.model';
import { CacheService } from 'src/shared/services/cache/cache.service';
import { dtoCreateNewCategory } from './category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel("category") private categoryModel:Model<Category>,
        private cacheService:CacheService
    ){}
    async createNewCategory(data:dtoCreateNewCategory):Promise<Category>{
        return this.categoryModel.create({...data});
    }
    async getListCategory():Promise<Array<Category>>{
        const key:string="LIST_CATEGORY";
        let listCategory = await this.cacheService.get<Array<Category>>(key);
        if(listCategory){
            return listCategory;
        }
        listCategory = await this.categoryModel.find({enable:true}).sort({createdAt:1});
        this.cacheService.set(key,listCategory);
        return listCategory;
    }
}
