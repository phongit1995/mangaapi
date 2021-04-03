import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { mangaSchema } from 'src/database/manga.model';
import { CommentSchema } from 'src/database/comment.model';
import { userSchema } from 'src/database/user.model';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"manga",schema:mangaSchema},{name:"comment",schema:CommentSchema},{name:"user",schema:userSchema}]),

  ],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports:[NotificationService]
})
export class NotificationModule {}
