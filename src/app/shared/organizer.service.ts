import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrganizerService {
    constructor(private http: Http) {}

    getOrganizers(page?: number, word?: string, cityId?: number) {
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
        let headers = new Headers({'Authorization': 'Token ABRAKADABRA'});
        let options = new RequestOptions({ headers: headers });
        return this.http.put(`http://test.mhbb.ru/b/api/organizer/${id}`, body, options)
        .map((response) => response.json())
        .toPromise();
    }
}
export class OrganizerPutBody {
    Name: string;
    CityId: number;
    Sobriety: boolean;
    constructor(name: string, cityid: number, sobriety: boolean) {
      this.Name = name;
      this.CityId = cityid;
      this.Sobriety = sobriety;
}
}

