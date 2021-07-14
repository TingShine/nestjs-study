import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/shared/decorators/roles.decorator';
import { CreateTfIdf } from './dto/create-tfidf';
import { TfidfService } from './tfidf.service';
import { xml2js, js2xml } from 'xml-js'
import { XmlFormat } from 'src/shared/decorators/xml.decorator';

@ApiTags("tfidf")
@Controller('tfidf')
@Roles(Role.Guest)
export class TfidfController {

    constructor(private readonly tfidfService: TfidfService) { }

    @Post()
    @Roles(Role.Guest)
    getTfIdfTerm(@Body(new ValidationPipe()) data: CreateTfIdf) {
        const { contents, text } = data
        contents.push(text)
        const result = this.tfidfService.getTopTerms(contents)
        return result
    }

    @Get()
    @XmlFormat()
    getTfIdfTermXml(@Query('data') data: string) {
        // 解析xml格式获取数据
        const rawData = this.tfidfService.extractData(data)
        const contents: string[] = JSON.parse(rawData["soap:Contents"]["_text"])
        const text: string = JSON.parse(rawData["soap:Text"]["_text"])
        contents.push(text)
        // 计算tfidf
        const result = this.tfidfService.getTopTerms(contents)
        // 封装成soap返回结果
        const xmlResult = this.tfidfService.transform2xml(result)
        // 返回给客户端
        return xmlResult
    }
}
