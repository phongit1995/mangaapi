"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentSchema = void 0;
const mongoose = require("mongoose");
const ReplySchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    message: {
        type: String
    }
}, { timestamps: true });
exports.CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    message: {
        type: String
    },
    chapter: {
        type: mongoose.Types.ObjectId,
        ref: 'chapter'
    },
    manga: {
        type: mongoose.Types.ObjectId,
        ref: 'manga'
    },
    like_count: {
        type: Number,
        default: 0
    },
    replyCount: {
        type: Number,
        default: 0
    },
    reply: [ReplySchema]
}, { timestamps: true });
//# sourceMappingURL=comment.model.js.map