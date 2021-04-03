"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionSchema = exports.TYPE_VERSION = void 0;
const mongoose = require("mongoose");
var TYPE_VERSION;
(function (TYPE_VERSION) {
    TYPE_VERSION["ANDROID"] = "ANDROID";
    TYPE_VERSION["IOS"] = "IOS";
})(TYPE_VERSION = exports.TYPE_VERSION || (exports.TYPE_VERSION = {}));
exports.VersionSchema = new mongoose.Schema({
    name: String,
    support: {
        type: Boolean,
        default: true
    },
    type: {
        type: String,
        default: TYPE_VERSION.ANDROID
    },
    enable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
//# sourceMappingURL=version.model.js.map