import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  getUsers(page?: number, role1?: any, role2?: any, cityId?: number, word?: string) {
    let r1, r2, c, w, p, q;

    r1 = (role1 !== undefined)   ? `roles=${role1}` : '';
    r2 = (role2 !== undefined)   ? `roles=${role2}` : '';
    c = cityId     ? `cityId=${cityId}` : '';
    w = word     ? `word=${word}` : '';
    p = page     ? `page=${page}` : '';
    q = [r1, r2, c, w, p].filter(function(x) { return x !== ''; }).join('&');

    let headers = new Headers({'Authorization': 'Token ABRAKADABRA'});
    let options = new RequestOptions({ headers: headers });
    let url = `http://test.mhbb.ru/b/api/user/search?${q}`;
    return this.http
    .get(url, options)
    .map((response) => response.json())
    .toPromise();
  }
  getUserByEmail(email: string) {
    let headers = new Headers({'Authorization': 'Token ABRAKADABRA'});
    let options = new RequestOptions({ headers: headers });
    let url = `http://test.mhbb.ru/b/api/user?email=${email}`;
    return this.http.get(url, options)
    .map((response) => response.json())
    .toPromise();
  }
  putUser(email: any, body: any) {
    let headers = new Headers({'Authorization': 'Token ABRAKADABRA'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`http://test.mhbb.ru/b/api/organizer/${email}`, body, options)
    .map((response) => response.json())
    .toPromise();
}}
export class User {
  Picture: null;
  constructor (
  public Email: string,
  public Name: string,
  public Phone: string,
  public Role: string,
  public CityId: any) {}
}
