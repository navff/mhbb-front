import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ListService {
  private _interests: any[];
  private _cities: any[];

  get cities$() {
    return this._cities ?
      Observable.of(this._cities) :
      this.http.get('city').do((data: any) => this._cities = data);
  }

  get interests$() {
    return this._interests ?
      Observable.of(this._interests) :
      this.http.get('interest/getall').do((data: any) => this._interests = data);
  }

  constructor(private http: HttpService) {
  }
}
