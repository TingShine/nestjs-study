import { Injectable } from '@nestjs/common';
import { cut } from 'nodejieba'
import { js2xml, xml2js } from 'xml-js';

@Injectable()
export class WordcountService {

    calculate(context: string): Array<{ name: string, value: number }> {
        const result: string[] = cut(context)
        const counts = {}
        result.forEach((word: string) => {
            if(word in counts) {
                counts[word] += 1
            } else {
                counts[word] = 1
            }
        })
        const jsonResult = []
        for(const key in counts) {
            jsonResult.push({ name: key, value: counts[key]})
        }
        return jsonResult
    }

    extractData(xml: string): any {
        const options = {compact: true, spaces: 4}
        const rawData = xml2js(xml, options)
        const data: string = rawData["soap:Envelope"]["soap:Body"]["soap:Data"]["soap:Content"]["_text"]
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
