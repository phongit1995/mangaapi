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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_1 = require("../../common/api-result");
const role_type_1 = require("../../common/constants/role-type");
const roles_guard_1 = require("../../common/guards/roles.guard");
const user_dto_1 = require("./user.dto");
const user_service_1 = require("./user.service");
const role_decorators_1 = require("../../common/decorators/role.decorators");
const user_decorators_1 = require("../../common/decorators/user.decorators");
const user_model_1 = require("../../database/user.model");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createNewUser(dataRegister) {
        const user = await this.userService.RegisterUser(dataRegister);
        return (new api_result_1.ApiResult().success(user));
    }
    async LoginUser(dataLogin) {
        const user = await this.userService.LoginUser(dataLogin);
        return (new api_result_1.ApiResult().success(user));
    }
    async addDevicesUser(dataDevices, user) {
        await this.userService.addDevicesUser(user._id, dataDevices.devices);
        return (new api_result_1.ApiResult().success());
    }
    async updateUserInfo(dataUpdate, user) {
        await this.userService.updateUserInfo(user._id, dataUpdate);
        return (new api_result_1.ApiResult().success());
    }
};
__decorate([
    common_1.Post("register-user"),
    swagger_1.ApiOperation({ summary: "Register User" }),
    swagger_1.ApiResponse({ status: 200, description: 'Register User Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.dtoRegisterUser]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createNewUser", null);
__decorate([
    common_1.Post("login-user"),
    swagger_1.ApiOperation({ summary: "Login User Success" }),
    swagger_1.ApiResponse({ status: 200, description: 'Login User Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.dtoLoginUser]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "LoginUser", null);
__decorate([
    common_1.Post("add-devices-user"),
    swagger_1.ApiOperation({ summary: "Login User Success" }),
    swagger_1.ApiResponse({ status: 200, description: 'Login User Success Fully.' }),
    role_decorators_1.Roles(role_type_1.RoleType.USER),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()), __param(1, user_decorators_1.UserInfo()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.dtoDevicesUser, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addDevicesUser", null);
__decorate([
    common_1.Post("update-user-info"),
    swagger_1.ApiOperation({ summary: "Update User Info" }),
    swagger_1.ApiResponse({ status: 200, description: 'Update User Info Success.' }),
    role_decorators_1.Roles(role_type_1.RoleType.USER),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()), __param(1, user_decorators_1.UserInfo()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.dtoUpdateUserInfo, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserInfo", null);
UserController = __decorate([
    swagger_1.ApiHeader({
        name: 'token',
        description: 'Token Of User'
    }),
    swagger_1.ApiTags("User"),
    swagger_1.ApiConsumes("User Api"),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map