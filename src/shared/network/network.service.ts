import { Injectable, HttpService } from '@nestjs/common';
import type { AxiosRequestConfig, AxiosResponse } from "axios"
import { Observable } from 'rxjs';
import { stringify } from 'qs'

@Injectable()
export class NetworkService {
    constructor(private httpClient: HttpService) {
    }

    get(options: AxiosRequestConfig): Observable<any> {
        const newObservable = new Observable(subscriber => {
            const { url, params } = options
            const newUrl = params ? `${url}?${stringify(params)}` : url
            this.httpClient.get(newUrl).subscribe(res => {
                const { status, data } = res
                status === 200 || status === 304 ? subscriber.next(data) : subscriber.next(new Error(JSON.stringify(data)))
                subscriber.complete()
            })
        })
        return newObservable
    }
    
}
