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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const error_1 = require("../../common/constants/error");
const comment_model_1 = require("../../database/comment.model");
const cache_service_1 = require("../../shared/services/cache/cache.service");
const chapter_service_1 = require("../chapter/chapter.service");
const manga_service_1 = require("../manga/manga.service");
let CommentService = class CommentService {
    constructor(commentModel, mangaService, chapterService, cacheService) {
        this.commentModel = commentModel;
        this.mangaService = mangaService;
        this.chapterService = chapterService;
        this.cacheService = cacheService;
    }
    async commentToManga(manga_id, user_id, message) {
        const Manga = await this.mangaService.getMangaDataById(manga_id);
        if (!Manga) {
            throw new common_1.HttpException(error_1.ERROR_TYPE.MANGA_NOT_FOUND, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.commentModel.create({ user: user_id, message: message, manga: manga_id });
    }
    async commentToChapter(chapter_id, user_id, message) {
        const Chapter = await this.chapterService.getDetialChapter(chapter_id);
        if (!Chapter) {
            throw new common_1.HttpException(error_1.ERROR_TYPE.CHAPTER_NOT_FOUND, common_1.HttpStatus.BAD_REQUEST);
        }
        await Promise.all([]);
        return this.commentModel.create({ user: user_id, message: message, manga: Chapter.manga, chapter: chapter_id });
    }
    async getListCommentInManga(manga_id, page, numberItem) {
        return this.commentModel.find({
            manga: manga_id
        }).populate({
            path: "chapter",
            select: "title index _id"
        })
            .populate({
            path: 'user',
            select: "name avatar _id"
        })
            .sort({ createdAt: -1 })
            .skip((page - 1) * numberItem).limit(numberItem).select("-reply");
    }
    async getListCommentInChapter(chapter_id, page, numberItem) {
        return this.commentModel.find({
            chapter: chapter_id
        })
            .populate({
            path: 'user',
            select: "name avatar _id"
        }).sort({ createdAt: -1 })
            .skip((page - 1) * numberItem).limit(numberItem).select("-reply");
    }
    async getDetialComment(comment_id) {
        return this.commentModel.findById(comment_id)
            .populate({
            path: 'user',
            select: "name avatar _id"
        })
            .populate({
            path: "reply.user",
            select: "name avatar _id"
        });
    }
    async replyComment(user_id, comment_id, message) {
        const comment = await this.commentModel.findById(comment_id);
        if (!comment) {
            throw new common_1.HttpException(error_1.ERROR_TYPE.COMMENT_NOT_FOUND_OR_DELETED, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.commentModel.findByIdAndUpdate(comment_id, {
            $inc: { replyCount: 1 },
            $push: {
                reply: {
                    user: user_id,
                    message: message
                }
            }
        });
    }
    async likeComment(user_id, comment_id) {
        const cacheLikeKey = user_id + "_" + comment_id;
        const dataCache = await this.cacheService.get(cacheLikeKey);
        if (dataCache) {
            return null;
        }
        await this.cacheService.set(cacheLikeKey, "1", 1000 * 60 * 60 * 30 * 24);
        this.commentModel.findByIdAndUpdate(comment_id, {
            $inc: { like_count: 1 }
        });
    }
};
CommentService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('comment')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        manga_service_1.MangaService,
        chapter_service_1.ChapterService,
        cache_service_1.CacheService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map