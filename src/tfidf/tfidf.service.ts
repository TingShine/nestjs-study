import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { js2xml, xml2js } from 'xml-js';
import Corpus from './Corpus'



@Injectable()
export class TfidfService {
    getTopTerms(contents: string[]): Array<any> {
        const titles = contents.map((item, index) => `document${index}`)
        if(contents.length === 0) {
            throw new HttpException("request body is invalid", HttpStatus.BAD_REQUEST)
        }
        const corpus = new Corpus(titles, contents)
        return corpus.getTopTermsForDocument(titles[titles.length - 1])
    }

    extractData(xml: string): any {
        const options = {compact: true, spaces: 4}
        const rawData = xml2js(xml, options)
        const data: string = rawData["soap:Envelope"]["soap:Body"]["soap:Data"]
        return data
    }

    transform2xml(data: any): string {
        const options = { compact: true, ignoreComment: true, spaces: 4 }
        const envelop = { "_attributes": { "xmlns:soap": "https://superting.cn/soap-envelop", "soap:encodingStyle": "https://superting.cn/soap-encoding" } }
        const header = { "soap:Header": {} }
        const fault = { "soap:Fault": {} }
        const body = { "soap:Body": { ...fault, "soap:Data": JSON.stringify(data) } }
        const jsData = { "_declaration": { "_attributes": { "version": "1.0", "encoding": "utf-8" } }, "soap:Envelope": { ...envelop, ...header, ...body } }
        const xmlData = js2xml(jsData, options)
        return xmlData
    }
}
