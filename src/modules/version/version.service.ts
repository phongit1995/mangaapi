import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Version } from 'src/database/version.model';
import { dtoCreateNewVersion } from './version.dto';

@Injectable()
export class VersionService {
    constructor(
        @InjectModel("version") private versionModel:Model<Version>
    ){}
    async createNewVersion(data:dtoCreateNewVersion):Promise<Version>{
        return this.versionModel.create({...data});
    }
    async getListVerSion():Promise<Array<Version>>{
        return this.versionModel.find({enable:true}).sort({createdAt:-1});
    }
}
