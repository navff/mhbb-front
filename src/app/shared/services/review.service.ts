import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ReviewService {
  constructor(private http: HttpService) { }

  create(body: any) {
    return this.http.post('review', body);
  }
  listByActivity(id: string): Observable<any> {
    return this.http.get(`review/byactivity?activityId=${id}`);
  }
  listUnchecked(params?: any): Observable<any> {
    return this.http.get('review/unchecked', { params: params && this.http.setSearch(params) });
  }
  setCheck(id: string, isChecked: string) {
    return this.http.put(`review/setchecked?reviewId=${id}&isChecked=${isChecked}`, null);
  }
  remove(id: string) {
    return this.http.delete(`review/${id}`);
  }
}
