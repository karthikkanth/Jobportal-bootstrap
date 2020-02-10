import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpReq } from './../common/app.entity';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HttpService {
    headers: HttpHeaders;
    private CONTENT_TYPE: any = 'application/json';
    private loaderEvent = new BehaviorSubject<boolean>(false);
    loaderEventValue = this.loaderEvent.asObservable();
    constructor(private http: HttpClient) { }
    appendHeaders() {
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', this.CONTENT_TYPE);
    }
    restService(httpReq: HttpReq) {
        this.appendHeaders();
        if (httpReq.showLoader && httpReq.showLoader === true) {
            this.showLoader(true);
        }
        if (httpReq.type === 'GET') {
            return this.getMethod(httpReq);
        } else if (httpReq.type === 'POST') {
            return this.postMethod(httpReq);
        } else if (httpReq.type === 'PUT') {
            return this.putMethod(httpReq);
        }
    }
    getMethod(httpReq: HttpReq): Observable<any> {
        const url = environment.apiUrl + httpReq.url;
        console.log('**final**'+url);
        return this.http.get(url, { headers: this.headers }).pipe(
            map((resp: any) => {
                if (resp.status === 1 ||  resp.status === 200) {
                    if (httpReq.showLoader && httpReq.showLoader === true) {
                        this.showLoader(false);
                    }
                    return resp.data;
                } else {
                    console.log('*ERRORR**********' + resp.data)
                   //  this.errorMessage(resp.json().error);
                    return null;
                }
            },
                (error: any) => {

                })
        );
    }

    postMethod(httpReq: HttpReq): Observable<HttpResponse<object>> {
        const url = environment.apiUrl + httpReq.url;
        console.log('**final**'+url);
        return this.http.post(url, httpReq.body, { headers: this.headers }).pipe(
            map(
                (resp: any) => {
                    if (httpReq.showLoader && httpReq.showLoader === true) {
                        this.showLoader(false);
                    }
                    return resp;
                },
                (error: Error) => {
                    return error;
                }
            )
        );
    }

    putMethod(httpReq: HttpReq): Observable<HttpResponse<object>> {
        const url = environment.apiUrl + httpReq.url;
        return this.http.put(url, httpReq.body, { headers: this.headers }).pipe(
            map(
                (resp: any) => {
                    return resp;
                },
                (error: Error) => {
                    return error;
                }
            )
        );
    }
    showLoader(show: boolean) {
        this.loaderEvent.next(show);
    }

}
