import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class  CreateTfIdf {
    
    @ApiProperty({
        description: "训练的语料文档"
    })
    @IsArray()
    contents: string[]

    @ApiProperty({
        description: "预测的句子"
    })
    @IsString()
    text: string
}