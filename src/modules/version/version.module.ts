import { Module } from '@nestjs/common';
import { VersionService } from './version.service';
import { VersionController } from './version.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {VersionSchema} from './../../database/version.model';
@Module({
  imports:[
    MongooseModule.forFeature([{name:"version",schema:VersionSchema}])
  ],
  providers: [VersionService],
  controllers: [VersionController]
})
export class VersionModule {}
