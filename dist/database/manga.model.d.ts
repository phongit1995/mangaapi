import * as mongoose from 'mongoose';
export declare enum TYPE_STATUS_MANGA {
    ON_GOING = 0,
    COMPLETE = 1
}
export declare enum MANGA_TYPE {
    MANGA_BATO = "MANGA_BATO"
}
export declare const mangaSchema: mongoose.Schema;
export interface Manga extends mongoose.Document {
    name?: string;
    author?: string;
    image?: string;
    views?: string;
    url?: string;
    manga_status?: number;
    enable?: boolean;
    description?: string;
    category?: Array<string>;
    chapters?: Array<string>;
    chapter_update?: Date;
    source?: string;
    first_chapter?: string;
    devices?: Array<string>;
}
