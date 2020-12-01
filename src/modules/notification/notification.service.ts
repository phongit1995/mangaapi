import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NOTIFiCATION_TYPE } from 'src/common/constants/notification.type';
import { Manga } from 'src/database/manga.model';
import { FcmPushService } from 'src/shared/services/push.service';

@Injectable()
export class NotificationService {
    constructor(@InjectModel('manga' )private mangaModel:Model<Manga>,
    private fmcPushService:FcmPushService) {}
    async pushNotificationToManga(manga_id:string){
        const Manga = await this.mangaModel.findById(manga_id);
        if(Manga.devices.length>0){
            await this.fmcPushService.sendMessage({
                notification:{title:` 🖐 ${Manga.name}`,body:" Đã Có Chương Mới !!! Xem Ngay 👉🏻"},
                registration_ids:Manga.devices,
                data:{
                    type:NOTIFiCATION_TYPE.NEW_CHAPTER,
                    id:Manga._id,
                    image:Manga.image
                }
            })
        }
    }
    async pushNotificationToDevices(device:string){
        await this.fmcPushService.sendMessage({
            notification:{title:"Update Manga",body: "Hello Man"},
            registration_ids:[device],
            data:{
                type:""
            }
        })
    }
}
