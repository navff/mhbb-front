import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class InterestService {
  constructor(private http: HttpService) { }

  getInterests() {
    return this.http.get('interest/getall');
  }
}
