import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import { User } from './../../models/user.model';

@Injectable()
export class UserService {
  constructor(private http: HttpService) { }

  list(page?: string, role1?: string, role2?: string, cityId?: string, word?: string): Observable<User[]> {
    let params = new HttpParams();
    word ? params.append('word', word) : params.delete('word');
    params.append('cityId', cityId);
    params.append('page', page);
    params.append('roles', role1);
    params.append('roles', role2);

    return this.http.get<User[]>('user/search', { params });
  }
  take(email: string): Observable<User> {
    return this.http.get<User>(`user?email=${email}`);
  }
  takeCurrent(): Observable<User> {
    return this.http.get<User>('user');
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
