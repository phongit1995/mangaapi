import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ShareModule } from './shared/shared.module';
import { MangaModule } from './modules/manga/manga.module';
import { ChapterModule } from './modules/chapter/chapter.module';
import { TasksService } from './cron/cron.service';
import { CategoryModule } from './modules/category/category.module';
import { NotificationModule } from './modules/notification/notification.module';
import { VersionModule } from './modules/version/version.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/user/user.module';
import { CommentModule } from './modules/comment/comment.module';
import { RequestCheckMiddleware } from './common/middleware/usermiddleware';

@Module({
  imports: [
    ShareModule,
    MangaModule,
    ChapterModule,
    CategoryModule,
    NotificationModule,
    VersionModule,
    UploadModule,
    UserModule,
    CommentModule
  ],
  providers: [ TasksService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestCheckMiddleware)
      .forRoutes("*");
  }
}
