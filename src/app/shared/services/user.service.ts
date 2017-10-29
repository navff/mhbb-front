import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  token = localStorage.getItem('token');

  constructor(private http: HttpService) { }

  getUsers(page?: string, role1?: string, role2?: string, cityId?: string, word?: string) {
    let search = new URLSearchParams();
    word ? search.append('word', word) : search.delete('word');
    search.append('cityId', cityId);
    search.append('page', page);
    search.append('roles', role1);
    search.append('roles', role2);

    let headers = new Headers({ 'Authorization': 'Token ' + this.token });
    let options = new RequestOptions({ headers: headers, search: search });
    return this.http
      .get('http://test.mhbb.ru/b/api/user/search', options)
      .map((data) => data.json());
  }
  getByEmail(email: string) {
    return this.http.myGet(`http://test.mhbb.ru/b/api/user?email=${email}`);
  }
  putUser(email: string, body: any) {
    return this.http.myPut(`http://test.mhbb.ru/b/api/user?email=${email}`, body);
  }
  deletePicture(id) {
    return this.http.myDelete(`http://test.mhbb.ru/b/api/picture/${id}`);
  }

  register(email) {
    return this.http.myPost(`http://test.mhbb.ru/b/api/user`, { 'Email': email });
  }
  getByToken() {
    return this.http.myGet(`http://test.mhbb.ru/b/api/user`);
  }
}
