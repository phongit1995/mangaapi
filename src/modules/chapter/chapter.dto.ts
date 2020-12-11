import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNumber, IsOptional, Min } from "class-validator";

export class dtoGetListChapter {
    @ApiProperty({title:"id of manga"})
    @IsMongoId()
    manga_id:string;
    @ApiProperty({minimum:1,default:1,example:1,description:"Number Page"})
    @IsNumber()
    @IsOptional()
    @Min(1)
    page:number=1;
    @ApiProperty({minimum:1,default:1,example:10,description:"Number Item Of Page"})
    @IsNumber()
    @IsOptional()
    @Min(1)
    numberItem:number=50
}
export class dtoGetDetialChapter {
    @ApiProperty({title:"id of chapter"})
    @IsMongoId()
    id:string;
}
export class dtoDeleteImagesChapter {
    @ApiProperty({title:"id of chapter"})
    @IsMongoId()
    id:string;
}