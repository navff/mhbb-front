import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class OrganizerService {
    constructor(private http: Http) {}

    getOrganizersByPage(page) {
        return this.http.get(`http://test.mhbb.ru/b/api/organizer/getall?page=${page}`);
    }
}
