import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator'

@Entity()
export class User {
  @PrimaryColumn()
  @ApiProperty({
      description: "每个微信号对应唯一的openid"
  })
  @IsString()
  @IsDefined()
  id: string;

  @Column({ default: ""})
  @ApiPropertyOptional()
  @IsString()
  nickName: string;

  @Column({ default: "user" })
  @ApiProperty()
  @IsString()
  role: string

  @Column()
  @ApiPropertyOptional()
  @IsString()
  avatarUrl: string

  @Column({ default: 0 })
  @ApiPropertyOptional()
  @IsInt()
  gender: number;

  @Column()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city?: string

  @Column()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  country?: string

  @Column()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  province?: string

  @Column()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  language?: string

  
}
