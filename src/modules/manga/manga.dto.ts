import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNumber, IsOptional, IsString, Min } from "class-validator";
enum TYPE_GET_LIST_MANGA{
    "HOT_MANGA"=0,
    "CHAPTER_NEW"=1
}
export class dtoGetListManga{
    @ApiProperty({minimum:1,default:1,example:1})
    @IsNumber()
    @Min(1)
    page:number=1;
    @ApiProperty({minimum:1,default:1,example:10})
    @IsNumber()
    @IsOptional()
    @Min(1)
    numberItem:number=10
    @ApiProperty({description:"Type Of Manga",enum:[0,1]})
    @IsEnum(TYPE_GET_LIST_MANGA)
    @IsNumber()
    type:number;
}
export class dtoGetListMangaByCategory{
    @ApiProperty({minimum:1,default:1,example:10})
    @IsNumber()
    @Min(1)
    page:number=1;
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    @Min(1)
    numberItem:number=10
    @ApiProperty({description:"Type Of Manga",enum:[0,1]})
    @IsEnum(TYPE_GET_LIST_MANGA)
    @IsNumber()
    type:number;
    @ApiProperty({description:"Category Of Manga"})
    @IsString()
    category:string;
}
export class dtoSearchManga{
    @ApiProperty({minimum:1,example:1})
    @IsNumber()
    @Min(1)
    page:number=1;
    @ApiProperty({minimum:1,example:10})
    @IsNumber()
    @IsOptional()
    @Min(1)
    numberItem:number=10
    @ApiProperty({description:"Name Of Manga"})
    @IsString()
    name:string;
}
export class dtoHiddenManga{
    @ApiProperty()
    @IsMongoId({each:true})
    manga_id:string[];
}
export class dtoGetDetialManga {
    @ApiProperty({description:'Id Manga'})
    @IsMongoId()
    manga_id:string;
}