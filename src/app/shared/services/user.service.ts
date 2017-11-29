import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from './../../models/user.model';

@Injectable()
export class UserService {
  constructor(private http: HttpService) { }

  list(page?: string, role1?: string, role2?: string, cityId?: string, word?: string): Observable<User[]> {
    let search = new URLSearchParams();
    word ? search.append('word', word) : search.delete('word');
    search.append('cityId', cityId);
    search.append('page', page);
    search.append('roles', role1);
    search.append('roles', role2);

    return this.http.get('user/search', new RequestOptions({ search }));
  }
  take(email: string): Observable<User> {
    return this.http.get(`user?email=${email}`);
  }
  takeCurrent(): Observable<User> {
    return this.http.get('user');
  }
  update(email: string, body: User) {
    return this.http.put(`user?email=${email}`, body);
  }
  removePicture(id) {
    return this.http.delete(`picture/${id}`);
  }
  register(Email: string) {
    return this.http.post(`user`, { Email });
  }
}
