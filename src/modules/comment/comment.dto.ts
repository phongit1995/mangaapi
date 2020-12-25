import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class dtoCommentToManga {
    @ApiProperty({title:"id of manga"})
    @IsMongoId()
    manga_id:string;
    @ApiProperty({title:"message of User"})
    @IsString()
    message:string
}
export class dtoCommentToChapter {
    @ApiProperty({title:"id of chapter"})
    @IsMongoId()
    chapter_id:string;
    @ApiProperty({title:"message of User"})
    @IsString()
    message:string
}
export class dtoListCommentManga{
    @ApiProperty({minimum:1,example:1})
    @IsNumber()
    @Min(1)
    page:number=1;
    @ApiProperty({minimum:1,example:10})
    @IsNumber()
    @IsOptional()
    @Min(1)
    numberItem:number=10
    @ApiProperty({title:"id of manga"})
    @IsMongoId()
    manga_id:string;
}
export class dtoListCommentChapter{
    @ApiProperty({minimum:1,example:1})
    @IsNumber()
    @Min(1)
    page:number=1;
    @ApiProperty({minimum:1,example:10})
    @IsNumber()
    @IsOptional()
    @Min(1)
    numberItem:number=10
    @ApiProperty({title:"chapter id"})
    @IsMongoId()
    chapter_id:string;
}
export class dtoReplyComment{
    @ApiProperty({title:"comment id"})
    @IsMongoId()
    comment_id:string;
    @ApiProperty({title:"message of User"})
    @IsString()
    message:string
}
export class dtoDetialComment{
    @ApiProperty({title:"comment id"})
    @IsMongoId()
    comment_id:string;
}
export class dtoLikeComment{
    @ApiProperty({title:"comment id"})
    @IsMongoId()
    comment_id:string;
}