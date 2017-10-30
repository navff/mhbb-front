import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class CityService {
  constructor(private http: HttpService) { }

  getCities() {
    return this.http.get('city');
  }
}
