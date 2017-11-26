import { Subscription } from 'rxjs/Subscription';
import { Component, OnDestroy } from '@angular/core';
import { SharedService } from './../../services/shared.service';

@Component({
  selector: 'mh-progress',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.sass'],
})
export class ProgressBarComponent implements OnDestroy {
  responding: boolean;
  color: string;
  sub: Subscription;

  constructor(private shared: SharedService) {
    this.color = location.pathname.substr(1, 6).match('admin') ? 'primary' : 'accent';
    this.sub = this.shared.requests$.subscribe(data => this.responding = data > 0 ? true : false);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
