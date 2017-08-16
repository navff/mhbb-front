import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {
  private footerLoadedSource = new Subject<boolean>();
  footerLoaded = this.footerLoadedSource.asObservable();

  constructor() { }

  destroyFooter() {
    this.footerLoadedSource.next(false);
  }
  loadFooter(): any {
    this.footerLoadedSource.next(true);
  }
}
