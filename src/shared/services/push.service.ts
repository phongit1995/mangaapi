import { Injectable } from '@nestjs/common';
import * as fcmPush from 'fcm-push';
import { ConfigServer } from './config.service';
@Injectable()
export class FcmPushService{
    private fcm:any ;
    constructor(private configServer:ConfigServer){
        this.fcm = new fcmPush(this.configServer.push_key);
    }
    async sendMessage(message:pushMessage):Promise<void>{
        return this.fcm.send(message,function(err, response){
            if (err) {
                console.log("Push Notification False");
            } else {
                
            }
        });
    }
}
export interface pushMessage{
    to?:string,
    registration_ids:string[],
    collapse_key?:string,
    notification:{title:string,body:string},
    data?:{[index:string]:string}
}