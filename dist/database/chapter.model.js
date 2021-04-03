"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chapterSchema = void 0;
const mongoose = require("mongoose");
const manga_model_1 = require("./manga.model");
exports.chapterSchema = new mongoose.Schema({
    manga: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "manga"
    },
    index: {
        type: Number,
        default: 1
    },
    title: {
        type: String
    },
    url: {
        type: String
    },
    images: [
        {
            type: String
        }
    ],
    source: {
        type: String,
        default: manga_model_1.MANGA_TYPE.MANGA_BATO
    }
}, { timestamps: true });
exports.chapterSchema.index({ source: 1 });
//# sourceMappingURL=chapter.model.js.map