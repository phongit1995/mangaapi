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
const notification_type_1 = require("../../common/constants/notification.type");
const comment_model_1 = require("../../database/comment.model");
const manga_model_1 = require("../../database/manga.model");
const user_model_1 = require("../../database/user.model");
const push_service_1 = require("../../shared/services/push.service");
const mongoose = require("mongoose");
let NotificationService = class NotificationService {
    constructor(mangaModel, commentModel, userModel, fmcPushService) {
        this.mangaModel = mangaModel;
        this.commentModel = commentModel;
        this.userModel = userModel;
        this.fmcPushService = fmcPushService;
    }
    async pushNotificationToManga(manga_id) {
        const Manga = await this.mangaModel.findById(manga_id);
        if (Manga.devices.length > 0) {
            await this.fmcPushService.sendMessage({
                notification: { title: ` 🖐 ${Manga.name}`, body: " Đã Có Chương Mới !!! Xem Ngay 👉🏻" },
                registration_ids: Manga.devices,
                data: {
                    type: notification_type_1.NOTIFiCATION_TYPE.NEW_CHAPTER,
                    id: Manga._id,
                    image: Manga.image
                }
            });
        }
    }
    async pushNotificationLikeComment(comment_id, user_id) {
        const commentData = await this.commentModel.findById(comment_id);
        if (commentData.user.toString() == user_id) {
            return;
        }
        const [userLike, userReceive] = await Promise.all([this.userModel.findById(user_id), this.userModel.findById(commentData.user)]);
        if (userReceive.devices.length == 0) {
            return;
        }
        const messageSend = {
            registration_ids: userReceive.devices,
            notification: {
                title: `${userLike.name} đã like bài viết của bạn`,
            }
        };
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
    async getListDevicesUser(listUser) {
        const listUserData = await this.userModel.find({
            _id: { $in: listUser.map((item) => new mongoose.Types.ObjectId(item)) }
        });
        let listDevices = [];
        listUserData.forEach((user) => {
            listDevices = listDevices.concat(user.devices);
        });
        return listDevices;
    }
};
NotificationService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('manga')),
    __param(1, mongoose_1.InjectModel('comment')),
    __param(2, mongoose_1.InjectModel('user')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        push_service_1.FcmPushService])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map