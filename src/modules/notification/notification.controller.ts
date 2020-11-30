import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { dtoTestNotification } from './notification.dto';
import { NotificationService } from './notification.service';
@ApiTags("notification")
@ApiConsumes("Notification Api")
@Controller('notification')
export class NotificationController {
    constructor(private notificationService:NotificationService){}
    @Post("test-notification")
    @ApiOperation({summary:"Test notification"})
    @ApiResponse({ status: 200, description: 'test success.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async testNotification(@Body() dataTest:dtoTestNotification){
        await this.notificationService.pushNotificationToManga(dataTest.manga_id);
        return 0 ;
    }
}
