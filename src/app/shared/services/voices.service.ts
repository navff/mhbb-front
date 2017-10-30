import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class VoicesService {

  constructor(private http: HttpService) { }

  vote(id, type) {
    return this.http.post(`voice/${type}/${id}`);
  }
}
