import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class AuthService {

  constructor(private http: HttpService) { }

  postUser(email) {
    return this.http.myPost(`http://test.mhbb.ru/b/api/user`, { 'Email': email });
  }
  setToken() {
    let match = window.location.href.match(/token=(.)+/);
    if (match) {
      let token = match[0].substr(6);
      localStorage.setItem('token', token);
    }
  }
  getUserByToken() {
    return this.http.myGet(`http://test.mhbb.ru/b/api/user`);
  }
}
