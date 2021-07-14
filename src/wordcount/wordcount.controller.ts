import { Get, HttpException, HttpStatus, Query, ValidationPipe } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/shared/decorators/roles.decorator';
import { XmlFormat } from 'src/shared/decorators/xml.decorator';
import { WordParams } from './dto/create-word.dto';
import { WordcountService } from './wordcount.service';

@Roles(Role.Guest)
@ApiTags("WordCount")
@Controller('wordcount')
export class WordcountController {

    constructor(private readonly wordService: WordcountService) {}

    @Post()
    calculateWord(@Body(new ValidationPipe()) data: WordParams) {
        const { content } = data
        const result = this.wordService.calculate(content)
        return result
    }

    @Get()
    @XmlFormat()
    calculateWordXml(@Query('data') data: string) {
        if(!data) {
            throw new HttpException("param 'data' is invalid", HttpStatus.BAD_REQUEST)
        }
        const content = JSON.parse(this.wordService.extractData(data))
        if(!content) {
            throw new HttpException("param 'data' is invalid", HttpStatus.BAD_REQUEST)
        }
        const result = this.wordService.calculate(content)
        const xml = this.wordService.transform2xml(result)
        return xml
    }
}
