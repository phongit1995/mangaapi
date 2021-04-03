import * as mongoose from 'mongoose';
export declare const categorySchema: mongoose.Schema<any>;
export interface Category extends mongoose.Document {
    name?: string;
    image?: string;
    enable?: boolean;
}
