import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReviewService {
  constructor(private http: Http, private auth: AuthService) {}

  postReview(body: any) {
    let headers = new Headers({'Authorization': 'Token ' + this.auth.token});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`http://test.mhbb.ru/b/api/review`, body, options)
    .map((response) => response.json())
    .toPromise();
  }
  getReviewsByActivity(id: any) {
    return this.http.get(`http://test.mhbb.ru/b/api/review/byactivity?activityId=${id}`)
    .map((response) => response.json())
    .toPromise();
  }
  getUncheckedReviews(word?: string, cityId?: string) {
    let search = new URLSearchParams();
    word ? search.append('word', word) : search.delete('word');
    search.append('cityId', cityId);

    let headers = new Headers({'Authorization': 'Token ' + this.auth.token});
    let options = new RequestOptions({ headers: headers, search: search });

    return this.http.get('http://test.mhbb.ru/b/api/review/unchecked', options)
    .map((response) => response.json())
    .toPromise();
  }
  putSetChecked() {
    let headers = new Headers({'Authorization': 'Token ABRAKADABRA'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put('http://test.mhbb.ru/b/api/review/setchecked?reviewId=140&isChecked=true', options)
    .map((response) => response.json())
    .toPromise();
  }
  deleteReview(id: string) {
    let headers = new Headers({'Authorization': 'Token ' + this.auth.token});
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`http://test.mhbb.ru/b/api/review/${id}`, options)
    .map((response) => response.json())
    .toPromise();
  }
}
export class Review {
  constructor (
    public ActivityId: number,
    public Text: string) {}
}
