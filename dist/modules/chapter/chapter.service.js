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
        const KEY_CACHE = "CACHE_DETIAL_CHAPTER_" + chapter_id;
        let dataCache = await this.cacheService.get(KEY_CACHE);
        if (dataCache) {
            await this.IncrementToManga(dataCache.manga);
            return dataCache;
        }
        let chapter = await this.chapterModel.findById(chapter_id);
        if (!chapter) {
            throw new common_1.HttpException(error_1.ERROR_TYPE.CHAPTER_NOT_FOUND, common_1.HttpStatus.BAD_REQUEST);
        }
        if (chapter.images.length == 0) {
            let listImages = await this.getListImagesOnWeb(chapter.url);
            chapter.images = listImages;
            await chapter.save();
        }
        const [beforeChapter, afterChapter] = await Promise.all([
            this.chapterModel.findOne({ manga: chapter.manga, index: chapter.index - 1 }),
            this.chapterModel.findOne({ manga: chapter.manga, index: chapter.index + 1 }),
        ]);
        chapter = chapter.toObject();
        chapter.before = beforeChapter === null || beforeChapter === void 0 ? void 0 : beforeChapter._id;
        chapter.after = afterChapter === null || afterChapter === void 0 ? void 0 : afterChapter._id;
        await this.cacheService.set(KEY_CACHE, chapter, 60 * 60 * 24);
        await this.IncrementToManga(chapter.manga);
        return chapter;
    }
    async getListChapterManga(manga_id, page, numberItem, sort) {
        console.log(sort);
        const KEY_CACHE = "CACHE_LIST_CHAPTER_" + manga_id + "_" + page + "_" + numberItem + "_" + sort;
        let dataCache = await this.cacheService.get(KEY_CACHE);
        if (dataCache) {
            return dataCache;
        }
        dataCache = await this.chapterModel.find({
            manga: manga_id
        }).sort({ index: sort })
            .skip((page - 1) * numberItem)
            .limit(numberItem)
            .select("-images -url -updatedAt -source -manga");
        await this.cacheService.set(KEY_CACHE, dataCache, 60 * 60);
        return dataCache;
    }
    async getListChapterMangaNoCache(manga_id) {
        return this.chapterModel.find({
            manga: manga_id
        }).sort({ index: 1 }).select("-images");
    }
    async getTotalNumberChapter(manga_id) {
        const key_cache = "TOTAL_NUMBER" + manga_id;
        let dataCache = await this.cacheService.get(key_cache);
        if (dataCache) {
            return dataCache;
        }
        const total = await this.chapterModel.countDocuments({ manga: manga_id });
        this.cacheService.set(key_cache, total, 60 * 30);
        return total;
    }
    async deleteAllImagesChapter(chapter_id) {
        const KEY_CACHE = "CACHE_DETIAL_CHAPTER_" + chapter_id;
        this.cacheService.del(KEY_CACHE);
        return this.chapterModel.findByIdAndUpdate(chapter_id, { images: [] });
    }
    async deleteAllImagesChapterServer() {
        return this.chapterModel.updateMany({}, { images: [] });
    }
    async getListImagesOnWeb(url) {
        const result = await this.requestService.getMethod(url, {
            headers: {
                "User-Agent": "PostmanRuntime/7.29.2",
                Accept: "*/*",
                "Cache-Control": "no-cache",
                "Postman-Token": "70dda507-a90e-4da8-b7e1-6b33093676e9",
                Host: "www.nettruyenme.com",
                Connection: "keep-alive",
            }
        });
        const $ = cheerio.load(result);
        let listImages = [];
        $(".reading-detail > .page-chapter > img").each(function () {
            let images = $(this).attr("data-cdn") || $(this).attr("src");
            images = images.indexOf("http") >= 0 ? images : images.replace("//", "http://");
            listImages.push(images);
        });
        return listImages;
    }
    async createNewChapter(manga_id, url, name, index, source) {
        return this.chapterModel.create({ manga: manga_id, index: index, title: name, source: source, url: url });
    }
    async IncrementToManga(manga_id) {
        const KEY_CACHE_VIEW_MANGA = "CACHE_VIEWS_MANGA" + manga_id;
        const dataKey = await this.cacheService.get(KEY_CACHE_VIEW_MANGA);
        if (!dataKey) {
            return this.cacheService.set(KEY_CACHE_VIEW_MANGA, 1);
        }
        let radomViewsAdd = Math.floor(Math.random() * (10 - 5)) + 5;
        if (dataKey >= radomViewsAdd) {
            await this.mangaService.IncreaseViewsManga(manga_id, radomViewsAdd);
            return await this.cacheService.set(KEY_CACHE_VIEW_MANGA, dataKey - radomViewsAdd + 1);
        }
        await this.cacheService.set(KEY_CACHE_VIEW_MANGA, dataKey + 1);
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