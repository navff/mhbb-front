import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class InterestService {
  constructor(private http: HttpService) { }

  getInterests() {
    return this.http.get('interest/getall')
      .map((data) => data.json());
  }
}
