import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedService {
  activitiesNumber$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
  }
}
