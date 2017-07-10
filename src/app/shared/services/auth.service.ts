import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  public token = localStorage.getItem('token');

  constructor(private http: Http) { }

  postUser(email) {
    let body = { 'Email': email };
    return this.http.post(`http://test.mhbb.ru/b/api/user`, body)
      .map((response) => response.json())
      .toPromise();
  }
  setToken() {
    let match = window.location.href.match(/token=(.)+/);
    if (match) {
      let token = match[0].substr(6);
      localStorage.setItem('token', token);
      this.token = localStorage.getItem('token');
    }
  }
  getUserByToken() {
    let headers = new Headers({ 'Authorization': 'Token ' + this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`http://test.mhbb.ru/b/api/user`, options)
      .map((response) => response.json())
      .toPromise();
  }
}
