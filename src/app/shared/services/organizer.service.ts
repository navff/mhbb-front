import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class OrganizerService {
  constructor(private http: HttpService) { }

  list(page?: string, word?: string, cityId?: string) {
    let search = new URLSearchParams();
    word ? search.append('word', word) : search.delete('word');
    search.append('cityId', cityId);
    search.append('page', page);

    return this.http.get(`organizer/search`, new RequestOptions({ search }));
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
