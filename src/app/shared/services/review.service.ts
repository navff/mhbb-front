import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReviewService {
  token = localStorage.getItem('token');

  constructor(private http: Http) { }

  postReview(body: any) {
    let headers = new Headers({ 'Authorization': 'Token ' + this.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`http://test.mhbb.ru/b/api/review`, body, options)
      .map((data) => data.json());
  }
  getReviewsByActivity(id: any) {
    return this.http.get(`http://test.mhbb.ru/b/api/review/byactivity?activityId=${id}`)
      .map((data) => data.json());
  }
  getUncheckedReviews(word?: string, cityId?: string) {
    let search = new URLSearchParams();
    word ? search.append('word', word) : search.delete('word');
    search.append('cityId', cityId);

    let headers = new Headers({ 'Authorization': 'Token ' + this.token });
    let options = new RequestOptions({ headers: headers, search: search });

    return this.http.get('http://test.mhbb.ru/b/api/review/unchecked', options)
      .map((data) => data.json());
  }
  putSetChecked(id: string, isChecked: string) {
    let headers = new Headers({ 'Authorization': 'Token ' + this.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`http://test.mhbb.ru/b/api/review/setchecked?reviewId=${id}&isChecked=${isChecked}`, null, options)
      .map((data) => data.json());
  }
  deleteReview(id: string) {
    let headers = new Headers({ 'Authorization': 'Token ' + this.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`http://test.mhbb.ru/b/api/review/${id}`, options)
      .map((data) => data.json());
  }
}
