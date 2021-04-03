"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mangaSchema = exports.MANGA_TYPE = exports.TYPE_STATUS_MANGA = void 0;
const mongoose = require("mongoose");
var TYPE_STATUS_MANGA;
(function (TYPE_STATUS_MANGA) {
    TYPE_STATUS_MANGA[TYPE_STATUS_MANGA["ON_GOING"] = 0] = "ON_GOING";
    TYPE_STATUS_MANGA[TYPE_STATUS_MANGA["COMPLETE"] = 1] = "COMPLETE";
})(TYPE_STATUS_MANGA = exports.TYPE_STATUS_MANGA || (exports.TYPE_STATUS_MANGA = {}));
var MANGA_TYPE;
(function (MANGA_TYPE) {
    MANGA_TYPE["MANGA_BATO"] = "MANGA_BATO";
})(MANGA_TYPE = exports.MANGA_TYPE || (exports.MANGA_TYPE = {}));
exports.mangaSchema = new mongoose.Schema({
    name: String,
    author: String,
    category: [
        { type: String }
    ],
    image: String,
    views: {
        type: Number,
        default: 0
    },
    description: String,
    url: String,
    manga_status: {
        type: Number,
        default: TYPE_STATUS_MANGA.ON_GOING
    },
    chapters: [
        { type: mongoose.Types.ObjectId,
            ref: 'chapter' }
    ],
    first_chapter: {
        type: mongoose.Types.ObjectId,
        ref: 'chapter'
    },
    chapter_update: {
        type: Date,
        default: Date.now
    },
    enable: {
        type: Boolean,
        default: true
    },
    source: {
        type: String,
        default: MANGA_TYPE.MANGA_BATO
    },
    devices: [
        {
            type: String
        }
    ]
}, { timestamps: true });
//# sourceMappingURL=manga.model.js.map