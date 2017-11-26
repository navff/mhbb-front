import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, XHRBackend, Request, RequestOptionsArgs, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

const apiUrl = 'http://test.mhbb.ru/b/api/';

@Injectable()
export class HttpService extends Http {
    requests$: BehaviorSubject<number> = new BehaviorSubject(0);

    constructor(backend: XHRBackend, options: RequestOptions) {
        super(backend, options);

        const match = window.location.href.match(/token=(.)+/);
        if (match) {
            localStorage.setItem('token', match[0].substr(6));
        }
    }

    request(request: Request, options?: RequestOptionsArgs): Observable<Response> {
        this.requests$.next(this.requests$.getValue() + 1);
        request.url = apiUrl + request.url;
        request.headers.set('Authorization', `token ${localStorage.getItem('token')}`);
        return super.request(request, options)
            .finally(() => this.requests$.next(this.requests$.getValue() - 1));
    }

    get(url: string, options?: RequestOptions) {
        return super.get(url, options).map((data) => data.json());
    }

    delete(url: string, options?: RequestOptions) {
        return super.delete(url, options).map((data) => data.json());
    }

    post(url: string, body = null, options?: RequestOptions) {
        return super.post(url, body, options).map((data) => data.json());
    }

    put(url: string, body = null, options?: RequestOptions) {
        return super.put(url, body, options).map((data) => data.json());
    }

}
