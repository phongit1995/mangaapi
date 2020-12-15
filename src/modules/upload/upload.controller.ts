import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { ApiResult } from 'src/common/api-result';
import { storageDrive } from 'src/common/google/storage.google';
import { fileUpload } from './upload.interface';

@Controller('upload')
export class UploadController {
    @Post("/")
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file',{
        storage:storageDrive
    }))
    uploadFile(@UploadedFile()file:fileUpload){
        return (new ApiResult().success("https://drive.google.com/uc?id="+file.fileId))
    }
}
