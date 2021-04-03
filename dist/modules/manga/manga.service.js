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
exports.MangaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chapter_model_1 = require("../../database/chapter.model");
const manga_model_1 = require("../../database/manga.model");
const cache_service_1 = require("../../shared/services/cache/cache.service");
let MangaService = class MangaService {
    constructor(mangaModel, cacheService, chapterModel) {
        this.mangaModel = mangaModel;
        this.cacheService = cacheService;
        this.chapterModel = chapterModel;
    }
    async getMangaById(manga_id) {
        return this.mangaModel.findById(manga_id).select("-chapters");
    }
    async getDetialMangaById(manga_id) {
        let Manga = await this.mangaModel.findById(manga_id).select("-chapters");
        if (!Manga.first_chapter) {
            const chapter = await this.chapterModel.findOne({ manga: manga_id });
            Manga.first_chapter = chapter._id;
            await Manga.save();
        }
        return Manga;
    }
    async getListManga(dataGet) {
        const KEY_CACHE = "CACHE_LIST_MANGA_" + dataGet.page + "_" + dataGet.type + "_" + dataGet.numberItem;
        let listManga = await this.cacheService.get(KEY_CACHE);
        if (listManga) {
            return listManga;
        }
        let sortOptions = {};
        if (dataGet.type == 0) {
            sortOptions["views"] = -1;
        }
        else {
            sortOptions["chapter_update"] = -1;
        }
        listManga = await this.mangaModel.find({ enable: true })
            .skip((dataGet.page - 1) * dataGet.numberItem)
            .limit(dataGet.numberItem).sort(sortOptions)
            .select("-chapters");
        await this.cacheService.set(KEY_CACHE, listManga);
        return listManga;
    }
    async getListMangaByCategory(dataGet) {
        const KEY_CACHE = "CACHE_LIST_MANGA_" + dataGet.category + "_" + dataGet.page + "_" + dataGet.type + "_" + dataGet.numberItem;
        let listManga = await this.cacheService.get(KEY_CACHE);
        if (listManga) {
            return listManga;
        }
        let sortOptions = {};
        if (dataGet.type == 0) {
            sortOptions["views"] = -1;
        }
        else {
            sortOptions["chapter_update"] = -1;
        }
        listManga = await this.mangaModel.find({ category: dataGet.category, enable: true })
            .skip((dataGet.page - 1) * dataGet.numberItem)
            .limit(dataGet.numberItem).sort(sortOptions)
            .select("-chapters");
        await this.cacheService.set(KEY_CACHE, listManga);
        return listManga;
    }
    async SearchMangaByName(dataSearch) {
        return this.mangaModel.find({
            enable: true,
            name: { $regex: dataSearch.name, $options: 'i' }
        })
            .skip((dataSearch.page - 1) * dataSearch.numberItem)
            .limit(dataSearch.numberItem).sort({ views: -1 })
            .select("-chapters");
    }
    async HiddenManga(manga_id) {
        return this.mangaModel.updateMany({
            _id: { $in: manga_id }
        }, { enable: false });
    }
    async getListMangaByListUrl(list_url) {
        return this.mangaModel.find({ url: { $in: list_url } }).select({ _id: 1, url: 1 });
    }
    async updateNewChapter(manga_id, chapter_id) {
        return this.mangaModel.findByIdAndUpdate(manga_id, {
            $push: { chapters: { $each: chapter_id } },
            chapter_update: new Date()
        });
    }
    async addDevicesToManga(manga_id, devices) {
        let manga = await this.mangaModel.findById(manga_id);
        if (manga.devices.indexOf(devices) < 0) {
            manga.devices.push(devices);
        }
        await manga.save();
    }
    async removeDevicesToManga(manga_id, devices) {
        let manga = await this.mangaModel.findById(manga_id);
        manga.devices = manga.devices.filter(item => item != devices);
        manga.save();
    }
};
MangaService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('manga')),
    __param(2, mongoose_1.InjectModel('chapter')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cache_service_1.CacheService,
        mongoose_2.Model])
], MangaService);
exports.MangaService = MangaService;
//# sourceMappingURL=manga.service.js.map