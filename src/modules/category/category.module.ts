import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema } from 'src/database/category.model';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'category',schema:categorySchema,collection:'category'}])
  ],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
