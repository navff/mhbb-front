import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  public token: string;

  constructor(private http: Http) {
    this.token = localStorage.getItem('token');
  }

  postUser(email) {
    let body = { 'Email': email };
    return this.http.post(`http://test.mhbb.ru/b/api/user`, body)
    .map((response) => response.json())
    .toPromise();
  }
  setToken() {
    let match =
    'https://test.mhbb.ru/#/validate-token?token=447b60fde3fa6528adbe103056372a785f86d77af81e7f690597279257663603'.match(/token=(.)+/);
    if (match) {
    let token = match[0].substr(6);
    localStorage.setItem('token', token);
    this.token = localStorage.getItem('token');
  }
  }
  getUserByToken() {
    let headers = new Headers({'Authorization': 'Token ' + this.token});
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`http://test.mhbb.ru/b/api/user`, options)
    .map((response) => response.json())
    .toPromise();
}}
