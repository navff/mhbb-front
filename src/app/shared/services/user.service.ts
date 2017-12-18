import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import { User } from './../../models/user.model';

@Injectable()
export class UserService {
  constructor(private http: HttpService) { }

  list(params): Observable<User[]> {
    return this.http.get<User[]>('user/search', { params : params && this.http.setSearch(params) });
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
  remove(email: string) {
    return this.http.delete(`user/delete?email=${email}`);
  }
  removePicture(id) {
    return this.http.delete(`picture/${id}`);
  }
  register(Email: string) {
    return this.http.post(`user`, { Email });
  }
}
