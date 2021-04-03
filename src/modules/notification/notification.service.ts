import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NOTIFiCATION_TYPE } from 'src/common/constants/notification.type';
import { Comment } from 'src/database/comment.model';
import { Manga } from 'src/database/manga.model';
import { User } from 'src/database/user.model';
import { FcmPushService ,pushMessage } from 'src/shared/services/push.service';
import * as mongoose from 'mongoose';

@Injectable()
export class NotificationService {
    constructor(@InjectModel('manga' )private mangaModel:Model<Manga>,
    @InjectModel('comment' )private commentModel:Model<Comment>,
    @InjectModel('user' )private userModel:Model<User>,
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
    // Like Comment 
    async pushNotificationLikeComment(comment_id:string,user_id:string){
        const commentData = await this.commentModel.findById(comment_id);
        if(commentData.user.toString()==user_id){
            return
        }
        const [userLike,userReceive] = await Promise.all([this.userModel.findById(user_id),this.userModel.findById(commentData.user)]);
        if(userReceive.devices.length==0){
            return 
        }
        const messageSend:pushMessage={
            registration_ids:userReceive.devices,
            notification:{
                title:`${userLike.name} đã like bài viết của bạn`,
            }
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
    private async getListDevicesUser(listUser:string[]):Promise<Array<string>>{
        const listUserData:Array<User> = await this.userModel.find({
            _id:{$in:listUser.map((item)=>new mongoose.Types.ObjectId(item))}
        })
        let listDevices:string[]=[];
        listUserData.forEach((user)=>{
            listDevices = listDevices.concat(user.devices);
        })
        return listDevices ;
    }
}
