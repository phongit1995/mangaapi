import * as mongoose from 'mongoose';
export declare enum TYPE_VERSION {
    ANDROID = "ANDROID",
    IOS = "IOS"
}
export declare const VersionSchema: mongoose.Schema<any>;
export interface Version extends mongoose.Document {
    name?: string;
    support?: boolean;
    type?: string;
    enable?: boolean;
}
