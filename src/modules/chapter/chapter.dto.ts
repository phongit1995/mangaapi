import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class dtoGetListChapter {
    @ApiProperty({title:"id of manga"})
    @IsMongoId()
    manga_id:string;
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