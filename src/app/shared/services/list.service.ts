import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ListService {
  _interests: any[];
  _cities: any[];

  get cities$(): Observable<any[]> {
    return this._cities ?
      Observable.of(this._cities) :
      this.http.get('city').do(data => this._cities = data);
  }

  get interests$(): Observable<any[]> {
    return this._interests ?
      Observable.of(this._interests) :
      this.http.get('interest/getall').do(data => this._interests = data);
  }

  constructor(private http: HttpService) {
  }
}
