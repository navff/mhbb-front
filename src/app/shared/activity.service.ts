import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ActivityService {
    constructor(private http: Http) {}
    searchActivities(
        word?: any,
        age?: any,
        interest?: any,
        city?: any,
        sobriety?: any,
        free?: any) {
        let w, a, i, c, s, f;
        w = word ? `word=${word}&` : '';
        a = age ? `age=${age}&` : '';
        i = interest ? `interestId=${interest}&` : '';
        c = city ? `cityId=${city}&` : '';
        s = sobriety ? `sobriety=${sobriety}&` : '';
        f = free ? `free=${free}&` : '';

        return this.http.get(`http://test.mhbb.ru/b/api/activity/search?${w}${a}${i}${c}${s}${f}`);
    }
    getAllUncheckedActivities() {
        return this.http.get('http://test.mhbb.ru/b/api/activity/searchunchecked');
    }
}
