import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { SharedService } from './shared.service';
import { RequestOptions, URLSearchParams } from '@angular/http';
import { SearchParams } from './../../models/search-params.model';

@Injectable()
export class ActivityService {
  constructor(private http: HttpService, private shared: SharedService) { }
  setSearch(params): URLSearchParams {
    let search = new URLSearchParams();
    Object.keys(params).forEach(key => {
      search.append(key, params[key] || null);
    });
    return search;
  }

  list(params?: SearchParams) {
    return this.http.get('activity/search', new RequestOptions({ search: params && this.setSearch(params) }));
  }
  listUnchecked(params?: SearchParams) {
    return this.http.get('activity/searchunchecked', new RequestOptions({ search: params && this.setSearch(params) }))
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
}
