import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Organizer } from './../../models/organizer.model';

@Injectable()
export class OrganizerService {
  constructor(private http: HttpService) { }

  list(params?: any): Observable<Organizer[]> {
    return this.http.get<Organizer[]>(`organizer/search`, { params: params && this.http.setSearch(params) });
  }
  take(id): Observable<Organizer> {
    return this.http.get(`organizer/${id}`);
  }
  update(id, body: Organizer) {
    return this.http.put(`organizer/${id}`, body);
  }
  create(body: Organizer) {
    return this.http.post('organizer', body);
  }
  remove(id) {
    return this.http.delete(`organizer/${id}`);
  }
}
