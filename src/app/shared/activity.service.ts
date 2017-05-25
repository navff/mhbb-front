import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ActivityService {
    constructor(private http: Http) {}
    searchActivities(
        word?: any,
        age?: any,
        interestId?: any,
        cityId?: any,
        sobriety?: any,
        free?: any) {
        let w, a, i, c, s, f, q;

        w = word     ? `word=${word}` : '';
        a = age      ? `age=${age}` : '';
        i = interestId      ? `interestId=${interestId}` : '';
        c = cityId      ? `cityId=${cityId}` : '';
        s = sobriety      ? `sobriety=${sobriety}` : '';
        f = free     ? `free=${free}` : '';

        q = [w, i, c, s, a, f].filter(function(x) { return x !== ''; }).join('&');
        return this.http.get(`http://test.mhbb.ru/b/api/activity/search?${q}`);
    }
    getAllUncheckedActivities() {
        return this.http.get('http://test.mhbb.ru/b/api/activity/searchunchecked');
    }
}
