import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class ReviewService {
  constructor(private http: HttpService) { }

  create(body: any) {
    return this.http.post('review', body);
  }
  listByActivity(id: string) {
    return this.http.get(`review/byactivity?activityId=${id}`);
  }
  listUnchecked(params?: any) {
    return this.http.get('review/unchecked', new RequestOptions({ search: this.http.setSearch(params) }));
  }
  setCheck(id: string, isChecked: string) {
    return this.http.put(`review/setchecked?reviewId=${id}&isChecked=${isChecked}`);
  }
  remove(id: string) {
    return this.http.delete(`review/${id}`);
  }
}
