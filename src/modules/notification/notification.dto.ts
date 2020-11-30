import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class dtoTestNotification{
    @ApiProperty()
    @IsMongoId()
    manga_id:string
}