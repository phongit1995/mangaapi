"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionModule = void 0;
const common_1 = require("@nestjs/common");
const version_service_1 = require("./version.service");
const version_controller_1 = require("./version.controller");
const mongoose_1 = require("@nestjs/mongoose");
const version_model_1 = require("./../../database/version.model");
let VersionModule = class VersionModule {
};
VersionModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "version", schema: version_model_1.VersionSchema }])
        ],
        providers: [version_service_1.VersionService],
        controllers: [version_controller_1.VersionController]
    })
], VersionModule);
exports.VersionModule = VersionModule;
//# sourceMappingURL=version.module.js.map