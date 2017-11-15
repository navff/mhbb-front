import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../shared/services/activity.service';
import { ListService } from '../../shared/services/list.service';
import { Subject } from 'rxjs/Subject';
import { Activity } from '../../models/activity.model';

@Component({
  templateUrl: './main.component.html',
  providers: [ActivityService, ListService],
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  cities = [];
  interests = [];
  activities: Activity[];

  word: string;
  age: string;
  sobriety: string;
  free: string;
  changes$ = new Subject();

  city: any = {};
  interest: any = {};

  checkLength: number;
  page = 1;
  responding: boolean;

  constructor(
    private activityService: ActivityService,
    private listService: ListService) { }

  search(...values) {
    this.page = 1;
    if (values[0] !== undefined) { this.sobriety = values[0]; }
    if (values[1] !== undefined) { this.free = values[1]; }
    this.activityService
      .list(this.word, this.age, this.interest.Id, this.city.Id, this.sobriety, this.free)
      .subscribe(data => {
        this.activities = data;
        this.checkLength = data.length;
      });
  }
  onChange() {
    this.changes$.next();
  }
  concatPage() {
    this.responding = true;
    this.page++;
    this.activityService.list(this.page.toString(10))
      .subscribe(data => {
        this.activities = this.activities.concat(data);
        this.checkLength = data.length;
        this.responding = false;
      });
  }
  ngOnInit() {
    this.changes$.debounceTime(250).subscribe(() => this.search());
    this.activityService.list().subscribe((data: Activity[]) => {
      this.activities = data;
      this.checkLength = data.length;
    });
    this.listService.getInterests()
      .subscribe(data => this.interests = [{ Id: null, Name: 'Показать все' }].concat(data));
    this.listService.getCities().subscribe(data => this.cities = data);
  }
}
