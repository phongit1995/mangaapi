"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.ROLE_USER = void 0;
const mongoose = require("mongoose");
const role_type_1 = require("../common/constants/role-type");
var ROLE_USER;
(function (ROLE_USER) {
    ROLE_USER["MEMBER"] = "MEMBER";
    ROLE_USER["ADMIN"] = "ADMIN";
})(ROLE_USER = exports.ROLE_USER || (exports.ROLE_USER = {}));
exports.userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "user"
    },
    email: String,
    password: String,
    avatar: {
        type: String,
        default: "https://vuecidity.wemakesites.net/static/images/avatar-01.png"
    },
    phone: {
        type: String
    },
    gender: {
        type: Number,
        default: role_type_1.GENDER_TYPE.FEMALE
    },
    role: {
        type: String,
        default: ROLE_USER.MEMBER
    },
    vip: {
        type: Boolean,
        default: false
    },
    vip_time: {
        type: Date,
        default: Date.now
    },
    devices: [
        { type: String }
    ]
}, { timestamps: true });
//# sourceMappingURL=user.model.js.map