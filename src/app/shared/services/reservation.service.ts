import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ReservationService {
  constructor(private http: Http) { }

  postReservation(body: any) {
    return this.http.post('reservation', body);
  }
}
