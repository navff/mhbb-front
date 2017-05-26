import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrganizerService {
    constructor(private http: Http) {}

    getOrganizersByPage(page: number) {
        return this.http
        .get(`http://test.mhbb.ru/b/api/organizer/getall?page=${page}`)
        .map((response) => response.json())
        .toPromise();
    }

    getOrganizerById(id: number) {
        return this.http.get(`http://test.mhbb.ru/b/api/organizer/${id}`)
        .map((response) => response.json())
        .toPromise();
    }
}
