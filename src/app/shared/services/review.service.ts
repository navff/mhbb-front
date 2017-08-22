import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReviewService {
  token = localStorage.getItem('token');

  constructor(private http: HttpService) { }

  postReview(body: any) {
    return this.http.myPost(`http://test.mhbb.ru/b/api/review`, body);
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
    return this.http.myPut(`http://test.mhbb.ru/b/api/review/setchecked?reviewId=${id}&isChecked=${isChecked}`);
  }
  deleteReview(id: string) {
    return this.http.myDelete(`http://test.mhbb.ru/b/api/review/${id}`);
  }
}
