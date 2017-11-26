import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class OrganizerService {
  constructor(private http: HttpService) { }

  list(params?: any) {
    return this.http.get(`organizer/search`, new RequestOptions({ search: this.http.setSearch(params) }));
  }
  take(id: string) {
    return this.http.get(`organizer/${id}`);
  }
  update(id: any, body: any) {
    return this.http.put(`organizer/${id}`, body);
  }
  create(body: any) {
    return this.http.post('organizer', body);
  }
  remove(id: any) {
    return this.http.delete(`organizer/${id}`);
  }
}
