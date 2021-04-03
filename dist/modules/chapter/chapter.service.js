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
exports.ChapterService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const error_1 = require("../../common/constants/error");
const chapter_model_1 = require("../../database/chapter.model");
const request_service_1 = require("../../shared/services/request.service");
const manga_service_1 = require("../manga/manga.service");
const cheerio = require("cheerio");
const cache_service_1 = require("../../shared/services/cache/cache.service");
let ChapterService = class ChapterService {
    constructor(chapterModel, mangaService, requestService, cacheService) {
        this.chapterModel = chapterModel;
        this.mangaService = mangaService;
        this.requestService = requestService;
        this.cacheService = cacheService;
    }
    async getDetialChapter(chapter_id) {
        let chapter = await this.chapterModel.findById(chapter_id);
        if (!chapter) {
            throw new common_1.HttpException(error_1.ERROR_TYPE.CHAPTER_NOT_FOUND, common_1.HttpStatus.BAD_REQUEST);
        }
        if (chapter.images.length == 0) {
            let listImages = await this.getListImagesOnWeb(chapter.url);
            chapter.images = listImages;
            await chapter.save();
        }
        return chapter;
    }
    async getListChapterManga(manga_id) {
        const KEY_CACHE = "CACHE_LIST_CHAPTER_" + manga_id;
        let dataCache = await this.cacheService.get(KEY_CACHE);
        if (dataCache) {
            return dataCache;
        }
        dataCache = await this.chapterModel.find({
            manga: manga_id
        }).sort({ index: 1 }).select("-images -url -updatedAt");
        await this.cacheService.set(KEY_CACHE, dataCache, 1000 * 60 * 30);
        return dataCache;
    }
    async getListChapterMangaNoCache(manga_id) {
        return this.chapterModel.find({
            manga: manga_id
        }).sort({ index: 1 }).select("-images");
    }
    async deleteAllImagesChapter(chapter_id) {
        return this.chapterModel.findByIdAndUpdate(chapter_id, { images: [] });
    }
    async getListImagesOnWeb(url) {
        const result = await this.requestService.getMethod(url);
        const $ = cheerio.load(result);
        let listImages = [];
        $(".reading-detail > .page-chapter > img").each(function () {
            let images = $(this).attr("src");
            images = images.indexOf("http") >= 0 ? images : images.replace("//", "http://");
            listImages.push(images);
        });
        return listImages;
    }
    async createNewChapter(manga_id, url, name, index, source) {
        return this.chapterModel.create({ manga: manga_id, index: index, title: name, source: source, url: url });
    }
};
ChapterService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel("chapter")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        manga_service_1.MangaService,
        request_service_1.RequestService,
        cache_service_1.CacheService])
], ChapterService);
exports.ChapterService = ChapterService;
//# sourceMappingURL=chapter.service.js.map