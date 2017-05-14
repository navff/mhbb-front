import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ActivityService {
    constructor(private http: Http) {}

    getAllActivities() {
        return this.http.get('http://test.mhbb.ru/b/api/activity/search');
    }
}
