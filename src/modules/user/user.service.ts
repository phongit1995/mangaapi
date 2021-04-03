import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ERROR_TYPE } from 'src/common/constants/error';
import { User } from 'src/database/user.model';
import { dtoLoginUser, dtoRegisterUser, dtoUpdateUserInfo } from './user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('user')private userModel:Model<User>,
    private readonly jwtService: JwtService){}
    async RegisterUser(user:dtoRegisterUser):Promise<User>{
        let userData = await this.userModel.findOne({email:user.email.toLowerCase()});
        if(userData){
            throw new HttpException(ERROR_TYPE.EMAIL_IS_EXITS,HttpStatus.BAD_REQUEST);
        }
        return this.userModel.create({email:user.email.toLowerCase(),password:user.password});
    }
    async LoginUser(userData:dtoLoginUser):Promise<User>{
        const user = await this.userModel.findOne({email:userData.email.toLowerCase(),password:userData.password}).select("-password");
        if(!user){
            throw new HttpException(ERROR_TYPE.EMAIL_OR_PASSWORD_IS_CORRECT,HttpStatus.BAD_REQUEST);
        }
        const userObject = user.toObject();
        userObject.token = this.jwtService.sign(userObject);
        return userObject;
    }
    async addDevicesUser(user_id:string,devices:string):Promise<User>{
        return this.userModel.findByIdAndUpdate(user_id,{$addToSet:{devices:devices}})
    }
    async updateUserInfo(user_id:string,infoUser:dtoUpdateUserInfo):Promise<User>{
        return this.userModel.findByIdAndUpdate(user_id,{...infoUser},{new:true});
    }
}
