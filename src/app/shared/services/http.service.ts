import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { SharedService } from './shared.service';
import { HttpClient, HttpHandler, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';

const apiUrl = 'http://test.mhbb.ru/b/api/';

@Injectable()
export class HttpService extends HttpClient {

    constructor(handler: HttpHandler, private shared: SharedService) {
        super(handler);
        const match = window.location.href.match(/token=(.)+/);
        if (match) {
            localStorage.setItem('token', match[0].substr(6));
        }
    }

    request(req: string | HttpRequest<any>, url?: string, options: any = {}): Observable<any> {
        this.shared.requests$.next(this.shared.requests$.getValue() + 1);
        let headers = options.headers || new HttpHeaders();
        headers = headers.set('Authorization', `token ${localStorage.getItem('token')}`);
        options.headers = headers;
        url = apiUrl + url;
        return super.request(req as any, url as string, options)
            .finally(() => this.shared.requests$.next(this.shared.requests$.getValue() - 1));
      }

    setSearch(params?): HttpParams {
        let search = new HttpParams();
        if (params) {
            Object.keys(params).forEach(key => {
                search.append(key, params[key] || null);
            });
        }
        return search;
    }
}
