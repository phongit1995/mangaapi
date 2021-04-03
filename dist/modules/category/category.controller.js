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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_1 = require("../../common/api-result");
const category_dto_1 = require("./category.dto");
const category_service_1 = require("./category.service");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async createNewCategory(dataCreate) {
        const resultCategory = await this.categoryService.createNewCategory(dataCreate);
        return (new api_result_1.ApiResult().success(resultCategory));
    }
    async getListCategory() {
        const listCategory = await this.categoryService.getListCategory();
        return (new api_result_1.ApiResult().success(listCategory));
    }
};
__decorate([
    common_1.Post("/create-category"),
    swagger_1.ApiResponse({ status: 200, description: 'create new category success.' }),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.dtoCreateNewCategory]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createNewCategory", null);
__decorate([
    common_1.Get("/get-list"),
    swagger_1.ApiResponse({ status: 200, description: 'get list category success.' }),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getListCategory", null);
CategoryController = __decorate([
    swagger_1.ApiTags('category'),
    common_1.Controller('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map