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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dtoRemoveDeviceManga = exports.dtoAddDeviceManga = exports.dtoGetDetialManga = exports.dtoHiddenManga = exports.dtoSearchManga = exports.dtoGetListMangaByCategory = exports.dtoGetListManga = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var TYPE_GET_LIST_MANGA;
(function (TYPE_GET_LIST_MANGA) {
    TYPE_GET_LIST_MANGA[TYPE_GET_LIST_MANGA["HOT_MANGA"] = 0] = "HOT_MANGA";
    TYPE_GET_LIST_MANGA[TYPE_GET_LIST_MANGA["CHAPTER_NEW"] = 1] = "CHAPTER_NEW";
})(TYPE_GET_LIST_MANGA || (TYPE_GET_LIST_MANGA = {}));
class dtoGetListManga {
    constructor() {
        this.page = 1;
        this.numberItem = 10;
    }
}
__decorate([
    swagger_1.ApiProperty({ minimum: 1, default: 1, example: 1 }),
    class_validator_1.IsNumber(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], dtoGetListManga.prototype, "page", void 0);
__decorate([
    swagger_1.ApiProperty({ minimum: 1, default: 1, example: 10 }),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], dtoGetListManga.prototype, "numberItem", void 0);
__decorate([
    swagger_1.ApiProperty({ description: "Type Of Manga", enum: [0, 1] }),
    class_validator_1.IsEnum(TYPE_GET_LIST_MANGA),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], dtoGetListManga.prototype, "type", void 0);
exports.dtoGetListManga = dtoGetListManga;
class dtoGetListMangaByCategory {
    constructor() {
        this.page = 1;
        this.numberItem = 10;
    }
}
__decorate([
    swagger_1.ApiProperty({ minimum: 1, default: 1, example: 10 }),
    class_validator_1.IsNumber(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], dtoGetListMangaByCategory.prototype, "page", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], dtoGetListMangaByCategory.prototype, "numberItem", void 0);
__decorate([
    swagger_1.ApiProperty({ description: "Type Of Manga", enum: [0, 1] }),
    class_validator_1.IsEnum(TYPE_GET_LIST_MANGA),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], dtoGetListMangaByCategory.prototype, "type", void 0);
__decorate([
    swagger_1.ApiProperty({ description: "Category Of Manga" }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], dtoGetListMangaByCategory.prototype, "category", void 0);
exports.dtoGetListMangaByCategory = dtoGetListMangaByCategory;
class dtoSearchManga {
    constructor() {
        this.page = 1;
        this.numberItem = 10;
    }
}
__decorate([
    swagger_1.ApiProperty({ minimum: 1, example: 1 }),
    class_validator_1.IsNumber(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], dtoSearchManga.prototype, "page", void 0);
__decorate([
    swagger_1.ApiProperty({ minimum: 1, example: 10 }),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], dtoSearchManga.prototype, "numberItem", void 0);
__decorate([
    swagger_1.ApiProperty({ description: "Name Of Manga" }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], dtoSearchManga.prototype, "name", void 0);
exports.dtoSearchManga = dtoSearchManga;
class dtoHiddenManga {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsMongoId({ each: true }),
    __metadata("design:type", Array)
], dtoHiddenManga.prototype, "manga_id", void 0);
exports.dtoHiddenManga = dtoHiddenManga;
class dtoGetDetialManga {
}
__decorate([
    swagger_1.ApiProperty({ description: 'Id Manga' }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], dtoGetDetialManga.prototype, "manga_id", void 0);
exports.dtoGetDetialManga = dtoGetDetialManga;
class dtoAddDeviceManga {
}
__decorate([
    swagger_1.ApiProperty({ description: 'Id Manga' }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], dtoAddDeviceManga.prototype, "manga_id", void 0);
__decorate([
    swagger_1.ApiProperty({ description: "Devices ID" }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], dtoAddDeviceManga.prototype, "device", void 0);
exports.dtoAddDeviceManga = dtoAddDeviceManga;
class dtoRemoveDeviceManga {
}
__decorate([
    swagger_1.ApiProperty({ description: 'Id Manga' }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], dtoRemoveDeviceManga.prototype, "manga_id", void 0);
__decorate([
    swagger_1.ApiProperty({ description: "Devices ID" }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], dtoRemoveDeviceManga.prototype, "device", void 0);
exports.dtoRemoveDeviceManga = dtoRemoveDeviceManga;
//# sourceMappingURL=manga.dto.js.map