"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_model_1 = require("../../database/category.model");
const cache_service_1 = require("../../shared/services/cache/cache.service");
let CategoryService = class CategoryService {
    constructor(categoryModel, cacheService) {
        this.categoryModel = categoryModel;
        this.cacheService = cacheService;
    }
    async createNewCategory(data) {
        return this.categoryModel.create(Object.assign({}, data));
    }
    async getListCategory() {
        const key = "LIST_CATEGORY";
        let listCategory = await this.cacheService.get(key);
        if (listCategory) {
            return listCategory;
        }
        listCategory = await this.categoryModel.find({ enable: true }).sort({ createdAt: 1 });
        this.cacheService.set(key, listCategory);
        return listCategory;
    }
};
CategoryService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel("category")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cache_service_1.CacheService])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map