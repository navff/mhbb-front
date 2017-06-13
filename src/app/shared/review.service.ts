import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReviewService {
  constructor(private http: Http) {}

  postReview(body: any) {
    let headers = new Headers({'Authorization': 'Token ABRAKADABRA'});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`http://test.mhbb.ru/b/api/review`, body, options)
    .map((response) => response.json())
    .toPromise();
  }
  getReviewsByActivity(id: any) {
    return this.http.get(`http://test.mhbb.ru/b/api/review/byactivity?activityId=${id}`)
    .map((response) => response.json())
    .toPromise();
}}

export class Review {
  constructor (
    public ActivityId: number,
    public Text: string) {}
}
