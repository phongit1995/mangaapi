import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiConsumes, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResult } from 'src/common/api-result';
import { RoleType } from 'src/common/constants/role-type';
import { Roles } from 'src/common/decorators/role.decorators';
import { UserInfo } from 'src/common/decorators/user.decorators';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ROLE_USER, User } from 'src/database/user.model';
import { dtoCommentToChapter, dtoCommentToManga, dtoDetialComment, dtoLikeComment, dtoListCommentChapter, dtoListCommentManga ,dtoReplyComment} from './comment.dto';
import { CommentService } from './comment.service';
@ApiHeader({
    name: 'token',
    description: 'Token Of User'
})
@ApiTags("Comment")
@ApiConsumes("Comment Api")
@Controller('comment')
@UseGuards(RolesGuard)
export class CommentController {
    constructor(private commentService:CommentService){}
    @Post("comment-manga")
    @Roles(RoleType.USER)
    @ApiOperation({summary:"Comment To Manga"})
    @ApiResponse({ status: 200, description: 'Comment Success Full.'})
    @UsePipes(new ValidationPipe())
    async commentToManga(@Body()dataComment:dtoCommentToManga,@UserInfo()user:User){
        const comment = await this.commentService.commentToManga(dataComment.manga_id,user._id,dataComment.message);
        return (new ApiResult().success(comment))
    }
    @Post("comment-chapter")
    @ApiOperation({summary:"Comment To Chapter"})
    @ApiResponse({ status: 200, description: 'Comment Success Full.'})
    @Roles(RoleType.USER)
    @UsePipes(new ValidationPipe())
    async commentToChapter(@Body()dataComment:dtoCommentToChapter,@UserInfo()user:User){
        const comment = await this.commentService.commentToChapter(dataComment.chapter_id,user._id,dataComment.message);
        return (new ApiResult().success(comment))
    }
    @Post("list-comment-manga")
    @ApiOperation({summary:"Get List Comment Manga"})
    @ApiResponse({ status: 200, description: 'get List Comment Success Full.'})
    @UsePipes(new ValidationPipe())
    async getListCommentManga(@Body()dataComment:dtoListCommentManga){
        const listComment = await this.commentService.getListCommentInManga(dataComment.manga_id,dataComment.page,dataComment.numberItem);
        return (new ApiResult().success(listComment))
    }
    @Post("list-comment-chapter")
    @ApiOperation({summary:"Get List Comment Chapter"})
    @ApiResponse({ status: 200, description: 'get List Comment Success Full.'})
    @UsePipes(new ValidationPipe())
    async getListCommentChapter(@Body()dataComment:dtoListCommentChapter){
        const listComment = await this.commentService.getListCommentInChapter(dataComment.chapter_id,dataComment.page,dataComment.numberItem);
        return (new ApiResult().success(listComment))
    }
    @Post("reply-comment")
    @ApiOperation({summary:" Add Reply Comment "})
    @ApiResponse({ status: 200, description: 'Add Reply Comment Success Full.'})
    @Roles(RoleType.USER)
    @UsePipes(new ValidationPipe())
    async addReplyComment(@UserInfo() user:User,@Body()dataReply:dtoReplyComment){
        const comment = await this.commentService.replyComment(user._id,dataReply.comment_id,dataReply.message);
        return (new ApiResult().success(comment))
    }
    @Post("detial-comment")
    @ApiOperation({summary:" Get Detial  Comment "})
    @ApiResponse({ status: 200, description: 'Get Detial  Comment Success Full.'})
    @UsePipes(new ValidationPipe())
    async getDetialComment(@Body()dataDetial:dtoDetialComment){
        const comment = await this.commentService.getDetialComment(dataDetial.comment_id);
        return (new ApiResult().success(comment))
    }
    @Post("like-comment")
    @ApiOperation({summary:" Like  Comment "})
    @ApiResponse({ status: 200, description: 'Get Detial  Comment Success Full.'})
    @UsePipes(new ValidationPipe())
    @Roles(RoleType.USER)
    async userLikeComment(@Body()dataLike:dtoLikeComment,@UserInfo()user:User){
        const comment = await this.commentService.likeComment(user._id,dataLike.comment_id);
        return (new ApiResult().success(comment))
    }
}
