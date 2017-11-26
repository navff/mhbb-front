import { Subscription } from 'rxjs/Subscription';
import { Component, OnDestroy } from '@angular/core';
import { HttpService } from './../../services/http.service';
@Component({
  selector: 'mh-progress',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.sass'],
})
export class ProgressBarComponent implements OnDestroy {
  responding: boolean;
  color: string;
  sub: Subscription;

  constructor(private http: HttpService) {
    this.color = location.pathname.substr(1, 6).match('admin') ? 'primary' : 'accent';
    this.sub = this.http.requests$.subscribe(data => this.responding = data > 0 ? true : false);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
