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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_1 = require("../../common/api-result");
const role_type_1 = require("../../common/constants/role-type");
const role_decorators_1 = require("../../common/decorators/role.decorators");
const user_decorators_1 = require("../../common/decorators/user.decorators");
const roles_guard_1 = require("../../common/guards/roles.guard");
const user_model_1 = require("../../database/user.model");
const comment_dto_1 = require("./comment.dto");
const comment_service_1 = require("./comment.service");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async commentToManga(dataComment, user) {
        const comment = await this.commentService.commentToManga(dataComment.manga_id, user._id, dataComment.message);
        return (new api_result_1.ApiResult().success(comment));
    }
    async commentToChapter(dataComment, user) {
        const comment = await this.commentService.commentToChapter(dataComment.chapter_id, user._id, dataComment.message);
        return (new api_result_1.ApiResult().success(comment));
    }
    async getListCommentManga(dataComment) {
        const listComment = await this.commentService.getListCommentInManga(dataComment.manga_id, dataComment.page, dataComment.numberItem);
        return (new api_result_1.ApiResult().success(listComment));
    }
    async getListCommentChapter(dataComment) {
        const listComment = await this.commentService.getListCommentInChapter(dataComment.chapter_id, dataComment.page, dataComment.numberItem);
        return (new api_result_1.ApiResult().success(listComment));
    }
    async addReplyComment(user, dataReply) {
        const comment = await this.commentService.replyComment(user._id, dataReply.comment_id, dataReply.message);
        return (new api_result_1.ApiResult().success(comment));
    }
    async getDetialComment(dataDetial) {
        const comment = await this.commentService.getDetialComment(dataDetial.comment_id);
        return (new api_result_1.ApiResult().success(comment));
    }
    async userLikeComment(dataLike, user) {
        const comment = await this.commentService.likeComment(user._id, dataLike.comment_id);
        return (new api_result_1.ApiResult().success(comment));
    }
};
__decorate([
    common_1.Post("comment-manga"),
    role_decorators_1.Roles(role_type_1.RoleType.USER),
    swagger_1.ApiOperation({ summary: "Comment To Manga" }),
    swagger_1.ApiResponse({ status: 200, description: 'Comment Success Full.' }),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Body()), __param(1, user_decorators_1.UserInfo()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.dtoCommentToManga, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "commentToManga", null);
__decorate([
    common_1.Post("comment-chapter"),
    swagger_1.ApiOperation({ summary: "Comment To Chapter" }),
    swagger_1.ApiResponse({ status: 200, description: 'Comment Success Full.' }),
    role_decorators_1.Roles(role_type_1.RoleType.USER),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Body()), __param(1, user_decorators_1.UserInfo()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.dtoCommentToChapter, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "commentToChapter", null);
__decorate([
    common_1.Post("list-comment-manga"),
    swagger_1.ApiOperation({ summary: "Get List Comment Manga" }),
    swagger_1.ApiResponse({ status: 200, description: 'get List Comment Success Full.' }),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.dtoListCommentManga]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getListCommentManga", null);
__decorate([
    common_1.Post("list-comment-chapter"),
    swagger_1.ApiOperation({ summary: "Get List Comment Chapter" }),
    swagger_1.ApiResponse({ status: 200, description: 'get List Comment Success Full.' }),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.dtoListCommentChapter]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getListCommentChapter", null);
__decorate([
    common_1.Post("reply-comment"),
    swagger_1.ApiOperation({ summary: " Add Reply Comment " }),
    swagger_1.ApiResponse({ status: 200, description: 'Add Reply Comment Success Full.' }),
    role_decorators_1.Roles(role_type_1.RoleType.USER),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, user_decorators_1.UserInfo()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_dto_1.dtoReplyComment]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "addReplyComment", null);
__decorate([
    common_1.Post("detial-comment"),
    swagger_1.ApiOperation({ summary: " Get Detial  Comment " }),
    swagger_1.ApiResponse({ status: 200, description: 'Get Detial  Comment Success Full.' }),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.dtoDetialComment]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getDetialComment", null);
__decorate([
    common_1.Post("like-comment"),
    swagger_1.ApiOperation({ summary: " Like  Comment " }),
    swagger_1.ApiResponse({ status: 200, description: 'Get Detial  Comment Success Full.' }),
    common_1.UsePipes(new common_1.ValidationPipe()),
    role_decorators_1.Roles(role_type_1.RoleType.USER),
    __param(0, common_1.Body()), __param(1, user_decorators_1.UserInfo()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.dtoLikeComment, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "userLikeComment", null);
CommentController = __decorate([
    swagger_1.ApiHeader({
        name: 'token',
        description: 'Token Of User'
    }),
    swagger_1.ApiTags("Comment"),
    swagger_1.ApiConsumes("Comment Api"),
    common_1.Controller('comment'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map