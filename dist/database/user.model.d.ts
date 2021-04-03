import * as mongoose from 'mongoose';
export declare enum ROLE_USER {
    MEMBER = "MEMBER",
    ADMIN = "ADMIN"
}
export declare const userSchema: mongoose.Schema;
export interface User extends mongoose.Document {
    name?: string;
    email?: string;
    password?: string;
    avatar?: string;
    phone?: string;
    role?: string;
    gender?: number;
    vip?: boolean;
    vip_time?: Date;
    devices?: Array<string>;
    token?: string;
}
