import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrganizerService {
    constructor(private http: Http) {}

    getOrganizers(page?: any, word?: any, cityId?: any) {
        let w, c, p, q;
        w = word     ? `word=${word}` : '';
        c = cityId      ? `cityId=${cityId}` : '';
        p = page      ? `page=${page}` : '';
        q = [w, c, p].filter(function(x) { return x !== ''; }).join('&');

        return this.http
        .get(`http://test.mhbb.ru/b/api/organizer/search?${q}`)
        .map((response) => response.json())
        .toPromise();
    }

    getOrganizerById(id: string) {
        return this.http.get(`http://test.mhbb.ru/b/api/organizer/${id}`)
        .map((response) => response.json())
        .toPromise();
    }
    putOrganizer(id: any, body: any) {
        let headers = new Headers({'Authorization': 'Token Abrakadabra'});
        let options = new RequestOptions({ headers: headers });
        return this.http.put(`http://test.mhbb.ru/b/api/organizer/${id}`, body, options);
    }
}
