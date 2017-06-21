import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class VoicesService {
  token = localStorage.getItem('token');

  constructor(private http: Http) {}

  votePositive(id) {
    let headers = new Headers({'Authorization': 'Token ' + this.token});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`http://test.mhbb.ru/b/api/voice/positive/${id}`, null, options)
    .map((response) => response.json())
    .toPromise();
  }
  voteNegative(id) {
    let headers = new Headers({'Authorization': 'Token ' + this.token});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`http://test.mhbb.ru/b/api/voice/negative/${id}`, null, options)
    .map((response) => response.json())
    .toPromise();
}}
