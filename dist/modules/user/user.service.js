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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const error_1 = require("../../common/constants/error");
const user_model_1 = require("../../database/user.model");
let UserService = class UserService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async RegisterUser(user) {
        let userData = await this.userModel.findOne({ email: user.email.toLowerCase() });
        if (userData) {
            throw new common_1.HttpException(error_1.ERROR_TYPE.EMAIL_IS_EXITS, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.userModel.create({ email: user.email.toLowerCase(), password: user.password });
    }
    async LoginUser(userData) {
        const user = await this.userModel.findOne({ email: userData.email.toLowerCase(), password: userData.password }).select("-password");
        if (!user) {
            throw new common_1.HttpException(error_1.ERROR_TYPE.EMAIL_OR_PASSWORD_IS_CORRECT, common_1.HttpStatus.BAD_REQUEST);
        }
        const userObject = user.toObject();
        userObject.token = this.jwtService.sign(userObject);
        return userObject;
    }
    async addDevicesUser(user_id, devices) {
        return this.userModel.findByIdAndUpdate(user_id, { $addToSet: { devices: devices } });
    }
    async updateUserInfo(user_id, infoUser) {
        return this.userModel.findByIdAndUpdate(user_id, Object.assign({}, infoUser), { new: true });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('user')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map