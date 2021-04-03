import * as mongoose from 'mongoose';
export declare const CommentSchema: mongoose.Schema;
interface ReplyComment {
    user?: string;
    message?: string;
}
export interface Comment extends mongoose.Document {
    user?: string;
    message?: string;
    chapter?: string;
    manga?: string;
    replyCount?: number;
    like_count?: number;
    reply?: Array<ReplyComment>;
}
export {};
