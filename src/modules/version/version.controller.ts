import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResult } from 'src/common/api-result';
import { dtoCreateNewVersion } from './version.dto';
import { VersionService } from './version.service';
@ApiTags("Version")
@ApiConsumes("Version Api")
@Controller('version')
export class VersionController {
    constructor(private versionService:VersionService){}
    @Post("create-version")
    @ApiOperation({summary:"Create New VerSion. FOR ADMIN"})
    @ApiResponse({ status: 200, description: 'Create New Version Success.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async createNewVersion(@Body()dataVersion:dtoCreateNewVersion){
        const version=await this.versionService.createNewVersion(dataVersion);
        return (new ApiResult().success(version))
    }
    @Get("list-version")
    @ApiOperation({summary:"Create New VerSion"})
    @ApiResponse({ status: 200, description: 'Create New Version Success.'})
    async getListVersion(){
        const listVersion =await this.versionService.getListVerSion()
        return (new ApiResult().success(listVersion))
    }
}
