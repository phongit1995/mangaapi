import { ApiResult } from 'src/common/api-result';
import { dtoLoginUser, dtoRegisterUser, dtoDevicesUser, dtoUpdateUserInfo } from './user.dto';
import { UserService } from './user.service';
import { User } from 'src/database/user.model';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createNewUser(dataRegister: dtoRegisterUser): Promise<ApiResult<unknown>>;
    LoginUser(dataLogin: dtoLoginUser): Promise<ApiResult<unknown>>;
    addDevicesUser(dataDevices: dtoDevicesUser, user: User): Promise<ApiResult<unknown>>;
    updateUserInfo(dataUpdate: dtoUpdateUserInfo, user: User): Promise<ApiResult<unknown>>;
}
