import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class VoicesService {
    constructor(private http: Http) {}
    votePositive(id) {
        let headers = new Headers({'Authorization': 'Token Abrakadabra'});
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`http://test.mhbb.ru/b/api/voice/positive/${id}`, null, options);
    }
    voteNegative(id) {
        let headers = new Headers({'Authorization': 'Token Abrakadabra'});
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`http://test.mhbb.ru/b/api/voice/negative/${id}`, null, options);
    }
}
