import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ActivityService {
  token = localStorage.getItem('token');

  constructor(private http: HttpService) { }

  getActivities(word?: string, age?: string, interestId?: string, cityId?: string,
    sobriety?: any, free?: any) {
    let search = new URLSearchParams();

    word ? search.append('word', word) : search.delete('word');
    age ? search.append('age', age) : search.delete('age');
    search.append('interestId', interestId);
    search.append('cityId', cityId);
    sobriety ? search.append('sobriety', sobriety) : search.delete('sobriety');
    free ? search.append('free', free) : search.delete('free');

    let options = new RequestOptions({ search: search });
    return this.http.get('activity/search', options)
      .map((data) => data.json());
  }
  getUncheckedActivities(word?: string, age?: string, interestId?: string, cityId?: string,
    sobriety?: any, free?: any) {
    let search = new URLSearchParams();

    word ? search.append('word', word) : search.delete('word');
    age ? search.append('age', age) : search.delete('age');
    search.append('interestId', interestId);
    search.append('cityId', cityId);
    sobriety ? search.append('sobriety', sobriety) : search.delete('sobriety');
    free ? search.append('free', free) : search.delete('free');


    let headers = new Headers({ 'Authorization': 'Token ' + this.token });
    let options = new RequestOptions({ headers: headers, search: search });
    let url = 'activity/searchunchecked';
    return this.http.get(url, options)
      .map((data) => data.json());
  }
  getActivity(id) {
    return this.http.get(`activity/${id}`)
      .map((data) => data.json());
  }
  postTempFile(body) {
    return this.http.myPost(`tempfile`, body);
  }
  deleteTempfile(id) {
    return this.http.myDelete(`tempfile/${id}`);
  }
  deletePicture(id) {
    return this.http.myDelete(`picture/${id}`);
  }
  postActivity(body) {
    return this.http.myPost(`activity`, body);
  }
  putActivity(body, id) {
    return this.http.myPut(`activity/${id}`, body);
  }
  putApproveActivity(isChecked, id) {
    return this.http.myPut(`activity/setchecked?activityId=${id}&isChecked=${isChecked}`);
  }
  deleteActivity(id: any) {
    return this.http.myDelete(`activity/${id}`);
  }
}
