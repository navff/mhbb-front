import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class ListService {
  constructor(private http: HttpService) { }

  getInterests() {
    return this.http.get('interest/getall');
  }

  getCities() {
    return this.http.get('city');
  }
}
