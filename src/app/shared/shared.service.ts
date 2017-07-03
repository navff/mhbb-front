import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SharedService {
    private footerLoadedSource = new Subject<boolean>();
    footerLoaded = this.footerLoadedSource.asObservable();

    private previousUrlSource = new Subject<string>();
    previousUrl = this.previousUrlSource.asObservable();

    constructor() {}

    destroyFooter() {
        this.footerLoadedSource.next(false);
    }
    loadFooter(): any {
        this.footerLoadedSource.next(true);
    }

    updateUrl(url) {
        this.previousUrlSource.next(url);
    }
}
