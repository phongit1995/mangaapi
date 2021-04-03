import { Model } from 'mongoose';
import { Manga } from 'src/database/manga.model';
import { FcmPushService } from 'src/shared/services/push.service';
export declare class NotificationService {
    private mangaModel;
    private fmcPushService;
    constructor(mangaModel: Model<Manga>, fmcPushService: FcmPushService);
    pushNotificationToManga(manga_id: string): Promise<void>;
    pushNotificationToDevices(device: string): Promise<void>;
}
