import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/database/user.model';
import { dtoLoginUser, dtoRegisterUser, dtoUpdateUserInfo } from './user.dto';
export declare class UserService {
    private userModel;
    private readonly jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    RegisterUser(user: dtoRegisterUser): Promise<User>;
    LoginUser(userData: dtoLoginUser): Promise<User>;
    addDevicesUser(user_id: string, devices: string): Promise<User>;
    updateUserInfo(user_id: string, infoUser: dtoUpdateUserInfo): Promise<User>;
}
