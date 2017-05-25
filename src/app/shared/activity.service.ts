import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ActivityService {
    constructor(private http: Http) {}
    searchActivities(

        word?: any,
        age?: any,
        free?: any) {
        let w, a, f, q;

        w = word     ? `word=${word}` : '';
        a = age      ? `age=${age}` : '';
        f = free     ? `free=${free}` : '';
        q = [w, a, f].filter(function(x) { return x !== '' }).join('&');
        return this.http.get(`http://test.mhbb.ru/b/api/activity/search?${q}`);
    }
    getAllUncheckedActivities() {
        return this.http.get('http://test.mhbb.ru/b/api/activity/searchunchecked');
    }
}
