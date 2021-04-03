"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaModule = void 0;
const common_1 = require("@nestjs/common");
const manga_service_1 = require("./manga.service");
const manga_controller_1 = require("./manga.controller");
const mongoose_1 = require("@nestjs/mongoose");
const manga_model_1 = require("../../database/manga.model");
const chapter_model_1 = require("../../database/chapter.model");
let MangaModule = class MangaModule {
};
MangaModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "manga", schema: manga_model_1.mangaSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: "chapter", schema: chapter_model_1.chapterSchema }]),
        ],
        providers: [manga_service_1.MangaService],
        controllers: [manga_controller_1.MangaController],
        exports: [manga_service_1.MangaService]
    })
], MangaModule);
exports.MangaModule = MangaModule;
//# sourceMappingURL=manga.module.js.map