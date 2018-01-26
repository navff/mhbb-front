import { SearchParams } from './../../../models/search-params.model';
import { ListService } from './../../services/list.service';
import { SharedService } from './../../services/shared.service';
import { ActivityService } from './../../services/activity.service';
import { Activity } from './../../../models/activity.model';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  templateUrl: './main.component.html',
  providers: [ActivityService],
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  cities = [];
  interests = [];
  activities: Activity[];
  uncheckedActivities: Activity[];

  params = new SearchParams();
  changes$ = new Subject();

  checkLength: number;
  responding: boolean;

  adminPage: boolean;
  constructor(
    private activityService: ActivityService,
    private shared: SharedService,
    private listService: ListService) {
    if (location.pathname.substr(1, 5) === 'admin') {
      this.adminPage = true;
    }
    this.params.page = 1;
  };

  onChange() {
    this.changes$.next();
  }
  search() {
    this.activityService.list(this.params)
      .subscribe(data => {
        this.activities = data;
        this.checkLength = data.length;
        this.responding = false;
        this.shared.params$.next(this.params);
      });
    if (this.adminPage) {
      this.activityService.listUnchecked(this.params)
        .subscribe(data => this.uncheckedActivities = data);
    }
  }
  ngOnInit() {
    this.params = this.shared.params$.getValue();
    this.changes$.debounceTime(250).subscribe(() => this.search());
    this.search();

    this.listService.interests$
      .subscribe(data => this.interests = [{ Id: null, Name: 'Показать все' }].concat(data));
    this.listService.cities$.subscribe(data => this.cities = data);
  }
}
