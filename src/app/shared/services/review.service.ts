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
  listUnchecked(word?: string, cityId?: string) {
    let search = new URLSearchParams();
    word ? search.append('word', word) : search.delete('word');
    search.append('cityId', cityId);

    return this.http.get('review/unchecked', new RequestOptions({ search }));
  }
  setCheck(id: string, isChecked: string) {
    return this.http.put(`review/setchecked?reviewId=${id}&isChecked=${isChecked}`);
  }
  remove(id: string) {
    return this.http.delete(`review/${id}`);
  }
}
