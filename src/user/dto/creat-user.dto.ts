import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsOptional, IsString } from 'class-validator'

export class CreateUserDto {

  @ApiPropertyOptional()
  @IsString()
  nickName: string;

  @ApiPropertyOptional()
  @IsString()
  avatarUrl: string

  @ApiPropertyOptional()
  @IsInt()
  gender: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  country?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  province?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  language?: string


}