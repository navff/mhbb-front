import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class UserService {
  constructor(private http: HttpService) { }

  list(page?: string, role1?: string, role2?: string, cityId?: string, word?: string) {
    let search = new URLSearchParams();
    word ? search.append('word', word) : search.delete('word');
    search.append('cityId', cityId);
    search.append('page', page);
    search.append('roles', role1);
    search.append('roles', role2);

    return this.http.get('user/search', new RequestOptions({ search }));
  }
  take(email: string) {
    return this.http.get(`user?email=${email}`);
  }
  update(email: string, body: any) {
    return this.http.put(`user?email=${email}`, body);
  }
  removePicture(id) {
    return this.http.delete(`picture/${id}`);
  }
  register(Email) {
    return this.http.post(`user`, { Email });
  }
  takeCurrent() {
    return this.http.get('user');
  }
}
