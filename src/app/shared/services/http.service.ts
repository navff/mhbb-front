import { Injectable } from '@angular/core';
import { Http, RequestOptions, XHRBackend, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
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

        options.headers.set('Authorization', 'token ' + localStorage.getItem('token'));
        super(backend, options);
    }

    request(request: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        let token = localStorage.getItem('token');
        if (typeof request === 'string') {
            if (!options) {
                options = { headers: new Headers() };
            }
            options.headers.set('Authorization', `token ${token}`);
        } else {
            request.url = apiUrl + request.url;
            request.headers.set('Authorization', `token ${token}`);
        }
        return super.request(request, options);
    }

    myPost(url: string, body = null) {
        return super.post(url, body, this.options)
            .map((data) => data.json());
    }
    myPut(url: string, body = null) {
        return super.put(url, body, this.options)
            .map((data) => data.json());
    }
    myDelete(url: string) {
        return super.delete(url, this.options)
            .map((data) => data.json());
    }
}
