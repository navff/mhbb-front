import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class InterestService {
    constructor(private http: Http) {}

    getInterests() {
        return this.http.get('http://test.mhbb.ru/b/api/interest/getall');
    }
}
