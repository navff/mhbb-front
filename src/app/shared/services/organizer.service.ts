import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OrganizerService {
  token = localStorage.getItem('token');

  constructor(private http: HttpService) { }

  getOrganizers(page?: string, word?: string, cityId?: string) {
    let search = new URLSearchParams();
    word ? search.append('word', word) : search.delete('word');
    search.append('cityId', cityId);
    search.append('page', page);

    let options = new RequestOptions({ search: search });
    return this.http
      .get(`organizer/search`, options)
      .map((data) => data.json());
  }
  getOrganizerById(id: string) {
    return this.http.get(`organizer/${id}`)
      .map((data) => data.json());
  }
  putOrganizer(id: any, body: any) {
    return this.http.myPut(`organizer/${id}`, body);
  }
  postOrganizer(body: any) {
    return this.http.myPost(`organizer`, body);
  }
  deleteOrganizer(id: any) {
    return this.http.myDelete(`organizer/${id}`);
  }
}
