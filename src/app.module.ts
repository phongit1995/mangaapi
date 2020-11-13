import { Module } from '@nestjs/common';
import { ShareModule } from './shared/shared.module';
import { MangaModule } from './modules/manga/manga.module';
import { ChapterModule } from './modules/chapter/chapter.module';
import { TasksService } from './cron/cron.service';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    ShareModule,
    MangaModule,
    ChapterModule,
    CategoryModule
  ],
  providers: [ TasksService],
})
export class AppModule {}
