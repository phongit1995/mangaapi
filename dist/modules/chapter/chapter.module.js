"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterModule = void 0;
const common_1 = require("@nestjs/common");
const chapter_service_1 = require("./chapter.service");
const chapter_controller_1 = require("./chapter.controller");
const mongoose_1 = require("@nestjs/mongoose");
const chapter_model_1 = require("../../database/chapter.model");
const manga_module_1 = require("../manga/manga.module");
let ChapterModule = class ChapterModule {
};
ChapterModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "chapter", schema: chapter_model_1.chapterSchema }]),
            manga_module_1.MangaModule
        ],
        providers: [chapter_service_1.ChapterService],
        controllers: [chapter_controller_1.ChapterController],
        exports: [chapter_service_1.ChapterService]
    })
], ChapterModule);
exports.ChapterModule = ChapterModule;
//# sourceMappingURL=chapter.module.js.map