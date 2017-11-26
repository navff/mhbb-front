import { SearchParams } from './../../../models/search-params.model';
import { ListService } from './../../services/list.service';
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
  page = 1;
  responding: boolean;

  adminPage: boolean;
  constructor(
    private activityService: ActivityService,
    private listService: ListService) {
    if (location.pathname.substr(1, 5) === 'admin') {
      this.adminPage = true;
    }
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
      });
    if (this.adminPage) {
      this.activityService.listUnchecked(this.params)
        .subscribe(data => this.uncheckedActivities = data);
    }
  }
  concatPage() {
    this.responding = true;
    this.page++;
    this.search();
  }
  ngOnInit() {
    this.changes$.debounceTime(250).subscribe(() => this.search());
    this.search();

    this.listService.interests$
      .subscribe(data => this.interests = [{ Id: null, Name: 'Показать все' }].concat(data));
    this.listService.cities$.subscribe(data => this.cities = data);
  }
}
