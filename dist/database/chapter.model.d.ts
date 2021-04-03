import * as mongoose from 'mongoose';
import { Manga } from './manga.model';
export declare const chapterSchema: mongoose.Schema;
export interface Chapter extends mongoose.Document {
    manga: string | Manga;
    index?: number;
    source?: string;
    images?: string[];
    title?: string;
    url?: string;
    status_update_images?: boolean;
    before?: string;
    after?: string;
}
