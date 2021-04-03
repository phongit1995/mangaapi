import { Model } from 'mongoose';
import { Comment } from 'src/database/comment.model';
import { Manga } from 'src/database/manga.model';
import { User } from 'src/database/user.model';
import { FcmPushService } from 'src/shared/services/push.service';
export declare class NotificationService {
    private mangaModel;
    private commentModel;
    private userModel;
    private fmcPushService;
    constructor(mangaModel: Model<Manga>, commentModel: Model<Comment>, userModel: Model<User>, fmcPushService: FcmPushService);
    pushNotificationToManga(manga_id: string): Promise<void>;
    pushNotificationLikeComment(comment_id: string, user_id: string): Promise<void>;
    pushNotificationToDevices(device: string): Promise<void>;
    private getListDevicesUser;
}
