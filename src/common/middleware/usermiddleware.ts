import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
@Injectable()
export class RequestCheckMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService){}
    async use(req: Request|any, res: Response, next: Function){
        const token =  req.headers?.token ||req.headers?.authorization;
        if(token){
            try {
                let user= this.jwtService.decode(token);
                req.user=user ;
            } catch (error) {
                console.log('loi' +error);
            }
        }  
        next();
    }
}