import { Injectable } from '@angular/core';
import { Http, RequestOptions, XHRBackend } from '@angular/http';
import 'rxjs/add/operator/map';

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
    myGet(url: string) {
        return super.get(url, this.options)
            .map((data) => data.json());
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
