import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class ActivityService {
    constructor(private http: Http) {}
    getActivities(
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


    getUncheckedActivities(
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
        let headers = new Headers({'Authorization': 'Token Abrakadabra'});
        let options = new RequestOptions({ headers: headers });
        let url = `http://test.mhbb.ru/b/api/activity/searchunchecked?${q}`;
        return this.http.get(url, options);
    }
    getActivity(id) {
        return this.http.get(`http://test.mhbb.ru/b/api/activity/${id}`)
        .map((response) => response.json())
        .toPromise();
    }
}
