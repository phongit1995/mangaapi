import { ApiResult } from 'src/common/api-result';
import { dtoCreateNewCategory } from './category.dto';
import { CategoryService } from './category.service';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    createNewCategory(dataCreate: dtoCreateNewCategory): Promise<ApiResult<unknown>>;
    getListCategory(): Promise<ApiResult<unknown>>;
}
