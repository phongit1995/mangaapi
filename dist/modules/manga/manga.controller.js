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
exports.MangaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_1 = require("../../common/api-result");
const manga_dto_1 = require("./manga.dto");
const manga_service_1 = require("./manga.service");
let MangaController = class MangaController {
    constructor(mangaService) {
        this.mangaService = mangaService;
    }
    async getDetialManga(dataGet) {
        const detialManga = await this.mangaService.getDetialMangaById(dataGet.manga_id);
        return (new api_result_1.ApiResult().success(detialManga));
    }
    async getListManga(dataGet) {
        const listManga = await this.mangaService.getListManga(dataGet);
        return (new api_result_1.ApiResult().success(listManga));
    }
    async getListMangaByCategory(dataGet) {
        const listManga = await this.mangaService.getListMangaByCategory(dataGet);
        return (new api_result_1.ApiResult().success(listManga));
    }
    async searchManga(dataGet) {
        const listManga = await this.mangaService.SearchMangaByName(dataGet);
        return (new api_result_1.ApiResult().success(listManga));
    }
    async hiddenManga(dataHidden) {
        let resultGame = await this.mangaService.HiddenManga(dataHidden.manga_id);
        return (new api_result_1.ApiResult().success());
    }
    async addDevicesToManga(dataAdd) {
        await this.mangaService.addDevicesToManga(dataAdd.manga_id, dataAdd.device);
        return (new api_result_1.ApiResult().success());
    }
    async removeDevicesToManga(dataAdd) {
        await this.mangaService.removeDevicesToManga(dataAdd.manga_id, dataAdd.device);
        return (new api_result_1.ApiResult().success());
    }
};
__decorate([
    common_1.Post("detial-manga"),
    swagger_1.ApiOperation({ summary: "Get Detial Manga Buy Id" }),
    swagger_1.ApiResponse({ status: 200, description: 'Hidden Manga Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manga_dto_1.dtoGetDetialManga]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "getDetialManga", null);
__decorate([
    common_1.Post("get-list"),
    swagger_1.ApiOperation({ summary: "Get List Of Manga" }),
    swagger_1.ApiResponse({ status: 200, description: 'Get List Chapter Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manga_dto_1.dtoGetListManga]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "getListManga", null);
__decorate([
    common_1.Post("get-list-category"),
    swagger_1.ApiOperation({ summary: "Get List Of Manga By Category" }),
    swagger_1.ApiResponse({ status: 200, description: 'Get List Chapter Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manga_dto_1.dtoGetListMangaByCategory]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "getListMangaByCategory", null);
__decorate([
    common_1.Post("search-manga"),
    swagger_1.ApiOperation({ summary: "Search Manga By Name" }),
    swagger_1.ApiResponse({ status: 200, description: 'Get List Chapter Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manga_dto_1.dtoSearchManga]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "searchManga", null);
__decorate([
    common_1.Post("hidden-manga"),
    swagger_1.ApiOperation({ summary: "Hidden Manga By Name" }),
    swagger_1.ApiResponse({ status: 200, description: 'Hidden Manga Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manga_dto_1.dtoHiddenManga]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "hiddenManga", null);
__decorate([
    common_1.Post("add-devices"),
    swagger_1.ApiOperation({ summary: "Add Devices When Follow Manga " }),
    swagger_1.ApiResponse({ status: 200, description: 'Add Device Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manga_dto_1.dtoAddDeviceManga]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "addDevicesToManga", null);
__decorate([
    common_1.Post("remove-devices"),
    swagger_1.ApiOperation({ summary: "Remove Devices When UnFollow Manga " }),
    swagger_1.ApiResponse({ status: 200, description: 'Remove Device Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manga_dto_1.dtoRemoveDeviceManga]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "removeDevicesToManga", null);
MangaController = __decorate([
    swagger_1.ApiTags("manga"),
    swagger_1.ApiConsumes("Manga Api"),
    common_1.Controller('manga'),
    __metadata("design:paramtypes", [manga_service_1.MangaService])
], MangaController);
exports.MangaController = MangaController;
//# sourceMappingURL=manga.controller.js.map