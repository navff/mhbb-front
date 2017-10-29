import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class CityService {
  constructor(private http: HttpService) { }

  getCities() {
    return this.http.get('city')
      .map((data) => data.json());
  }
}
