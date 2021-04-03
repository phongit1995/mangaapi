import { Model } from 'mongoose';
import { Version } from 'src/database/version.model';
import { dtoCreateNewVersion } from './version.dto';
export declare class VersionService {
    private versionModel;
    constructor(versionModel: Model<Version>);
    createNewVersion(data: dtoCreateNewVersion): Promise<Version>;
    getListVerSion(): Promise<Array<Version>>;
}
