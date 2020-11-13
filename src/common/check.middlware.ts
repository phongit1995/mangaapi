import { Request, Response } from 'express';
export function CheckRequest(req: Request, res: Response, next: Function) {
    let {unittime,token,admin} = req.headers ;
    let {url} =req;
    if(url.includes("/docs")){
        return  next();
    }
    if(admin=='ADMIN'){
        return next();
    }
    if(!unittime || !token){
        return res.status(401).json({
            code:401,
            status:"error",
            message:"ERROR_AUTHEN"
        })
    }
    next()
  };
