import { Model } from 'mongoose';
import { Category } from 'src/database/category.model';
import { CacheService } from 'src/shared/services/cache/cache.service';
import { dtoCreateNewCategory } from './category.dto';
export declare class CategoryService {
    private categoryModel;
    private cacheService;
    constructor(categoryModel: Model<Category>, cacheService: CacheService);
    createNewCategory(data: dtoCreateNewCategory): Promise<Category>;
    getListCategory(): Promise<Array<Category>>;
}
