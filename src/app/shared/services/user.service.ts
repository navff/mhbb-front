import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor(private http: HttpService) { }

  getUsers(page?: string, role1?: string, role2?: string, cityId?: string, word?: string) {
    let search = new URLSearchParams();
    word ? search.append('word', word) : search.delete('word');
    search.append('cityId', cityId);
    search.append('page', page);
    search.append('roles', role1);
    search.append('roles', role2);

    return this.http.get('user/search', new RequestOptions({ search: search }))
      .map((data) => data.json());
  }
  getByEmail(email: string) {
    return this.http.get(`user?email=${email}`)
      .map((data) => data.json());
  }
  putUser(email: string, body: any) {
    return this.http.put(`user?email=${email}`, body)
      .map((data) => data.json());
  }
  deletePicture(id) {
    return this.http.delete(`picture/${id}`)
      .map((data) => data.json());
  }
  register(email) {
    return this.http.post(`user`, { 'Email': email })
      .map((data) => data.json());
  }
  getByToken() {
    return this.http.get('user')
      .map((data) => data.json());
  }
}
