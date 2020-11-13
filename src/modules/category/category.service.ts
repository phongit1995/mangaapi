import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/database/category.model';
import { dtoCreateNewCategory } from './category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel("category") private categoryModel:Model<Category>
    ){}
    async createNewCategory(data:dtoCreateNewCategory):Promise<Category>{
        return this.categoryModel.create({...data});
    }
    async getListCategory():Promise<Array<Category>>{
        return this.categoryModel.find({enable:true}).sort({createdAt:-1});
    }
}
