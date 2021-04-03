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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const manga_model_1 = require("../../database/manga.model");
const push_service_1 = require("../../shared/services/push.service");
let NotificationService = class NotificationService {
    constructor(mangaModel, fmcPushService) {
        this.mangaModel = mangaModel;
        this.fmcPushService = fmcPushService;
    }
    async pushNotificationToManga(manga_id) {
        const Manga = await this.mangaModel.findById(manga_id);
        console.log(Manga.devices);
        await this.fmcPushService.sendMessage({
            notification: { title: "Update Manga", body: Manga.name },
            registration_ids: Manga.devices
        });
        console.log(Manga);
    }
    async pushNotificationToDevices(device) {
        await this.fmcPushService.sendMessage({
            notification: { title: "Update Manga", body: "Hello Man" },
            registration_ids: [device],
            data: {
                type: ""
            }
        });
    }
};
NotificationService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('manga')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        push_service_1.FcmPushService])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map