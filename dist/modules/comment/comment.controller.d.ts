import { ApiResult } from 'src/common/api-result';
import { User } from 'src/database/user.model';
import { dtoCommentToChapter, dtoCommentToManga, dtoDetialComment, dtoLikeComment, dtoListCommentChapter, dtoListCommentManga, dtoReplyComment } from './comment.dto';
import { CommentService } from './comment.service';
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    commentToManga(dataComment: dtoCommentToManga, user: User): Promise<ApiResult<unknown>>;
    commentToChapter(dataComment: dtoCommentToChapter, user: User): Promise<ApiResult<unknown>>;
    getListCommentManga(dataComment: dtoListCommentManga): Promise<ApiResult<unknown>>;
    getListCommentChapter(dataComment: dtoListCommentChapter): Promise<ApiResult<unknown>>;
    addReplyComment(user: User, dataReply: dtoReplyComment): Promise<ApiResult<unknown>>;
    getDetialComment(dataDetial: dtoDetialComment): Promise<ApiResult<unknown>>;
    userLikeComment(dataLike: dtoLikeComment, user: User): Promise<ApiResult<unknown>>;
}
