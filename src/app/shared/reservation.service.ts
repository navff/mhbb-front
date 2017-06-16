import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReservationService {
  constructor(private http: Http) {}

  postReservation(body: any) {
    return this.http.post(`http://test.mhbb.ru/b/api/reservation`, body)
    .map((response) => response.json())
    .toPromise();
}}
export class Reservation {
  constructor (
  public ActivityId: string,
  public UserEmail: string,
  public Name: string,
  public Phone: string,
  public Comment: any
) {}
}
