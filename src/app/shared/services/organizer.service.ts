import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrganizerService {
  token = localStorage.getItem('token');

  constructor(private http: Http) { }

  getOrganizers(page?: string, word?: string, cityId?: string) {
    let search = new URLSearchParams();
    word ? search.append('word', word) : search.delete('word');
    search.append('cityId', cityId);
    search.append('page', page);

    let options = new RequestOptions({ search: search });
    return this.http
      .get(`http://test.mhbb.ru/b/api/organizer/search`, options)
      .map((response) => response.json())
      .toPromise();
  }
  getOrganizerById(id: string) {
    return this.http.get(`http://test.mhbb.ru/b/api/organizer/${id}`)
      .map((response) => response.json())
      .toPromise();
  }
  putOrganizer(id: any, body: any) {
    let headers = new Headers({ 'Authorization': 'Token ' + this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(`http://test.mhbb.ru/b/api/organizer/${id}`, body, options)
      .map((response) => response.json())
      .toPromise();
  }
  postOrganizer(body: any) {
    let headers = new Headers({ 'Authorization': 'Token ' + this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`http://test.mhbb.ru/b/api/organizer`, body, options)
      .map((response) => response.json())
      .toPromise();
  }
}
export class Organizer {
  constructor(
    public Name: string,
    public Cityid: number,
    public Sobriety: boolean,
    public Email: string,
    public Phone: string
  ) { }
}

