import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { mangaSchema } from 'src/database/manga.model';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"manga",schema:mangaSchema}]),
  ],
  providers: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationModule {}
