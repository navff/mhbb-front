import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class InterestService {
  constructor(private http: Http) { }

  getInterests() {
    return this.http.get('http://test.mhbb.ru/b/api/interest/getall')
      .map((response) => response.json())
      .toPromise();
  }
}