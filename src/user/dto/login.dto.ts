import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginParams {
    @IsString()
    @ApiProperty({ example: "sadsadffgafg" })
    code: string
}