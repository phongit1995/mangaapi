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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dtoUpdateUserInfo = exports.dtoDevicesUser = exports.dtoLoginUser = exports.dtoRegisterUser = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const role_type_1 = require("../../common/constants/role-type");
class dtoRegisterUser {
}
__decorate([
    swagger_1.ApiProperty({ example: "test@gmail.com" }),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], dtoRegisterUser.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty({ minLength: 6 }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], dtoRegisterUser.prototype, "password", void 0);
exports.dtoRegisterUser = dtoRegisterUser;
class dtoLoginUser {
}
__decorate([
    swagger_1.ApiProperty({ example: "test@gmail.com" }),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], dtoLoginUser.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty({ minLength: 6 }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], dtoLoginUser.prototype, "password", void 0);
exports.dtoLoginUser = dtoLoginUser;
class dtoDevicesUser {
}
__decorate([
    swagger_1.ApiProperty({ example: "adwndnanwudnmamakdnwiundwk" }),
    __metadata("design:type", String)
], dtoDevicesUser.prototype, "devices", void 0);
exports.dtoDevicesUser = dtoDevicesUser;
class dtoUpdateUserInfo {
}
__decorate([
    swagger_1.ApiProperty({ example: "Name User" }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], dtoUpdateUserInfo.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({ example: "Avatar User" }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], dtoUpdateUserInfo.prototype, "avatar", void 0);
__decorate([
    swagger_1.ApiProperty({ example: "Phone User" }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], dtoUpdateUserInfo.prototype, "phone", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 0 }),
    class_validator_1.IsEnum(role_type_1.GENDER_TYPE),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], dtoUpdateUserInfo.prototype, "gender", void 0);
exports.dtoUpdateUserInfo = dtoUpdateUserInfo;
//# sourceMappingURL=user.dto.js.map