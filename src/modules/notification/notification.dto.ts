import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsString } from "class-validator";

export class dtoTestNotification{
    @ApiProperty()
    @IsMongoId()
    manga_id:string
}
export class dtoTestNotificationDevice{
    @ApiProperty()
    @IsString()
    device:string
}