import { Module } from '@nestjs/common';
import { MangaService } from './manga.service';
import { MangaController } from './manga.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { mangaSchema } from 'src/database/manga.model';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"manga",schema:mangaSchema}])
  ],
  providers: [MangaService],
  controllers: [MangaController],
  exports:[MangaService]
})
export class MangaModule {}
