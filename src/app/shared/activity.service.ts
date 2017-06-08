import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ActivityService {
  constructor(private http: Http) {}

  getActivities(
    word?: any,
    age?: any,
    interestId?: any,
    cityId?: any,
    sobriety?: any,
    free?: any) {
    let w, a, i, c, s, f, q;

    w = word     ? `word=${word}` : '';
    a = age      ? `age=${age}` : '';
    i = interestId      ? `interestId=${interestId}` : '';
    c = cityId      ? `cityId=${cityId}` : '';
    s = sobriety      ? `sobriety=${sobriety}` : '';
    f = free     ? `free=${free}` : '';

    q = [w, i, c, s, a, f].filter(function(x) { return x !== ''; }).join('&');
    return this.http.get(`http://test.mhbb.ru/b/api/activity/search?${q}`)
    .map((response) => response.json())
    .toPromise();
}

  getUncheckedActivities(
    word?: any,
    age?: any,
    interestId?: any,
    cityId?: any,
    sobriety?: any,
    free?: any) {
    let w, a, i, c, s, f, q;
    w = word     ? `word=${word}` : '';
    a = age      ? `age=${age}` : '';
    i = interestId      ? `interestId=${interestId}` : '';
    c = cityId      ? `cityId=${cityId}` : '';
    s = sobriety      ? `sobriety=${sobriety}` : '';
    f = free     ? `free=${free}` : '';

    q = [w, i, c, s, a, f].filter(function(x) { return x !== ''; }).join('&');
    let headers = new Headers({'Authorization': 'Token ABRAKADABRA'});
    let options = new RequestOptions({ headers: headers });
    let url = `http://test.mhbb.ru/b/api/activity/searchunchecked?${q}`;
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
    let headers = new Headers({ 'Authorization': 'Token ABRAKADABRA',
                                'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`http://test.mhbb.ru/b/api/tempfile`, body, options)
    .map((response) => response.json())
    .toPromise();
  }
}
export class TempFilePutBody {
  FormId: string;
  Filename: string;
  Data: any;
  IsMain: boolean;
  constructor (formid: string, name: string, data: any, ismain: boolean) {
    this.FormId = formid;
    this.Filename = name;
    this.Data = data;
    this.IsMain = ismain;
}}

export class ActivityPutBody {
  Name: string;
  OrganizerId: number;
  Organizer: {
    Name: string;
    CityId: number;
    Sobriety: boolean;
  };
  AgeFrom: number;
  AgeTo: number;
  Phones: string;
  Address: string;
  Prices: string;
  Mentor: string;
  Description: string;
  InterestId: number;
  IsChecked: boolean;
  Free: boolean;
  FormId: number;
}
