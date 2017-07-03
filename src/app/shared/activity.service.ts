import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ActivityService {
  token = localStorage.getItem('token');

  constructor(private http: Http) {}

  getActivities(word?: string, age?: string, interestId?: string, cityId?: string,
    sobriety?: string, free?: string) {
    let search = new URLSearchParams();

    word ? search.append('word', word) : search.delete('word');
    age ? search.append('age', age) : search.delete('age');
    search.append('interestId', interestId);
    search.append('cityId', cityId);
    sobriety ? search.append('sobriety', sobriety) : search.delete('sobriety');
    free ? search.append('free', free) : search.delete('free');

    let options = new RequestOptions({ search: search });
    return this.http.get('http://test.mhbb.ru/b/api/activity/search', options)
    .map((response) => response.json())
    .toPromise();
}

  getUncheckedActivities(word?: string, age?: string, interestId?: string, cityId?: string,
    sobriety?: string, free?: string) {
    let search = new URLSearchParams();

    word ? search.append('word', word) : search.delete('word');
    age ? search.append('age', age) : search.delete('age');
    search.append('interestId', interestId);
    search.append('cityId', cityId);
    sobriety ? search.append('sobriety', sobriety) : search.delete('sobriety');
    free ? search.append('free', free) : search.delete('free');


    let headers = new Headers({'Authorization': 'Token ' + this.token});
    let options = new RequestOptions({ headers: headers, search: search });
    let url = 'http://test.mhbb.ru/b/api/activity/searchunchecked';
    return this.http.get(url, options)
    .map((response) => response.json())
    .toPromise();
  }
  getActivity(id) {
    return this.http.get(`http://test.mhbb.ru/b/api/activity/${id}`)
    .map((response) => response.json())
    .toPromise();
  }
  postTempFile(body) {
    let headers = new Headers({'Authorization': 'Token ' + this.token});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`http://test.mhbb.ru/b/api/tempfile`, body, options)
    .map((response) => response.json())
    .toPromise();
  }
  deleteTempfile(id) {
    let headers = new Headers({'Authorization': 'Token ' + this.token});
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(`http://test.mhbb.ru/b/api/tempfile/${id}`, options)
    .map((response) => response.json())
    .toPromise();
  }
  deletePicture(id) {
    let headers = new Headers({'Authorization': 'Token ' + this.token});
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(`http://test.mhbb.ru/b/api/picture/${id}`, options)
    .map((response) => response.json())
    .toPromise();
  }

  postActivity(body) {
    let headers = new Headers({'Authorization': 'Token ' + this.token});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`http://test.mhbb.ru/b/api/activity`, body, options)
    .map((response) => response.json())
    .toPromise();
  }
  putActivity(body, id) {
    let headers = new Headers({'Authorization': 'Token ' + this.token});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(`http://test.mhbb.ru/b/api/activity/${id}`, body, options)
    .map((response) => response.json())
    .toPromise();
  }
}

export class TempFile {
  constructor (
    public FormId: string,
    public Filename: string,
    public Data: any,
    public IsMain: boolean) {}
}

export class Activity {
  constructor (
    public Name: string,
    public Organizer: any,
    public AgeFrom: number,
    public AgeTo: number,
    public Phones: string,
    public Address: string,
    public Prices: string,
    public Mentor: string,
    public Description: string,
    public InterestId: number,
    public IsChecked: boolean,
    public Free: boolean,
    public FormId: string,
    public OrganizerId?: number
  ) {}
}
