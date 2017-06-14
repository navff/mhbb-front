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
    let token = window.location.href
                .match(/token=(.)+/)[0]
                .substr(6);
    if (token) {
    console.log(token);
    localStorage.setItem('token', token[0]);
    }
  }
  getUserByToken() {
    let headers = new Headers({'Authorization': 'Token ' + this.token});
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`http://test.mhbb.ru/b/api/user`, options)
    .map((response) => response.json())
    .toPromise();
}}
