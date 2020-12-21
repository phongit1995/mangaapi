import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_USER, User } from 'src/database/user.model';
import { ERROR_TYPE } from '../constants/error';
import { RoleType } from '../constants/role-type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly _reflector:Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let roles = this._reflector.get<RoleType[]>('roles',context.getHandler());
    if(!roles){
      roles=[RoleType.MEMBER];
    }
    if( roles?.length==0 || roles?.includes(RoleType.MEMBER)==true){
      return true ;
    }
    const request = context.switchToHttp().getRequest();
    let user = <User> request.user;
    if(!user){
      throw new HttpException(ERROR_TYPE.PLEASE_LOGIN_USER,HttpStatus.BAD_REQUEST);
    }
    return true ;
  }
}
