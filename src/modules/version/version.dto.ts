import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsMongoId, IsNumber, IsOptional, IsString, Min } from "class-validator";
export class dtoCreateNewVersion{
    @ApiProperty({description:"Name Version"})
    @IsString()
    name?:string;
    @ApiProperty({description:"Status Enable"})
    @IsBoolean()
    @IsOptional()
    enable?:boolean;
}