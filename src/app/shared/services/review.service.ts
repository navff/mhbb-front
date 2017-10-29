import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReviewService {
  constructor(private http: HttpService) { }

  postReview(body: any) {
    return this.http.post('review', body)
      .map((data) => data.json());
  }
  getReviewsByActivity(id: any) {
    return this.http.get(`review/byactivity?activityId=${id}`)
      .map((data) => data.json());
  }
  getUncheckedReviews(word?: string, cityId?: string) {
    let search = new URLSearchParams();
    word ? search.append('word', word) : search.delete('word');
    search.append('cityId', cityId);

    return this.http.get('review/unchecked', new RequestOptions({ search: search }))
      .map((data) => data.json());
  }
  putSetChecked(id: string, isChecked: string) {
    return this.http.put(`review/setchecked?reviewId=${id}&isChecked=${isChecked}`, null)
      .map((data) => data.json());
  }
  deleteReview(id: string) {
    return this.http.delete(`review/${id}`)
      .map((data) => data.json());
  }
}
