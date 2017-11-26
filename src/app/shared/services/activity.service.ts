import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { SharedService } from './shared.service';
import { RequestOptions } from '@angular/http';
import { SearchParams } from './../../models/search-params.model';
import { Reservation } from './../../models/reservation.model';

@Injectable()
export class ActivityService {
  constructor(private http: HttpService, private shared: SharedService) { }

  list(params?: SearchParams) {
    return this.http.get('activity/search',
      new RequestOptions({ search: params && this.http.setSearch(params) }));
  }
  listUnchecked(params?: SearchParams) {
    return this.http.get('activity/searchunchecked',
      new RequestOptions({ search: params && this.http.setSearch(params) }))
      .map(data => {
        this.shared.activitiesNumber$.next(data.length);
        return data;
      });
  }
  take(id) {
    return this.http.get(`activity/${id}`);
  }
  create(body) {
    return this.http.post(`activity`, body)
      .map(data => {
        this.shared.activitiesNumber$.next(this.shared.activitiesNumber$.getValue() + 1);
        return data;
      });
  }
  update(body, id) {
    return this.http.put(`activity/${id}`, body);
  }
  setCheck(isChecked, id) {
    return this.http.put(`activity/setchecked?activityId=${id}&isChecked=${isChecked}`, null)
      .map(data => {
        this.shared.activitiesNumber$.next(this.shared.activitiesNumber$.getValue() - 1);
        return data;
      });
  }
  remove(id) {
    return this.http.delete(`activity/${id}`);
  }
  createTempFile(body) {
    return this.http.post('tempfile', body);
  }
  removeTempFile(id) {
    return this.http.delete(`tempfile/${id}`);
  }
  removePicture(id) {
    return this.http.delete(`picture/${id}`);
  }
  reserve(body: Reservation) {
    return this.http.post('reservation', body);
  }
}
