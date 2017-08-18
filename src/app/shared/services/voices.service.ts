import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VoicesService {
  token = localStorage.getItem('token');

  constructor(private http: Http) { }

  votePositive(id) {
    let headers = new Headers({ 'Authorization': 'Token ' + this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`http://test.mhbb.ru/b/api/voice/positive/${id}`, null, options)
      .map((data) => data.json());
  }
  voteNegative(id) {
    let headers = new Headers({ 'Authorization': 'Token ' + this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`http://test.mhbb.ru/b/api/voice/negative/${id}`, null, options)
      .map((data) => data.json());
  }
}
