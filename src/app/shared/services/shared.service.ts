import { SearchParams } from './../../models/search-params.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedService {
  activitiesNumber$: BehaviorSubject<number> = new BehaviorSubject(0);
  requests$: BehaviorSubject<number> = new BehaviorSubject(0);
  params$: BehaviorSubject<SearchParams> = new BehaviorSubject(new SearchParams());
  constructor() {
  }
}
