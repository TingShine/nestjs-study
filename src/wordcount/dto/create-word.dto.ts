import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class WordParams {
    @ApiProperty()
    @IsString()
    content: string
}