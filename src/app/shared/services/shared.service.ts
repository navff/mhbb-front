import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedService {
  activitiesNumber$: BehaviorSubject<number> = new BehaviorSubject(0);
  requests$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
  }
}
