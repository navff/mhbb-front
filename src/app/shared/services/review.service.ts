import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class ReviewService {
  constructor(private http: HttpService) { }

  postReview(body: any) {
    return this.http.post('review', body);
  }
  getReviewsByActivity(id: string) {
    return this.http.get(`review/byactivity?activityId=${id}`);
  }
  getUncheckedReviews(word?: string, cityId?: string) {
    let search = new URLSearchParams();
    word ? search.append('word', word) : search.delete('word');
    search.append('cityId', cityId);

    return this.http.get('review/unchecked', new RequestOptions({ search: search }));
  }
  putSetChecked(id: string, isChecked: string) {
    return this.http.put(`review/setchecked?reviewId=${id}&isChecked=${isChecked}`);
  }
  deleteReview(id: string) {
    return this.http.delete(`review/${id}`);
  }
}
