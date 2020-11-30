import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Manga } from 'src/database/manga.model';
import { FcmPushService } from 'src/shared/services/push.service';

@Injectable()
export class NotificationService {
    constructor(@InjectModel('manga' )private mangaModel:Model<Manga>,
    private fmcPushService:FcmPushService) {}
    async pushNotificationToManga(manga_id:string){
        const Manga = await this.mangaModel.findById(manga_id);
        console.log(Manga.devices);
        await this.fmcPushService.sendMessage({
            notification:{title:"Update Manga",body:Manga.name},
            registration_ids:Manga.devices
        })
        console.log(Manga);
    }
}
