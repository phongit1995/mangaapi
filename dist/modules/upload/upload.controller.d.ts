import { ApiResult } from 'src/common/api-result';
import { fileUpload } from './upload.interface';
export declare class UploadController {
    uploadFile(file: fileUpload): ApiResult<unknown>;
}
