import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class FooterService {
    private footerLoadedSource = new Subject<boolean>();
    footerLoaded = this.footerLoadedSource.asObservable();

    constructor() {}
    destroy() {
        this.footerLoadedSource.next(false);
    }
    load(): any {
        this.footerLoadedSource.next(true);
    }
}
