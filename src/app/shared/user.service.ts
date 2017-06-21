import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  token = localStorage.getItem('token');

  constructor(private http: Http) {}

  getUsers(page?: string, role1?: string, role2?: string, cityId?: string, word?: string) {
    let search = new URLSearchParams();
    word ? search.append('word', word) : search.delete('word');
    search.append('cityId', cityId);
    search.append('page', page);
    search.append('roles', role1);
    search.append('roles', role2);

    let headers = new Headers({'Authorization': 'Token ' + this.token});
    let options = new RequestOptions({ headers: headers, search: search });
    return this.http
    .get('http://test.mhbb.ru/b/api/user/search', options)
    .map((response) => response.json())
    .toPromise();
  }
  getUserByEmail(email: string) {
    let headers = new Headers({'Authorization': 'Token ' + this.token});
    let options = new RequestOptions({ headers: headers });
    let url = `http://test.mhbb.ru/b/api/user?email=${email}`;
    return this.http.get(url, options)
    .map((response) => response.json())
    .toPromise();
  }
  putUser(email: any, body: any) {
    let headers = new Headers({'Authorization': 'Token ' + this.token});
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
