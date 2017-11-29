import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { SharedService } from './shared.service';
import { RequestOptions } from '@angular/http';
import { SearchParams } from './../../models/search-params.model';
import { Observable } from 'rxjs/Observable';
import { Reservation } from './../../models/reservation.model';
import { Activity } from './../../models/activity.model';
import { TempFile } from './../../models/tempfile.model';

@Injectable()
export class ActivityService {
  constructor(private http: HttpService, private shared: SharedService) { }

  list(params?: SearchParams): Observable<Activity[]> {
    return this.http.get('activity/search',
      new RequestOptions({ search: params && this.http.setSearch(params) }));
  }
  listUnchecked(params?: SearchParams): Observable<Activity[]> {
    return this.http.get('activity/searchunchecked',
      new RequestOptions({ search: params && this.http.setSearch(params) }))
      .map(data => {
        this.shared.activitiesNumber$.next(data.length);
        return data;
      });
  }
  take(id): Observable<Activity> {
    return this.http.get(`activity/${id}`);
  }
  create(body: Activity) {
    return this.http.post(`activity`, body)
      .map(data => {
        this.shared.activitiesNumber$.next(this.shared.activitiesNumber$.getValue() + 1);
        return data;
      });
  }
  update(body: Activity, id) {
    return this.http.put(`activity/${id}`, body);
  }
  setCheck(isChecked: boolean, id) {
    return this.http.put(`activity/setchecked?activityId=${id}&isChecked=${isChecked}`, null)
      .map(data => {
        this.shared.activitiesNumber$.next(this.shared.activitiesNumber$.getValue() - 1);
        return data;
      });
  }
  remove(id) {
    return this.http.delete(`activity/${id}`);
  }
  createTempFile(body: TempFile) {
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
