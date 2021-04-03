import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { GENDER_TYPE } from "src/common/constants/role-type";

export class dtoRegisterUser{
    @ApiProperty({example:"test@gmail.com"})
    @IsEmail()
    email:string;
    @ApiProperty({minLength:6})
    @IsString()
    password:string;
}
export class dtoLoginUser{
    @ApiProperty({example:"test@gmail.com"})
    @IsEmail()
    email:string;
    @ApiProperty({minLength:6})
    @IsString()
    password:string;
}
export class dtoDevicesUser{
    @ApiProperty({example:"adwndnanwudnmamakdnwiundwk"})
    devices:string;
}
export class dtoUpdateUserInfo{
    @ApiProperty({example:"Name User"})
    @IsString()
    @IsOptional()
    name?:string
    @ApiProperty({example:"Avatar User"})
    @IsString()
    @IsOptional()
    avatar?:string
    @ApiProperty({example:"Phone User"})
    @IsString()
    @IsOptional()
    phone?:string
    @ApiProperty({example:0})
    @IsEnum(GENDER_TYPE)
    @IsOptional()
    @IsNumber()
    gender?:number
}