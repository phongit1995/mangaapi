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
exports.dtoLikeComment = exports.dtoDetialComment = exports.dtoReplyComment = exports.dtoListCommentChapter = exports.dtoListCommentManga = exports.dtoCommentToChapter = exports.dtoCommentToManga = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class dtoCommentToManga {
}
__decorate([
    swagger_1.ApiProperty({ title: "id of manga" }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], dtoCommentToManga.prototype, "manga_id", void 0);
__decorate([
    swagger_1.ApiProperty({ title: "message of User" }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], dtoCommentToManga.prototype, "message", void 0);
exports.dtoCommentToManga = dtoCommentToManga;
class dtoCommentToChapter {
}
__decorate([
    swagger_1.ApiProperty({ title: "id of chapter" }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], dtoCommentToChapter.prototype, "chapter_id", void 0);
__decorate([
    swagger_1.ApiProperty({ title: "message of User" }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], dtoCommentToChapter.prototype, "message", void 0);
exports.dtoCommentToChapter = dtoCommentToChapter;
class dtoListCommentManga {
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
], dtoListCommentManga.prototype, "page", void 0);
__decorate([
    swagger_1.ApiProperty({ minimum: 1, example: 10 }),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], dtoListCommentManga.prototype, "numberItem", void 0);
__decorate([
    swagger_1.ApiProperty({ title: "id of manga" }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], dtoListCommentManga.prototype, "manga_id", void 0);
exports.dtoListCommentManga = dtoListCommentManga;
class dtoListCommentChapter {
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
], dtoListCommentChapter.prototype, "page", void 0);
__decorate([
    swagger_1.ApiProperty({ minimum: 1, example: 10 }),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], dtoListCommentChapter.prototype, "numberItem", void 0);
__decorate([
    swagger_1.ApiProperty({ title: "chapter id" }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], dtoListCommentChapter.prototype, "chapter_id", void 0);
exports.dtoListCommentChapter = dtoListCommentChapter;
class dtoReplyComment {
}
__decorate([
    swagger_1.ApiProperty({ title: "comment id" }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], dtoReplyComment.prototype, "comment_id", void 0);
__decorate([
    swagger_1.ApiProperty({ title: "message of User" }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], dtoReplyComment.prototype, "message", void 0);
exports.dtoReplyComment = dtoReplyComment;
class dtoDetialComment {
}
__decorate([
    swagger_1.ApiProperty({ title: "comment id" }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], dtoDetialComment.prototype, "comment_id", void 0);
exports.dtoDetialComment = dtoDetialComment;
class dtoLikeComment {
}
__decorate([
    swagger_1.ApiProperty({ title: "comment id" }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], dtoLikeComment.prototype, "comment_id", void 0);
exports.dtoLikeComment = dtoLikeComment;
//# sourceMappingURL=comment.dto.js.map