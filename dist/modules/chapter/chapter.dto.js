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
exports.dtoDeleteImagesChapter = exports.dtoGetDetialChapter = exports.dtoGetListChapter = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class dtoGetListChapter {
    constructor() {
        this.page = 1;
        this.numberItem = 1000;
    }
}
__decorate([
    swagger_1.ApiProperty({ title: "id of manga" }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], dtoGetListChapter.prototype, "manga_id", void 0);
__decorate([
    swagger_1.ApiProperty({ minimum: 1, default: 1, example: 1, description: "Number Page" }),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], dtoGetListChapter.prototype, "page", void 0);
__decorate([
    swagger_1.ApiProperty({ minimum: 1, default: 1, example: 10, description: "Number Item Of Page" }),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], dtoGetListChapter.prototype, "numberItem", void 0);
exports.dtoGetListChapter = dtoGetListChapter;
class dtoGetDetialChapter {
}
__decorate([
    swagger_1.ApiProperty({ title: "id of chapter" }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], dtoGetDetialChapter.prototype, "id", void 0);
exports.dtoGetDetialChapter = dtoGetDetialChapter;
class dtoDeleteImagesChapter {
}
__decorate([
    swagger_1.ApiProperty({ title: "id of chapter" }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], dtoDeleteImagesChapter.prototype, "id", void 0);
exports.dtoDeleteImagesChapter = dtoDeleteImagesChapter;
//# sourceMappingURL=chapter.dto.js.map