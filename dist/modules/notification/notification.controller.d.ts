import { dtoTestNotification, dtoTestNotificationDevice } from './notification.dto';
import { NotificationService } from './notification.service';
export declare class NotificationController {
    private notificationService;
    constructor(notificationService: NotificationService);
    testNotification(dataTest: dtoTestNotification): Promise<number>;
    testNotificationSenDevices(dataTest: dtoTestNotificationDevice): Promise<void>;
}
