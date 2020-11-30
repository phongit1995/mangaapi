import { Module } from '@nestjs/common';
import { MangaService } from './manga.service';
import { MangaController } from './manga.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { mangaSchema } from 'src/database/manga.model';
import { ChapterModule } from '../chapter/chapter.module';
import { chapterSchema } from 'src/database/chapter.model';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"manga",schema:mangaSchema}]),
    MongooseModule.forFeature([{name:"chapter",schema:chapterSchema}]),
  ],
  providers: [MangaService],
  controllers: [MangaController],
  exports:[MangaService]
})
export class MangaModule {}
