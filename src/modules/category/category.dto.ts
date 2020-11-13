import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsOptional, IsString } from "class-validator";
export class dtoCreateNewCategory {
    @ApiProperty({title:'name category'})
    @IsString()
    name:string;
    @ApiProperty()
    @IsString()
    @IsOptional()
    image:string
}