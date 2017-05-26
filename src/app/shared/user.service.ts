import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    constructor(private http: Http) {}

    getUsers(word?: any, page?: any) {
        let w, p, q;

        w = word     ? `word=${word}` : '';
        p = page     ? `page=${page}` : '';
        q = [w, p].filter(function(x) { return x !== ''; }).join('&');

        let headers = new Headers({'Authorization': 'Token Abrakadabra'});
        let options = new RequestOptions({ headers: headers });
        let url = `http://test.mhbb.ru/b/api/user/search?${q}`;
        return this.http
        .get(url, options)
        .map((response) => response.json())
        .toPromise();
    }
    getUserByEmail(email: string) {
        let headers = new Headers({'Authorization': 'Token Abrakadabra'});
        let options = new RequestOptions({ headers: headers });
        let url = `http://test.mhbb.ru/b/api/user?email=${email}`;
        return this.http.get(url, options)
        .map((response) => response.json())
        .toPromise();
    }
}
