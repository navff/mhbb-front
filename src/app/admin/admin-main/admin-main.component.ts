import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../shared/services/activity.service';
import { Activity } from '../../models/activity.model';
import { ListService } from '../../shared/services/list.service';
import { Subject } from 'rxjs/Subject';

@Component({
  templateUrl: './admin-main.component.html',
  providers: [ActivityService, ListService, ListService],
  styleUrls: ['./admin-main.component.sass']
})
export class AdminMainComponent implements OnInit {
  interests = [];
  cities = [];

  activities: Activity[];
  word: string;
  age: string;
  sobriety: any;
  free: any;
  changes$ = new Subject();
  city: any = {};
  interest: any = {};
  uncheckedActivities: Activity[];

  constructor(
    private activityService: ActivityService,
    private listService: ListService) { }

  search(...values) {
    if (values[0] !== undefined) { this.sobriety = values[0]; }
    if (values[1] !== undefined) { this.free = values[1]; }

    this.activityService
      .listUnchecked(this.word, this.age, this.interest.Id, this.city.Id, this.sobriety, this.free)
      .subscribe(data => {
        this.uncheckedActivities = data;
        this.activityService
          .list(this.word, this.age, this.interest.Id, this.city.Id, this.sobriety, this.free)
          .subscribe(act => this.activities = act);
      });

  }
  updateWord() {
    this.changes$.next();
  }
  ngOnInit() {
    this.changes$.debounceTime(250).subscribe(() => this.search());
    this.listService.getCities().subscribe(data => this.cities = data);
    this.listService.getInterests()
      .subscribe(data => this.interests = [{ Id: null, Name: 'Показать все' }].concat(data));
    this.activityService.listUnchecked()
      .subscribe((data: Activity[]) => {
        this.uncheckedActivities = data;
        this.activityService.list().subscribe((act: Activity[]) => this.activities = act);
      });
  }
}
