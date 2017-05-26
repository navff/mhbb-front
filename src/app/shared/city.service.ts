import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CityService {
    constructor(private http: Http) {}

    getCities() {
        return this.http.get('http://test.mhbb.ru/b/api/city');
    }
}
