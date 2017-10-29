import { Injectable } from '@angular/core';
import { Http, RequestOptions, XHRBackend, Request, RequestOptionsArgs, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

const apiUrl = 'http://test.mhbb.ru/b/api/';

@Injectable()
export class HttpService extends Http {
    constructor(backend: XHRBackend, options: RequestOptions) {
        let match = window.location.href.match(/token=(.)+/);
        if (match) {
            localStorage.setItem('token', match[0].substr(6));
        }
        super(backend, options);
    }

    request(request: Request, options?: RequestOptionsArgs): Observable<Response> {
        request.url = apiUrl + request.url;
        request.headers.set('Authorization', `token ${localStorage.getItem('token')}`);
        return super.request(request, options);
    }
}
