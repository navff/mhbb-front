import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ActivityService {
  token = localStorage.getItem('token');

  constructor(private http: Http) { }

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
    return this.http.get('http://test.mhbb.ru/b/api/activity/search', options)
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
    let url = 'http://test.mhbb.ru/b/api/activity/searchunchecked';
    return this.http.get(url, options)
      .map((data) => data.json());
  }
  getActivity(id) {
    return this.http.get(`http://test.mhbb.ru/b/api/activity/${id}`)
      .map((data) => data.json());
  }
  postTempFile(body) {
    let headers = new Headers({ 'Authorization': 'Token ' + this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`http://test.mhbb.ru/b/api/tempfile`, body, options)
      .map((data) => data.json());
  }
  deleteTempfile(id) {
    let headers = new Headers({ 'Authorization': 'Token ' + this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(`http://test.mhbb.ru/b/api/tempfile/${id}`, options)
      .map((data) => data.json());
  }
  deletePicture(id) {
    let headers = new Headers({ 'Authorization': 'Token ' + this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(`http://test.mhbb.ru/b/api/picture/${id}`, options)
      .map((data) => data.json());
  }

  postActivity(body) {
    let headers = new Headers({ 'Authorization': 'Token ' + this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`http://test.mhbb.ru/b/api/activity`, body, options)
      .map((data) => data.json());
  }
  putActivity(body, id) {
    let headers = new Headers({ 'Authorization': 'Token ' + this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(`http://test.mhbb.ru/b/api/activity/${id}`, body, options)
      .map((data) => data.json());
  }
  putApproveActivity(isChecked, id) {
    let headers = new Headers({ 'Authorization': 'Token ' + this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(`http://test.mhbb.ru/b/api/activity/setchecked?activityId=${id}&isChecked=${isChecked}`, null, options)
      .map((data) => data.json());
  }
}
