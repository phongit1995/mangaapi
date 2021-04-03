import { ApiResult } from 'src/common/api-result';
import { dtoCreateNewVersion } from './version.dto';
import { VersionService } from './version.service';
export declare class VersionController {
    private versionService;
    constructor(versionService: VersionService);
    createNewVersion(dataVersion: dtoCreateNewVersion): Promise<ApiResult<unknown>>;
    getListVersion(): Promise<ApiResult<unknown>>;
}
