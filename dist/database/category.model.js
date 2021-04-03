"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
const mongoose = require("mongoose");
exports.categorySchema = new mongoose.Schema({
    name: String,
    image: String,
    enable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
//# sourceMappingURL=category.model.js.map